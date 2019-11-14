import React, { Component } from 'react';
import { Card, CardContent, TextField, CardActions, Button, IconButton, Dialog,Chip } from '@material-ui/core'
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
            dialogOpen: false
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
    closeopendialog = () => {
        return this.setState({ dialogOpen: !this.state.dialogOpen })
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
    handlepopup = (note) => {
        console.log(note)
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }
    restorenote = (note) => {
        console.log(this.id)

        trashNotes(note.id).then((response) => {
            console.log(response)
            this.getNotes();
        }
        )

    }
    deleteforever = (note) => {
        deleteNote(note.id).then((response) => {
            console.log(response);
            this.props.DeletePage(true)
            this.setState({

                dialogOpen:!this.state.dialogOpen
            })
            this.getNotes();
        }
        )
    }

    render() {

        let getTrashNotes = this.state.notes.map((keys) => {
            const cardView = this.props.viewprop ? "list-view" : "display-card"
            return (
                <div key={keys.id}>
                    < Card key={keys.id} style={{ backgroundColor: keys.color }} className={cardView} >
                        <div onClick={() => { this.handleClickTakeNote(keys) }} >
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.desc}
                            </CardContent>
                        </div>
                        <div >
                                {keys.label.map((labels) => {
                                    return (
                                        <div key={labels.labelId}> {labels === '' ? ' ' :
                                            <Chip className="labelsinnote" label={labels.name} variant="outlined"
                                                onDelete={() => { this.handleLabelDelete(labels, keys.noteId) }}
                                            />
                                        }
                                        </div>
                                    )

                                })}
                            </div>
                            
                                <div key={keys.reminder}>  {keys.reminder === null ? null :
                                    <Chip className="labelsinnote" label={keys.reminder} variant="outlined"
                                        onDelete={() => { this.handleReminderDelete(keys.noteId) }}
                                    />
                                }
                                </div>
                                <div>
                                    {keys.user.map((user) => {
                                    return (<div key={user.userId}>{user === null ? '' :
                                        <Chip label={user.email} variant="outlined" onDelete={() => {this.handleCollabaratedDelete(keys.noteId, user.userId)}} />}
                                    </div>);
                                })}
                            </div>
                        <CardActions  >
                            <IconButton title="Restore" onClick={() => { this.restorenote(keys) }}>
                                <RestoreFromTrashIcon />
                            </IconButton>
                            <IconButton title="Delete Forever" onClick={() => { this.handlepopup(keys) }}>
                                <DeleteForeverIcon />
                            </IconButton>
                            {/* <NotePropComponent noteId={keys.id}/> */}
                        </CardActions>

                    </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ backgroundColor: keys.color, boxShadow: "1px 1px 1px 1px" }
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
                                    <RestoreFromTrashIcon />
                                </IconButton>
                                <IconButton onClick={() => { this.handlepopup(keys) }}>
                                    <DeleteForeverIcon />
                                </IconButton>

                                {/* <NotePropComponent noteId={keys.id}/> */}
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>

                            </CardActions>
                        </Card >
                    </Dialog>
                    <Dialog open={this.state.dialogOpen} >
                        < Card className="" style={{boxShadow: "1px 1px 1px 1px" , height:"150px",width:"300px" }
                        } >
                            <span> Delete Note Forever?</span><br/>
                            {/* <NotePropComponent noteId={keys.id}/> */}
                            <Button className="delete-button" onClick={this.closeopendialog}>Close</Button>
                            <Button className="delete-button" onClick={()=>this.deleteforever(keys)}>Delete</Button>


                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="note-design">
                {getTrashNotes}
            </div>
        )
    }
}
// export default withRouter(TrashComponent)