import React, { Component } from 'react'
import { Card, CardContent, TextField, CardActions, Button, Dialog,Chip } from '@material-ui/core'
import NotePropComponent from './NotePropComponent';


export default class LabelNotesComponent extends Component {
    constructor(props) {
        super(props);
        this.setState({
            notes: [],
            labels: []
        })
    }

    render() {
        let getAllNotes = this.state.notes.map((keys) => {
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
                            <div className="labelsinnote">
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
                            </div>
                        </div>
                        <CardActions  >

                            <NotePropComponent noteId={keys.id} />
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
                {getAllNotes}
            </div>
        )
    }
}