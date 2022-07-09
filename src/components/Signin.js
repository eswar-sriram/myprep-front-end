import { useState } from "react";

import { TextField } from "@mui/material";
import {Button} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = (props) => {

    const[username, setUserName] = useState(null);
    const[password, setPassword] = useState(null);
    const[err,setErr] = useState(null);
    const nav=useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {userName : username,password : password}        
        axios.post('http://localhost:8080/validateuser',data)
            .then(res => {console.log(res);
            if(res.data.status===1){
                localStorage.setItem("userId",res.data.object.userId);
                localStorage.setItem("userName",res.data.object.userName);
                nav("/tasks");
            }else{
                setErr(res.data.message);
            }
            })
            .catch(err => console.log(err))
    }

    return ( <div className="container">
        <form className="formData">
            <TextField className="tf-b" label="Username" type="text"  variant="outlined" onChange={(e)=>{setUserName(e.target.value)}} />
            <br/>
            <br/>
            <TextField  className="tf-b" label="Password" type="password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}} />
            <br/>
            <br/>
            <Button className="tf-b" type="submit" onClick={(e)=>{handleSubmit(e)}}  variant="contained" >Submit</Button>
            <br/>
            <Link to="/signup">Dont have an account? sign up</Link>
            <br/> 
            {err && <p>{err}</p>}
        </form>
        
    </div> );
}
 
export default Signin;