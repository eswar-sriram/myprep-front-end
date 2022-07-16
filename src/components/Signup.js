import { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

const Signup = (history) => {
    const[username, setUserName] = useState(null);
    const[password, setPassword] = useState(null);
    const[mail, setMail] = useState(null);
    const nav = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data ={
            userName : username,
            password : password,
            mail : mail
        }
        axios.post('http://localhost:8080/adduser',data)
            .then(res=>{if (res.data.status!==-1) {
                console.log(data);
                nav('/signin');
            }})
            .catch(err => console.log(err))
        
    }
    
    return ( 
        <div className="container">
    <form className="formData">
    <TextField className="tf-b" label="Username" type="text"  variant="outlined" onChange={(e)=>{setUserName(e.target.value)}} />
    <br/>
    <TextField  className="tf-b" label="Password" type="password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}} />
    <br/>
    <TextField  className="tf-b" label="Mail" type="text" variant="outlined" onChange={(e)=>{setMail(e.target.value)}} />
    <br/>
    <Button className="tf-b" type="submit" onClick={(e)=>{handleSubmit(e)}}  variant="contained" >Submit</Button>
</form> 
</div>
);
}
 
export default Signup;