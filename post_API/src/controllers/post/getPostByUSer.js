import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js"; 

/**
 * Get a post by userID
 * @param req
 * @param res
 */
export const getPostByUSer = async (req, res, next) => {
  try {
    const userId = req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    if(!userId) throw StatusError.forbidden(res._("unAuthorizedUser"));
    // Use Mongoose to find the post by ID
    const post = await Post.find({
        where:{
            createdBy: userId
        }
    });

    if (!post) {
      throw StatusError.notFound("Post not found"); 
    }
    return res.ok({ data: post });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
