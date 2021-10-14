const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const config = require('./authConfig');
const router = require('./routes/router');
const routeGuard = require('./utils/guard');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const options = {
    identityMetadata: `https://${config.metadata.b2cDomain}/${config.credentials.tenantID}/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    policyName: config.policies.policyName,
    isB2C: config.settings.isB2C,
    validateIssuer: config.settings.validateIssuer,
    loggingLevel: config.settings.loggingLevel,
    passReqToCallback: config.settings.passReqToCallback,
}

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    done(null, {}, token);
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(bearerStrategy);

app.use('/api',
    passport.authenticate('oauth-bearer', { session: false }),
    routeGuard(config.accessMatrix),
    router
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;