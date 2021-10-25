const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const array = [];
  array.push(req.headers)

  console.log(array);

  if(req.headers['authorization']){

    const headers = req.headers["authorization"];
  
    if (headers !== "undefined") {
      const bearer = headers.split(" ");
      const token = bearer[1];
  
      req.token = token;
  
      jwt.verify(
        req.token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, authData) => {
          if (err) {
            console.log("ERROR: Could not connect to the protected route");
            // return res.sendStatus(403);
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
  
      const decodedToken = jwt.decode(token);
      // console.log(decodedToken.role);
  
      if (decodedToken.role != "SUPER_ADMIN") {
        return res.sendStatus(403)
      } else {
        next();
      }
    } 
  }
  next();

};


module.exports = {
  checkToken,
};
