var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  image: {
    type: String
  }
});

var Article = (module.exports = mongoose.model("Article", articleSchema));

module.exports.getArticles = function(query, callback, limit) {
  Article.find(query, callback).limit(limit);
};

module.exports.addArticle = function(article, callback) {
  Article.create(article, callback);
};

module.exports.getArticleById = function(id, callback) {
  Article.findById(id, callback);
};

module.exports.updateArticle = function(query, update, options, callback) {
  Article.findOneAndUpdate(query, update, options, callback);
};
