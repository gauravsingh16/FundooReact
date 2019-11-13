import React, { Component } from 'react'
import { Card, CardContent, TextField, CardActions, Button, Dialog, Chip } from '@material-ui/core'
import NotePropComponent from './NotePropComponent';
import { getAllNotes, updateNotes } from '../Controller/NoteService';
import { removelabelnote } from '../Controller/labelservice';
import AccessTimeIcon from '@material-ui/icons/AccessTime'


export default class LabelNotesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            desc: '',
            notes: [],
            labels:[],
            openDialog: false,
        }

    };
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        getAllNotes().then((res) => {
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
                this.getNotes();
            })
        }
    }
    handleLabelDelete=(labels,noteId)=>{
        removelabelnote(labels.labelId,noteId).then((response)=>{
            console.log(response)
            this.getNotes();
        })
    }
    render() {
        let getAllNotes = this.state.notes.map((keys) => {
            const cardView = this.props.viewprop ? "list-view" : "display-card"

            return (
                <div key={keys.noteId}>
                <div >
                    {keys.label.map((labels) => {
                        console.log(keys);
                        
                        console.log(labels.labelId ,parseInt(this.props.labelId));

                        return (<div key={labels.labelId}>{labels.labelId !== parseInt(this.props.labelId )? '' :
                        <Card className={cardView} open={!this.state.openDialog} style={{ backgroundColor: keys.color }}>
                        <div onClick={() => this.handleClickTakeNote(keys.noteId, keys.title, keys.desc, keys.label.userId)}>
                            <CardContent className="textdisplay">{keys.title}</CardContent>
                            <CardContent className="textdisplay">{keys.desc}</CardContent>
                            <Chip className="labelsinnote" label={labels.name} variant="outlined"
                                            onDelete={()=>{this.handleLabelDelete(labels,keys.noteId)}}
                                        />
                                         <div key={keys.reminder}>  {keys.reminder === null ? null :
                                        <Chip icon={<AccessTimeIcon/>}  className="labelsinnote" label={keys.reminder} variant="outlined"
                                            onDelete={()=>{this.handleReminderDelete(keys.noteId)}}
                                        />
                                      }
                                    </div>
                            <NotePropComponent noteId={keys.id} />
                            
                        </div>
                        </Card>}
                        </div>);

                    })}
                </div>



            </div>
            )
        })
        return (
            <div className="note-design">
                {getAllNotes}
            </div>
        )
    }
}