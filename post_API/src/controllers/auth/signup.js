import bcrypt from "bcrypt";
import { userAuthService } from "../../services/index.js";
import { StatusError } from "../../config/index.js";
import { envs } from "../../config/index.js";
import { User } from "../../models/userModel.js"; 

/**
 * signup
 * User can signup with details
 * @param req
 * @param res
 * @param next
 */

export const signup = async (req, res, next) => {
  try {
    const reqBody = req.body;
    // Check if user with the given user_name already exists
    const checkUser = await User.findOne({
      status: { $ne: "deleted" },
      user_name: reqBody.user_name,
    });
    if (checkUser) {
      throw StatusError.badRequest(res.__("This User Id is already registered"));
    }
    
    const isExists = await User.findOne({ email: reqBody.email });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    // Check if user with the given mobile already exists
    const checkMobile = await User.findOne({
      status: { $ne: "deleted" },
      mobile: reqBody.mobile,
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    // Prepare data for insertion
    const data = {
      user_name: reqBody.user_name,
      password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      name: reqBody.name,
      email: reqBody.email,
      gender: reqBody.gender,
      mobile: reqBody.mobile,
      created_at: reqBody.created_at
        ? new Date(reqBody.created_at)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " "),
    };

     // Create a new user document in MongoDB
     const result = await User.create(data);
     console.log(result);

    if (result && result.id > 0) {
      const updateData = {
        created_by: result.id,
      };
      await user.update(updateData, {
        where: {
          id: result.id,
        },
      });
      const saveAuthInfo = {
        user_id: result.id,
        username: result.user_name,
        password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      };
      await userAuthService.saveUserAuth(saveAuthInfo);
      res.ok({
        results: {
          message: res.__("Registration successfully"),
        },
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
