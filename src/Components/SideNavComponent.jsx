import React, { Component } from 'react'
import { Drawer, MenuList, MenuItem, Divider, TextField, Dialog, Card, CardContent, IconButton, Button } from '@material-ui/core'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import CreateIcon from '@material-ui/icons/Create'
import getAllLabels, { createlabel } from '../Controller/labelservice';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import EditLabelComponent from './EditLabelComponent';
import LabelNotesComponent from './LabelNotesComponent';
import { getAllNotes } from '../Controller/NoteService';

const themes = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "62px",
                display: "table"
            }, paperAnchorLeft: {
                width: "250px"
            }
        }
    }
})
class SideNavComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            labels: [],
            notes: [],
            labelDialog: false,
            name: '',
            trashNotes: []

        }
    }

    componentDidMount() {
        this.getLabels();
        this.getNotes();
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
    getNotes = () => {
        getAllNotes().then((response) => {
            this.setState({
                notes: response.data.object
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

    handleDelete = () => {
        console.log("trash");
        this.props.history.push('/trash');
    }
    handlenotes = () => {
        this.props.history.push('/dashboard')
    }
    handleArchive = () => {
        this.props.history.push('/archive')
    }
    handleClickClose = () => {
        this.setState({
            labelDialog: !this.state.labelDialog
        })
        this.getLabels();
    }
    handlelabel = (data) => {
        console.log(data)
        this.props.history.push('/label/' + data)
    }
    handlereminder = (data) => {
        console.log(data)
        this.props.history.push('/reminder')
    }

    render() {
        let showLabels = this.state.labels.map((data) => {

            return (
                <MenuItem key={data.labelsId} onClick={() => { this.handlelabel(data.labelId) }}>

                    <LabelOutlinedIcon style={{ paddingRight: "10px" }} />{data.name}

                </MenuItem>
            )
        })


        return (
            <div>
                <MuiThemeProvider theme={themes}>
                    <Drawer variant='persistent' overflow='auto' open={this.props.menubar}>
                        <MenuList>
                            <MenuItem className="side-items" onClick={this.handlenotes}>
                                <EmojiObjectsOutlinedIcon style={{ paddingRight: "10px" }} />
                                <span>Notes</span>

                            </MenuItem>

                            <MenuItem className="side-items" onClick={this.handlereminder}>
                                <AddAlertOutlinedIcon style={{ paddingRight: "10px" }}/> Reminders
                               
                             </MenuItem>
                            <Divider />
                        <span style={{paddingLeft:"20px"}}>Labels</span>
                        <div>
                            {showLabels}

                        </div>
                        <MenuItem className="side-items" onClick={this.dialogOpen}>
                            <CreateIcon style={{ paddingRight: "10px" }} />Edit labels
                                        </MenuItem>
                        <Divider />
                        <Dialog open={this.state.labelDialog} >
                            <Card style={{ width: "360px" }}>
                                <CardContent>
                                    <IconButton >
                                        <ClearOutlinedIcon />
                                    </IconButton>
                                    <TextField
                                        type="text"
                                        placeholder="Create new Label"
                                        multiline
                                        onChange={this.labelNameChange}
                                    />
                                    <IconButton style={{ display: "flex", float: "right" }}>
                                        <DoneOutlinedIcon onClick={this.createLabel} />
                                    </IconButton>
                                    <EditLabelComponent />
                                    <Divider />
                                    <Button className="close-button" onClick={this.handleClickClose}>Close</Button>
                                </CardContent>

                            </Card>
                        </Dialog>
                        <MenuItem className="side-items" onClick={this.handleArchive}>
                            <ArchiveOutlinedIcon style={{ paddingRight: "10px" }}/>
                            <span>Archived Notes</span>
                        </MenuItem>
                        <MenuItem className="side-items" onClick={this.handleDelete} >
                            <DeleteOutlineOutlinedIcon style={{ paddingRight: "10px" }} />
                            <span>
                                Delete Notes
                                </span>

                        </MenuItem>

                        </MenuList>
                    </Drawer>
                </MuiThemeProvider>
            </div >
        )
    }
}
export default withRouter(SideNavComponent)