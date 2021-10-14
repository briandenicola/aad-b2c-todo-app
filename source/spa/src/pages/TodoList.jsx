import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";

import { loginRequest } from "../authConfig";
import { getTasks } from "../fetch";

import { ListView } from '../components/ListView';

const TodoListContent = () => {
    const { inProgress } = useMsal();
    const [todoListData, setTodoListData] = useState(null);

    useEffect(() => {
        if (!todoListData && inProgress === InteractionStatus.None) {
            getTasks().then(response => setTodoListData(response));
        }
    }, [inProgress]);
  
    return (
        <>
            { todoListData ? <ListView todoListData={todoListData} /> : null }
        </>
    );
};

export const TodoList = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <TodoListContent />
        </MsalAuthenticationTemplate>
      )
};