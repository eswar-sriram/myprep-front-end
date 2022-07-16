import { Button, TextField } from "@mui/material";

const Data = ({ notes, data, handleSave, handleDelete ,setData }) => {
    return (
        <div className="addTaskdiv">
            <TextField
                sx={{ backgroundColor: "#dcdedc" }}
                multiline
                varient="standard"
                rows={20}
                fullWidth
                onChange={(e) => { setData(e.target.value) }}
                type="text"
                value={data}
            />
            <Button sx={{ width : "20%" , margin : "10px"}} variant="contained" onClick={(e) => { handleSave(e) }} id={notes.notesId}>Save</Button>
            <Button sx={{ width : "20%" , margin : "10px"}} variant="contained" onClick={(e) => { handleDelete(e) }} id={notes.notesId}>Delete</Button>
        </div>);
}

export default Data;