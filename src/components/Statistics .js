import React from 'react';
import '../App.css';
import { PieChart, Pie,BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';


const Statistics = () => {

   const data = [
     {name: "Spinning", value: 120},
     {name: "Gym training", value: 180},
     {name: "Fitness", value: 50},
     {name: "Zumba", value: 90},
     {name: "Jogging", value: 80},
   ];

//   const [trainings,setTrainings]= useState([]);
//   useEffect(() => { 
//     fetchTrainings();
//     console.log(trainings);
//   }, []);

//   //**TIETOJEN HAKEMINEN**/
//     //Tällä funktiolla tehdäään Fetch. Tämä tulostuu components osioon.
//     const fetchTrainings = () => {
//       fetch('https://customerrest.herokuapp.com/gettrainings')
//         .then(response => response.json())
//         .then(data => setTrainings(data))
//         .catch(err => console.error(err))
//     }
// //**TIETOJEN HAKEMINEN--LOPPUU**/

  return (
    <div style={{textAlign:"left"}}>

      <div className="Statistics">
        
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
        
        <Tooltip />
        
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </div>
    </div>
  );

};

export default Statistics;

