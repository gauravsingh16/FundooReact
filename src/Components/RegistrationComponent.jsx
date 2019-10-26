import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import adduser from '../Controller/userservice.js';
import {Snackbar,IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom';

class RegistrationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            password: "",
            mobile: "",
            address: "",
            errors:{},
            snackbarOpen: false
        }
    };
    onUsername = (event) => {
        var username = event.target.value;

        this.setState({ username: username })
    }
    onName = (event) => {
        var name = event.target.value;
        this.setState({ name: name })
    }
    onEmail = (event) => {
        var email = event.target.value;
        this.setState({ email: email })
    }
    onPassword = (event) => {
        var password = event.target.value;
        this.setState({ password: password })
    }
    onAddress = (event) => {
        var address = event.target.value;
        this.setState({ address: address })
    }
    onMobile = (event) => {
        var mobile = event.target.value;
        this.setState({ mobile: mobile })
        
    }
    handleValidation(){
        let number = this.state.mobile;
        let passwords=this.state.password;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!number["mobile"]){
           formIsValid = false;
           errors["mobile"] = "Cannot be empty";
        }

        if(typeof number["mobile"] !== "undefined"){
           if(!number["mobile"].match(/(7|8|9)\d{9}/)){
              formIsValid = false;
              errors["mobile"] = "Only numbers";
           }        
        }

        //Email
        if(!passwords["password"]){
           formIsValid = false;
           errors["password"] = "Cannot be empty";
        }

        if(typeof passwords["password"] !== "undefined"){
           
           if (!passwords["password"].match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)){
              formIsValid = false;
              errors["password"] = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
   }
    onSubmit = (event) => {
        event.preventDefault();

        let user = {
            "username": this.state.username,
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "mobile": this.state.mobile,
            "address": this.state.address
        };
        
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: "Field Cannot be Empty"
            })
        } else {

            adduser(user)
                .then(res => {
                    console.log(res);
                    this.setState({
                        openSnackBar: true,
                        SnackBarMessage: 'Register Successful'
                    })
                    this.props.history.push('/login')

                }).catch((err) => {
                    console.log('err', err);
                })
        }

    }


    render() {
        return (
           <div>

                <header className="header">
                    <h2>Fundoo Notes </h2>
                    </header><br/>
                
           <div className="register-card">
                    <span><b>REGISTRATION</b></span><br />

                <TextField required
                    label="Username"
                    value={this.state.username}
                    onChange={this.onUsername}
                    className="input"
                /><br />
                <TextField required
                    label="Name"
                    value={this.state.name}
                    onChange={this.onName}
                    className="input"
                /><br />

                <TextField required
                    label="Email"
                    onChange={this.onEmail}
                    value={this.state.email}
                    className="input"
                /><br />

                <TextField required
                    label="Password"
                    value={this.state.password}
                    onChange={this.onPassword}
                    className="input"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                /><span style={{color: "red"}}>{this.state.errors["password"]}</span><br />
                <TextField required
                    label="MobileNo"
                    value={this.state.mobile}
                    pattern="(7|8|9)\d{9}"
                    onChange={this.onMobile}
                    className="input"
                /><span style={{color: "red"}}>{this.state.errors["mobile"]}</span><br/>

                <TextField required
                    label="Address"
                    value={this.state.address}
                    onChange={this.onAddress}
                    className="input"
                /><br />
                <Button variant="outlined" color="primary" className="register-button" onClick={this.onSubmit}>
                    Register
                   </Button><br/>
                <Link to="/login">Already Registered?</Link>
            </div>
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
    }
}
export default RegistrationComponent;


