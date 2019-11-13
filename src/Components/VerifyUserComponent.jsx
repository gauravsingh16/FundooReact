import React, { Component } from 'react'
import {IconButton, Button } from '@material-ui/core'
import { verify } from '../Controller/userservice';

export default class VerifyUserComponent extends Component {
    constructor(props) {
        super(props);
        this.setState({
        });
    }
    handleverify = () => {
        let token = this.props.match.params.token;
        verify(token).then((resp) => {
            if (resp.data.statuscode === 200) {
                this.props.history.push('/login')
            }else
            {
                this.props.history.push('/register')
            }
        })
    }
    render() {
        return (
            <div style={{display:"flex" , flexDirection:"column"}}>
                <p  style={{display:"flex" , flexDirection:"column" , alignItems:"center"} }>ThankYou!!! For Registration.<br/>
                    Please Verify Your Registration.
                </p>
                <Button onClick={this.handleverify}>Verify</Button>
            </div>
        )
    }
}
