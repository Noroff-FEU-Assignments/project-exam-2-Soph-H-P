import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AddSighting from './Pages/AddSighting';
import Contact from './Pages/Contact';
import EditSighting from './Pages/EditSighting';
import EditUsers from './Pages/EditUsers';
import Events from './Pages/Events';
import Home from './Pages/Home';
import ModerateSightings from './Pages/ModerateSightings';
import MySightings from './Pages/MySightings';
import SightingsMap from './Pages/SightingsMap';
import SingleSightingPage from './Pages/SingleSightingPage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-sighting" element={<AddSighting />} />
            <Route path="/sighting/:id" element={<SingleSightingPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sightings-map" element={<SightingsMap />} />
            <Route path="/my-sightings" element={<MySightings />} />
            <Route path="/admin/moderate-sightings" element={<ModerateSightings />} />
            <Route path="/admin/edit-users" element={<EditUsers />} />
            <Route path="/admin/edit-sighting" element={<EditSighting />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
