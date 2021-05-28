import React, {useState, useEffect} from 'react';

import { AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import moment from 'moment';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Traininglist() {

const[trainings,setTrainings]= useState([]);
  useEffect(() => { 
    fetchTrainings();
  }, []);

  const[open,setOpen] = useState(false);
  const[msg,setMsg] = useState('');

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  
//**TIETOJEN HAKEMINEN**/
    //Tällä funktiolla tehdäään Fetch. Tämä tulostuu components osioon.
    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }
//**TIETOJEN HAKEMINEN--LOPPUU**/

//**TREENIN POISTAMINEN***/
  const deleteTraining = (id) => {
    
    if (window.confirm('Are you sure?')) {//Käyttäjältä kysytään vahvistus, jos ok suorittaa delete-toiminnon
       fetch('https://customerrest.herokuapp.com/api/trainings/'+id, {
         method: 'DELETE'})//Halutaan lähettää tämä kutsu DELETE-metodilla
       .then(response => {
         if (response.ok){//jos vastaus on ok, haluamme päivittää autolistan
          setMsg("Training has been successfully deleted!");
          openSnackbar();//kutsutaan snackbar funktiota
          fetchTrainings();//Halutaan päivittää asiakaslista, jotta poistettu asiakas
         }
         else  {
           alert('Something went wrong');
          }
       })
       .catch(err => console.error(err))//Konsoliin tulostuu punainen virheteksti
     }
   }
//**TREENIN POISTAMINEN--LOPPUU***/

//**TAULUKKO**/
  const columns = [
    { field: 'id', sortable: true, filter: true, width: 100},
    { field: 'date', width: 250,
      valueFormatter: function (params) {
        return moment(params.value).format('lll');}
    },
    { field: 'duration', sortable: true, filter: true, width: 150},
    { field: 'activity', sortable: true, filter: true, width: 200},
    
    { headerName: 'CustomerId',
      field: 'customer.id',
      sortable: true,
      filter: true,
      width: 150},

    { headerName: 'Last name',
      field: 'customer.lastname',
      sortable: true,
      filter: true,
      width: 150},

    { headerName: 'First name',
      field: 'customer.firstname',
      sortable: true, 
      filter: true, 
      width: 150},

    //POISTO SARAKE 
    {
      headerName: '',
      field: 'links.href',
      width: 80,
      cellRendererFramework: params => //Paluuarvossa, kerrotaan mitä tänne renderöidään
      <IconButton color="secondary" onClick={() => deleteTraining(params.data.id)}>
        <DeleteIcon />
      </IconButton>
    },
  ]
  //**TAULUKKO--LOPPUU**/

//**RENDERÖINTI**/
  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
          suppressCellSelection={true}//poistaa solujen siniset valintareunukset
        />
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={3000}//4 s näkyvissä
        onClose={closeSnackbar}>
        <Alert
        severity="error">
        {msg}  
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Traininglist;