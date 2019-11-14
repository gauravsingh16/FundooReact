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
            mobileno: "",
            address: "",
            errors:false,
            openSnackBar : false
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
        var mobileno = event.target.value;
        this.setState({ mobileno: mobileno })
        
    }
    
        onSubmit = (event) => {
        
            let user = {
                "username": this.state.username,
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password,
                "mobileno": this.state.mobileno,
                "address": this.state.address
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
            adduser(user)
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
                    type="password"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                /><span style={{color: "red"}}>{this.state.errors["password"]}</span><br />
                <TextField required
                    label="MobileNo"
                    value={this.state.mobileno}
                   
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


