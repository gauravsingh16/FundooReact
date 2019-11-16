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
    // this.props.AllNotesComponent(data)
    console.log(this.state.default)
  }
  handleresponse=(data)=>
  {
    this.setState({
      default:data
    });
    this.props.receiveResponse(data)
  }
  render() {
    console.log(this.state.view)
    return (
      <div>

        <body className="dashboard-body">
          <AppbarComponent viewprop={this.handleView}  />
          <NotesComponent sendResponse={this.handleprops}/>
          <PinnedNoteComponent className="pin-notes" sendDashboard={this.handleprops} />
          <AllNotesComponent viewprop={this.state.view} receiveResponse={this.state.default} />
        </body>
      </div>
    )
  }
}
