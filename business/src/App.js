import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Inscription from './components/Inscription/Inscription';
import Connexion from './components/Connexion/Connexion';
import Product from './components/Products/Product';
import Panier from './components/Products/Panier';
import Home from './components/Home/Home';
import Profile from './components/NavBar/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/Connexion" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;