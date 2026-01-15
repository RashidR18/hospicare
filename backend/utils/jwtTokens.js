export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      secure: true,          // REQUIRED (HTTPS only)
      sameSite: "none",      // REQUIRED (cross-site)
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      message,
      user
    });
};
