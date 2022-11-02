const { posts } = require("../models/posts");

exports.getAllPosts = async(req, res, next) => {
    posts
        .findAll({
            raw: true,
        })
        .then((posts) => {
            res.json({ data: posts });
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.getUserPost = async(req, res, next) => {
    posts
        .findAll({
            raw: true,
            where: {
                id: req.params.id,
            },
        })
        .then((posts) => {
            res.json({ data: posts });
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.addUserPost = async(req, res, next) => {
    posts
        .create({
            state: req.body.state,
            description: req.body.description,
            created_by_id: req.body.created_by_id,
        })
        .then((posts) => {
            res.json(posts);
        })
        .catch(function(err) {
            console.log(err);
        });
};