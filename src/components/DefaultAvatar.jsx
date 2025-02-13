import React, { useState } from "react";

const DefaultAvatar = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
  >
    <circle cx="50" cy="50" r="45" fill="#D1D5DB" />
    <circle cx="50" cy="40" r="20" fill="#6B7280" />
    <path d="M20,75 Q50,90 80,75 Q50,60 20,75" fill="#6B7280" />
  </svg>
);

const Avatar = ({ src, className }) => {
  const [imageError, setImageError] = useState(false);

  return imageError ? (
    <DefaultAvatar className={className} />
  ) : (
    <img className={className} src={src} onError={() => setImageError(true)} />
  );
};

export default Avatar;
