import Axios from "axios";


const user_api_base_url=process.env.REACT_APP_BASE_URL; 
const headers={'Content-Type':'application/json',
                'token':localStorage.getItem('object')};
export default function createNote(data) {
        console.log(data)
        return Axios.post(user_api_base_url+'note/createnote',data,{headers:headers});
    
}
export  function getAllNotes() {
        
        return Axios.get(user_api_base_url+'note/getnotes',{headers:headers});
    
} 
export  function updateNotes(data,id) {
        console.log(data,id)
        return Axios.put(user_api_base_url+'note/updatenote?id='+id,data,{headers:headers});
    
} 
export  function trashNotes(id) {
        console.log(id)
        return Axios.put(user_api_base_url+'note/trashnotes?id='+id,null,{headers:headers});
    
} 
export  function addNoteLabel(id) {
        console.log(id)
        return Axios.post(user_api_base_url+'note/deletenote?id='+id,{headers:headers});
    
} 
export  function getTrashNote() {
        
        return Axios.get(user_api_base_url+'note/gettrashnotes',{headers:headers});
    
} 
export  function deleteNote(id) {
        console.log(id);
        return Axios.delete(user_api_base_url+'note/deletenote?id='+id,{headers:headers});
    
} 
export  function archiveNote(id) {
        console.log(id);
        return Axios.put(user_api_base_url+'note/archivednotes?id='+id,null,{headers:headers});
    
} export  function getArchiveNote() {
        return Axios.get(user_api_base_url+'note/getarchivednotes',{headers:headers});
    
} 
export  function doReminderNote(id,data) {
        var date1=new Date(data.reminder);
        let data2=date1.toISOString();
console.log(data        )
        return Axios.post(user_api_base_url+'note/doreminder?id='+id,data,{headers:headers});
    
} 
export function removeReminder(id){
        console.log(id)
        return Axios.delete(user_api_base_url+'note/removereminder?id='+id,{headers:headers});
    }
    export function getReminderNotes(){
        return Axios.get(user_api_base_url+'note/getremindernotes',{headers:headers});
    }
    export function changeColor(data,id){
            console.log(id);
            console.log(data)
        return Axios.put(user_api_base_url+'note/changecolor?id='+id,data,{headers:headers});
    }
    export function doPin(id){
        console.log(id);
        
    return Axios.post(user_api_base_url+'note/pinnotes?id='+id,null,{headers:headers});
}
export function getPinNotes(){
       
        
    return Axios.get(user_api_base_url+'note/getpinnotes',{headers:headers});
}
export function getAllCollabs(noteid){
       
        
    return Axios.get(user_api_base_url+'note/getcollaborator?id='+noteid,{headers:headers});
}
export function addCollaborator(email,noteid){
              console.log(email)
              console.log(noteid);
              
    return Axios.post(user_api_base_url+'note/docollaborator?id='+noteid+'&email='+email,null,{headers:headers});
}
export function search(data){
    console.log(data)
    
return Axios.get(user_api_base_url+'note/search?title='+data,null,{headers:headers});
}
export function deleteCollaborator(userid,noteid){
    console.log(userid)
    console.log(noteid);
    
return Axios.delete(user_api_base_url+'note/deletecollaborator?noteid='+noteid+'&userid='+userid,{headers:headers});
}

