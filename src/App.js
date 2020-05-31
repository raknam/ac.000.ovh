import React from 'react';
import './App.css';
import Header from "./modules/Header";
import Menu from "./modules/Menu";
import Footer from "./modules/Footer";
import Main from "./modules/Main";
import {BrowserRouter} from "react-router-dom";
import FirstLogin from "./pages/FirstLogin";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            data: null,
            avatar: process.env.PUBLIC_URL + "/images/anonymous.png",
            firstLogin: false
        };
    }

    componentDidMount() {
        useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js", () => {
            useScript("https://cdnjs.cloudflare.com/ajax/libs/i18next-browser-languagedetector/4.2.0/i18nextBrowserLanguageDetector.min.js");
            useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.5.0/perfect-scrollbar.min.js");
            useScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", () => {
                useScript(process.env.PUBLIC_URL + "/js/plugins.js");
            });
        });

        this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.props.firebase.getUserData(authUser.uid)
                    .get()
                    .then((data) => {
                        var userData = data.data();
                        if (userData === undefined) {
                            this.setState({
                                user: authUser,
                                data: null,
                                avatar: authUser.photoURL,
                                firstLogin: true
                            });
                        } else {
                            this.setState({
                                user: authUser,
                                data: data.data(),
                                avatar: authUser.photoURL,
                                firstLogin: false
                            });
                        }
                    });
            } else {
                this.setState({
                    user: null,
                    data: null,
                    avatar: process.env.PUBLIC_URL + "/images/anonymous.png",
                    firstLogin: false
                })
            }
        });
    }

    render() {
        var main = !this.state.firstLogin ? <Main/> : <FirstLogin/>;

        return (
            <div className="App">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Header
                        isSignedIn={this.state.user}
                        firebase={this.props.firebase}
                        avatar={this.state.avatar}
                        user={this.state.user}
                        data={this.state.data}
                        isFirstLogin={this.state.firstLogin}
                    />
                    <Menu/>
                    {main}
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

const useScript = (url, callback) => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = (e) => {
        if (callback !== undefined)
            callback();
    };

    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
};

export default App;
