import Axios from "axios";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 

export default function adduser(user) {
    
        return Axios.post(user_api_base_url+'/add',user);
    
}
export  function loginuser(user){
        return Axios.post(user_api_base_url+'/login',user);
}
export function forgetPass(user){
        return Axios.post(user_api_base_url+'/forgetpassword',user);
}
export function resetPass(password,id){
        console.log(id)
        return Axios.put(user_api_base_url+'/changepassword/'+id,password);
}


