import jwt from 'jsonwebtoken';


export const gToken = (uname) => {
  try{
    const now = Math.floor(Date.now() / 1000);

    // access token that expire in 10 minutes
    const accessToken = jwt.sign({
      uid: uname,
      date: now,
      type: "access_token",
    }, process.env.JWT_SECRET, {
      expiresIn: '10m',
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    });

    // refresh token that is issue with the time stamp of 1d
    const refreshToken = jwt.sign({
      uid: uname,
      type: "refresh_token",
    }, process.env.JWT_SECRET, {
      expiresIn: '1d',
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    });

    return {accessToken, refreshToken};

  }catch(err){
    return err;
  }
}

