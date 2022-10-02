import './antd-theme/antd-customised.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Footer from './components/layout/Footer';
import Navagation from './components/layout/Navigation';
import { AuthStateProvider } from './context/AuthContext';
import { UserStateProvider } from './context/UserContext';
import AddSighting from './pages/AddSighting';
import Contact from './pages/Contact';
import EditSighting from './pages/EditSighting';
import EditUsers from './pages/EditUsers';
import Events from './pages/Events';
import Home from './pages/Home';
import Login from './pages/Login';
import ModerateSightings from './pages/ModerateSightings';
import MySightings from './pages/MySightings';
import NotFound from './pages/NotFound';
import RegisterUser from './pages/RegisterUser';
import SightingsMap from './pages/SightingsMap';
import SingleSightingPage from './pages/SingleSightingPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

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
                <Route path="/admin/edit-users/:id" element={<EditUsers />} />
                <Route path="/admin/edit-sighting/:id" element={<EditSighting />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
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
