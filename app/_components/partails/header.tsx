import React from "react";
import { GiMongolia } from "react-icons/gi";

const header = () => {
  return (
    <header className=" fixed top-0 flex justify-between items-center w-full mx-auto p-4 border-b border-gray-200 ">
      <div className="flex items-center space-x-4">
        <GiMongolia size={50} className="text-gray-800" />
        <span className="text-xl font-bold text-gray-700">Алдаа засагч</span>
      </div>
      <div className="hidden md:block text-gray-600 font-medium">
        Хамтын хүч оломгүй далай
      </div>
    </header>
  );
};

export default header;
