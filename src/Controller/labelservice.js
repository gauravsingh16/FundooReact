import Axios from "axios";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 
const headers={'Content-Type':'application/json',
                'token':localStorage.getItem('object')};
export default function getAllLabels() {
    
        return Axios.get(user_api_base_url+'label/getlabel',{headers:headers});
    
}
export  function getdeletednotes(){
    return Axios.get(user_api_base_url+'note/gettrashnotes',{headers:headers});
}
export function createlabel(labeldata){
    console.log(labeldata)
    return Axios.post(user_api_base_url+'label/labelcreate',labeldata,{headers:headers});
}
export function updateLabel(labeldata){
    console.log(labeldata);
    return Axios.put(user_api_base_url+'label/updatelabel?id='+labeldata.labelId,labeldata,{headers:headers});
}
export function labelnote(labelId,noteid){
    console.log(labelId);
    console.log(noteid)
    return Axios.post(user_api_base_url+'label/addnotelabel?labelid='+labelId+'&noteid='+noteid,null,{headers:headers});
}
export function removelabelnote(labelId,noteid){
    console.log(labelId);
    console.log(noteid)
    return Axios.post(user_api_base_url+'label/removenotelabel?labelid='+labelId+'&noteid='+noteid,null,{headers:headers});
}
