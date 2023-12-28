import { StatusError } from "../../config/index.js";
import { User } from "../../models/userModel.js";

export const getByEmail = async (email, status = null) => {
  try {
    const conditions = { email: email };
    if (status) {
      conditions.status = status;
    } else {
      conditions.status = { $ne: "deleted" };
    }

    const result = await User.findOne(conditions).lean();

    return result;
  } catch (error) {
    console.log(error);
    throw StatusError.internalServerError(error.message);
  }
};
