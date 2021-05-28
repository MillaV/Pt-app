import './App.css';
import React, {useState} from 'react';

import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import MyCalendar from './components/MyCalendar';
import Statistics from './components/Statistics ';

import AppBar from '@material-ui/core/AppBar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//ICONS
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            PersonalTrainer
          </Typography>
        </Toolbar>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<PeopleAltRoundedIcon/>} value="one" label= "customers"/>
          <Tab icon={<SportsTennisRoundedIcon/>} value="two" label="trainings"/>
          <Tab icon={<CalendarTodayRoundedIcon/>} value="three" label="calendar"/>
          <Tab icon={<EqualizerRoundedIcon/>} value="four" label="statistics"/>
        </Tabs>
      </AppBar>
      {value === "one" && <div><Customerlist/></div>}
      {value === "two" && <div><Traininglist/></div>}
      {value === "three" && <div><MyCalendar/></div>}
      {value === "four" && <div><Statistics/></div>}
    </div>
  );
}

export default App;
