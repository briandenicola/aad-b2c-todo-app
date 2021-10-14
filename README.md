# Todo App with Azure AD B2C Auth

## Overview

This sample application demonstrates a simple application secured with the Microsoft identity platform (Azure AD B2C). It is a React single-page application calling an Node.j web api . Role Based Access Control will be handled via Custom Token Attributes. 

## Scenario

In the sample, the dashboard component only allows TaskAdmins to see tasks assigned to any users.

- The SPA Application uses [MSAL React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react) to authenticate a user with the Microsoft identity platform.
- The App then obtains an [access token](https://docs.microsoft.com/azure/active-directory/develop/access-tokens) from Azure AD on behalf of the authenticated user for the Node.js web api.
- The API uses [passport-azure-ad](https://github.com/AzureAD/passport-azure-ad) to protect its endpoint and accept only authorized calls.

# Setup
## Prerequisites
- An Azure AD B2C tenant. 
- A Kuberentes cluster to deploy the application to.

## Azure AD B2C Configuration
### Identity Providers 
- Federate wtih any Social Identity Provider (SIP) that you wish to support. 
- Follow thee to configure fedreation with [Azure AD] (https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-generic-openid-connect) and [GitHub](https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-github?WT.mc_id=Portal-Microsoft_AAD_B2CAdmin&pivots=b2c-user-flow)

### User Attributes
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **User Attributes** blade on the left.
1. Select **Add**
1. Enter Name: _TaskAdmin_
1. Data Type: _Boolean_
1. Description: "This attribute is used to determine if the user is a TaskAdmin"

## Azure AD B2C User Flows
### Sign In and Sign Up
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **User Flows** blade on the left.
1. Select **New User Flow**
1. Select **Sign In and Sign Up**
1. Select **Recommended**
1. Click **Create***
1. Configure with the following:
    - Name: signup_signin_1
    - Identity Provider: Email Signup and any Social Identity Provider
    - MFA: SMS Only and Off
    - Conditional Access: Default
    - Collect Attributes: Email Address, Display Name
    - Return Claims: Email Address, Display Name, TaskAdmin
1. Click **Create**

### Reset Password
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **User Flows** blade on the left.
1. Select **New User Flow**
1. Select **Password Reset**
1. Select **Recommended**
1. Click **Create***
1. Configure with the following:
    - Name: password_reset_1
    - Local Accounts:	Reset password using email address
    - MFA: SMS Only and Off
    - Conditional Access: Default
    - Collect Attributes: Display Name

### Edit Profile
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **User Flows** blade on the left.
1. Select **New User Flow**
1. Select **Profile Editing**
1. Select **Recommended**
1. Click **Create***
1. Configure with the following:
    - Name: edit_profile_1
    - Identity Provider: Email Signup and any Social Identity Provider
    - MFA: SMS Only and Off
    - Conditional Access: Default
    - Collect Attributes: City, Country/Region, Display Name, Postal Code, State/Province, Street Address, Task Admin
1. Click **Create**

## Application Registration - API APP
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter the application name: todo-api.
   - Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**.
1. Select **Register** to create the application.
1. Select **Save** to save your changes.
1. In the app's registration screen, select the **Expose an API**
   - Select `Set` next to the **Application ID URI** to generate a URI that is unique for this app.
   - Change the default Application ID URI to **https://{tenantName}.onmicrosoft.com/todoapi**
   - Click on **Save**.
1. Publish an Application Scope
   - Select **Add a scope** button open the **Add a scope** screen and Enter the values as indicated below:
   - For **Scope name**, use `access_as_user`.
   - Select **Admins and users** options for **Who can consent?**.
   - For **Admin consent display name** type `Access todo-api`.
   - For **Admin consent description** type `Allows the app to access todo-api as the signed-in user.`
   - For **User consent display name** type `Access todo-api`.
   - For **User consent description** type `Allow the application to access todo-api on your behalf.`
   - Keep **State** as **Enabled**.
   - Select the **Add scope** button on the bottom to save this scope.

## Application Registration - SPA APP
1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter the application name: todo-spa.
   - Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**.
   - In the **Redirect URI (optional)** section, select **Single-page application** in the combo-box 
   - Enter the following redirect URI: `http://localhost:3000/`.
1. Select **Register** to create the application.
1. Select **Save** to save your changes.
1. In the app's registration screen, select the **API permissions** blade.
   - Select the **Add a permission** button and then,
   - Ensure that the **My APIs** tab is selected.
   - In the list of APIs, select the API `todo-api`.
   - In the **Delegated permissions** section, select the **todo-api** in the list.
   - Select **access_as_user** permission the **Add permissions** button at the bottom.
   - Click **Grant Admin Consent** to grant the permission to the app.

## Code Updates
### API APP
1. Open the `source\api\authConfig.json` file.
1. Find the key `TenantId` and replace the existing value with your Azure AD B2C tenant name.
1. Find the key `ClientId` and replace the existing value with the application ID (clientId) of API app.

### SPA APP
1. Open the `source\spa\authConfig.json` file.
1. Find the key `TenantName` and replace the existing value with your Azure AD B2C tenat name.
1. Find the key `ClientID` and replace the existing value with the application ID (clientId) of SPA app.

# Run
## API App
```
cd source/api
npm install
npm start
```

## SPA App
```
cd source/spa
npm install
npm start
```

# Deploy
_TBD_

# Backlog
- [X] Profile Edit Handler
- [X] Update readme.md
- [ ] Custom Token Attributes for Dashboard RBAC
- [X] Create Dockerfile for api 
- [X] Create Dockerfile for ui
- [ ] Create GitHub Actions pipeline to build/push docker containers 
- [ ] Create GitHub Actions pipeline to create infrastructure
- [ ] Create Helm Charts for Kubernetes deployment 
- [ ] Update Flux to deploy to Kubernetes cluster
