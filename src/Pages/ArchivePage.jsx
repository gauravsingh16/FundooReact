import React, { Component } from 'react'
import ArchiveComponent from '../Components/ArchiveComponent'
import AppbarComponent from '../Components/AppbarComponent'

export default class ArchivePage extends Component {
    render() {
        return (
            <div>
                 <AppbarComponent/>
                <ArchiveComponent/>
            </div>
        )
    }
}
