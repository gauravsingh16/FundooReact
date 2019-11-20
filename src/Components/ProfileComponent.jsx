import React, { Component } from 'react'
import {InputBase} from '@material-ui/core'
import Button from '@material-ui/core/Button'

import adduser, { updateUser } from '../Controller/userservice.js';
import {Snackbar,IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserProfile } from '../Controller/userservice';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:[],
            username: "",
            name: "",
            email: "",
            password: "",
            mobileno: "",
            address: "",
            errors:false,
            openSnackBar : false,
            pictures: [] ,
            onDrop : this.onDrop.bind(this),
            openForm:false
       }
    }
    componentDidMount(){
        this.getUser();
    }
    getUser=()=>{
        UserProfile().then((resp)=>{
            console.log(resp);
            this.setState({
                user:resp.data.object
            })
            console.log(this.state.user)
        })
    }
       onDrop=(picture)=> {
           this.setState({
               pictures: this.state.pictures.concat(picture),
           });
       }
    // onUsername = (oldusername) => {
    //     console.log(oldusername)
    //     this.setState({ username: oldusername })
    // }
    onName = (event) => {
        var name = event.target.value;
        this.setState({ name: name })
    }
    onEmail = (event) => {
        var email = event.target.value;
        this.setState({ email: email })
    }
    // onPassword = (event) => {
    //     var password = event.target.value;
    //     this.setState({ password: password })
    // }
    onAddress = (event) => {
        var address = event.target.value;
        this.setState({ address: address })
    }
    onMobile = (event) => {
        var mobileno = event.target.value;
        this.setState({ mobileno: mobileno })
        
    }
    handleAll = (event) => {
    this.setState({ [event.target.name]: event.target.value

    })
}
    
        onSubmit = (event) => {
        
            let user = {
                "username": this.state.username,
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password,
                "mobileno": this.state.mobileno,
                "address": this.state.address,
                "image":this.state.pictures
            };

        //Name
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const pattern1=/^[6789]\d{9}$/;
        const result = pattern.test(this.state.email);
        const result1=pattern1.test(this.state.mobile);
        if (this.state.email === '') {
            this.setState({
                openSnackBar: true,
                snackBarMsg: "email cannot be empty"
            })
        } else if (result !== true) {
                this.setState({
                    openSnackBar: true,
                    snackBarMsg: "email should be in format"
                })
            } else if (this.state.password === '') {
                this.setState({
                    openSnackBar: true,
                    snackBarMsg: "Password cannot be empty"
                })
            } else if(this.state.mobileno.length !== 10){
                console.log(this.state.mobileno)
                this.setState({
                    openSnackBar:true,
                    snackBarMsg:"Mobile number not correct"
                })
               
            }        
          else {
              console.log(this.state.mobileno)
            updateUser(user)
                .then(res => {
                    console.log(res);
                    this.setState({
                        openSnackBar: true,
                        SnackBarMessage: 'Check Mail for Login'
                    })
                    this.props.history.push('/login')

                }).catch((err) => {
                    console.log('err', err);
                })
        }

    }
    handlecancel=()=>{
        this.props.history.push('/dashboard')
    }
    changeUserName=(e)=>{
        this.setState({
            username : e.target.value
        })
    }

    edit=(key)=>{
        console.log("hello",key.username)
        this.setState({
            username : key.username
        })
    }
    changeData=(key)=>{
this.setState({
    username: key.username,
    name: key.name,
    email: key.email,
   
    mobileno: key.mobileno,
    address: key.address,
    openForm : true
})
    }
    render() {
        let getUserValues=this.state.user.map((keys)=>{
       
        return (
           <div key={keys.id}>            
                <br/>
           <div className="register-card" onClick={()=>this.changeData(keys)}>
                    <span><b>Profile Details</b></span><br/>
                    <br/>
                Username
                <br/>
                {/* {keys.username} */}
                {!this.state.openForm ?<div>  {keys.username} <br />
                    {keys.name} <br />
                    {keys.email} <br/>
                    {keys.mobileno} <br />
                    {keys.address} <br />

                </div> :<div> <InputBase required
              
                onChange={this.changeUserName}
                    value={this.state.username}
                  
                    className="input"
                    name="username"
                />
                 <InputBase required
                    value={this.state.name}
                    onChange={this.onName}
                    className="input"
                    name="name"
                />
                <InputBase required
                    onChange={this.onEmail}
                    value={this.state.email}
                    className="input"
                    name="email"
                />
                <InputBase required
                    value={this.state.address}
                    onChange={this.onAddress}
                    className="input"
                    name="address"
                />
                 <InputBase required
                    value={this.state.mobileno}
                    onChange={this.onMobile}
                    className="input"
                    name="mobileno"
                />
                
                </div> }
               
                
               

               
               

                
                

                {/* <TextField required
                    label="Password"
                    value={}
                    onChange={this.onPassword}
                    className="input"
                    type="password"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                /><span style={{color: "red"}}>{this.state.errors["password"]}</span><br /> */}
               
                <span style={{color: "red"}}>{this.state.errors["mobile"]}</span><br/>
               
                
                <br />
                  
                <Button variant="outlined" color="primary" className="register-button" onClick={this.onSubmit}>
                    Save 
                   </Button>
                <Button variant="outlined" color="primary" onClick={this.handlecancel}>Cancel</Button>
            </div>
            {/* <ImageUpload/> */}

            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={<span id="message-id">{this.state.SnackBarMessage}</span>}
            action={[
                <IconButton
                    onClick={this.handleClose}>
                </IconButton>
            ]}
        />
        </div>
        );
    })

    return(
        <div>
            {getUserValues}
            </div>
    )
    }
    
    
   
}
