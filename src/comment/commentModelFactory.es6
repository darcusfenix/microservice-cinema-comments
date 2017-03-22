import commentModel from "./commentModel";
import connectionProvider from "../dataAccess/connectionProvider";

export const getCommentModel = async function() {
    try {

        const conn = await connectionProvider();
        return conn.model("comment", commentModel);

    } catch (err) {

        throw err;

    }

};
