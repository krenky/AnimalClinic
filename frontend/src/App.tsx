import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link, Route, Routes } from "react-router-dom";
import AnimalList from './scenes/animal'
import DoctorList from './scenes/doctor'
import OwnerList from './scenes/owner'
import ServiceList from './scenes/service'
import VaccineList from './scenes/vaccine'
import ChangeAnimal from './scenes/animal/ChangeAnimal'
import ChangeDoctor from './scenes/doctor/ChangeDoctor'
import ChangeOwner from './scenes/owner/OwnerChange'
import ChangeService from './scenes/service/ChangeService'
import ChangeVaccine from './scenes/vaccine/ChangeVaccine'
import AddAnimal from './scenes/animal/AddAnimal'
import AddDoctor from './scenes/doctor/AddDoctor'
import AddOwner from './scenes/owner/AddOwner'
import AddService from './scenes/service/AddService'
import AddVaccine from './scenes/vaccine/AddVaccine'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: "flex", height: "100%", width: "100%"}}>
      <Sidebar className="app" style={{float: "left" }}>
        <Menu>
          <MenuItem className="menu1"
          component={<Link to="/" />}>
            <h2>QUICKPAY</h2>
          </MenuItem>
          <MenuItem component={<Link to="/animals" />}> Животные </MenuItem>
          <MenuItem component={<Link to="/doctors" />}> Доктора </MenuItem>
          <MenuItem component={<Link to="/owners" />}> Хозяева </MenuItem>
          <MenuItem component={<Link to="/services" />}> Услуги </MenuItem>
          <MenuItem component={<Link to="/vaccines" />}> Прививки </MenuItem>
        </Menu>
      </Sidebar>
      {/* <h1>WELCOME TO QUICKPAY</h1> */}
      <main className='content'>
            <Routes>
              <Route path='/animals' element={<AnimalList/>} />
              <Route path='/animals/:id' element={<ChangeAnimal/>} />
              <Route path='/animals/add' element={<AddAnimal/>} />
              <Route path='/doctors' element={<DoctorList/>} />
              <Route path='/doctors/:id' element={<ChangeDoctor/>} />
              <Route path='/doctors/add' element={<AddDoctor/>} />
              <Route path='/owners' element={<OwnerList/>} />
              <Route path='/owners/:id' element={<ChangeOwner/>} />
              <Route path='/owners/add' element={<AddOwner/>} />
              <Route path='/services' element={<ServiceList/>} />
              <Route path='/services/:id' element={<ChangeService/>} />
              <Route path='/services/add' element={<AddService/>} />
              <Route path='/vaccines' element={<VaccineList/>} />
              <Route path='/vaccines/:id' element={<ChangeVaccine/>} />
              <Route path='/vaccines/add' element={<AddVaccine/>} />
            </Routes>
          </main>
    </div>
  )
}

export default App
