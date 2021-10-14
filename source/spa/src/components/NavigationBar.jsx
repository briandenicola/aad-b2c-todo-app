import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Nav, Navbar, Button, Dropdown, DropdownButton} from "react-bootstrap";
import { loginRequest, b2cPolicies } from "../authConfig";

export const NavigationBar = () => {

    const { instance } = useMsal();
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <AuthenticatedTemplate>
                    <Nav className="ml-auto">
                        <Nav.Link as={Button} href="/todolist">TodoList</Nav.Link>
                        <Nav.Link as={Button} href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Button} onClick={() => instance.loginRedirect(b2cPolicies.authorities.editProfile)}>Edit Profile</Nav.Link>
                        <Nav.Link as={Button} onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>Sign Out</Nav.Link>
                    </Nav>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <Nav className="ml-auto">
                        <Nav.Link as={Button} onClick={() => instance.loginRedirect(loginRequest)}>Sign In</Nav.Link>
                    </Nav>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};