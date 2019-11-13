import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import ReminderNoteComponent from '../Components/ReminderNoteComponent'
import NotesComponent from '../Components/NotesComponent'

export default class ReminderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
          view: false,
    
    
    
        }
      }
      handleView = (isTrue) => {
        this.setState({
          view: !this.state.view
        })
      }
    render() {
        return (
            <div className="dashboard-body">
                <AppbarComponent viewprop={this.handleView}/>
                <NotesComponent/>
                <ReminderNoteComponent viewprop={this.state.view}/>
            </div>
        )
    }
}
