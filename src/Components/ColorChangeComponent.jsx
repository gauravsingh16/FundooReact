import React, { Component } from 'react'
import { Tooltip, IconButton, Popper, Paper, ClickAwayListener } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { changeColor } from '../Controller/NoteService';

const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#ef9a9a" },
{ name: "Cyan", colorCode: "#80deea" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#c5e1a5" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]

export default class ColourChange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: false,
            
            colour: '',
        }
    }

    handleClick(event) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
        });
    };

    handleClickAway=()=>{
        this.setState({
            anchorEl: false
        })
    }

    handleChangeColor = (colour) => {
       
        console.log('inside close method of proprties: ');
        console.log(this.props.noteId);
       
        let data={
            "color":colour.target.value
        }
        changeColor(data,this.props.noteId).then(res=>{
            console.log("Response after hitting login api is ",res);
          this.props.NotePropComponent(true);
            
        }).catch(err=>{
            console.log("Error after hitting login api  ",err);
        })
        this.setState({
            anchorEl:false
        })
    }

    render() {

       
            const colorChange = colorPalette.map((key) => {
                return (
                    <div className="color-map">
                        <Tooltip title={key.name}>
                            <IconButton style={{ backgroundColor: key.colorCode, border: "silver 2px solid" }}
                                value={key.name}
                                onClick={this.handleChangeColor}>
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            })

        return (
            <div>
                <Tooltip title="change color">
                    <ColorLensOutlinedIcon onClick={(event) => this.handleClick(event)} cursor="pointer" />
                </Tooltip>
                
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                style={{
                    zIndex: "9999"
                }}
            >
                <Paper className="color-styles">
                    {colorChange}
                </Paper>
            </Popper>
            </div>
        )
    }
}