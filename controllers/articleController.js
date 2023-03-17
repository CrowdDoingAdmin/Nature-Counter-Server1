const mongoose = require('mongoose');
const createError = require('http-errors');
const Articles = require('../models/articleSchema');

module.exports = {
    getAllArticles: async (req, res, next) => {
        try {
            const article = await Articles.find(req.query);
            res.json(article);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    postArticles: async (req, res, next) => {
        try {
            const newArticle = new Articles(req.body);
            const savedArticle = await newArticle.save();
            res.json(savedArticle);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteAllArticles: async (req, res, next) => {
        try {
            const delArticle = await Articles.deleteMany({});
            res.json(delArticle);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getArticleById: async (req, res, next) => {
        const id = req.params.articleId;
        try {
            const article = await Articles.findById(id);
            if (!article) {
                throw createError(404, 'Article does not exits');
            } else {
                res.json(article);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    updateArticleById: async (req, res, next) => {
        const id = req.params.articleId;
        try {
            const article = await Articles.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true });
            if (!article) {
                throw createError(404, 'Article does not exits');
            } else {
                res.json(article);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteArticleById: async (req, res, next) => {
        const id = req.params.articleId;
        try {
            const article = await Articles.findByIdAndRemove(id)
            res.json(article);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}