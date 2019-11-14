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
import { trashNotes, archiveNote } from '../Controller/NoteService';
import { withRouter } from 'react-router-dom';
import AddNoteLabelComponent from './AddNoteLabelComponent';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import EditReminderComponent from './EditReminderComponent';
import ColorChangeComponent from './ColorChangeComponent';
import CollaboratorComponent from './CollaboratorComponent';

 class NotePropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            desc: '',
            notes: [],
            openDialog: false,
            anchorEl: false,
            closepaper: false,
            labelmenu:false,
            archive:false,
            noteId:this.props.noteId,
            default:true
        }

    }
    componentDidMount(){
        
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
        // console.log(this.props.noteId)
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
            this.props.AllNotesComponent(true);
            
        })
    }
    handleLabel=()=>
    {
        this.props.history.push('/addnotelabel')
    }
    handleArchive=()=>
    {
        archiveNote(this.props.noteId).then((response)=>
        {
            console.log(response)
            this.props.AllNotesComponent(true);
            
        }
        )
    }
    propfrom=(data)=>{
        console.log(data);
        this.setState({
            default:data,
            // anchorEl:!this.state.anchorEl
        });
        this.props.AllNotesComponent(this.state.default);
    }

    render() {
        return (
            <div>

                <IconButton >
                    <EditReminderComponent noteId={this.props.noteId} NotePropComponent={this.propfrom}/>
                </IconButton>
                
                <Popper  >
                <Paper>
                    
                    </Paper>
                    </Popper>
                <IconButton>
                    
                    <CollaboratorComponent noteId={this.props.noteId } NotePropComponent={this.propfrom}/>
                </IconButton>
              
                   <IconButton>
                   <ColorChangeComponent noteId={this.props.noteId} NotePropComponent={this.propfrom}/>
                </IconButton>
                <IconButton>
                    <ArchiveIcon onClick={this.handleArchive}  NotePropComponent={this.propfrom} />
                </IconButton>
                <IconButton title="more" >
                    <MoreVertIcon onClick={(e) => this.handleMoreOpen(e)} />
                </IconButton>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                style={{
                    zIndex: "9999"
                }}
                >
                    <Paper>

                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                        <AddNoteLabelComponent noteId={this.props.noteId }  NotePropComponent={this.propfrom} />
                    </Paper>
                </Popper>
                

            </div>
        )
    }
}
export default  withRouter(NotePropComponent)
