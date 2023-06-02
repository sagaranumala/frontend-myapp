import React from 'react'
import {useRef,useState,useEffect} from 'react'
import axios from 'axios'
import "./Addscenario.css"
import {Link} from "react-router-dom"


function Addscenario() {
     const [data,setData]=useState();
     const scenarioName=useRef();
    const scenarioTime=useRef();
    var rest_api=process.env.REACT_APP_API;
    
    const submit=(e)=>{
            e.preventDefault();
            var data1={};
            if(scenarioName.current.value&&scenarioTime.current.value){
            data1.scenarioName=scenarioName.current.value;
            data1.scenarioTime=scenarioTime.current.value;
            data1.vehicleList=[];
            reset();
            setData(data1)
            }else{
               alert("Please enter both fieds")
            }
     }
     const reset=()=>{
      scenarioName.current.value='';
      scenarioTime.current.value='';
     }

     //ADDING DATA IN API(CREATE)
     useEffect(()=>{
      if(data){
         axios.post(`${rest_api}/`,data)
            .then(res =>{
               alert('success')
            }).catch(err => console.log(err));
        }
     },[data])
     //console.log(data)
  return (
    <div className='container-add'>
      <span className='add-scenario'>Scenario / add</span>
      <span className='headding'>Add Scenario</span>
      <form>
        <div className='input-fields'>
           <div>
              <label htmlFor="scenario_name" style={{color:"white"}}>Scenario Name</label>
              <input type="text" id="scenario_name" required className='scenario-name' ref={scenarioName}/>
           </div>
           <div>
              <label htmlFor="scenario_time" style={{color:"white"}}>Scenario Time(seconds)</label>
              <input type="number" id="scenario_time" required className='scenario-time' ref={scenarioTime}/>
           </div>
         </div>
        </form>
        <div className='buttons'>
           <button type='button' className='submit-btn' onClick={submit}>Add</button>
           <button type='button' className='reset-btn' onClick={reset}>Reset</button>
           <Link to="/"><button type='button' className='goback-btn'>Go Back</button></Link>
        </div>
    </div>
  )
}

export default Addscenario
