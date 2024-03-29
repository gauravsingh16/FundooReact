import React, { Component } from 'react'
import { Card, CardContent, TextField, CardActions, Button, Dialog,Chip, Checkbox } from '@material-ui/core'
import { getAllNotes, updateNotes, removeReminder, doPin, deleteCollaborator } from '../Controller/NoteService';
import NotePropComponent from './NotePropComponent';
import { removelabelnote } from '../Controller/labelservice';
import AccessTimeIcon from '@material-ui/icons/AccessTime'
export default class AllNotesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            desc: '',
            notes: [],
            openDialog: false,
            proper:false
        }

    };
    componentDidMount() {
        this.getNotes();
       this.handlenoteprops();
        
    }
    componentWillReceiveProps(){
        // if(this.props.receiveResponse)
        // {   console.log(this.props.receiveResponse)
        //     this.getNotes();
        // }
         if(this.props.sendToAllNotes)
        {
            console.log(this.props.sendToAllNotes)
            this.getNotes();
        }
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data.object,
            })
            console.log('data', this.state.notes)
        }
        );
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleDescription = (event) => {
        this.setState({
            desc: event.target.value
        })
    }
    handleClickTakeNote = (note) => {
        console.log(note)
        this.setState({
            id: note.id,
            title: note.title,
            desc: note.desc,
            openDialog: !this.state.openDialog,
        })
    }
    closeDialog = () => {
        if (this.state.title === "" && this.state.desc === "")
            return this.setState({ openDialog: !this.state.openDialog })
        else {
            var editedNote = {
                "title": this.state.title,
                "desc": this.state.desc,

            }
            console.log('noted', editedNote)

            this.setState({

                openDialog: !this.state.openDialog,
            })
            updateNotes(editedNote, this.state.id).then((res) => {
                console.log(res.data);
                
            })
        }
    }
    handleLabelDelete=(labels,noteId)=>{
        removelabelnote(labels.labelId,noteId).then((response)=>{
            console.log(response)
            this.getNotes();
        })
        
    }
    handleReminderDelete=(noteId)=>{
        removeReminder(noteId).then((response)=>{
            console.log(response);
            this.getNotes();
        })
    }
    handlecheckbox=(noteId)=>{
        doPin(noteId).then((response)=>{
            console.log(response)
            this.getNotes();
            this.props.sendDashboard(true);
        })
    }
    handleCollabaratedDelete=(noteId,userId)=>{
        deleteCollaborator(userId,noteId).then((resp)=>{
            console.log(resp) 
            this.getNotes();

        })
    }
    handleprops=(data)=>{
        console.log(data)
        console.log(this.props.NotePropComponent)
        if(data){
            this.getNotes();
        }
        this.setState({
            proper:data
        })
    }
    handlearchiveprops=(data)=>{
        console.log(data)
        if(data){
            this.getNotes();
        }
        this.setState({
            proper:data
        })
    }
    handlenoteprops=()=>{
        if(this.props.AllComponent)
        {
            console.log(this.props.AllComponent)
            this.getNotes();
        }else if(this.props.receiveResponse){
            this.getNotes()
        }
        this.getNotes();
    }
    archieveNote=(value)=>{
        if(value===true)
        this.getNotes();
    }
    
    render() {
     
       let getAllNotes = this.state.notes.map((keys) => {
            const cardView = this.props.viewprop ? "list-view" : "display-card"
            return (
                < div key={keys.id}   >
                    
                    < Card key={keys.id} className={cardView} style={{backgroundColor:keys.color}} >
                    <Checkbox style={{display:"flex",float:"right"}} onClick={() => { this.handlecheckbox(keys.noteId) }} />
                        <div onClick={() => { this.handleClickTakeNote(keys) }}  >
                            <CardContent >
                                {keys.title}
                               
                            </CardContent>
                            <CardContent>
                                {keys.desc}
                            </CardContent>
                            </div>
                            <div  className="labelsinnotes" >
                            {keys.label.map((labels) => {
                                return (
                                    <div key={labels.labelId}> {labels === '' ? null :
                                        <Chip className="labelsinnote" label={labels.name} variant="outlined"
                                            onDelete={()=>{this.handleLabelDelete(labels,keys.noteId)}}
                                        />
                                    }
                                    </div>
                                )

                            })}
                       
                       <div className="labelsinnotes" >                     
                                    <div key={keys.reminder}>  {keys.reminder === null ? null :
                                        <Chip icon={<AccessTimeIcon/>}className="labelsinnote" label={keys.reminder} variant="outlined"
                                            onDelete={()=>{this.handleReminderDelete(keys.noteId)}}
                                        />
                                      }
                                    </div>
                               
                            
                        </div>
                        <div className="labelsinnotes" >
                                    {keys.user.map((user) => {
                                    return (<div key={user.userId}>{user === null ? '' :
                                        <Chip label={user.email} variant="outlined" onDelete={() => {this.handleCollabaratedDelete(keys.noteId, user.userId)}} />}
                                    </div>);
                                })}
                            </div>
                        </div>
                        
                        <CardActions >

                            <NotePropComponent noteId={keys.id} AllNotesComponent={this.handleprops} sendarchiveprop={this.handlearchiveprops} notePropToArchieve={this.archieveNote} NotePropComponent={this.props} />
                        </CardActions>

                    </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px" , backgroundColor:keys.color}
                        } >
                            <CardContent>
                                <TextField style={{ width: "100%" }}
                                    type="text"
                                    multiline
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                /></CardContent>
                            <CardContent>
                                <TextField
                                    type="text" style={{ width: "100%" }}
                                    multiline
                                    value={this.state.desc}
                                    onChange={this.handleDescription}
                                /></CardContent>
                            <CardActions>

                            <NotePropComponent noteId={keys.id} AllNotesComponent={this.handleprops} sendarchiveprop={this.handlearchiveprops} />
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>

                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="note-design">
                {getAllNotes}
                {/* {this.props.AllNotesComponent?'':this.getNotes()} */}
            </div>
        )
    }
}
