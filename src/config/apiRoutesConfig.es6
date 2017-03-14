import cors from "cors";
import commentSchema from "../comment/commentRouter";

export default function apiRoutesConfig(app) {

    app.use(cors());
    app.use(commentSchema);


}
