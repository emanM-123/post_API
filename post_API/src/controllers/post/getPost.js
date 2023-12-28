import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js";

/**
 * Get a post
 * @param req
 * @param res
 */
export const getPost = async (req, res, next) => {
  try {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });

    return res.ok({ 
        activePost: activeCount,
        inactivePost: inactiveCount 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
