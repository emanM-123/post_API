import { StatusError } from "../../config/index.js";
import { Post } from "../../models/postModel.js"; 

/**
 * Get a post by userID
 * @param req
 * @param res
 */
export const getPostByLoc = async (req, res, next) => {
  try {
    const { lat, lng } = req.params;

    // Assuming you have a Post model with a location field containing latitude and longitude
    const posts = await Post.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 10000, // Max distance in meters (adjust based on your needs)
        },
      },
    });
    if (!posts) {
      throw StatusError.notFound("Post not found"); 
    }
    return res.ok({ data: posts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

