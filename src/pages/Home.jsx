import React from 'react'
import { useEffect,useState,useRef } from 'react';
import './Home.css'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Model2 from './Model2';

function Home() {
  const [scenarioData,setScenarioData]=useState([]);      //STORE ALL SCENARIO DATA
  const [vehicleData,setVehicleData]=useState([]);        //STORE ALL VEHICLE DATA
  const [scenario,setScenario]=useState('');              //STORE SELECTED ONE SCENARIO 
  const [vehicle,setVehicle]=useState()                   //STORE UPDATED DATA
  const [id,setId]=useState();                            //STORE ID TO CRUD
  const [editMode,setEditMode]=useState(false)             //TO DISPLAY EDIT MODEL
  const [data1,setData1]=useState();                      //TO PASS DATA TO MODEL TO EDIT
  const [startSimulation,setStartSimulation]=useState(0); //TO START ANIMATION
  var rest_api=process.env.REACT_APP_API;                 //API URL
  

//GETTING ALL SCENARIO DATA
const getData=()=>{
  axios.get(`${rest_api}`)
  .then(res =>{
     setScenarioData(res.data)
  }).catch(err => console.log(err));
}
  useEffect(()=>{
    getData();
  },[])

//UPDATING VEHICLE DATA OF API
useEffect(()=>{
  if(vehicle){
     axios.put(`${rest_api}/${id}`,vehicle)
        .then(res =>{
           alert('success')
           getData();
        }).catch(err => console.log(err));
    }
 },[vehicle,id])

//FUNCTION TO FILTER VEHICLELIST ACCORDING TO SCENARIO
const handleChange=(e)=>{
  var newArray=scenarioData.filter(function(el){
    return el.scenarioName==e.target.value;
  })
  setData1(newArray[0])
  setVehicleData(newArray[0].vehicleList)
  setScenario(e.target.value)
}

//FUNCTION TO FILTER VEHICLELIST ACCORDING TO SCENARIO
const handleDeleteVehicle=(index,e)=>{
  e.preventDefault();
  var arr=scenarioData.filter(function(el){
    return el.scenarioName==scenario;
  })
   let x=arr[0].vehicleList;
  let newArr=x.filter(function(el,i){
     return i!=index;
  })
  arr[0].vehicleList=newArr;
  setId(arr[0]._id)
 setVehicle(arr[0])
}

const handelEditVehicle=(i,e)=>{
  //console.log(vehicleData[i])
  let currentVehicle=data1;
  currentVehicle.index=i;
  setData1(currentVehicle);
  setEditMode(!editMode);
}
 
 const moveVehicals=((e)=>{
   setStartSimulation(1);
 })
 const resetVehicals=()=>{
  setStartSimulation(0)
 }

 const handleCancel2=()=>{
  setEditMode(!editMode);
 }
  return (
    <>
    {!editMode ?
    <div>
        <div className='select-scenarioName'>
        <label htmlFor="select_scenario" style={{color:"white"}}>Scenarios List</label>
            <select className='dropdown2' id='select_scenario' placeholder='Select Scenario' value={scenario} onChange={handleChange}>
                        <option>Select Scenario</option>
                  {scenarioData.map((item,i)=>{

                  return <option value={item.scenarioName}>{item.scenarioName}</option>
                  })
                  }
            </select>
        </div>
        <table>
          <thead>
            <tr>
               <th>Vehicle Id</th>
               <th>Vehicle Name</th>
               <th>Position X</th>
               <th>Position Y</th>
               <th>Speed</th>
               <th>Direction</th>
               <th>Edit</th>
               <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {
                  vehicleData.map((d,i)=>(
                    <tr key={i}> 
                        <td>{i+1}</td>
                        <td>{d.vehicleName}</td>
                        <td>{d.positionX}</td>
                        <td>{d.positionY}</td>
                        <td>{d.vehicleSpeed}</td>
                        <td>{d.vehicleDirection}</td>
                        <td><EditIcon onClick={e=>handelEditVehicle(i,e)}/></td>
                        <td onClick={e=>handleDeleteVehicle(i,e)}><DeleteIcon/></td>
                    </tr>
                  ))
                }
            </tbody>
        </table>
        <div className='simulation'>
            <button className='start-btn' onClick={moveVehicals}>Start Simulation</button>
            <button className='reset-btn' onClick={resetVehicals}>Reset Simulation</button>
        </div>
        <div className='graph'>
                     {
              vehicleData.map((d,i)=>{
               let x1=0;
               let x2=0;
               let x3=0;
               let x4=0;
              switch (d.vehicleDirection) {
                   case 'Towards':
                      x1=d.vehicleSpeed*data1.scenarioTime*1;
                      break;
                   case 'Backwards':
                      x2=d.vehicleSpeed*data1.scenarioTime*(-1);
                      break;
                   case 'Downwards':
                      x3=d.vehicleSpeed*data1.scenarioTime*1;
                      break;
                  default:
                      x4=d.vehicleSpeed*data1.scenarioTime*(-1);
              }
              let left_right=x2<0?x2:x1;
              let top_bottom=x4<0?x4:x3;
              let styleObj={position:"obsolute",top:`${d.positionX + (top_bottom*startSimulation)}px`,left:`${d.positionY + (left_right*startSimulation)}px`,webkitTransition:`all ${data1.scenarioTime}s linear`, color:"red"}
          
        return <h1 className='car' style={styleObj}>*</h1>
              })
            }
        </div>
    </div> :
       <div className='model-item'>
          <div className='cancel-icon2' onClick={handleCancel2}><CancelSharpIcon />Close</div>
          <Model2 vehicleDetails={data1}/>
       </div>
          }
  </>
  )
}

export default Home
