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

const Tasks = () => {

    const nav = useNavigate();
    const [tasks, setTasks] = useState(null);
    const [newTask, setNewTask] = useState(null);

    const [mod, setMod] = useState(false);

    const userId = useState(localStorage.getItem("userId"));

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        localStorage.setItem("taskId",e.target.id);
        nav('/subtasks');
    }

    const handleDelete=(e)=>{
        e.preventDefault();
        axios.delete('http://localhost:8080/deletetask/'+e.target.id)
        .then(res => console.log(res))
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
            
            <div className="container">
                {tasks && tasks.map((task) => (
                    <div style={{ margin: 20, width: "200px", height:"100px"}}>
                        <Card sx={{width: "200px", height:"130px"}}>
                            <CardActions sx={{ backgroundColor: "#555", opacity: ".6", textDecoration: "none", width: "200px", height:"100px", padding : "0px"}}>
                                <Button size="small" sx={{  background: "#333",color: "white" , height : "100%", width: "100%" }} onClick={(e) => { handleClick(e) }} id={task.taskId} >{task.taskName}</Button>
                            </CardActions>
                            <CardActions sx={{ backgroundColor: "#333", opacity: ".6", textDecoration: "none", width: "200px", height:"30px", padding : "0px"}}>
                                <Button size="small" sx={{  background: "blueviolet",color: "white" , height : "100%", width: "100%" }} onClick={(e) => { handleDelete(e) }} id={task.taskId} >Delete</Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
            <Button sx={{width : "20%"}} variant="contained" onClick={handleClickOpen}>Add Task</Button>
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