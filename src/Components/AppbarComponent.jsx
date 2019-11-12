import React, { Component } from 'react'

import { IconButton, InputBase, AppBar ,Popper,Paper,Button} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined'
import SettingsIcon from '@material-ui/icons/Settings';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import AppsIcon from '@material-ui/icons/Apps';
import SideNavComponent from './SideNavComponent';
import AllNotesComponent from './AllNotesComponent'
import { search } from '../Controller/NoteService'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class AppbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            refresh: false,
            view: false,
            search:"",
            anchorEl:false,
            searchNotes: [],
            searchState: false,
            drawerClose: false
        }
    }
    handleDrawerOpen = () => {
        if (this.state.drawerOpen === false) {
            this.setState({
                drawerOpen: true,
            })
        }
        else {
            this.setState({
                drawerOpen: false,
            })
        }
    }
    handleOpenPopper=(e)=>{
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleview=()=>
    {   this.setState({
        view:!this.state.view
    })
        this.props.history.push('/dashboard')
        
    }
    searchtext=(event)=>{
        this.setState({
            search:event.target.value
        })
    }
    handlesearch=()=>{
        console.log(this.state.search)
        search(this.state.search).then((resp)=>{
            console.log(resp);
            
        })
    }
    render() {
        return (
            <div className="app-bar">
                <AppBar >

                    <div className="app-bar">
                        <IconButton onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                       
                        <SideNavComponent menubar={this.state.drawerOpen} />
                        <img src={require('../../src/bulb-icon.png')}
                            width="45px" height="45px" />
                        <span className="keep"> Keep </span>
                        <div className="search">
                            <IconButton onClick={this.handlesearch}>
                                <SearchIcon/>

                            </IconButton>
                            <InputBase
                                style={{ width: "100%", height: "45px" }}
                                placeholder="Search....."
                                value={this.state.search}
                                onChange={this.searchtext}
                                
                            />
                            <IconButton>
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <IconButton className="refresh">
                            <RefreshOutlinedIcon onClick={this.handleview} />
                            
                        </IconButton>
                        <IconButton>
                            <ViewStreamIcon />
                        </IconButton>
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton style={{ paddingLeft: "15px" }}>
                            <AppsIcon />
                        </IconButton>
                        <IconButton >
                            <AccountCircleIcon style={{display:"flex",float:"right"}}/>
                            </IconButton>
                            <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                    zIndex: "9999"
                }}>
            
            <Paper className="reminder-paper">
                    <InputBase value={"Profile"}/>
                    <InputBase value={"Logout"}/>
                        <div>
                            <Button onClick={this.handleReminderButton}>Set Reminder</Button>
                        </div>
                    </Paper>
                </Popper>
               
                    </div>
                </AppBar>
            </div>
        )
    }
}