# PWA

The Progressive Web App offers jobs created by companies to the students. As a student you see the different jobs on the home page. You can apply for these jobs and and will be notified if you're accepted for one.


# 1 Technichal Features
A breakdown of all included and unincluded technical features plus where in the application the source code can be found.

## 1.1 Bootstrap

The whole application is made in the bootstrap framework. The framework source files are found in `PWA/assets/bootstrap`.
`PWA/index.html` and `PWA/job.html` is made in bootstrap.
## 1.2 Fetch
The communication happens between fetch requests to the server. Fetch requests can be found in functions in `PWA/assets/script.js` on line `18, 37, 47` and so on

## 1.3 App shell and Manifest
The manifest file can be found in `PWA/assets/manifest.json` alongside the icon located in `PWA/assets/img/icons`.

## 1.4 Service Worker
The service worker caches the files on first visit of the website. It waits a couple of seconds to do so to make sure everything is loaded correctly! The files that are stored in cache are: `/`,  `index.html`,  `assets/script.js`,  `assets/css/style.css`, `assets/bootstrap/css/bootstrap.min.css`,  `assets/bootstrap/js/bootstrap.js`,  `assets/img/300x300.png`,  `assets/manifest.json`,  `assets/img/icons/icon-192x192.png` and `assets/jquery/jquery-3.4.1.min.js`
The `sw.js` file can be found in the root of the PWA. the function which calss to register the sw.js is called in `script.js:23`.

## 1.5 Promises
In the javascript files there are some functions which use Promises, an example is the function `sendSollicitantsDetailsToServer(detailsObj);`.

## 1.6 Performance
The site scored a B and a 75/100 on [https://observatory.mozilla.org/analyze/jonathanvannieuwenhove.be](https://observatory.mozilla.org/analyze/jonathanvannieuwenhove.be)
and also scored 91 on Performance, 100 on Accessibility, 86 on Best Practices, 70 on SEO on Lighthouse's audit for mobile and desktop.
