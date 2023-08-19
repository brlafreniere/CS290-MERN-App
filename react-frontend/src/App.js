import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage';
import ExerciseFormPage from './pages/ExerciseFormPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App container w-50 bg-light p-5">
      <header>
        <h1>Exercise Management System</h1>
        <p>A system for managing exercise routines.</p>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises/:_id/edit" element={<ExerciseFormPage />} />
          <Route path="/exercises/create" element={<ExerciseFormPage />} />
        </Routes>
      </Router>
      <footer>
        © 2023 Blaine Lafreniere
      </footer>
    </div>
  );
}

export default App;
