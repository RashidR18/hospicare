export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      secure: true,          // REQUIRED on Vercel
      sameSite: "none",      // REQUIRED for cross-site cookies
      maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      message,
      user
    });
};
