const { expressjwt: jwt } = require("express-jwt"); // Note the destructuring

function authJwt() {
  const secret = process.env.SECRET;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: async(req,token)=>!token?.payload?.isAdmin //If isAdmin is false or undefined, !token?.payload?.isAdmin becomes true, and the token is revoked.
  }).unless({
    path: [
      // Public routes that don't require authentication
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      "/api/v1/users/login",
      "/api/v1/users/register",
    ],
  });
}


module.exports = authJwt;
