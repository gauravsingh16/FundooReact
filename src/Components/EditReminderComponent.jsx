import React, { Component } from 'react'
import {Popper,Button,Tooltip,Paper} from '@material-ui/core'
import AddAlertIcon from '@material-ui/icons/AddAlert'

import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { doReminderNote } from '../Controller/NoteService';

export default class EditReminderComponent extends Component {
    constructor(props){
        super(props)
        this.state=({
            anchorEl:false,
            selectedDate:new Date()
        })
    }
    handleOpenPopper=(e)=>{
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleChangeDate=async date=>{
        this.setState({ selectedDate: date })
    }
    
    handleReminderButton=()=>{
        console.log(this.props.noteId);
        console.log(this.state.selectedDate)
        let data={
            "reminder":this.state.selectedDate
        }
        doReminderNote(this.props.noteId,data).then((response)=>{
            console.log(response);

            this.props.NotePropComponent(true);
            this.setState({
                anchorEl:!this.state.anchorEl
            })
        })
    }
    render() {
        return (
            <div>
            
            <Tooltip title="reminder">
                <AddAlertIcon  onClick={(e) => this.handleOpenPopper(e)}  />
            </Tooltip>

            <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                    zIndex: "9999"
                }}>
            
            <Paper className="reminder-paper">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={this.state.selectedDate} onChange={this.handleChangeDate} />
                        </MuiPickersUtilsProvider>
                        <div>
                            <Button onClick={this.handleReminderButton}>Set Reminder</Button>
                        </div>
                    </Paper>
                </Popper>
               
        </div>
        )
    }
}
