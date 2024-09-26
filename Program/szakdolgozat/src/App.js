import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Other/Home';
import { Navbar } from './components/Other/Navbar';
import { Cart } from './components/Other/Cart';
import { SearchedItems } from './components/Other/SearchedItems';
import { Admin } from './components/Other/Admin';
import { Edit } from './components/Other/Edit';
import { AddItem } from './components/Other/AddItem';
import { Supplements } from './components/Menu/Supplements';
import { Machines } from './components/Menu/Machines';
import { Additional } from './components/Menu/Additional';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Pay } from './components/Other/Pay';
import { DataProvider } from './ContextAPI';

function App() {
  return (
    <>
    <DataProvider>
    <Router>
    <div>
        <h1>FitJim</h1>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Supplements' element={<Supplements />} />
            <Route path='/Machines' element={<Machines />} />
            <Route path='/Additional' element={<Additional />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/search/:searchString' element={<SearchedItems />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Edit/:itemName" element={<Edit />} />
            <Route path="/AddItem" element={<AddItem />} />
          </Routes>
    </div>
    </Router>
    </DataProvider>
    </>
  );
}

export default App;
