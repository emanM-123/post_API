import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js"; 

/**
 * Update post
 * @param req
 * @param res
 * @param next
 */
export const updatePost = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const postId = reqBody.post_id ? reqBody.post_id : "";
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    if(!userId) throw StatusError.forbidden(res._("unAuthorizedUser"));
    if (!postId) {
      throw StatusError.badRequest(res.__("Post Id is required"));
    }

    // Update the post by ID
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      title: reqBody.title || "",
      body: reqBody.body || "",
      updatedBy: reqBody.updatedBy || "",
      status: "active",
      updated_at: reqBody.updated_at || new Date(),
    }, { new: true });

    if (!updatedPost) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    return res.ok({
      message: res.__("Updated successfully"),
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
