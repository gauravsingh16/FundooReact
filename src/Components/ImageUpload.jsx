import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';
import { flexbox } from '@material-ui/system';
import {Input, Button} from '@material-ui/core'
export default class ImageUpload extends Component {
    constructor(){
        super()
        this.state={
            pictures: [] ,
            email:'',
            
        }

    }
    componentWillReceiveProps(){
        this.setState({
            email:this.props.sendToImageUpload
        });
    }
   
    handleimage=(e)=>{
        let files=e.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=(e)=>{
            console.log("img data",e.target.result)
            console.log(this.state.email)
            this.setState({
                files:this.state.pictures
            })
        }
        
    }
    render() {
        // let getimage=this.state.pictures.map((keys)=>{
      return (
            <div  style={{display:"flex" , alignItems:"right",paddingLeft:"150px"}} >
                 <div>
                     <br/><br/><br/><br/><br/>
                        
              <Input type="file" name="file" onChange={(e)=>{this.handleimage(e)}}/>

              <Button>Upload</Button>
    </div>
                
                    
            </div>
            
        )
    // });
    return(
        <div>
            {/* {getimage} */}
        </div>
    )    
}
    
}
