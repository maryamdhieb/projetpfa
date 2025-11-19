import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import LoginSignIn from './components/LoginSignIn/LoginSignIn';
import Client from './components/GestionClients/Client';
import Product from './components/Products/Product';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/signin" element={<LoginSignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;