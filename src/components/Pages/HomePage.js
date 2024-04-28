import React from 'react';
import Navbar from '../GeneralComponents/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to MySite</h1>
        <p>This is the home page of my website. Feel free to explore!</p>
      </div>
    </div>
  );
};

export default HomePage;
