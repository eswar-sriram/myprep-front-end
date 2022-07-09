import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Tasks = () => {
    const [tasks, setTasks] = useState(null);
    const [newTask, setNewTask] = useState(null);

    const [mod, setMod] = useState(false);

    const userId = useState(localStorage.getItem("userId"));

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setNewTask(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        console.log('here');
        if (newTask !== null) {
            const data = {
                userId: userId[0],
                taskName: newTask
            }
            axios.post('http://localhost:8080/addtask', data)
                .then(res => { console.log(res.data); setMod(true); })
                .catch(err => console.log(err))
        } else {
            alert('task name empty');
        }
    };


    useEffect(() => {
        axios.get(
            'http://localhost:8080/gettasks/' + userId[0],
            { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        ).then(res => {
            console.log(res)
            if (res.data.status !== -1) {
                setTasks(res.data)
            }
        }
        )
    }, [mod]);

    return (
        <div className="addTaskdiv">
            <Button className="gh" variant="contained" onClick={handleClickOpen}>Add Task</Button>
            <div className="container">
                {tasks && tasks.map((task) => (
                    <div style={{ margin: 10, width: "200px" }}>
                        <Card>
                            <CardContent sx={{ background: "gray", color: "white" }}>
                                <h1>{task.taskName}</h1>
                            </CardContent>
                            <CardActions sx={{ backgroundColor: "blueviolet", opacity: ".9", textDecoration: "none", }}>
                                <Button size="small" sx={{ color: "white" }} onClick={(e) => { handleClick(e) }} id={task.taskId} >open</Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="taskname"
                        label="New Task Name"
                        type="Text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setNewTask(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Tasks;