import React from 'react';

const Navbar: React.FC = () => (
  <div className="flex items-center justify-between p-4 bg-white shadow-lg lg:ml-64">
    <h1 className="text-xl font-bold">Dashboard</h1>
    <div>
      <button className="p-2 rounded-full bg-gray-200">Profile</button>
    </div>
  </div>
);

export default Navbar;
