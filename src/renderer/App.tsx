import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import Welcome from "src/layouts/welcome/Welcome";
import NewProfile from 'src/layouts/welcome/NewProfile';

function WelcomeScreen() {
  return (
    <Welcome />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path='/profile' element={<NewProfile />} />
      </Routes>
    </Router>
  );
}
