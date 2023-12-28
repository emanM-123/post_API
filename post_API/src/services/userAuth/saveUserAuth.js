import { User } from "../../models/userModel.js"; 

export const saveUserAuth = async (saveData) => {
  const result = await User.create(saveData);
  return result;
};
