import React, { Component } from 'react'
import {  TextField, Button,Snackbar,IconButton } from '@material-ui/core'
import { forgetPass } from '../Controller/userservice';

export default class ForgetPasswordComponent extends Component {
    constructor()
    {
        super();
        this.state={
            email:"",
            snackbarOpen:false
        }
        this.onSubmit=this.onSubmit.bind(this);
    };
    onEmail=(event)=>
    {
        var email=event.target.value;
        this.setState({
            email:email
        });
    }
    onSubmit=(event)=>
    {
        var user={
            "email":this.state.email
        };
        if(this.state.email === "")
        {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: "email cannot be empty"
            })
        }else
        forgetPass(user)
        .then(res=>{
            console.log(res);
        })
    }


    render() {
        return (
            <div>
                <header className="header">
                    <h2>Fundoo Notes</h2>
                   </header><br/>

                    <div className="forget-card">
                    <span><b>FORGET PASSWORD</b></span><br/>
                    <TextField 
                    id="outlined-adornment-password"
                    className="input"
                    variant="outlined"
                    type="text"
                    label="Email"
                    value={this.state.email}
                    onChange={this.onEmail} 
                    /><br/>
                <Button variant="outlined" color="primary" className="submit-button" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    </div>
                    <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.state.openSnackBar}
            autoHideDuration={200}
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
