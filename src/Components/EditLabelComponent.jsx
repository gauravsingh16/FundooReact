import React, { Component } from 'react'
import { DialogContent, TextField, IconButton, InputBase } from '@material-ui/core'

import getAllLabels, { updateLabel, deleteLabel } from '../Controller/labelservice'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
export default class EditLabelComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labels: [],
            mouse: false,
            labelId: '',
            labelDialog: false,
            name: '',
            trashNotes: []

        }
    }
    componentDidMount() {
        this.getLabels();
    }
    getLabels = () => {
        getAllLabels().then((response) => {
            console.log('data', response.data);
            this.setState({
                labels: response.data.object
            })
        })
    }
    handleMouseOver = (name,labelid) => {
        console.log("mouse over");
        
        this.setState({
            mouse: !this.state.mouse,
            labelId: labelid,
            name: name
        })
    }
    handleUpdateLabelState = (oldlabelname, oldlabelid) => {
        console.log(oldlabelid,oldlabelname)
        this.setState({
            name: oldlabelname,
            labelId: oldlabelid
        });
    }
    handleUpdateLabel=()=>
    {
        var data={
            labelId:this.state.labelId,
            name:this.state.name
        }
    updateLabel(data).then((response)=>
    {
        console.log(response)
    });
    }
    handleLabelChange=(event)=>
    {
        var name = event.target.value
console.log(this.state.name);

        this.setState({ name:name })
    }
    handleDeleteLabel=(event)=>{
        deleteLabel(event).then((response)=>{
            console.log(response)
        });
        this.getLabels();
    }
    render() {
        let showLabelsinDialog = this.state.labels.map((key) => {
            console.log(key.name)
            return (
                <div className="edit-label-div"
                >
                    <div>
                        <IconButton>
                        <DeleteIcon onClick={() => this.handleDeleteLabel(key.labelId)} />
                        </IconButton>
                    </div>
                    <div  onMouseEnter={() => this.handleMouseOver(key.labelId,key.name)}>
                        {/* <DialogContent key={key.labelId} className="dialog-label" style={{ paddingLeft: "2px" }}> */}
                            {key.labelId === this.state.labelId ?
                                <InputBase
                                  
                                    value={this.state.name}
                                    onChange={this.handleLabelChange}
                                />
                                :
                                <InputBase className="label-name"
                                    
                                    value={key.name}
                                     onClick={() => this.handleUpdateLabelState(key.name, key.labelId)}
                                />
                            }
                            {/* </DialogContent> */}
                        </div>
                            <div>
                                <IconButton>
                                <CreateOutlinedIcon onClick={this.handleUpdateLabel}/>
                                </IconButton>
                                </div>


                       
                </div>
            )
        })
        return (
            <div>
                {showLabelsinDialog}
            </div>
        )
    }
}
