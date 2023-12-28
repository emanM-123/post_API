import { Router } from "express";
import { postController } from "../../controllers/index.js";
import { validateAccessToken } from "../../middleware/accessToken.js";
import { postValidation } from "../../validations/index.js";



const v1postRouter = Router();

v1postRouter.post(
  "/add",
  validateAccessToken,
  postValidation.addPostData,
  postController.addPost
);

v1postRouter.post(
  "/update",
  validateAccessToken,
  postValidation.updatePost,
  postController.updatePost
);

v1postRouter.get(
  "/:userId",
  validateAccessToken,
  postController.getPostByUSer
);

v1postRouter.post(
  "/delete/:id",
  validateAccessToken,
  postValidation.deletePost,
  postController.deletePost
);

v1postRouter.post(
  "/location/:lat/:lng",
  validateAccessToken,
  postController.getPostByLoc
);

v1postRouter.post(
  "/",
  validateAccessToken,
  postController.getPost
);



export { v1postRouter };
