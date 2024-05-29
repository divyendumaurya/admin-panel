import React from 'react';

const UserProfile = ({ user, handleLogout }) => {
  return (
    <div className="flex items-center space-x-4">
      <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h4>
        <button onClick={handleLogout} className="text-sm text-blue-500 hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
