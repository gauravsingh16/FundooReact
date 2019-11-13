import React, { Component } from 'react'

import { IconButton, InputBase, AppBar, Popper, Paper, Button } from '@material-ui/core'
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
import { withRouter } from 'react-router-dom';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'

class AppbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            refresh: false,
            view: true,
            search: "",
            anchorEl: false,
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
    handleOpenPopper = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleview = () => {
        this.setState({
            view: !this.state.view
        })
        this.props.history.push('/dashboard')

    }
    searchtext = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    handlesearch = () => {
        console.log(this.state.search)
        search(this.state.search).then((resp) => {
            console.log(resp);

        })
    }
    handleView = () => {
        this.setState({
            view: !this.state.view
        })
        console.log(this.state.view)
        this.props.viewprop(this.state.view)
        
    }
    handlelogout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }
    handlerefresh =()=>{
        window.location.reload();
    }
    render() {
        return (
            <div className="app-bar">
                <AppBar >

                    <div className="app-bar">
                        <IconButton color="inherit" onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>

                        <SideNavComponent menubar={this.state.drawerOpen} />
                        <img src={require('../../src/bulb-icon.png')}
                            width="45px" height="45px" />
                        <span className="keep"> Keep </span>
                        <div className="search">
                            <IconButton onClick={this.handlesearch}>
                                <SearchIcon />

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
                        <IconButton color="inherit" className="refresh">
                            <RefreshOutlinedIcon onClick={this.handlerefresh} />

                        </IconButton>
                        <IconButton color="inherit" onClick={this.handleView}>
                            {this.state.view ? <ViewAgendaIcon /> : <ViewColumnIcon />}
                        </IconButton>
                        <IconButton color="inherit">
                            <SettingsIcon />
                        </IconButton>
                        <IconButton  color="inherit" style={{ paddingLeft: "15px" }}>
                            <AppsIcon />
                        </IconButton>
                        <IconButton color="inherit" style={{ display: "flex", float: "right" }}>
                            <AccountCircleIcon  onClick={this.handleOpenPopper} />
                        </IconButton>
                        <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                            zIndex: "9999"
                        }}>

                            <Paper style={{ display: "flex", flexDirection: "column" }}>
                                <Button>Profile</Button>
                                <Button onClick={this.handlelogout}>LogOut</Button>

                            </Paper>
                        </Popper>

                    </div>
                </AppBar>
            </div>
        )
    }
}
export default withRouter(AppbarComponent)