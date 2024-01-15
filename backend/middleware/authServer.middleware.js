const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //Get token from header
    const authHead = req.header("Authorization");
    const token = authHead && authHead.split(" ")[1];

    //Check if token exists
    if (!token)
      return res
        .status(401)
        .json({ status: false, msg: "No token, auth denied" });

    try {
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Add user to request
      req.user = verified.id;
      
      //Continue
      next();
    } catch (err) {
      res.status(401).json({ status: false, msg: "Token is not valid" });
    }
  } catch (e) {
    res.status(500).json({ status: false, msg: "Server Error" });
  }
};

module.exports = auth;