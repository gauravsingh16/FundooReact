import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import NotesComponent from '../Components/NotesComponent'
import AllNotesComponent from '../Components/AllNotesComponent'
import PinnedNoteComponent from '../Components/PinnedNoteComponent'
export default class Dashboard extends Component {
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
    console.log(this.state.view)
    return (
      <div>

        <body className="dashboard-body">
          <AppbarComponent viewprop={this.handleView} />
          <NotesComponent />
          <PinnedNoteComponent className="pin-notes" />
          <AllNotesComponent viewprop={this.state.view} />
        </body>
      </div>
    )
  }
}
