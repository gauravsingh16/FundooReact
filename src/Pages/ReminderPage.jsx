import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import ReminderNoteComponent from '../Components/ReminderNoteComponent'
import NotesComponent from '../Components/NotesComponent'

export default class ReminderPage extends Component {
    render() {
        return (
            <div>
                <AppbarComponent/>
                <NotesComponent/>
                <ReminderNoteComponent/>
            </div>
        )
    }
}
