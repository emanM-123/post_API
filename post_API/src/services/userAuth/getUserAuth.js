import { User } from "../../models/userModel.js"; 


export const getUserAuth = async (searchParam) => {
  try {
    const conditions = {};

    if (searchParam.username) {
      conditions.username = searchParam.username;
    }

    const selectAttributes = ["id", "username", "password"];

    const result = await User.findOne(conditions, selectAttributes)
      .populate({
        path: "user",
        select: ["id", "name"],
        match: { status: "active" },
      })
      .lean();

    return result;
  } catch (error) {
    console.log(error);
    throw StatusError.internalServerError(error.message);
  }
};