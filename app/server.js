"use strict";

import {} from 'dotenv/config'
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import {StaticRouter} from 'react-router-dom'
import App from './src/views/App';
import theme from './theme';
import bodyParser from "body-parser";

function renderFullPage(html, css) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>My page</title>
                <style id="jss-server-side">${css}</style>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </head>
            <body>
                <script async src="build/bundle.js"></script>
                <div id="root">${html}</div>
            </body>
        </html>
    `;
}

function handleRender(req, res) {
    const sheets = new ServerStyleSheets();
    
    const context = {}
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url}context={context}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StaticRouter>,
        ),
    );

    // Grab the CSS from our sheets.
    const css = sheets.toString();

    // Send the rendered page back to the client.
    res.send(renderFullPage(html, css));
}

// Express
const app = express();

// Passport
import cors from 'cors'
import passport from 'passport'
import './src/passport_config'
app.use(cors())
app.use(passport.initialize())

app.use('/build', express.static('build'));

// Body Parser
app.use(bodyParser.json());

// auth route
import auth from "./src/routes/auth"
import activities from "./src/routes/activities"
import dashboards from "./src/routes/dashboards"
const endpoints_prefix = '/api'

app.use("/auth", auth)
app.use(`${endpoints_prefix}`, activities)
app.use(`${endpoints_prefix}`, dashboards)


// Helmet for security
import helmet from 'helmet';
app.use(helmet());

// This is fired every time the server-side receives a request.
app.use(handleRender);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${PORT}`);
});
