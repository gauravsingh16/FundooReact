import React, { Component } from 'react'
import AppbarComponent from '../Components/AppbarComponent'
import TrashComponent from '../Components/TrashComponent'

export default class DeletePage extends Component {
    render() {
        return (
            <div>
                <AppbarComponent/>
                <TrashComponent/>
            </div>
        )
    }
}
