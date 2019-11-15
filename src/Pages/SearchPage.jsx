import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import AllNotesComponent from '../Components/AllNotesComponent'
import SearchNoteComponent from '../Components/SearchNoteComponent'

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
          notes: [],
    
    
    
        }
      }
      handlesearchnotes = (data) => {
        console.log(data)
        this.setState({
          notes: data
        })
        console.log(this.state.notes);
        
      }
    render() {
        return (
            <div>
                <AppbarComponent searchnotes={this.handlesearchnotes}/>
                <SearchNoteComponent sendsearchnotes={this.state.notes}/>
            </div>
        )
    }
}
