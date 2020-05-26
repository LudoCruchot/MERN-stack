# PLACES

Places is a web application using MERN stack. You can share places you love with others users.\
You can login, add many places with their own picture and description but also add their location on a Google map.

## Getting started

### Prerequisites

- NodeJS, download [here](https://nodejs.org/en/)
- NPM, download [here](https://www.npmjs.com/)
- MongoDB Atlas, connect [here](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_france_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=EAIaIQobChMIy_WEjrLP6QIVBIjVCh1IywzqEAAYASAAEgKCWPD_BwE)

### Installing

```
$ git clone git@github.com:LudoCruchot/Places.git <yourLocalRepo>
$ cd <yourLocalRepo>/frontend
$ npm install
$ cd ../backend
$ npm install
```

### Setting up the database

Check [here](https://docs.atlas.mongodb.com/getting-started/) to get started with Atlas.\
Then, you need to create a database called _places_ with two collections named _users_ and _places_

### Usage

Running frontend\
Rename the `.env_sample` file into `.env` and set your own environment variables

```
REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
REACT_APP_BACKEND_URL=YOUR_BACKEND_URL
REACT_APP_ASSET_URL=YOUR_ASSET_URL
```

```
<yourLocalRepo>/frontend
$ npm start
```

Running backend\
Rename the `nodemon_sample.json` file into `nodemon.json` and set your own environment variables

```json
{
  "env": {
    "DB_USER": "Your user name",
    "DB_PASSWORD": "Your password",
    "DB_NAME": "Your database name",
    "GOOGLE_API_KEY": "Your google api key",
    "JWT_KEY": "Your JWT key"
  }
}
```

```
<yourLocalRepo>/backend
$ npm start
```
