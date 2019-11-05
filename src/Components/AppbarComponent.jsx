import React, { Component } from 'react'

import { IconButton, InputBase, AppBar } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined'
import SettingsIcon from '@material-ui/icons/Settings';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import AppsIcon from '@material-ui/icons/Apps';
import SideNavComponent from './SideNavComponent';
import NotesComponent from './NotesComponent';

export default class AppbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            refresh: false,
            view: false,
            search: "",
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
    render() {
        return (
            <div className="app-bar">
                <AppBar >

                    <div className="app-bar">
                        <IconButton onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <AppbarComponent history={this.props.history}/>

                        <SideNavComponent menubar={this.state.drawerOpen} />
                        <img src={require('../../src/bulb-icon.png')}
                            width="45px" height="45px" />
                        <span className="keep"> Keep </span>
                        <div className="search">
                            <IconButton>
                                <SearchIcon />

                            </IconButton>
                            <InputBase
                                style={{ width: "100%", height: "45px" }}
                                placeholder="Search....."
                                value={this.state.search}
                            />
                            <IconButton>
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <IconButton className="refresh">
                            <RefreshOutlinedIcon />
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
                    </div>
                </AppBar>
            </div>
        )
    }
}