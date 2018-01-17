![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 06: AJAX, JSON & HTTP
===
## Code Wars Challenge

Complete [today's Kata](https://www.codewars.com/kata/nice-array) and follow the submission instructions from Lab 01.

## Lab 06 Submission Instructions
Follow the submission instructions from Lab 01.

## Resources  
[Ternary Operator MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## Configuration
_Your repository must include:_

```
06-ajax-and-json-and-wrrc
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── data
│   └── hackerIpsum.json
├── index.html
├── new.html
├── scripts
│   ├── article.js
│   └── articleView.js
├── styles
│   ├── base.css
│   ├── fonts
│   │   ├── icomoon.eot
│   │   ├── icomoon.svg
│   │   ├── icomoon.ttf
│   │   └── icomoon.woff
│   ├── icons.css
│   ├── layout.css
│   └── modules.css
└── vendor
    └── styles
        ├── default.css
        ├── normalize.css
        └── railscasts.css
```

## User Stories and Feature Tasks

*As a user, I want to be able to load my articles from an external source so that I do not need to keep all of the articles on my local machine.*

- Note: We are using a local JSON file as an emulation of a remote data source that provides JSON.
- Fill in what's needed in article.js, so that all the articles are retrieved with AJAX, then loaded and rendered.
  - We only need to request the JSON file when we don't already have it, so the conditional check should only execute the AJAX call when local storage doesn't have the rawData yet.
  - Complete the `else` portion of the conditional to load the articles if they do not exist in local storage and cache them for next time. **Include a comment** which explains how you and your partner determined the sequence of code execution.
  - Make sure to pass in the correct argument to Article.loadAll() and render the index page.
- In index.html, call the appropriate method to kick off the retrieval of data and render the page. **Include a comment** that explains what this function is doing.

*As a developer, I want to understand the order of execution of my code so that I can better understand its functionality and optimize its efficiency and maintainability.*

- Start by looking over what's new in the codebase. There is a /data folder!
- Make sure to look at all of the `// REVIEW` statements. Practice your code-reading skills.
- There are some `// COMMENT` tasks that focus on the sequence of code execution, so be attentive to that as you read through the code.

### Stretch Goals
*As a user, I want to be able to request a new copy of my JSON file whenever it is changed so my app is always up-to-date.*

- Coded as above, we won't request a new JSON file if we've already downloaded it once. This caching is problematic: if the JSON file is updated (therefore our cache is "invalid"), a new copy won't be requested from the server unless local storage is cleared. To overcome this, we could use a small and fast AJAX request with a type of `HEAD`, to request just the headers, and not the contents of the file. The HEAD response will contain a key called "eTag". The value of the eTag header is calculated based on the contents of the file. So if a new article is added (or an existing one is edited even slightly), the eTag will be different.
  - If we cache the eTag, then we can compare our cached version of it with a new eTag check, to determine if we need to get the whole file or not.
  - This can introduce some synchronicity issues, so we'll need to carefully control what methods are calling back to what.

Hint: You'll be able to see everything the server returns, if your AJAX success function looks something like this:

```javascript
function(data, message, xhr) {
  console.log(xhr);
}
```

## Documentation
_Your README.md must include:_

```md
# 06-AJAX-HTTP-JSON

**Author**: Christian Miller and Brian Bixby
**Version**: 1.0.0 (increment the patch/fix version number up if you make more commits past your first submission)

## Overview
This project is an exercise in making AJAX requests, handling the response and displaying the results. On top of this we added a layer of efficiency by setting the AJAX data response set to local storage and then first checking if local storage had the data.

## Getting Started
The first step is making an AJAX request and logging the data from here you want to display the data. after you're able to do this you need to set your local storage variable and then create a function that renders your data in your local storage if it exists.

## Architecture
We utilized Github, HTML, Javascript, Jquery and more specifically AJAX calls, JSON Data and local storage

## Change Log

01-17-2017 9:20am - Articles display on home page
01-17-2017 10:20am - Categories populate
01-17-2017 11:00am - setting and getting local storage is working
01-17-2017 11:10am - Done Except stretch goal 

## Credits and Collaborations
CodeFellows https://github.com/codefellows-seattle-301d29 
