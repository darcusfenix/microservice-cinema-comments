import {Router} from "express";
import log4js from "log4js";

import {patch, getById, put, post, get, preRequestById, remove} from "./commentController";

const log = log4js.getLogger("ROUTE-MOVIE");
const commentRouter = Router();

commentRouter.route("/comments/")
    .post(post)
    .get(get);

commentRouter.use("/comments/:id", preRequestById);

commentRouter.route("/comments/:id")
    .get(getById)
    .put(put)
    .patch(patch)
    .delete(remove);

export default commentRouter;
