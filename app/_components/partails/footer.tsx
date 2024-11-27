import React from "react";

const footer = () => {
  return (
    <footer className="fixed bottom-0 flex flex-col md:flex-row justify-between items-center w-full mx-auto p-4 border-t border-gray-200 text-sm text-gray-600">
      <div className="text-center md:text-left">
        <p>Powered by Students</p>
        <p>© 2024 - ШУТИС МХТС оюутнууд</p>
      </div>
      <div className="mt-4 md:mt-0">
        <p>
          Contact us:{" "}
          <a href="mailto:team1@example.com" className="text-blue-500">
            team1@example.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default footer;
