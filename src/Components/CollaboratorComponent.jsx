
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { ClickAwayListener } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { InputBase, Card, Tooltip, TextField, Snackbar, IconButton } from '@material-ui/core';

import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import { doReminderNote, getAllCollabs, addCollaborator, deleteCollaborator } from '../Controller/NoteService';
import { getLoggedUser } from '../Controller/userservice';

export default class CollaboratorComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            notes:[],
            email:'',
            view: false,
            id: '',
            openSnackBar: '',
            Error: false,
            message: "",
            chipOpen: false,
            colbaUserArray: [],
        }
    }

    dialogOpenClose = () => {
       getAllCollabs(this.props.noteId).then((resp)=>{
           console.log(resp.data.object.email)
            this.setState({
                open: !this.state.open,
                colbaUserArray:resp.data.object
            });
        })
        
    }
    closeDialogfromAway = () => {
        this.setState({
            open: !this.state.open
        })
    }

    componentDidMount() {
        this.getUser()
    }
    getUser = () => {
        getLoggedUser().then((res) => {
            console.log(res.data.object);
            console.log(res.data.email);
            
            this.setState({
                notes:res.data.object,
                id: res.data.object.id,
               
             
            })

        })

    }
    dialogReset = () => {
        this.setState({
            view: !this.state.view,
            open: !this.state.open
        })
    }
    snackBarClose = () => {
        this.setState({
            Error: false
        })
    }
    onChangeEmailId = (event) => {
        this.setState({

            email: event.target.value
        })
    }
    showIcon = () => {
        this.setState({
            view: !this.state.view
        })
    }
    saveColab = () => {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({

                Error: true,
                message: 'Please provide a valid email address'
            })
        }
        
        console.log(this.state.notes)
        addCollaborator(this.state.email, this.props.noteId).then((res) => {
            console.log(res.data.object);
            this.setState({
                chipOpen: !this.state.open,
                
            })

        // }).catch((res) => {
        //     this.setState({
        //         Error: true,
        //         message: res.data.message,
        //         open: !this.state.open,
        //         view: !this.state.view
        //     })
        })

    }
    handlecollabdelete=(userId)=>{
        deleteCollaborator(userId,this.props.noteId).then((resp)=>{
            console.log(resp)
        })
    }
    render() {
        console.log( localStorage.getItem('email'))
        return (

            <div >
                <Snackbar anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                    open={this.state.Error}
                    autoHideDuration={6000}
                    onClose={this.snackBarClose}
                    message={this.state.message}
                    action={
                        <IconButton
                            onClick={this.snackBarClose}>
                        </IconButton>
                    } />
                <Tooltip title="Collaborator">
                    <PersonAddOutlinedIcon onClick={this.dialogOpenClose} />
                </Tooltip>


                <Dialog open={this.state.open} style={{ boxShadow: "1px 1px 1px 1px" }} >

                    <DialogTitle >
                        Collaborators
                    </DialogTitle>

                    <DialogContent dividers >
                    {localStorage.getItem('email')} (Owner)<br/>
                        
                        {this.state.chipOpen ? null :
                            this.state.colbaUserArray.map((colab) => {
                                return (<div key={colab.userId}>
                                    <InputBase value={colab.email} />
                                    <IconButton>
                                    <ClearIcon style={{float:"right"}} onClick={()=>{this.handlecollabdelete(colab.userId)}}/>
                                    </IconButton>
                                    </div>)
                            })}<br />

                        <div>
                            {!this.state.view ?
                                <InputBase
                                    placeholder="add person"
                                    onClick={this.showIcon}
                                /> :
                                <InputBase
                                    type="email"
                                    placeholder="add person"
                                    value={this.state.email}
                                    onChange={this.onChangeEmailId}
                                />}
                            {!this.state.view ? null : <DoneOutlinedIcon onClick={this.saveColab} />}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogReset} >
                            Cancel
</Button>
                        <Button onClick={this.saveColab} >
                            Save
</Button>
                    </DialogActions>

                </Dialog>

            </div >

        )
    }
}
