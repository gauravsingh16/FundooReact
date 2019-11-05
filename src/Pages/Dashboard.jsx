import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import NotesComponent from '../Components/NotesComponent'
import AllNotesComponent from '../Components/AllNotesComponent'
export default class Dashboard extends Component {
    render() {
        return (
            <div>
              <header>
                <AppbarComponent/>
                  </header>  
                  <body className="dashboard-body">
                    <NotesComponent/>
                    <AllNotesComponent/>
                    </body>
            </div>
        )
    }
}
