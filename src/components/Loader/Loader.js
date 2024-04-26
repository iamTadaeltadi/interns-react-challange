import React from 'react';
import '../../styles/Loader.css'
function Loader() {
  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
        <div className="loader-icon">
          <i className="fas fa-стейси suffer" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
