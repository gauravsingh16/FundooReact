import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { resetPass } from '../Controller/userservice';

export default class ResetPasswordComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            password:"",
            id:""

        }
      
    };
    onPassword=(event)=>{
        var password= event.target.value;
        this.setState({
            password:password
        });
        
    }
 async   componentDidMount(){
        var id = this.props.match.params.id
        this.setState({
            id:id
        })
        console.log(id);
    }

    onSubmit=()=>{
        var details={
            "password":this.state.password
        }
        console.log(details)
        var id=this.state.id;
        console.log(id)
        resetPass(details,id)
        .then(resp=>{
            console.log(resp);
            this.props.history.push('/login')
        });
    }
    render() {
        return (
            <div>
                <header className="header">
                    <h2>Fundoo Notes</h2>
                    </header><br/>
                <div className="forget-card">
                    
                        <span><b>CHANGE PASSWORD</b></span><br/>
                        <span>New Password</span><br/>
                        <TextField required
                        label="Password"
                        variant="outlined"
                        type="Password"
                        value={this.state.password}
                        onChange={this.onPassword}
                        className="input"
                    /><br />
                      <Button variant="outlined" color="primary" className="change-button" onClick={this.onSubmit}>
                        Change
                   </Button><br/>
                        
                    </div>
            </div>
        )
    }
}
