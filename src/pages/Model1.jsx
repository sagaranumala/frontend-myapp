import React, { useState,useEffect} from 'react'
import './Model1.css'
import axios from 'axios'

function Model1({name}) {
     const [dataScenarioName,setDataScenarioName]=useState(name.scenarioName);
     const [dataScenarioTime,setDataScenarioTime]=useState(name.scenarioTime);
     const [update,setUpdate]=useState();
     var rest_api=process.env.REACT_APP_API;
     

   const handelChange1=(e)=>{
      setDataScenarioName(e.target.value);
   }
   const handelChange2=(e)=>{
      setDataScenarioTime(e.target.value);
 }

 //UPDATING SCENARIO DATA 
 useEffect(()=>{
  if(update){
     axios.put(`${rest_api}/${update.id}`,update)
        .then(res =>{
           alert('success')
        }).catch(err => console.log(err));
    }
 },[update])

 const handleSave = ()=>{
    let data=name;
    data.scenarioName=dataScenarioName;
    data.scenarioTime=dataScenarioTime;
    setUpdate(data)
 }

  return (
    <div className='container-model'>
           <div className='model-name'>
              <label htmlFor="scenario_name" style={{color:"white"}}>Scenario Name</label>
              <input type="text" id="scenario_name" className='scenario-name' value={dataScenarioName} onChange={handelChange1}/>
           </div>
           <div>
              <label htmlFor="scenario_time" style={{color:"white"}}>Scenario Time(seconds)</label>
              <input type="number" id="scenario_time" className='scenario-time' value={dataScenarioTime} onChange={handelChange2}/>
           </div>
           <div>
               <button onClick={handleSave} className='save-btn'>Save</button>
           </div>
    </div>
  )
}

export default Model1
