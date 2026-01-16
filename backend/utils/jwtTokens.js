export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      secure: true,                 // HTTPS (Vercel)
      sameSite: "None",             // cross-site cookies
      
      path: "/",                    // 🔥 MUST MATCH LOGOUT
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .json({
      success: true,
      message,
      user,
    });
};
