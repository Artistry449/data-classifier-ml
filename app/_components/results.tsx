import React from "react";

const results = ({
  wrongWords,
  topic,
  numberOfDifferentWord,
}: {
  wrongWords: string[];
  topic: string;
  numberOfDifferentWord: number;
}) => {
  return (
    <div className="h-full grid col-span-1 ml-3 md:w-1/4 gap-3">
      <div className="border-gray-200 p-3 bg-white rounded-lg shadow row-span-3">
        <h2 className="text-sm font-semibold pb-1">Алдаатай үгсийн жагсаалт</h2>
        <div className="w-full border bg-gray-700" />
        {wrongWords.map((word, index) => {
          return <div key={index}>{word}</div>;
        })}
      </div>
      <div className="border-gray-200 p-3 bg-white rounded-lg shadow row-span-2">
        <h2 className="text-sm font-semibold pb-1">Текстийн төрөл</h2>
        <div className="w-full border bg-gray-700" />
        {topic}
      </div>
      <div className="border-gray-200 p-3 bg-white rounded-lg shadow row-span-1">
        <h2 className="text-sm font-semibold pb-1">Ялгаатай үгийн тоо</h2>
        <div className="w-full border bg-gray-700" />
        {numberOfDifferentWord}
      </div>
    </div>
  );
};

export default results;
