import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Ensure CSS is imported

const TooltipProvider = ({ children }) => {
  return (
    <>
      {children}
      <Tooltip
        id="app-tooltip"
        place="top"
        effect="solid"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default TooltipProvider;
