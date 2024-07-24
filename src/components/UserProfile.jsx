import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/UserSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return (
    <div className="flex items-center space-x-2">
      {profile ? (
        <>
          <img className="h-8 w-8 rounded-full" src={profile.avatar} alt="User Avatar" />
          <span className="text-sm text-gray-900 dark:text-white">{profile.name}</span>
        </>
      ) : (
        <p className="text-sm text-gray-900 dark:text-white">No profile data</p>
      )}
    </div>
  );
};

export default UserProfile;
