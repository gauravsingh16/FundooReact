import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import NotesComponent from '../Components/NotesComponent'
import LabelNotesComponent from '../Components/LabelNotesComponent'
import AddNoteLabelComponent from '../Components/AddNoteLabelComponent'
export default class LabelPage extends Component {
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
                <LabelNotesComponent viewprop={this.state.view} labelId={this.props.match.params.labelid}/>
                
            </div>
        )
    }
}

