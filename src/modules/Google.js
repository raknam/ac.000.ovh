import React from "react";
import Config from "../config";
import {useGoogleLogin, useGoogleLogout} from "react-google-login";

function GoogleSignOut(props) {
    // eslint-disable-next-line
    const { signOut, loaded } = useGoogleLogout({
        clientId: Config().Google.ClientID,
        onLogoutSuccess: props.onLogout
    });

    return (
        // eslint-disable-next-line
        <a className="grey-text text-darken-1" onClick={() => signOut()} href="#">
            <i className="material-icons">keyboard_tab</i> Logout
        </a>
    );
}

export function GoogleSignIn(props) {
    // eslint-disable-next-line
    const { signIn, loaded } = useGoogleLogin({
        clientId: Config().Google.ClientID,
        onSuccess: props.onLogin,
        onFailure: props.onLogin,
        isSignedIn: true
    });

    return (
        // eslint-disable-next-line
        <a className="GoogleSignIn grey-text text-darken-1" onClick={() => signIn()} href="#">
            <img src={process.env.PUBLIC_URL + "/images/google.svg"} alt={"Google Logo"}/>
            <span>Sign in</span>
        </a>
    )
}

export default GoogleSignOut;