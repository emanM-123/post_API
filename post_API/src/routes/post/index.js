import { Router } from "express";
import { v1postRouter } from "./post.js";
import { v1authRouter } from "./auth.js";

const postRouter = Router();

postRouter.use("/post", v1postRouter);
postRouter.use("/", v1authRouter);


export { postRouter };
