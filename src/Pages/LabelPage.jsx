import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import NotesComponent from '../Components/NotesComponent'
import LabelNotesComponent from '../Components/LabelNotesComponent'
export default class LabelPage extends Component {
    render() {
        return (
            <div>
                
                <AppbarComponent/>
                <NotesComponent labelsId={this.props.match.params.labelsId}/>
                
            </div>
        )
    }
}

