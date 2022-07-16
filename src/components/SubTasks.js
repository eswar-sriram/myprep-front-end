import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";


const SubTasks = () => {
    const [subtasks, setsubtask] = useState(null);
    const [newSubTask, setNewSubTask] = useState(null);
    const [open, setOpen] = useState(false);
    const [mod, setMod] = useState(false);
    const nav = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        localStorage.setItem("subTaskId", e.target.id);
        nav('/notes');
    }

    const handleDelete=(e)=>{
        e.preventDefault();
        axios.delete('http://localhost:8080/deletesubtask/'+e.target.id)
        .then(res => console.log(res))
    }

    useEffect(() => {
        let userId = localStorage.getItem("userId");
        let taskId = localStorage.getItem("taskId");
        axios.get(
            'http://localhost:8080/getsubtask/' + userId[0] + '/' + taskId[0],
            { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        ).then(res => {
            console.log(res)
            if (res.data.status !== -1) {
                setsubtask(res.data)
            }
        }
        )
    }, [mod]);



    const handleClickOpen = () => {
        setNewSubTask(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let userId = localStorage.getItem("userId");
        let taskId = localStorage.getItem("taskId");
        setOpen(false);
        console.log('here');
        if (newSubTask !== null) {
            const data = {
                userId: userId[0],
                taskId: taskId[0],
                subTaskName: newSubTask
            }
            axios.post('http://localhost:8080/addsubtask', data)
                .then(res => { console.log(res.data); setMod(true); })
                .catch(err => console.log(err))
        } else {
            alert('task name empty');
        }
    };
    return (
        <div className="addTaskdiv">
            <div className="container">
                {subtasks && subtasks.map((task) => (
                    <div style={{ margin: 10, width: "200px" }}>
                        <Card sx={{height : "130px"}}>
                            <CardActions sx={{ backgroundColor: "#555", opacity: ".6", textDecoration: "none", height: "100px", padding : "0px"}}>
                                <Button size="small" sx={{ color: "white", width: "100%", height : "100%" }} id={task.subTaskId} onClick={(e) => handleClick(e)}>{task.subTaskName}</Button>
                            </CardActions>
                            <CardActions sx={{ backgroundColor: "#333", opacity: ".6", textDecoration: "none", height : "30px", padding : "0px"}}>
                                <Button size="small" sx={{ background: "blueviolet",color : "white",width: "100%", height : "100%" }} id={task.subTaskId} onClick={(e) => handleDelete(e)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="subtaskname"
                            label="Sub Task Name"
                            type="Text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => { setNewSubTask(e.target.value) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Button sx={{width : "20%"}} variant="contained" onClick={handleClickOpen}>Add Sub Task</Button>
        </div>);
}

export default SubTasks;