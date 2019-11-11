import React, { Component } from 'react';
import { Card, CardContent, TextField, CardActions, Button, IconButton, Dialog } from '@material-ui/core'
import { getTrashNote, deleteNote, trashNotes } from '../Controller/NoteService';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
export default class TrashComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            desc: '',
            notes: [],
            openDialog: false,
        }

    };
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        getTrashNote().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data.object,
            })
        }
        )
    }
    closeDialog = () => {
        return this.setState({ openDialog: !this.state.openDialog })

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
    restorenote=(note)=>{
        console.log(this.id)

       trashNotes(note.id).then((response)=>
        {
           console.log(response)
            this.getNotes();
        }
       )
        
    }
    deleteforever=(note)=>{
        deleteNote(note.id).then((response)=>
        {
            console.log(response);
            this.getNotes();
        }
        )
    }

    render() {

        let getTrashNotes = this.state.notes.map((keys) => {
            return (
                <div key={keys.id}>
                    < Card key={keys.id}  style={{backgroundColor:keys.color}} className="note-display" >
                        <div onClick={() => { this.handleClickTakeNote(keys) }} >
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.desc}
                            </CardContent>
                        </div>
                        <CardActions  >
                        <IconButton title="Restore" onClick={() => { this.restorenote(keys) }}>
                                    <RestoreFromTrashIcon/>
                                        </IconButton>
                                        <IconButton title="Delete Forever" onClick={()=>{this.deleteforever(keys)}}>
                                    <DeleteForeverIcon/>
                                        </IconButton>
                                {/* <NotePropComponent noteId={keys.id}/> */}
                            </CardActions>
    
                        </Card >
                        <Dialog open={this.state.openDialog} >
                            < Card className="note-dialog" style={{ backgroundColor:keys.color, boxShadow: "1px 1px 1px 1px" }
                            } >
                                <CardContent>
                                    <TextField style={{ width: "100%" }}
                                        type="text"
                                        multiline
                                        value={this.state.title}
                                    /></CardContent>
                                <CardContent>
                                    <TextField
                                        type="text" style={{ width: "100%" }}
                                        multiline
                                        value={this.state.desc}
                                    /></CardContent>
                                <CardActions>
                                    <IconButton onClick={() => { this.restorenote(keys) }}>
                                    <RestoreFromTrashIcon/>
                                        </IconButton>
                                        <IconButton onClick={()=>{this.deleteforever(keys)}}>
                                    <DeleteForeverIcon/>
                                        </IconButton>

                                    {/* <NotePropComponent noteId={keys.id}/> */}
                                    <Button className="button-close" onClick={this.closeDialog}>Close</Button>

                                </CardActions>
                            </Card >
                        </Dialog>
                    </div >
                    )
                })
                return(
            <div className="note-design">
                        {getTrashNotes}
                    </div>
                    )
                }
            }
// export default withRouter(TrashComponent)