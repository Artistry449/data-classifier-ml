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

  }

  const wordCount = text.trim().split(/\s+/).filter((word) => word).length;
  const charCount = text.replace(/\s/g, "").length;

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row w-full h-full max-w-6xl max-h-96">
        <div className="w-full flex h-full">
          <div className="flex flex-col space-y-2 mr-5">
          <button
              onClick={handlePaste}
              className={`bg-gray-100 p-1 rounded hover:bg-gray-200 ${
                !isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={!isClipboardAvailable}
            >
              <img src="paste-regular.svg" alt="Paste" className="w-10 h-10" />
          </button>

            <button
              onClick={handleCopy}
              className={`bg-gray-100 p-2 rounded hover:bg-gray-200 ${
                !isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={!isClipboardAvailable}
            >
              <img src="copy-regular.svg" alt="Copy" className="w-10 h-10" />
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-100 p-2 rounded hover:bg-gray-200"
            >
              Clear
            </button>

            <button
              onClick={handleCheck}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded "
            >
              Алдааг шалгах
            </button>
          </div>
          <div className="flex flex-col w-full border border-gray-300 rounded resize-none bg-white rounded-lg shadow p-6 h-full">
            {/* <textarea
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={10}
              className="w-full h-full outline-none"
            /> */}
            <textarea
                placeholder="Type your text here..."
                value={text}
                onChange={(e) => {
                  const input = e.target.value;
                  setText(input.slice(0, 1200)); 
                }}
                maxLength={1200} 
                className="w-full h-full outline-none"
              />

        <div className="flex justify-between mt-4 text-sm text-gray-600">
            <div>Үгийн тоо: {wordCount}</div>
            <div>
              Тэмдэгтийн тоо: {charCount}/1200
            </div>
          </div>
          </div>
          

        </div>
          <div className="w-full md:w-1/4 ml-5 border-gray-200 p-4 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold">Алдаатай үгсийн жагсаалт</h2>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
