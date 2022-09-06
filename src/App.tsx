import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navagation from './components/layout/Navigation';
import AddSighting from './Pages/AddSighting';
import Contact from './Pages/Contact';
import EditSighting from './Pages/EditSighting';
import EditUsers from './Pages/EditUsers';
import Events from './Pages/Events';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ModerateSightings from './Pages/ModerateSightings';
import MySightings from './Pages/MySightings';
import SightingsMap from './Pages/SightingsMap';
import SingleSightingPage from './Pages/SingleSightingPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import './antd-theme/antd-customised.css';
import { AuthStateProvider } from './context/AuthContext';
import { UserStateProvider } from './context/UserContext';
import RegisterUser from './Pages/RegisterUser';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthStateProvider>
      <UserStateProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Navagation />
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-sighting" element={<AddSighting />} />
                <Route path="/sighting/:id" element={<SingleSightingPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events" element={<Events />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/sightings-map" element={<SightingsMap />} />
                <Route path="/my-sightings" element={<MySightings />} />
                <Route path="/admin/moderate-sightings" element={<ModerateSightings />} />
                <Route path="/admin/edit-users" element={<EditUsers />} />
                <Route path="/admin/edit-sighting" element={<EditSighting />} />
              </Routes>
            </div>
            <Footer />
          </ThemeProvider>
        </Router>
      </UserStateProvider>
    </AuthStateProvider>
  );
}

export default App;
