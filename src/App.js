import React from 'react';
import Config from './config'
import './App.css';
import Header from "./modules/Header";
import Menu from "./modules/Menu";
import Footer from "./modules/Footer";
import Main from "./modules/Main";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoogleLogin: false,
            googleProfile: null,
            user: null,
            avatar: process.env.PUBLIC_URL + "/images/anonymous.png"
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
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Header
                        isGoogleLogin={this.state.isGoogleLogin}
                        onLogin={(response) => this.responseGoogle(response)}
                        onLogout={(response) => this.googleHasLogout(response)}
                        avatar={this.state.avatar}
                        user={this.state.user}
                    />
                    <Menu/>
                    <Main/>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }

    responseGoogle(response) {
        const profile = response.profileObj;
        //console.log("Google Login Response", response);

        var data = new FormData();
        data.append('token', response.tokenId);

        this.setState({
            isGoogleLogin: false,
            googleProfile: null,
            user: null,
            avatar: process.env.PUBLIC_URL + "/images/loader.svg"
        });

        fetch(Config().Server.Api + "?act=login", { method: "POST", body: data })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isGoogleLogin: true,
                        googleProfile: profile,
                        user: result.user,
                        avatar: profile.imageUrl,
                    })
                },
                (error) => {
                    this.setState({
                        isGoogleLogin: false,
                        googleProfile: null,
                        user: null,
                        avatar: process.env.PUBLIC_URL + "/images/anonymous.png",
                        error,
                    });
                }
            )
    }

    googleHasLogout(response) {
        console.log("Google has logout", response);
        this.setState({
            isGoogleLogin: false,
            googleProfile: null,
            user: null,
            avatar: process.env.PUBLIC_URL + "/images/anonymous.png"
        })
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
