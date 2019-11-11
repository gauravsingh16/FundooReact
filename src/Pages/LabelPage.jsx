import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import NotesComponent from '../Components/NotesComponent'
import LabelNotesComponent from '../Components/LabelNotesComponent'
import AddNoteLabelComponent from '../Components/AddNoteLabelComponent'
export default class LabelPage extends Component {
    render() {
        return (
            <div>
                
                <AppbarComponent/>
                <LabelNotesComponent labelId={this.props.match.params.labelid}/>
                
            </div>
        )
    }
}

