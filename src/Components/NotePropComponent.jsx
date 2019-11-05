import React, { Component } from 'react'
import { IconButton, Paper } from '@material-ui/core'
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PaletteIcon from '@material-ui/icons/Palette';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { trashNotes } from '../Controller/NoteService';

export default class NotePropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            desc: '',
            notes: [],
            openDialog: false,
            anchorEl: null,
            closepaper: false,
            labelmenu:false,
            archive:false
        }

    }
    closePaper = () => {
        this.setState({
            closepaper: !this.state.closepaper
        })
    }
    labelmenu = () => {
        this.setState({
            labelmenu: !this.state.labelmenu
        })
    }
    handleMoreOpen = (e) => {
        console.log(this.props.noteId)
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleDelete=()=>
    {
        console.log(this.props.noteId)
        trashNotes(this.props.noteId).then((response)=>
        {
            console.log(response)
        })
    }
    handleLabel=()=>
    {

    }

    render() {
        return (
            <div>

                <IconButton title="reminder">
                    <AddAlertIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper}/>
                </IconButton>
                <Popper  open={this.state.anchorEl} anchorEl={this.state.anchorEl}>
                <Paper>
                    <span>Reminder:</span>
                    </Paper>
                    </Popper>
                <IconButton>
                    <PersonAddIcon />
                </IconButton>
                <IconButton>
                    <PaletteIcon />
                </IconButton>
                <IconButton>
                    <ArchiveIcon onClick={this.handleArchive} />
                </IconButton>
                <IconButton title="more" >
                    <MoreVertIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper} />
                </IconButton>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}>
                    <Paper>

                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                        <MenuItem onClick={this.handleLabel}>Add Labels</MenuItem>
                    </Paper>
                </Popper>
                <IconButton>
                    <RedoIcon />
                </IconButton>
                <IconButton>
                    <UndoIcon />
                </IconButton>

            </div>
        )
    }
}
