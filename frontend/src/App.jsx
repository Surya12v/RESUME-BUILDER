import React, { useState } from 'react';
import 'antd/dist/reset.css';
import ResumeEditor from './components/ResumeEditor';

const App = () => {
  const [resumeData, setResumeData] = useState({});

  const handleUpdateResume = (data) => {
    setResumeData(data);
  };

  return (
    <div className="app">
      <div className="top-bar flex items-center justify-between px-6 py-3 bg-white shadow">
        <span className="font-semibold text-lg">Resume Builder</span>
      </div>
      <div className="editor-section">
        <ResumeEditor onUpdateResume={handleUpdateResume} />
      </div>
    </div>
  );
};

export default App;
