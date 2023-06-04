import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Addscenario from './components/Addscenario';
import Allscenarios from './components/Allscenarios';
import Addvehicle from './components/Addvehicle';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addscenario" element={<Addscenario/>} />
          <Route path="/allscenarios" element={<Allscenarios/>} />
          <Route path="/addvehicle" element={<Addvehicle/>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
