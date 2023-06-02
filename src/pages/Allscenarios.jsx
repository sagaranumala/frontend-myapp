import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import './Allscenarios.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom"
import Model1 from './Model1';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

function Allscenarios() {
  const [scenarioData,setScenarioData]=useState([]);    
  const [scenarioId,setScenarioId]=useState();
  const [edit,setEdit]=useState(true);                  //TO DISPLAY EDIT MODEL
  const [editScenario,setEditScenario]=useState({})     //TO PASS  SELECTED SCENARIODATA DATA TO MODEL
  var rest_api=process.env.REACT_APP_API;               //API URL

  
  //GETTING SCENARIODATA FROM API
  const getData=()=>{
    axios.get(`${rest_api}`)
          .then(res =>{
            setScenarioData(res.data)
          }).catch(err => console.log(err));
  }
  useEffect(()=>{
       getData();
   },[])

   //DELETING SCENARIO DATA BY ID
   useEffect(()=>{
    axios.delete(`${rest_api}/${scenarioId}`)
       .then(res =>{
         getData();
       }).catch(err => console.log(err));
},[scenarioId])

//DELETE SINGLE SCENARIO FUN
const handleDeleteScenario=(index,e)=>{
      e.preventDefault();
      var arr=scenarioData.filter((v,i)=> i==index)
      setScenarioId(arr[0]._id)
}

//DELETE ALL SCENARIOS Of API
const handleDeleteAll=()=>{
  scenarioData.forEach((item)=>{
  axios.delete(`${rest_api}/${item.id}`)
          .then(res =>{
            console.log(res);
          }).catch(err => console.log(err));
        })
    getData();
}

//EDIT SCENARIO
const handleEdit= (i,e)=>{
   setEditScenario(scenarioData[i]);
    setEdit(!edit);
}
const handleCancel=()=>{
  setEdit(!edit)
}
  return (
    <>
      {  edit ?
        <div>
        <div className='container1'>
          <div><span className='headding'>All Scenarios</span></div>
          <div className='buttons'>
            <Link to="/addscenario"><button type='button' className='add-senario-btn'>New Scenario</button></Link>
            <Link to="/addvehicle"><button type='button' className='add-vehicle-btn'>Add vehicle</button></Link>
            <button type='button' className='delete-btn' onClick={handleDeleteAll}>Delete All</button>
          </div>
        </div>
        <table >
          <thead>
            <tr>
               <th>Scenario Id</th>
               <th>Scenario Name</th>
               <th>Scenario Time</th>
               <th>Number of Vehicals</th>
               <th>Add Vehicle</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {
                  scenarioData.map((d,i)=>(
                    <tr key={i}> 
                        <td>{i+1}</td>
                        <td>{d.scenarioName}</td>
                        <td>{d.scenarioTime}</td>
                        <td>{d?.vehicleList?.length}</td>
                        <td><button className='add-vehicle-table-btn'>+</button></td>
                        <td><EditIcon onClick={e=>handleEdit(i,e)}/></td>
                        <td><DeleteIcon onClick={e=>handleDeleteScenario(i,e)}/></td>
                    </tr>
                  ))
                }
            </tbody>
        </table> 
        </div>:
        <div className='model-item'>
          <div className='cancel-icon'><CancelSharpIcon onClick={handleCancel}/>Close</div>
        <Model1 name={editScenario}/>
        </div>
}
    </>
  )
}

export default Allscenarios
