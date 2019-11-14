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
      searchnotes = (e) => {
        this.setState({
          notes: this.state.notes
        })
        console.log(this.state.notes);
        
      }
    render() {
        return (
            <div>
                <AppbarComponent searchnotes={this.searchnotes}/>
                <SearchNoteComponent searchnotes={this.state.notes}/>
            </div>
        )
    }
}
