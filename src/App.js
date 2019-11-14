
import './App.css'
import {Route, BrowserRouter as Router } from 'react-router-dom'
import LoginComponent from './Components/LoginComponent'
import ForgetPasswordComponent from './Components/ForgetPasswordComponent'
import React,{Component} from 'react'
import Register from './Pages/Register';
import ResetPasswordComponent from './Components/ResetPasswordComponent'
import Dashboard from './Pages/Dashboard'
import DeletePage from './Pages/DeletePage'
// import VerifyUserComponent './Components/VerifyUserComponent'
import ArchivePage from './Pages/ArchivePage'
import AddNoteLabelComponent from './Components/AddNoteLabelComponent'
import LabelPage from './Pages/LabelPage'
import LabelNotesComponent from  './Components/LabelNotesComponent'
import ReminderPage from './Pages/ReminderPage'
import VerifyUserComponent from './Components/VerifyUserComponent'
import SearchPage from './Pages/SearchPage'

class App extends Component{
  render(){
    return(
      
      <Router>
        
      <Route path="/" exact component={Register}></Route>
      <Route path="/register" exact component={Register}></Route>  
      <Route path="/login" exact component={LoginComponent}></Route>
      <Route path="/forgetpassword" exact component={ForgetPasswordComponent}></Route>
      <Route path="/changepassword/:id" exact component={ResetPasswordComponent}></Route>
      <Route path="/dashboard" exact component={Dashboard}></Route>
      <Route path="/trash" exact component={DeletePage}></Route>
      <Route path="/archive" exact component={ArchivePage}></Route>
      <Route path="/addnotelabel" exact component={AddNoteLabelComponent}/>
      <Route path="/label/:labelid" exact component={LabelPage}/>
      <Route path="/reminder" exact component={ReminderPage}/>
      <Route path="/verify/:token"exact component={VerifyUserComponent}/>
      <Route path="/search" exact component={SearchPage}/>
      </Router>
    
    )
     }
}

export default App;
