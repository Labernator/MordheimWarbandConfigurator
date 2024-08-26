import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }: { children: JSX.Element }) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";

    const navigate = useNavigate();

    const onRedirectCallback = () => {
        navigate("/");
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: window.location.origin }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export const LoginButton = () => {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    return !isLoading && !isAuthenticated ? <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button> : null;
  };

  export const LogoutButton = () => {
    const { isLoading, isAuthenticated, logout } = useAuth0();
    return !isLoading && isAuthenticated ? <button
        className="btn btn-primary btn-block"
        onClick={() => logout()}
      >
        Log Out
      </button> : null;
  };