import React from 'react';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 px-8 py-4 z-50 transform ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
      {/* Sidebar content */}
      <h2 className="text-white text-lg font-semibold mb-4" onClick={toggle} >Sidebar</h2>
      <ul>
        <li className="text-gray-300 hover:text-white cursor-pointer mb-2">Call</li>
     
       
      </ul>
      {/* Close button */}
      <button className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-white" onClick={toggle}>
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
