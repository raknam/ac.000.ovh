import Config from "../config";
import React from "react";
import GoogleLogin, {GoogleLogout} from "react-google-login";

function AppLogin(props) {
    return (!props.isGoogleLogin ?
            <GoogleLogin
                clientId={Config().Google.ClientID}
                onSuccess={props.onLoginSuccess}
                onFailure={props.onLoginFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            /> : <GoogleLogout
                clientId={Config().Google.ClientID}
                onLogoutSuccess={props.onLogout}
                icon={false}
            >
                <img className="google-login-avatar" src={props.avatar} alt={""}/>
                <span> Logout ({props.email})</span>
            </GoogleLogout>
    )
}

export default AppLogin;