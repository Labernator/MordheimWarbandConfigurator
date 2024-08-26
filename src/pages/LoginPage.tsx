import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        function checkUser() {
            if (isLoading) {
                // do nothing
                return;
            }
            if (isAuthenticated) {
                navigate("/start");
            } else {
                loginWithRedirect();
            }
        }
        checkUser();                            
    }, [isAuthenticated, loginWithRedirect]);
    return <>
        <h2 >Looks like the auto-redirect to the login page failed </h2>
        <div className="content-container">
            <div style={{ padding: "1em" }}>Please login first</div>
            <div style={{ padding: "1em" }}>Press the following button to be redirected to the login page on Auth0</div>
            <div className="button" onClick={() => loginWithRedirect()}>Login</div>
        <div style={{ padding: "1em" }}>I did not have the time yet to build my own user management system and this looked convenient enough for now.</div>
    </div >
    </>;
};
