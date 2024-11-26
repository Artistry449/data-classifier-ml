"use client";

import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [text, setText] = useState("");
  const [isClipboardAvailable, setClipboardAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      setClipboardAvailable(true);
    }
  }, []);

  const handlePaste = async () => {
    if (isClipboardAvailable) {
      try {
        const clipText = await navigator.clipboard.readText();
        setText(clipText);
      } catch (err) {
        console.error("Failed to read from clipboard:", err);
      }
    }
  };

  const handleCopy = async () => {
    if (isClipboardAvailable) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    }
  };

  const handleClear = () => {
    setText("");
  };

  const handleCheck = () => {

  };

  const wordCount = text.trim().split(/\s+/).filter((word) => word).length;
  const charCount = text.replace(/\s/g, "").length;

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-full space-y-8 md:space-y-0 md:space-x-8">

        <div className="w-full md:w-2/3 flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handlePaste}
              className={`bg-blue-100 p-3 rounded-md hover:bg-blue-200 text-blue-700 ${!isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={!isClipboardAvailable}
            >
              <img src="paste-regular.svg" alt="Paste" className="w-12 h-12" />
            </button>

            <button
              onClick={handleCopy}
              className={`bg-yellow-100 p-3 rounded-md hover:bg-yellow-200 text-yellow-700 ${!isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={!isClipboardAvailable}
            >
              <img src="copy-regular.svg" alt="Copy" className="w-12 h-12" />
            </button>

            <button
              onClick={handleClear}
              className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 text-gray-700"
            >
              Clear
            </button>

            <button
              onClick={handleCheck}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded-md"
            >
              Алдааг шалгах
            </button>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <textarea
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => {
                const input = e.target.value;
                setText(input.slice(0, 1200));
              }}
              maxLength={1200}
              className="w-full h-48 outline-none resize-none p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-400"
            />
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <div>Үгийн тоо: {wordCount}</div>
              <div>Тэмдэгтийн тоо: {charCount}/1200</div>
            </div>
          </div>
        </div>


        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Мэдээний төрөл</h2>
            <ul className="space-y-2">
              <li className="text-gray-600">Gadaad</li>
              <li className="text-gray-600">Sport</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Алдаатай үгсийн жагсаалт</h2>

          </div>

          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Үгсийн жагсаалт</h2>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
