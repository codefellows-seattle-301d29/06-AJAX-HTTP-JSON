'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

// DONE REVIEW: Instead of a global `articles = []` array, let's attach this list of all articles directly to the constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves objects, which means we can add properties/values to them at any time. In this case, the array relates to ALL of the Article objects, so it does not belong on the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

// DONE COMMENT: Why isn't this method written as an arrow function?
// We want the scope of "this" to point to the object in this function.  An arrow function changes the scope of the "this" outside the function to the object containing the function.  

Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  // DONE: What is going on in the line below? What do the question mark and colon represent? How have we seen this same logic represented previously?
  // Not sure? Check the docs!
  // The '?' is a turnary operator.  If the condition before the ? is true then it returns the first expression after the ?.  If the condition before the ? is false, then the expression after the : is returned.  

  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// DONE REVIEW: There are some other functions that also relate to all articles across the board, rather than just single instances. Object-oriented programming would call these "class-level" functions, that are relevant to the entire "class" of objects that are Articles.

// DONE REVIEW: This function will take the rawData, how ever it is provided, and use it to instantiate all the articles. This code is moved from elsewhere, and encapsulated in a simply-named function for clarity.

// DONE COMMENT: Where is this function called? What does 'rawData' represent now? How is this different from previous labs?
// It is called inside the next Article.fetchAll function.  rawData represents the hackeripsum json file contents (which is representative of a api wrrc response) instead of locally stored data as before.

Article.loadAll = rawData => {
  rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  rawData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

// DONE REVIEW: This function will retrieve the data from either a local or remote source, and process it, then hand off control to the View.
Article.fetchAll = () => {
  // DONE REVIEW: What is this 'if' statement checking for(if returning and rawData is already stored locally)? Where was the rawData set to local storage?
  if (localStorage.rawData) {

    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();

  } else {
    $.getJSON('../data/hackerIpsum.json').then(data => {
      console.log(data);
      Article.loadAll(data);
      localStorage.setItem('rawData', JSON.stringify(data));
      articleView.initIndexPage();
    });
  }
}