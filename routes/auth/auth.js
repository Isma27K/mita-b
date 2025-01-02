import login from "../../function/auth/login.js";
import refreshToken from "../../function/auth/refreshToken.js";
import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { uname, password } = req.body;

  const result = await login(uname, password);

  if (result.accessToken && result.refreshToken) {
    res.status(200).json({
      status: 'success',
      ...result,
    });
  }
  else {
    res.status(401).json({
      status: 'error',
      message: result,
    })
  }

});


router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  const result = await refreshToken(refresh_token);

  if (result.isValid){
    res.status(200).json({
      ...result.newToken,
    })
  }else{
    res.status(401).json({
      error: result.error,
    })
  }
})


export default router;