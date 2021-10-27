const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const cookie = req.headers["cookie"];
  if(cookie == undefined) return res.redirect('/login')
  const name = 'accessToken='
  const token = cookie.split(name)[1];
  console.log('xd ')

  if (typeof token !== "undefined") {
    const decodedToken = jwt.decode(token);

    req.token = token;

    jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, authData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          return res.redirect('/login');
        } else {
          // res.json({
          //   message: "Successful log in",
          //   authData
          // });
          // console.log(authData);
          console.log("SUCCESS: Connected to protected route");
        }
      }
    );

      console.log(decodedToken)
    // console.log(decodedToken.role);

    if (decodedToken.role.value != "superadministrator") {
      return res.status(403).send('ACCESS DENIED');
    } else {
      next();
    };
  }
};

module.exports = {
  checkToken
};
