import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import TrashComponent from '../Components/TrashComponent'

export default class DeletePage extends Component {
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
                <AppbarComponent  viewprop={this.handleView}/>
                <TrashComponent viewprop={this.state.view}/>
            </div>
        )
    }
}
