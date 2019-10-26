
import './App.css'
import {Route, BrowserRouter as Router } from 'react-router-dom'
import LoginComponent from './Components/LoginComponent'
import ForgetPasswordComponent from './Components/ForgetPasswordComponent'
import React,{Component} from 'react'
import Register from './Pages/Register';
import ResetPasswordComponent from './Components/ResetPasswordComponent'
import Dashboard from './Pages/Dashboard'


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
      </Router>
    
    )
     }
}

export default App;
