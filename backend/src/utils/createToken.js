import jwt from "jsonwebtoken";

/**
 * @param {string} userId
 * @returns {string}
 */
export const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "", {
    expiresIn: /** @type {any} */ (process.env.JWT_EXPIRES_IN || "1d"),
  });
};
