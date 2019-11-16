import React, { Component } from 'react'
import { Card, CardContent, TextField, CardActions, Button, Dialog, Chip } from '@material-ui/core'
import NotePropComponent from './NotePropComponent'
import { getArchiveNote, updateNotes } from '../Controller/NoteService'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
export default class SearchNoteComponent extends Component {
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
      this.setState({
        notes:this.props.sendsearchnotes
    }) 
    console.log(this.props.sendsearchnotes)
    }
    getNotes = () => {
        
            console.log('data', this.state.notes)
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
        if(this.props.sendsearchnotes !== null)
        {let getSearchedNotes = this.props.sendsearchnotes.map((keys) => {
            const cardView = this.props.viewprop ? "list-view" : "display-card"
            return (

                <div >
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
                    
                        {/* <div >
                            {keys.label.map((labels) => {
                                return (
                                    <div key={labels.labelId}> {labels === '' ? null :
                                        <Chip className="labelsinnote" label={labels.name} variant="outlined"
                                            onDelete={() => { this.handleLabelDelete(labels, keys.noteId) }}
                                        />
                                    }
                                    </div>
                                )

                            })}
                        </div> */}
                        <div>
                            <div key={keys.reminder}>  {keys.reminder === null ? null :
                                <Chip icon={<AccessTimeIcon/>}className="labelsinnote" label={keys.reminder} variant="outlined"
                                    onDelete={() => { this.handleReminderDelete(keys.noteId) }}
                                />
                            }
                            </div>


                        </div>
                        <CardActions>

                            <NotePropComponent noteId={keys.id} />
                        </CardActions>

                    </Card >
                    </div>
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ backgroundColor: keys.color, boxShadow: "1px 1px 1px 1px" }
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

                                <NotePropComponent noteId={keys.id} />
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>

                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="note-design">
                {getSearchedNotes}
            </div>
        )
    }}
}
