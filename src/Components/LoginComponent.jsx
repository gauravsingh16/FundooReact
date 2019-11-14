import React, { Component } from 'react'
import {Snackbar,IconButton } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { loginuser } from '../Controller/userservice';
import { Link } from 'react-router-dom';



export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snackbarOpen:false
        }
        this.onSubmit = this.onSubmit.bind(this);
    };
    onEmail = (event) => {
        var email = event.target.value;
        this.setState({ email: email })
    }
    onPassword = (event) => {
        var password = event.target.value;
        this.setState({ password: password })
    }
    onSubmit = (event) => {

        let user = {
            "email": this.state.email,
            "password": this.state.password
        };
        if(this.state.email === ''){
        this.setState({
            openSnackBar: true,
            SnackBarMessage: "Field Cannot be Empty"
        })
        }else   
        loginuser(user)
            .then(res => {
                // var token=JSON.stringify(res.data.object);
                console.log(res);
                
                if(res.data.statuscode === 200){
                    this.setState({
                        openSnackBar: true,
                        SnackBarMessage: 'Login Successful'
                    })
                    localStorage.setItem('object', res.data.object.token);
                    localStorage.setItem('email',res.data.object.email);
                    this.props.history.push('/dashboard')
            }else{
               
                this.props.history.push('/login')
                }
            }).catch((err) => {
                console.log('err', err);
            });

    }
    render() {
        return (
            <div>
            <div >
                <header className="header">
                    <h2>Fundoo Notes</h2>

                </header> <br />
                <div className="login-card">
                    <span><b>LOGIN</b></span><br />
                    <TextField required
                        label="Email"
                        variant="outlined"
                        value={this.state.email}
                        onChange={this.onEmail}
                        className="input"
                    /><br />
                    <TextField required
                        id="outlined-adornment-password"
                        className="input"
                        variant="outlined"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.onPassword}
                    /><br />
                    <Button variant="outlined" color="primary" className="login-button" onClick={this.onSubmit}>
                        Login
                   </Button><br/>
                   <Link to="/forgetpassword">Forget Password?</Link>
                </div>
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
        )
    }
}
