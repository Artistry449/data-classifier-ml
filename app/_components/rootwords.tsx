import React from "react";

const rootwords = ({ rootWords }: { rootWords: string }) => {
  return (
    <div className="mt-4 border border-gray-300 bg-white rounded-lg shadow p-4">
      {rootWords}
    </div>
  );
};

export default rootwords;
