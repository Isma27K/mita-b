import isEmpty  from "../../utils/typing.js";
import { gToken } from '../../utils/ganerateToken.js';


const login = (uname, password) => {
  try{
    if (!isEmpty(uname) || !isEmpty(password)) {
      if (uname === "isma" && password === "smktarat"){
        const { accessToken, refreshToken } = gToken(uname);

        return { accessToken, refreshToken };
      }else{
        return "wrong password";
      }
    }else{
      return "password empty";
    }
  }
  catch(err){
    return { err }
  }
}

export default login;