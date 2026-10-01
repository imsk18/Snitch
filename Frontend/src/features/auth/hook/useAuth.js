import {setError,setLoading,setUser} from "../state/auth.slice"
import { register,login } from "../service/auth.api"
import { useDispatch } from "react-redux"


export const useAuth = ()=>{
    const dispatch = useDispatch()

    async function handleRegister({email,contact,fullname,password,isSeller=false}){
        try{
            dispatch(setLoading(true));
            dispatch(setError(null));

            const data = await register({email,contact,fullname,password,isSeller});
            dispatch(setUser(data.user));
            return true;
        }catch(error){
            dispatch(setError(error.response?.data?.message || "registration failed"));
            return false;

            
            
        }finally{
            dispatch(setLoading(false));
        }
        

        
    }



async function handleLogin({ email, password }) {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const data = await login({ email, password });

    dispatch(setUser(data.user));

    return true;
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || "Login failed"
      )
    );

    return false;
  } finally {
    dispatch(setLoading(false));
  }
}

    return{handleRegister,handleLogin}

}