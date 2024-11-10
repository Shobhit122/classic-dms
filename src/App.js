import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './contexts/authContext';
import Navbar from './components/Navbar';
import RegisterBattery from './components/RegisterBattery';
import SearchBattery from './components/SearchBattery';
import ListBattery from './components/ListBattery';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register-battery" element={<RegisterBattery />} />
                <Route path="/search-battery" element={<SearchBattery />} />
                <Route path="/list-batteries" element={<ListBattery />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;