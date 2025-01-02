import jwt from 'jsonwebtoken';
import { gToken } from '../../utils/ganerateToken.js';

const refreshToken = (rToken) => {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(rToken, process.env.JWT_SECRET, {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      algorithms: ['HS256']
    });

    if(decoded.type === "access_token"){
      return {
        isValid: false,
        error: "Only Accept Refresh Token, Not Access Token"
      }
    }

    // If verification succeeds, generate a new token
    return {
      isValid: true,
      //decoded,
      // Uncomment the next line if you want to generate a new token
      newToken: gToken(decoded.uid)
    };

    //return gToken(decoded.uid);

    //return decoded;

  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return {
        isValid: false,
        error: 'Invalid token'
      };
    }
    if (error instanceof jwt.TokenExpiredError) {
      return {
        isValid: false,
        error: 'Token expired'
      };
    }
    if (error instanceof jwt.NotBeforeError) {
      return {
        isValid: false,
        error: 'Token not active'
      };
    }

    // Handle any other unexpected errors
    return {
      isValid: false,
      error: 'Token validation failed'
    };
  }
};

export default refreshToken;