import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full">
      <div className="border-8 mx-auto my-52 border-blue-600 w-60 h-60 border-b-transparent rounded-full animate-[spin_1.3s_ease-out_infinite]">
        <div className="border-8 w-56 h-56 m-auto border-transparent border-t-blue-300 rounded-full animate-[spin_1.8s_ease-in_infinite]">
          <div className="border-8 w-52 h-52 m-auto border-transparent border-b-blue-400 rounded-full animate-[spin_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
