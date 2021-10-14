import { BrowserRouter as Router, Switch } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";

import { RouteGuard } from './components/RouteGuard';
import { PageLayout } from "./components/PageLayout";
import { Dashboard } from "./pages/Dashboard";
import { TodoList } from "./pages/TodoList";

import { appRoles } from "./authConfig";

import "./styles/App.css";

const Pages = () => {
  return (
    <Switch>
      <RouteGuard
        exact
        path='/todolist'
        Component={TodoList}
      />
      <RouteGuard
        exact
        path='/dashboard'
        Component={Dashboard}
      />
    </Switch>
  )
}

const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Pages instance={instance} />
        </PageLayout>
      </MsalProvider>
    </Router>
  );
}

export default App;