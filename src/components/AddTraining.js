import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTrainig] = React.useState({
    date: '', 
    duration: '',
    activity: '',
    customer: props.link,
  })

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      props.addTraining(training);
      setOpen(false);
    };

    const inputChanged = (event) => {
      setTrainig({...training,[event.target.name]: event.target.value});
  }

  return (
    <div>
      <Button size="small"  variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            type="datetime-local"
            name= "date" //olion atribuutin arvo
            value= {training.date} //state olio ja atribuutti
            onChange={inputChanged}
            fullWidth
            
          />
          <TextField
            margin="dense"
            label="Duration"
            name= "duration" 
            value= {training.duration}
            onChange={inputChanged}
            fullWidth
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Activity</InputLabel>
              <Select
              margin="dense"
              label="Activity"
              name= "activity"
              value={training.activity}
              onChange={inputChanged}
              >
                <MenuItem value="Fitness">Fitness</MenuItem>
                <MenuItem value="Gym training">Gym training</MenuItem>
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Jogging">Jogging</MenuItem>
                <MenuItem value="Spinning">Spinning</MenuItem>
                <MenuItem value="Zumba">Zumba</MenuItem>
              </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;