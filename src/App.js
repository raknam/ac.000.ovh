import React from 'react';
import './App.css';
import Header from "./modules/Header";
import Menu from "./modules/Menu";
import Footer from "./modules/Footer";
import Main from "./modules/Main";
import {BrowserRouter} from "react-router-dom";
import FirstLogin from "./pages/FirstLogin";
import {Helmet} from "react-helmet";
import VillagersPage from "./pages/Villagers";

const Routing = {
    art: "/art",
    insects: "/insects",
    fishes: "/fishes",
    fossils: "/fossils",
    villagers: "/villagers",
};

const defaultState = {
    user: null,
    data: null,
    avatar: process.env.PUBLIC_URL + "/images/anonymous.png",
    firstLogin: false,
    language: "EUfr",
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    componentDidMount() {
        useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js", () => {
            useScript("https://cdnjs.cloudflare.com/ajax/libs/i18next-browser-languagedetector/4.2.0/i18nextBrowserLanguageDetector.min.js");
            useScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.5.0/perfect-scrollbar.min.js", () => {
                useScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", () => {
                    useScript(process.env.PUBLIC_URL + "/js/plugins.js");
                });
            });
        });

        this.props.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.props.firebase.getUserData(authUser.uid)
                    .get()
                    .then((data) => {
                        var userData = data.data();
                        if (userData === undefined) {
                            this.setState(Object.assign(defaultState, {
                                user: authUser,
                                avatar: authUser.photoURL,
                                firstLogin: true
                            }));
                        } else {
                            this.setState(Object.assign(defaultState, {
                                user: authUser,
                                data: data.data(),
                                avatar: authUser.photoURL
                            }));
                        }
                    });
            } else {
                this.setState(Object.assign(defaultState, {}));
            }
        });
    }

    render() {
        var main = !this.state.firstLogin ? <Main routing={Routing} language={this.state.language}/> : <FirstLogin/>;

        return (
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Animal Crossing New Horizons Tool @ 000.ovh</title>
                </Helmet>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Header
                        isSignedIn={this.state.user}
                        firebase={this.props.firebase}
                        avatar={this.state.avatar}
                        user={this.state.user}
                        data={this.state.data}
                        isFirstLogin={this.state.firstLogin}
                        language={this.state.language}
                    />
                    <Menu routing={Routing}/>
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

export const formatMoney = (number) => {
    if (number < 1000) return number;

    let string = number.toString();
    return string.slice(0,-3) + " " + string.slice(-3);
};

export const formatTimeRange = (ranges) => {
    return ranges.replace("to", '-').split(' & ').map((range) => {
        let tokens = range.split(' - ');
        let start = tokens[0], end = tokens[1];
        start = start.indexOf('pm') >= 0 ? parseInt(start.slice(0, -2)) + 12 : start.slice(0, -2);
        end = end.indexOf('pm') >= 0 ? parseInt(end.slice(0, -2)) + 12 : end.slice(0, -2);
        return start + "h-" + end + "h";
    }).join(' & ');
};

export const formatMonthRange = (ranges) => {
    var formatter = new Intl.DateTimeFormat('fr', { month: 'short' });
    return ranges.split(' & ').map((range) => {
        if (range.indexOf('-') === -1)
            return formatter.format(new Date(2000, range-1, 1));

        let tokens = range.split('-');
        let start = new Date(2000, tokens[0]-1, 1),
            end = new Date(2000, tokens[1]-1, 1);

        return formatter.format(start) + "-" + formatter.format(end);
    }).join(' & ');
};

export default App;