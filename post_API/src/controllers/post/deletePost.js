import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js";
/**
 * deletePost
 * @param req
 * @param res
 */
export const deletePost = async (req, res, next) => {
  try {
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    if(!userId) throw StatusError.forbidden(res._("unAuthorizedUser"));
    const postId = req.params.id ? req.params.id : null;
    if (!postId) throw StatusError.badRequest("Post Id is required");
    // Check if the Post with the given postId exists
    const post = await Post.findById(postId);
    if (!post) throw StatusError.badRequest("invalidId");

    // Update the post's status to "deleted"
    post.status = "deleted";
    post.updated_at = req.body.updated_at
      ? new Date(req.body.updated_at)
      : new Date();
    const updatedPost = await psot.save();

    return res.ok({
      message: "Deleted successfully",
      deletedTask: updatedPost,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
