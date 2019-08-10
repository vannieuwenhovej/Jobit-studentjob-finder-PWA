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

# 2 How it works

## 2.1 Installation and Initialisation
On first launch of the site your browser will prompt you to install the app. 
This will make it also available offline. 

## 2.2 Overview of jobs
All available jobs are listed on the homepage. You can scroll trough them and see which one you're interested in. On the overview you see basic info per job such as an image, the function title, the wage, the company and a small description.
When you click on **_"see job details"_** you get a more detailed look at the job.

## 2.3 Job details
Once the user clicked on the button a new popup will appear in the same tab.
Here you see a more brief explanation of the job. If you're interested you can click on **_"Sollicitate"_**.

## 2.4 Sollicitating for a job
A form appears where you can fill out your personal details that are required. Once you're ready you can click the button **_"Send to company"_**. If you did that, you will be notified per email if you're selected for the job. All you can do now is wait!
