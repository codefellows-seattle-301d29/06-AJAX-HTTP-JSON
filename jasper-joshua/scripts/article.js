'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// COMMENT: Why isn't this method written as an arrow function?
// This is because the method below is an 'Object prototype' and object prototype do not use fat arrow functions.
Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // COMMENT: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // The question mark "?" is used to check for condition(s) as True/False but it is not a if-statment. The colon ":" is used to identify the true statement, which is the condition before the colon or false - the condition after the colon. 
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// It is called in the Article.fetchAll function; rawData represents the JSON file in our local-storage. We are getting data we stored in our local storage or from a remote source and store it to our local storage, instead of from a file. 
Article.loadAll = rawData => {
  rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  rawData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// REVIEW: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // REVIEW: What is this 'if' statement checking for? Where was the rawData set to local storage?
  if (localStorage.rawData) {
// get data from local-storage
    Article.loadAll(localStorage.rawData);
    articleView.initIndexPage(); //sort and instinate data from local-storage (jasper.joshua)

    //get data from local-API.
  } else {
    $.getJSON('data/hackerIpsum.json').then(data => {
      localStorage.setItem('rawDat', JSON.stringify(data));
      Article.loadAll(data); 
      articleView.initIndexPage(); //sort and instinate data from local-API (jasper.joshua)
    //store data as a string to local storage and parse it from local storage as a object. (jasper-joshua.)
  })
}
}
