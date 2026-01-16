// utils/jwtTokens.js
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // your existing method

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token, // send token in body, not cookie
  });
};
