import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js"; 

/**
 * addPost
 * @param req
 * @param res
 */
export const addPost = async (req, res, next) => {
  try {
    let reqBody = req.body;
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    if(!userId) throw StatusError.forbidden(res._("unAuthorizedUser"));
    const postData = {
      title: reqBody.title ? reqBody.title : "",
      body: reqBody.body ? reqBody.body : "",
      latitude: reqBody.latitude ? reqBody.latitude : "",
      longitude: reqBody.longitude ? reqBody.longitude : "",
      status: "active",
      createdBy: userId,
      created_at: reqBody.created_at ? new Date(reqBody.created_at) : new Date(),
    };

    const task = new Post(postData);

    const savedTask = await task.save();

    if (savedTask) {
      return res.ok({
        message: res.__("createdSuccessfully"),
        Data: savedTask,
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
