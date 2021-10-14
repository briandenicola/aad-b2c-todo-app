
import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_signup_signin_1",
        forgotPassword: "b2c_1_password_reset_1",
        editProfile: "b2c_1_edit_profile_1"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://{TenantName}.b2clogin.com/{TenantName}.onmicrosoft.com/b2c_1_signup_signin_1",
        },
        forgotPassword: {
            authority: "https://{TenantName}.b2clogin.com/{TenantName}.onmicrosoft.com/b2c_1_password_reset_1",
        },
        editProfile: {
            authority: "https://{TenantName}.b2clogin.com/{TenantName}.onmicrosoft.com/b2c_1_edit_profile_1"
        }
    },
    authorityDomain: "{TenantName}.b2clogin.com"
}

export const msalConfig = {
    auth: {
        clientId: '{ClientID}', 
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "/", 
        postLogoutRedirectUri: "/", 
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false, 
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const protectedResources = {
    apiTodoList: {
        todoListEndpoint: "http://localhost:5000/api/todolist",
        dashboardEndpoint: "http://localhost:5000/api/dashboard",
        scopes: ["https://{TenantName}.onmicrosoft.com/todoapi/access_as_user"],
    },
}

export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes]
};

export const appRoles = {
    TaskUser: "TaskUser",
    TaskAdmin: "TaskAdmin"
}
