# React Test App

This is a sample react app for learning porpouses

It is a simple CRUD application for "drivers".
It also features authentication and routing.
It uses firebase as a tool for storage and authentication.

## Install

Clone this repo in your machine and make sure to have [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  installed.
In the root folder of the project run npm install.

You will need to configure a [firebase](https://firebase.google.com/) project with a web application to hook to this project.
All the configuration that firebase provides you (different keys, domain, etc) should be put in a .env.local file (generate it from .env.example).
It is needed to configure authentication (only for email) and firestore database with a collection called "driver":


Once is all configured you can run the application with npm run start and create an account.