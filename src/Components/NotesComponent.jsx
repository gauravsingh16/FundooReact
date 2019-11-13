import React, { Component } from 'react'
import { Card, InputBase, Button,IconButton } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import createNote from '../Controller/NoteService';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import NotePropComponent from './NotePropComponent';
export default class NotesComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            desc: '',
            windowOpen: false,
        }
    }
    handleClick = () => {
        this.setState({
            windowOpen: true,

        })
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        })
    }
    handleDescriptionChange = (event) => {
        this.setState({
            desc: event.target.value,
        })
    }
    handleClickClose = () => {
        console.log(this.state.title)
        console.log(this.state.desc)
        if (this.state.title === "" && this.state.desc === "") {
            return this.setState({

                windowOpen: false,
            })
        }
        else {
            this.setState({

                title: '',
                desc:''
            })
            let note = {
                title: this.state.title,
                desc: this.state.desc
            }
            createNote(note).then((response) => {
                console.log(response.data);
                this.setState({
                    windowOpen: false,
                    title: '',
                    desc: ''
                })

            }).catch((err) => {
                console.log('err', err.response.data.message)

            });
        }
    }
    render() {
        return (
            <div className="note-create">
                {!this.state.windowOpen ? (
                    <Card className="notecard">
                        <InputBase
                            multiline type="text" style={{ width: "80%" }} placeholder="Take a note...." onClick={this.handleClick}
                        />
                            <IconButton>
                            {/* <Checkbox onClick={() => { this.handlecheckbox(key.labelId) }} /> */}
                            </IconButton>
                    </Card>
                ) : (<Card className="noteTake" style={{ backgroundColor: this.state.color ,width:"50%" }}>
                    <InputBase style={{ width: "90%", padding: "10px", fontWeight: "bold" }}
                        multiline
                        type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}
                    />
                        <CheckBoxOutlineBlankIcon/>
                            
                    <InputBase style={{width:"100%"}} type="text" placeholder="Take a note..." value={this.state.desc} onChange={this.handleDescriptionChange}
                    />
                      <NotePropComponent/>
                        <Button className="close-button" onClick={this.handleClickClose}>Close</Button>
                </Card>)}
            </div>
        )
    }
}
