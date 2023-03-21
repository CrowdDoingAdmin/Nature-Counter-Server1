const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');

const ArticleController = require('../controllers/articleController');
const articleRouter = express.Router();

articleRouter.use(bodyParser.json());



articleRouter.route('/')
    .get(cors.cors, authenticate.verifyUser, ArticleController.getAllArticles)
    .post(cors.corsWithOptions, authenticate.verifyUser, ArticleController.postArticles)
    .delete(cors.corsWithOptions, authenticate.verifyUser, ArticleController.deleteAllArticles);

articleRouter.route('/:articleId')
    .get(cors.cors, authenticate.verifyUser, ArticleController.getArticleById)
    .put(cors.corsWithOptions, authenticate.verifyUser, ArticleController.updateArticleById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, ArticleController.deleteArticleById);


module.exports = articleRouter;

