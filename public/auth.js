const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const cookie = req.headers["cookie"];
  const regex = /(^|(?<=; ))*token=+;? */g
  console.log(cookie.match(regex))
  if(cookie == undefined) return res.redirect('/login')
  const name = 'accessToken='
  const token = cookie.split(name)[1];

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

    if (decodedToken.role.value == "superadministrator" || decodedToken.role.value == 'administrator') {
      return next();
    } else {
      return res.status(403).send('ACCESS DENIED');
    };
  }
};

module.exports = {
  checkToken
};
