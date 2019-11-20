import React, { Component } from 'react'
import RegistrationComponent from '../Components/RegistrationComponent'
import ImageUpload from '../Components/ImageUpload'


export default class Register extends Component {
    constructor(props){
        super(props)
        this.state=({
            email:''

        })
    }
    componentWillReceiveProps(){
        this.handleprops();
}
handleprops=(data)=>{
    console.log(data);
    this.setState({
        email:data
    });
    console.log(this.state.email)
}
    render() {
        return (

            <div>
                 <header className="header">
                    <h2>Fundoo Notes </h2>
                    </header>
                    <body  className="imageupload"> 
                <RegistrationComponent sendToRegister={this.handleprops}/>
                <ImageUpload sendToImageUpload={this.state.email}/>
                </body>
             </div>
        )
    }
}
