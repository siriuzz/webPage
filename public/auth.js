const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const cookie = req.headers["cookie"];
  if (cookie == undefined) return res.redirect("/login");
  const name = "accessToken=";
  const token = cookie.split(name)[1];

  req.token = token;

  jwt.verify(
    req.token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, authData) => {
      if (err) {
        console.log("ERROR: Could not connect to the protected route");
        return res.redirect("/login");
      } else {
        if (typeof token !== "undefined") {
          const decodedToken = jwt.decode(token);

          if (
            decodedToken.role.value == "superadministrator" ||
            decodedToken.role.value == "administrator"
          ) {
            console.log("admitted");
          } else {
            return res.status(403).send("ACCESS DENIED");
          }

          next();
          console.log("SUCCESS: Connected to protected route");
        }
      }
    }
  );
};

module.exports = {
  checkToken
};
