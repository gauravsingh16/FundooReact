import Axios from "axios";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 
const headers={'Content-Type':'application/json',
                'token':localStorage.getItem('object')};
export default function getAllLabels(user) {
    
        return Axios.get(user_api_base_url+'label/getlabel',{headers:headers});
    
}
export  function getdeletednotes(){
    return Axios.get(user_api_base_url+'note/gettrashnotes',{headers:headers});
}
export function createlabel(labeldata){
    console.log(labeldata.labelName);
    return Axios.post(user_api_base_url+'label/labelcreate',labeldata,{headers:headers});
}