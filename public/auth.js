const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const headers = req.headers["authorization"];
  //   console.log(req.headers)

  if (typeof headers !== "undefined") {
    const bearer = headers.split(" ");
    const token = bearer[1];

    req.token = token;

    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, authData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          // res.json({
          //   message: "Successful log in",
          //   authData
          // });
          // console.log(authData);
          console.log("SUCCESS: Connected to protected route");

          next();
        }
      }
    );
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

const authRole = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers.split(" ")[1];
  const decodedToken = jwt.decode(token);

  console.log(decodedToken.role);

  if (decodedToken.role != "SUPER_ADMIN") {
    return res.status(401).json("missing permissions");
  } else {
    next();
  }
};

module.exports = {
  checkToken,
  authRole
};
