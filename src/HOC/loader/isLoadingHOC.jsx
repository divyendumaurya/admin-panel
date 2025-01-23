import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "./loading-colour.json";

const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    const setLoadingStage = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center rounded-lg">
              <div className="w-60 h-60">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ opacity: 1 }}
                />
              </div>
              {content && (
                <span className="mt-2 text-base text-gray-800 font-medium">
                  {content}
                </span>
              )}
            </div>
          </div>
        )}

        <WrappedComponent
          {...props}
          setLoading={setLoadingStage}
          isLoading={isLoading}
          setContent={setContent}
          content={content}
        />
      </>
    );
  }

  return HOC;
};

export default IsLoadingHOC;
