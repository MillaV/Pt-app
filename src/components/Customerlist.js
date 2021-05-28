import React, {useState, useEffect} from 'react';
import '../App.css';

import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ReactExport from 'react-export-excel';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';

function Customerlist() {

// Excel-toiminnallisuus
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const[customers,setCustomers]= useState([]);
    useEffect(() => { 
      fetchCustomers();
    }, []); 

//SNACKBAR
  const[open,setOpen] = useState(false);
  const[msg,setMsg] = useState('');
  const[severity,setSeverity] = useState('');

  const openSnackbar = () => {
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  //ASIAKKAAN POISTAMINEN
  const deleteCustomer = (url) => {
     if (window.confirm('Are you sure?')) {//Käyttäjältä kysytään vahvistus, jos ok suorittaa delete-toiminnon
       fetch(url, {
         method: 'DELETE'})//Halutaan lähettää tämä kutsu DELETE-metodilla
       .then(response => {
         if (response.ok){//jos vastaus on ok, haluamme päivittää autolistan
          setMsg("Customer has been successfully deleted!");
          setSeverity("error");
          openSnackbar();//kutsutaan snackbar funktiota
          fetchCustomers();//Halutaan päivittää asiakaslista, jotta poistettu asiakas
         }
         else  {
           alert('Something went wrong');
          }
       })
       .catch(err => console.error(err))//Konsoliin tulostuu punainen virheteksti
     }
   }
  //ASIAKKAAN POISTAMINEN--LOPPUU
  
  //TIETOJEN HAKEMINEN**/
    const fetchCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
  //TIETOJEN HAKEMINEN--LOPPUU

  //ASIAKKAAN LISÄÄMINEN
    const addCustomer = (newcustomer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        body: JSON.stringify(newcustomer),
        headers: {'Content-type': 'application/json'}
        })
      .then(response => {
        if (response.ok){
          setMsg("Customer has been successfully added!");
          setSeverity("success");
          openSnackbar();
          fetchCustomers();
        }
        else  
          alert('Something went wrong');
      })
      .catch(err => console.error(err))
    }
  //ASIAKKAAN LISÄÄMINEN -- LOPPUU

  //TREENIN LISÄÄMINEN
    const addTraining = (newtraining) => {
      //console.log(moment(newtraining.date).format());
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        body: JSON.stringify(newtraining),
        headers: {'Content-type': 'application/json'}
        })
      .then(response => {
        if (response.ok){
          setMsg("Training has been successfully added!");
          setSeverity("success");
          openSnackbar();
          fetchCustomers();
          
        }
        else  
          alert('Something went wrong');
      })
      .catch(err => console.error(err))
    }

  //TREENIN LISÄÄMINEN -- LOPPUU

  //ASIAKKAAN MUOKKAAMINEN
  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomer),
      headers: {'Content-type': 'application/json'}
    })//editoitavan asiakkaan url
    .then(response => {
      if (response.ok) {
        setMsg("Customer information has been updated!");
        setSeverity("success");
        openSnackbar();
        fetchCustomers();
      } 
      else 
        alert('Something went wrong');
    })
    .catch(err => console.error(err))
  }


  //TAULUKKO
  const columns = [
    { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, width: 150},
    { headerName: 'First name',field: 'firstname', sortable: true, filter: true, width: 150},
    { field: 'email', sortable: true, filter: true, width: 180},
    { field: 'phone', sortable: true, filter: true, width: 150},
    { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true, width: 180},
    { field: 'postcode', sortable: true, filter: true, width: 120},
    { field: 'city', sortable: true, filter: true, width: 110}, 
    // MUOKKAUS SARAKE
    { headerName: 'Actions',
      field: 'links.href',
      width: 100,
      cellRendererFramework: params => 
        <EditCustomer link={params.data.links[1].href} customer={params.data} editCustomer={editCustomer} />
    },
    //POISTO SARAKE 
    {
      headerName: '',
      field: 'links.href',
      width: 80,
      cellRendererFramework: params => //Paluuarvossa, kerrotaan mitä tänne renderöidään
      <IconButton color="secondary" onClick={() => deleteCustomer(params.data.links[1].href)}>
        <DeleteIcon />
      </IconButton>
    },
    //TREENIN LISÄYS SARAKE
    { headerName: '',
      field: 'links.href',
      width: 170,
      cellRendererFramework: params => 
        <AddTraining link={params.data.links[1].href} customer={params.data} addTraining={addTraining} /> 
    },
  ]
  //TAULUKKO--LOPPUU

  //RENDERÖINTI
  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
        <div className="Buttons">
          <ExcelFile element={<IconButton size="small"  style={{marginTop: 10}} variant="outlined" color="primary" ><AssignmentReturnedIcon/> </IconButton>}>
            <ExcelSheet data={customers} name="Customers">
              <ExcelColumn label="Last name" value="lastname"/>
              <ExcelColumn label="First name" value="firstname"/>
              <ExcelColumn label="Email" value="email"/>
              <ExcelColumn label="Phone" value="phone"/>
              <ExcelColumn label="Address" value="streetaddress"/>
              <ExcelColumn label="Postcode" value="postcode"/>
              <ExcelColumn label="City" value="city"/>
            </ExcelSheet>
          </ExcelFile>
          <AddCustomer addCustomer={addCustomer}/>
      </div>
        <AgGridReact
          rowData={customers}
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
        severity={severity}>
        {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
//"Customer has been successfully deleted!"
export default Customerlist;