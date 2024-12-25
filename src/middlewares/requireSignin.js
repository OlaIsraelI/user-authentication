const {verefyToken} = require("../helpers/jwtHelpers");
const {JWT_SECRET} = require("../config/index");
const requireSignin = (req, res, next) => {
  try{
    const{accessToken} = req.cookies;

    if(!accessToken){
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const payload = verefyToken(accessToken, JWT_SECRET);

    if(!payload){
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    req.user = payload;
    next();
  }catch(error){
    return res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = requireSignin;