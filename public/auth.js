const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const cookie = req.headers["cookie"];
  console.log(req.url)

  if (cookie == undefined) return res.redirect("/login");
  const name = "accessToken=";
  const token = cookie.split(name)[1];
  const decodedToken = jwt.decode(token);
  req.token = token;

  if (req.url == '/users') {
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, authData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          return res.redirect("/");
        } else {
          if (typeof token !== "undefined") {

            if (decodedToken.role.value == "superadministrator") {
              console.log(authData);

              console.log("SUCCESS: Connected to protected route");
              return next();
            } else {
              return res.status(403).send("ACCESS DENIED");
            }
          }
        }
      }
    );
  } else{
    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, authData) => {
        if (err) {
          console.log("Token Expired");
          return res.redirect("/login");
        } else {
          console.log('xd')
          next();
        }
      }
    );
  }
};

module.exports = {
  checkToken
};
