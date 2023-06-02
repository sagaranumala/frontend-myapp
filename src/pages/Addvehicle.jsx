import React from 'react'
import { useEffect,useState,useRef } from 'react';
import axios from 'axios'
import "./Addvehicle.css"

function Addvehicle() {
   const [senariodata,setScenarioData]=useState([]);
   const [vehicleData,setVehicleData]=useState()
   const [value,setValue]=useState("");
   const [currentSenariodata,setCurrentScenarioData]=useState();
   const [direction,setDirection]=useState();
   const scenario=useRef();
   const vehicleSpeed=useRef();
   const vehicleName=useRef();
   const positionX=useRef();
   const positionY=useRef();
  const vehicleDirection=useRef();
  var rest_api=process.env.REACT_APP_API;


  //GETTING DATA FROM API(GET)
  useEffect(()=>{
       axios.get(`${rest_api}`)
          .then(res =>{
             console.log(res.data)
             setScenarioData(res.data)
          }).catch(err => console.log(err));
   },[])
   
   const handleChange=(e)=>{
       senariodata.map((item)=>{
         if(item.scenarioName==e.target.value){
            //console.log(item.id)
            setCurrentScenarioData(item)
          }
       })
        setValue(e.target.value)
   }
   const handleDirection=(e)=>{
      setDirection(e.target.value)
   }
   const addVehicle=()=>{
            let data={};
            let data2={};
            let data1=currentSenariodata.vehicleList;
            data.scenarioName=scenario.current.value;
            data.scenarioTime=currentSenariodata.scenarioTime;
            if(vehicleName.current.value&&vehicleSpeed.current.value&&positionX.current.value&&positionY.current.value&&vehicleDirection.current.value){
            data2.vehicleName=vehicleName.current.value;
            data2.vehicleSpeed=vehicleSpeed.current.value;
            data2.positionX=positionX.current.value;
            data2.positionY=positionY.current.value;
            data2.vehicleDirection=vehicleDirection.current.value;
            data1.push(data2)
            data.vehicleList=data1
            setVehicleData(data)
            reset()
            }else{
               alert("Please enter all fieds");
            }
   }
   const reset=()=>{
      scenario.current.value='';
      vehicleName.current.value='';
      vehicleSpeed.current.value='';
      positionX.current.value='';
      positionY.current.value='';
      vehicleDirection.current.value='';
   }

   //UPDATING VEHICLEDATA OF API(UPDATE)
   useEffect(()=>{
      console.log(vehicleData)
      if(vehicleData){
         axios.put(`${rest_api}/${currentSenariodata._id}`,vehicleData)
            .then(res =>{
               alert('success')
            }).catch(err => console.log(err));
        }
     },[vehicleData])

  return (
    <div className='vehicle-container'>
      <span className='vehicle-add'>Vehicle / add</span>
      <span className='vehicle-headding'>Add Vehicle</span>
      <from>
      <div className='vehicle-list'>
         <div>
            <label htmlFor="select_scenario" style={{color:"white"}}>Scenarios List</label>
            <select className='dropdown1' id='select_scenario' value={value} onChange={handleChange} ref={scenario}>
               <option>Select Scenario</option>
                  {senariodata.map((item)=>{
                  return  <option value={item.scenarioName}>{item.scenarioName}</option>
         
                  })

                  }
            </select>
            </div>
            <div>
              <label htmlFor="vehicle_name" style={{color:"white"}}>Vehicle Name</label>
              <input type="text" id="vehice_name" className='vehicle-name' ref={vehicleName}/>
           </div>
           <div>
              <label htmlFor="vehicle_speed" style={{color:"white"}}>Speed</label>
              <input type="number" id="vehicle_speed" className='vehicle-speed' ref={vehicleSpeed}/>
           </div>
           <div>
              <label htmlFor="position_x" style={{color:"white"}}>Position X</label>
              <input type="number" id="position_x" min="1" max="800" className='vehicle-positionX' ref={positionX}/>
           </div>
           <div>
              <label htmlFor="position_y" style={{color:"white"}}>Position Y</label>
              <input type="number" id="position_x" className='vehicle-positionY' ref={positionY}/>
           </div>
           <div>
           <label htmlFor="vehicle_direction" style={{color:"white"}}>Scenarios List</label>
            <select className='vehicle-direction' id='svehicle_direction' value={direction} onChange={handleDirection} ref={vehicleDirection}>
               <option>Select Scenario</option>
               <option value="Towards">Towards</option>
               <option value="Backwards">Backwards</option>
               <option value="Upwards">Upwards</option>
               <option value="Downwards">Downwards</option>
            </select>
           </div>
      </div>
      </from>
      
       <div className='buttons'>
           <button type='button' className='submit-btn' onClick={addVehicle}>Add</button>
           <button type='button' className='reset-btn1' onClick={reset}>Reset</button>
           <button type='button' className='goback-btn'>Go Back</button>
        </div>
    </div>
  )
}

export default Addvehicle
