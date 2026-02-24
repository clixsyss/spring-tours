import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CruiseShips from './pages/CruiseShips';
import TravelPackages from './pages/TravelPackages';
import TransportFleets from './pages/TransportFleets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cruise-ships" element={<CruiseShips />} />
        <Route path="/travel-packages" element={<TravelPackages />} />
        <Route path="/transport-fleets" element={<TransportFleets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
