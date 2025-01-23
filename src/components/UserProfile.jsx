import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../store/UserSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  if (!localStorage.getItem("access_token")) {
    return null; // Hide UserProfile if no token is present
  }

  if (loading) return <p>Loading profile...</p>;
  if (error || !profile || !profile.avatar) return null;

  return (
    <div className="flex items-center space-x-2">
      {profile ? (
        <>
          <img
            className="h-8 w-8 rounded-full"
            src={profile.avatar}
            alt="User Avatar"
          />
          <span className="text-sm text-gray-900 dark:text-white">
            {profile.name}
          </span>
        </>
      ) : (
        <>
          <svg
            className="h-8 w-8 rounded-full text-gray-400 bg-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <p className="text-sm text-gray-900 dark:text-white">Guest</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
