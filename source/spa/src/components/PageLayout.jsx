import { AuthenticatedTemplate } from "@azure/msal-react";

import { NavigationBar } from "./NavigationBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavigationBar />
            <br />
            <h5><center>Simple Todo App with Azure AD B2C</center></h5>
            <br />
            {props.children}
            <br />
        </>
    );
};