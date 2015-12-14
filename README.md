# React / Spotify

This is a simple exercise for learning the core concepts of [Facebook's React.js](https://facebook.github.io/react/) using data from the [Spotify Web API](https://developer.spotify.com/web-api/).

## How to Run

1. Clone this repo and navigate to the project's root directory.
2. Run `npm install` to install dependencies.
3. To start the server, run `node server.js`.
4. In a browser, visit http://localhost:3000.

## How to Edit

From the project root, run `gulp`, which will watch all files in the `/src` and will build / copy them to the `/dist` directory, from which the front end is being served.

## To-Dos

1. Move project to ES2015.
2. Handle compilation (in Gulp) of ES2015 code for use in a browser.
3. Prevent Gulp from crashing when syntax errors occur.
4. Add routing to the app and save state on browser refresh.
5. Improve the view for when the app initially loads.
6. Add transitions and animations as data is loading.
7. Improve UI to go beyond basic Bootstrap CSS.
8. Switch search functionality to use type-ahead feature (fetch search results before user submits)
9. Add functionality to show an album's tracks and to play 30s snippets of the tracks.
10. Add more robust error handling.
