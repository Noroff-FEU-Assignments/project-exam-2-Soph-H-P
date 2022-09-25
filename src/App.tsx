import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navagation from './components/layout/Navigation';
import AddSighting from './pages/AddSighting';
import Contact from './pages/Contact';
import EditSighting from './pages/EditSighting';
import EditUsers from './pages/EditUsers';
import Events from './pages/Events';
import Login from './pages/Login';
import Home from './pages/Home';
import ModerateSightings from './pages/ModerateSightings';
import MySightings from './pages/MySightings';
import SightingsMap from './pages/SightingsMap';
import SingleSightingPage from './pages/SingleSightingPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import './antd-theme/antd-customised.css';
import { AuthStateProvider } from './context/AuthContext';
import { UserStateProvider } from './context/UserContext';
import RegisterUser from './pages/RegisterUser';
import Footer from './components/layout/Footer';
import NotFound from './pages/NotFound';

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
                <Route path="/admin/edit-sighting" element={<EditSighting />} />
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
