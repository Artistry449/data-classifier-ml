import React from "react";

const rootwords = ({ rootWords }: { rootWords: string }) => {
  return (
    <div className="mt-4 w-full max-w-6xl max-h-[100px] overflow-auto border border-gray-300 bg-white rounded-lg shadow p-4">
      <p className="mb-4">Үндэс үгсийн жагсаалт</p>
      {rootWords}
    </div>
  );
};

export default rootwords;
