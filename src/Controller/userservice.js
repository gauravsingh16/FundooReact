import Axios from "axios";
import { func } from "prop-types";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 
const headers={'Content-Type':'application/json',
                'token':localStorage.getItem('object')};
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
export function getLoggedUser(password,id){
        console.log(id)
        return Axios.get(user_api_base_url+'user/searchuser',{headers:headers});
}
export function verify(token){
        console.log(token)
        return Axios.get(user_api_base_url+'user/verify?token='+token,{headers:headers});
}
export function UserProfile(){
        let email=localStorage.getItem('email')
        return Axios.get(user_api_base_url+'user/getUser?email='+email,null);
}
export function updateUser(user){
        return Axios.put(user_api_base_url+'user/updateUser',user,{headers:headers});
}




