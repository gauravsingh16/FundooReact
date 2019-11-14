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
      default:true


    }
  }
  handleView = (isTrue) => {
    this.setState({
      view: !this.state.view
    })
  }
  handleprops=(data)=>{
    console.log(data)
    this.setState({
      default:data
      
    })
    console.log(this.state.default)
  }
  render() {
    console.log(this.state.view)
    return (
      <div>

        <body className="dashboard-body">
          <AppbarComponent viewprop={this.handleView}  />
          <NotesComponent AllNotesComponent={this.handleprops}/>
          <PinnedNoteComponent className="pin-notes" sendDashboard={this.handleprops} />
          <AllNotesComponent viewprop={this.state.view} AllComponent={this.state.default}/>
        </body>
      </div>
    )
  }
}
