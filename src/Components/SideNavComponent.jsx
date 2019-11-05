import React, { Component } from 'react'
import { Drawer, MenuList, MenuItem, Divider, Button, TextField, Dialog, Card, CardContent, IconButton } from '@material-ui/core'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import CreateIcon from '@material-ui/icons/Create'
import DialogContent from '@material-ui/core/DialogContent';
import getAllLabels, { createlabel, getdeletednotes } from '../Controller/labelservice';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const themes = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "69px",
                display: "table"
            }, paperAnchorLeft: {
                width: "250px"
            }
        }
    }
})
export default class SideNavComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labels: [],
            labelDialog: false,
            name: '',
            trashNotes: []

        }
    }

    componentDidMount() {
        this.getLabels();
    }
    dialogOpen = () => {
        this.setState({
            labelDialog: !this.state.labelDialog
        })
    }
    getLabels = () => {
        getAllLabels().then((response) => {
            console.log('data', response.data);
            this.setState({
                labels: response.data.object
            })
        })
    }
    labelNameChange = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    createLabel = () => {
        if (this.state.name === '') {
            return this.setState({
                labelDialog: !this.state.labelDialog
            })
        }
        else {
            let labelData = {
                "name": this.state.name,
            }
            createlabel(labelData).then((res) => {
                console.log(res.data)
            })
        }
    }
    getTrashNotes = () => {
        getdeletednotes().then((res) => {
            console.log(res.data)
            this.trashNotes = res.data
        })
    }
    handleDelete = () => {
        console.log("trash");
       this.props.history.push('/trash'); 
    }

    render() {
        let showLabels = this.state.labels.map((data) => {

            return (
                <MenuItem key={data.labelsId}>

                    <LabelOutlinedIcon style={{ paddingRight: "10px" }} />{data.name}

                </MenuItem>
            )
        })
        let showLabelsinDialog = this.state.labels.map((data) => {
            console.log(data.name)
            return (

                <DialogContent key={data.labelId} className="dialog-label" style={{ paddingLeft: "2px" }}>
                    <IconButton>
                        <LabelOutlinedIcon />
                    </IconButton>
                    <span className="label-name">{data.name}</span>
                    <IconButton>< CreateIcon />
                    </IconButton>
                </DialogContent>

            )
        })

        return (
            <div>
                <MuiThemeProvider theme={themes}>
                    <Drawer variant='persistent' overflow='auto' open={this.props.menubar}>
                        <MenuList>
                            <MenuItem>
                                <EmojiObjectsOutlinedIcon />
                                <span>Notes</span>

                            </MenuItem>
                            <MenuItem>
                                <AddAlertOutlinedIcon />
                                <span>
                                    Reminders
                    </span>
                            </MenuItem>
                            <Divider />
                            <span>Labels</span>
                            <div>
                                {showLabels}
                            </div>
                            <MenuItem onClick={this.dialogOpen}>
                                <CreateIcon style={{ paddingRight: "10px" }} />Edit labels
                                        </MenuItem>
                            <Divider />
                            <Dialog open={this.state.labelDialog} >
                                <Card style={{ width: "360px" }}>
                                    <CardContent>
                                        <IconButton>
                                            <ClearOutlinedIcon />
                                        </IconButton>
                                        <TextField
                                            type="text"
                                            placeholder="Create new Label"
                                            multiline
                                            onChange={this.labelNameChange}
                                        />
                                        <IconButton>
                                            <DoneOutlinedIcon onClick={this.createLabel} />
                                        </IconButton>
                                        {showLabelsinDialog}
                                    </CardContent>

                                </Card>
                            </Dialog>
                            <MenuItem>
                                <ArchiveOutlinedIcon />
                                <span>Archived Notes</span>
                            </MenuItem>
                            <MenuItem onClick={this.handleDelete} >
                                <DeleteOutlineOutlinedIcon />
                                <span>
                                    Delete Notes
                                </span>
                               
                            </MenuItem>

                        </MenuList>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
