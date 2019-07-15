## Pre-requisites 

- Install the latest stable release of [Node.js](https://nodejs.org/en/)

## Setting up the project

- `git clone` this repo.
- `cd reactproject`
- `npm install`
- `npm start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploying the Website

- [Create React App](https://facebook.github.io/create-react-app/) comes with [webpack](https://webpack.js.org/), a package bundler, pre-configured to generate the necessary files for deployment. Below instructions are adapted from official deployment [docs](https://facebook.github.io/create-react-app/docs/deployment) and assumes you already have `Apache` web server set up & configured.

#### Generating a build to deploy the website on MARS with API on Pluto

- React app configuration: `Config.js`

```
const settings = {
"apiURL" : "http://localhost:8080",
"appURL" : "http://localhost:3000",
"siteAvailability" : "private",
"proteinsEndpoint" : "/reviewProteins",
"topicsEndpoint" : "/reviewTopics",
}
```

- React `package.json` addition

```
"homepage": "http://localhost:3000/",
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


