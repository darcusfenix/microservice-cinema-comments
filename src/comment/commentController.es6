import log4js from "log4js";
import {getCommentModel, commentSchema} from "microservice-cinema-core";

const log = log4js.getLogger("COMMENT-CONTROLLER");

export const
    get = async(req, res) => {
        const Comment = await getCommentModel();

        let query = {};

        if (req.query.movie) {

            query.movie = req.query.movie;

        }

        Comment.find(query, (err, comments) => {

            if (err) {

                res.status(404).json([]);

            } else {

                res.json(comments);

            }

        });

    },
    getById = (req, res) => {

        if (req.comment === null) {

            res.statusCode = 404;
            res.json({"message": "not found"});

        } else {

            res.json(req.comment);

        }

    },
    patch = (req, res) => {

        if (req.body._id) {

            delete req.body._id;

        }

        for (const property in req.body) {

            req.comment[property] = req.body[property];

        }

        const promise = req.comment.save();
        promise.then(comment => {

            res.json(comment);

        });

        promise.catch(error => {

            res.statusCode = 505;
            res.json({"message": error});

        });

    },
    post = async(req, res) => {

        const Comment = await getCommentModel();
        req.checkBody(commentSchema);

        const errors = req.validationErrors();

        if (errors) {
            log.error(errors);
            res.status(401).json(errors);
        }

        let comment = new Comment(req.body);

        comment.save(function (err) {
            if (err) {
                log.error(err);

                res.status(500);
                res.json({message : err.message});

                return;
            }


            res.status(201);
            res.send(comment);

        });

    },
    preRequestById = async(req, res, next) => {

        const Comment = await getCommentModel();
        const query = Comment.findById({"_id": req.params.id});
        query.exec().then(comment => {

            req.comment = comment;
            log.debug(comment);
            next();

        }).catch(error => {

            log.error(error);
            res.statusCode = 404;
            res.json({"message": error});

        });

    },
    put = (req, res) => {

        req.comment.title = req.body.title;
        req.comment.duration = req.body.duration;
        req.comment.description = req.body.description;
        req.comment.rate = req.body.rate;

        const promise = req.comment.save();

        promise.then(comment => {

            res.json(comment);

        });
        promise.catch(error => {

            res.statusCode = 505;
            res.json({"message": error});

        });

    },
    remove = (req, res) => {

        const promise = req.comment.remove();
        promise.then(() => {

            res.statusCode = 204;
            res.json({"message": "removed"});

        });
        promise.catch(error => {

            log.error(error);
            res.statusCode = 505;
            res.json({"message": error});

        });

    };
