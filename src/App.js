import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Color from './pages/Color';
import Home from './pages/Home';
import Login from './pages/Login';
import Story from './pages/Story';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/story" element={<PrivateRoute />}>
          <Route path="/story" element={<Story />} />
        </Route>
        <Route path="/color" element={<PrivateRoute />}>
          <Route path="/color" element={<Color />} />
        </Route>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
