import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

import Data from "./Data";

class Notes extends React.Component {

    constructor(props){
        super(props);
        this.state={
            notes : null,
            data : null
        }
    }

    setNotes=(data)=>{
        this.setState({notes : data})
    }

    setData=(data)=>{
        this.setState({data : data})
    }

    handleSave = (e) => {
        e.preventDefault();
        let userId = localStorage.getItem("userId");
        let taskId = localStorage.getItem("taskId");
        let subtaskid = localStorage.getItem("subTaskId");
        const d={
            userId : userId,
            taskId : taskId,
            subTaskId : subtaskid,
            notesId : e.target.id,
            notesData : this.state.data

        }
        axios.post('http://localhost:8080/addnotes',d)
        .then(res=>{console.log(res.data);this.getData();})
    }

    handleDelete =(e)=>{
        axios.delete('http://localhost:8080/deletenotes/'+e.target.id)
        .then(res=>{console.log(res.data);this.getData();})
    }

    getData=()=>{
        let userId = localStorage.getItem("userId");
        let taskId = localStorage.getItem("taskId");
        let subtaskid = localStorage.getItem("subTaskId");


        axios.get(
            'http://localhost:8080/getnotes/' + userId[0] + '/' + taskId[0] + '/' + subtaskid[0],
            { crossdomain: true },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }
        ).then(res => {
            console.log(res);
            if (res.data.status !== -1) {
                this.setState({notes : res.data[0],data : res.data[0].notesData})
            } else {
                this.setState({notes :{ notesId: null, notesData: "No Data" }})
            }
        }
        )
    }

    componentDidMount(){
        this.getData()
    }

    render(){
    return (<div>
        {this.state.notes && <Data notes={this.state.notes} data = {this.state.data} handleSave={this.handleSave} handleDelete={this.handleDelete} setData={this.setData}/>}
    </div>);
    }
}

export default Notes;