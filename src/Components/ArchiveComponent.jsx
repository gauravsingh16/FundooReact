import React, { Component } from 'react'
import { Card, CardContent, TextField, CardActions, Button,Dialog } from '@material-ui/core'
import NotePropComponent from './NotePropComponent'
import { getArchiveNote, updateNotes } from '../Controller/NoteService'

export default class ArchiveComponent extends Component {
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
        getArchiveNote().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data.object,
            })
            console.log('data', this.state.notes)
        }
        )
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
    render() {
        let getArchiveNotes = this.state.notes.map((keys) => {
            return (
                <div key={keys.id}>
                    < Card key={keys.id} className="note-display" >
                        <div onClick={() => { this.handleClickTakeNote(keys) }} >
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.desc}
                            </CardContent>
                        </div>
                        <CardActions>
                            
                            <NotePropComponent noteId={keys.id}/>
                        </CardActions>

                    </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px" }
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
                            
                                <NotePropComponent noteId={keys.id}/>
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>

                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="note-design">
                {getArchiveNotes}
            </div>
        )
    }
}
    

