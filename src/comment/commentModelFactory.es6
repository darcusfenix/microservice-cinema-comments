import commentModel        from "./commentModel";
import connectionProvider from "../dataAccess/connectionProvider";
import {serverSettings} from "../config/config";

export const getCommentModel = async function() {
    try {

        const conn = await connectionProvider(serverSettings.mongodbUrl, serverSettings.database);
        return conn.model("comment", commentModel);

    } catch (err) {

        throw err;

    }

};
