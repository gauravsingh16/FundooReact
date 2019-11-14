import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { MenuItem, InputBase, IconButton, Checkbox, Divider, Button } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import getAllLabels, { createlabel, labelnote, labelCreateOnNote } from '../Controller/labelservice';
import AddIcon from '@material-ui/icons/Add';
import { getAllNotes } from '../Controller/NoteService';
export default class AddNoteLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            notes: [],
            labels: [],
            anchorEl: false,
            closepaper: false,
        }

    }
    componentDidMount() {
        this.getLabels();
    }

    getLabels = () => {
        getAllLabels().then((response) => {
            console.log('data', response.data);
            this.setState({
                labels: response.data.object
            })
        })
    }
    getNotes = () => {
        getAllNotes().then((response) => {
            this.setState({
                notes: response.data.object
            })
        })
    }
    closePaper = () => {
        this.props.NotePropComponent(true)
        return this.setState({ 
            anchorEl:!this.state.anchorEl, 
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
    labelnamechange = (event) => {
        var name = event.target.value
        console.log(this.state.name);

        this.setState({ name: name })
    }
    createlabel = () => {
        let data = {
            name: this.state.name
        }
       
        labelCreateOnNote(this.props.noteId,data).then((resp)=>{
            console.log(resp)
        })

    }
    handlecheckbox = (labelId) => {
        labelnote(labelId, this.props.noteId).then((resposne) => {
            console.log(resposne)
            this.getNotes();

        })
    }
    
    
    render() {
        let getAllLabel1 = this.state.labels.map((key) => {
            return (
                <div key={key.labelId}>



                    <MenuItem >
                        <Checkbox onClick={() => { this.handlecheckbox(key.labelId) }} />
                        <InputBase value={key.name} />
                    </MenuItem>
                    <Divider />
                </div>

            )
        }
        )

        return (
            <div>
                <MenuItem onClick={(e) => this.handleMoreOpen(e)} >
                    Add Labels
                  </MenuItem>

                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                    zIndex: "9999"
                }}>
                    <Paper>
                        <MenuItem>Label note</MenuItem>
                        <MenuItem>
                            <InputBase placeholder="Enter label name" value={this.state.name} onChange={this.labelnamechange}>
                            </InputBase>
                            <IconButton onClick={this.createlabel}>
                                <AddIcon />
                            </IconButton>
                        </MenuItem>

                        {getAllLabel1}

                        <div > <Button  onClick={this.closePaper}>Close</Button>
                        </div>

                    </Paper>
                </Popper>

            </div>

        )
    }
}
