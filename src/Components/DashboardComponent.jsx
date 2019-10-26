import React, { Component } from 'react'
import { Button, AppBar } from '@material-ui/core'
import { FaBars } from 'react-icons/fa'
import {Logo} from './' 
export default class DashboradComponent extends Component {
    render() {
        return (
            <div>
                <AppBar className="appbar">
                    <br/>
                    <Button>
                        <FaBars />

                    </Button>
                
                </AppBar>
            </div>
        )
    }
}