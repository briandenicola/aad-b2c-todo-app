import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";

import { loginRequest } from "../authConfig";
import { getAllTasks } from "../fetch";

import { DashView } from '../components/DashView';

const DashboardContent = () => {

    const { inProgress } = useMsal();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (!dashboardData && inProgress === InteractionStatus.None) {
            getAllTasks().then(response => setDashboardData(response));
        }
    }, [inProgress]);

    return (
        <>
            { dashboardData ? <DashView dashboardData={dashboardData} /> : null}
        </>
    );
};

export const Dashboard = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
        >
            <DashboardContent />
        </MsalAuthenticationTemplate>
    )
};