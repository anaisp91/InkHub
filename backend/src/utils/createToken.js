//@ts-check
import jwt from "jsonwebtoken";
/**
 * @param {{ _id: string; role: string }} userForToken
 * @returns {string}
 */

export const createToken = (userForToken) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido");
  }
  /**
   * @type {jwt.SignOptions}
   */
  // @ts-ignore - expiresIn acepta string o number
  const options = { expiresIn: process.env.JWT_EXPIRES_IN || "1d" };
  return jwt.sign(
    { id: userForToken._id, role: userForToken.role },
    process.env.JWT_SECRET,
    options,
  );
};
