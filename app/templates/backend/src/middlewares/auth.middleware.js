import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    console.log(req.method)
    let bearerToken = req.header('Authorization');
    if(req.method==="GET"){
      req.body.api_key=process.env.API_SECRET_KEY
    }
    if (!bearerToken || !req.body.api_key || req.body.api_key!==process.env.API_SECRET_KEY){

      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token or api key is required/invalid'
      };
    }else{
        bearerToken = bearerToken.split(' ')[1];

        const { userData } = await jwt.verify(bearerToken, process.env.TOKEN_SECRET);
        res.locals.user = userData;
        req.user = userData
    
        // console.log(userData,"from auth")
        res.locals.token = bearerToken;
        next();
      }
    
  } catch (error) {
    next(error);
  }
};