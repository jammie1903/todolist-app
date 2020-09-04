# Todo List App

This is an app that exposes a shared todolist. It does so using a react front end tied to a express server via a web socket. The server exposes the front end so there is no need to run host the front and back ends separately.

This app is available to use at https://jammie1903-todolist-app.herokuapp.com/

## To Run

run `npm run install:frontend` and `npm run install:server`

### For development

run both `npm start` and `npm run start:frontend` in separate shells

### For production
run `npm run build` 

set NODE_ENV to production (`export NODE_ENV=production` or `SET NODE_ENV=production` depending on your console of choice)

run `npm start`

## Tasks still left to complete

* Unit tests
* Allowing for multiple todo lists
* Connecting to MongoDB
* Adding a header, footer and relevant icons
* Centralising theme colours for styled components
* Allow edit/delete of items (already possible in the back-end)
