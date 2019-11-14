import React, { Component } from 'react'
import ArchiveComponent from '../Components/ArchiveComponent'
import AppbarComponent from '../Components/AppbarComponent'

export default class ArchivePage extends Component {
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
                 <AppbarComponent viewprop={this.handleView} />
                <ArchiveComponent viewprop={this.state.view}   />
            </div>
        )
    }
}
