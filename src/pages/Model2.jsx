import React from 'react'
import "./Model2.css"
import { useState,useEffect } from 'react'
import axios from 'axios';

function Model2({vehicleDetails}) {
  // let x=vehicleDetails.vehicleList[vehicleDetails.index];
    const [vehicleData1,setVehicleData1]=useState(vehicleDetails.vehicleList[vehicleDetails.index]);
    const [newVehicle,setNewVehicle]=useState();
    const [details,setDetails]=useState({
        vehicleName:vehicleData1.vehicleName,
        vehicleSpeed:vehicleData1.vehicleSpeed,
        positionX:vehicleData1.positionX,
        positionY:vehicleData1.positionY,
        vehicleDirection:vehicleData1.vehicleDirection
    });
    var rest_api=process.env.REACT_APP_API;
  //console.log(vehicleDetails.vehicleList[vehicleDetails.index].vehicleName);

    //COLLECTING DATA FROM INPUT FIELDS
    const handleVehicleData=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDetails((prev)=>{
            return {...prev , [name]:value}
        })
    }
  
    //UPDATING VEHICLE DATA
    useEffect(()=>{
      if(newVehicle){
         console.log(newVehicle.vehicleList);
         axios.put(`${rest_api}/${newVehicle._id}`,newVehicle)
            .then(res =>{
               alert('success')
            }).catch(err => console.log(err));
        }
     },[newVehicle])

   //STORING UPDATED DATA
    const handleEDitVehicle=()=>{
      let data=vehicleDetails;
      data.vehicleList[data.index].vehicleName=details.vehicleName
      data.vehicleList[data.index].vehicleSpeed=details.vehicleSpeed
      data.vehicleList[data.index].positionX=details.positionX
      data.vehicleList[data.index].positionY=details.positionY
      data.vehicleList[data.index].vehicleDirection=details.vehicleDirection

      delete data.index;
      setNewVehicle(data);
    }
  return (
    <div className='container-model2'>
           <div>
              <label htmlFor="vehicle_name" style={{color:"white"}}>Vehicle Name: </label>
              <input type="text" id="vehice_name"  className='vehicle-name1' name='vehicleName' value={details.vehicleName} onChange={handleVehicleData}/>
           </div>
           <div>
              <label htmlFor="vehicle_speed" style={{color:"white"}}>Speed: </label>
              <input type="number" id="vehicle_speed" className='vehicle-speed1' name='vehicleSpeed' value={details.vehicleSpeed} onChange={handleVehicleData}/>
           </div>
           <div>
              <label htmlFor="position_x" style={{color:"white"}}>Position X: </label>
              <input type="number" id="position_x" min="1" max="800" className='vehicle-positionX1' name='positionX' value={details.positionX} onChange={handleVehicleData}/>
           </div>
           <div>
              <label htmlFor="position_y" style={{color:"white"}}>Position Y: </label>
              <input type="number" id="position_x" className='vehicle-positionY1' name='positionY' value={details.positionY} onChange={handleVehicleData}/>
           </div>
           <div>
           <label htmlFor="vehicle_direction" style={{color:"white"}}>Scenarios List: </label>
            <select className='vehicle-direction1' id='svehicle_direction' name='vehicleDirection' value={details.vehicleDirection} onChange={handleVehicleData}>
               <option>Select Scenario</option>
               <option value="Towards">Towards</option>
               <option value="Backwards">Backwards</option>
               <option value="Upwards">Upwards</option>
               <option value="Downwards">Downwards</option>
            </select>
           </div>
           <div>
               <button className='button-save2' onClick={handleEDitVehicle}>Save</button>
           </div>
    </div>
  )
}

export default Model2
