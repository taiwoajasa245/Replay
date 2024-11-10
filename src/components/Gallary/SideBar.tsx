import React from 'react';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      transition-transform lg:translate-x-0 lg:static lg:w-64 bg-gray-800 text-white h-full z-10`}>
      <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <nav className="flex flex-col p-4 space-y-4">
        <a href="#" className="p-2 rounded hover:bg-gray-700">Dashboard</a>
        <a href="#" className="p-2 rounded hover:bg-gray-700">Settings</a>
        <a href="#" className="p-2 rounded hover:bg-gray-700">Profile</a>
        {/* Add more links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;
