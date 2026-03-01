import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import CruiseShips from './pages/CruiseShips';
import TravelPackages from './pages/TravelPackages';
import TransportFleets from './pages/TransportFleets';
import CruiseDetail from './pages/CruiseDetail';
import About from './pages/About';
import Mice from './pages/Mice';
import ScrollToTop from './components/ScrollToTop';
import TravelPackagesDetails from './pages/TravelPackagesDetails';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.35,
  ease: 'easeInOut',
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/cruise-ships"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <CruiseShips />
            </motion.div>
          }
        />
        <Route
          path="/cruises/:slug"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <CruiseDetail />
            </motion.div>
          }
        />
        <Route
          path="/travel-packages"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <TravelPackages />
            </motion.div>
          }
        />
        <Route
          path="/travel-packages/details/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <TravelPackagesDetails />
            </motion.div>
          }
        />
        <Route
          path="/transport-fleets"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <TransportFleets />
            </motion.div>
          }
        />
        <Route
          path="/mice"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Mice />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
