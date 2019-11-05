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