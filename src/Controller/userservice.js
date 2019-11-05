import Axios from "axios";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 

export default function adduser(user) {
    
        return Axios.post(user_api_base_url+'user/add',user);
    
}
export  function loginuser(user){
        return Axios.post(user_api_base_url+'user/login',user);
}
export function forgetPass(user){
        return Axios.post(user_api_base_url+'user/forgetpassword',user);
}
export function resetPass(password,id){
        console.log(id)
        return Axios.put(user_api_base_url+'user/changepassword/'+id,password);
}


