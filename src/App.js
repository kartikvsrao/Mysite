import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/Pages/HomePage';
import ResumePage from './components/Pages/ResumePage';
import TodoListPage from './components/Pages/ToDoList';
import RatingsPage from './components/Pages/RatingsPage';
import GymPage from './components/Pages/GymPage';
import PokerPage from './components/Pages/PokerPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/todo" element={<TodoListPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
          <Route path="/gym" element={<GymPage />} />
          <Route path="/poker" element={<PokerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
