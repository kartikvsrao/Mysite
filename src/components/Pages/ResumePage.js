import React from 'react';
import Navbar from '../GeneralComponents/Navbar';

const ResumePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Resume</h1>
        <div className="resume-container">
          <embed src="/KartikRao.pdf" type="application/pdf" width="100%" height="600px" />
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
