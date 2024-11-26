"use client";

import React, { useState, useEffect } from "react";
import { FaRegPaste, FaRegCopy } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import Tooltip from "./_components/tooltip";

const HomePage = () => {
  const [text, setText] = useState("");
  const [isClipboardAvailable, setClipboardAvailable] = useState(false);

  useEffect(() => {
    setClipboardAvailable(
      typeof navigator !== "undefined" && !!navigator.clipboard
    );
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

  const handleCheck = async () => {
    if (!text) {
      console.log("Text is empty or undefined!");
      return;
    }

    fetch("https://fafd-34-23-54-14.ngrok-free.app/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: text }),
    })
      .then((res) => {
        console.log("res: ", res);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return res.json();
      })
      .then((parsedRes) => {
        console.log("parsedRes: ", parsedRes);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
  const charCount = text.replace(/\s/g, "").length;

  return (
    <div className="bg-yellow-400 flex items-center h-[500px] justify-center">
      <div className="flex flex-col md:flex-row w-full h-full max-w-6xl max-h-96">
        <div className="w-full flex h-full">
          <div className="flex flex-col space-y-2 mr-3">
            <Tooltip text="Бичвэрийг талбар дээр хуулах">
              <button
                onClick={handlePaste}
                className={`bg-gray-100 p-2 rounded hover:bg-gray-200 ${
                  !isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={!isClipboardAvailable}
              >
                <FaRegPaste size={20} />
              </button>
            </Tooltip>

            <Tooltip text="Бичвэрийг хуулж авах">
              <button
                onClick={handleCopy}
                className={`bg-gray-100 p-2 rounded hover:bg-gray-200 ${
                  !isClipboardAvailable ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={!isClipboardAvailable}
              >
                <FaRegCopy size={20} />
              </button>
            </Tooltip>

            <Tooltip text="Бичвэрийг устгах">
              <button
                onClick={handleClear}
                className="bg-gray-100 p-2 rounded hover:bg-gray-200"
              >
                <MdOutlineDeleteForever size={20} />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col w-full border border-gray-300 resize-none bg-white rounded-lg shadow p-6 h-full">
            <textarea
              placeholder="Текстээ оруулна уу..."
              value={text}
              onChange={(e) => {
                const input = e.target.value;
                setText(input.slice(0, 1200));
              }}
              maxLength={1200}
              className="w-full h-full outline-none"
            />

            <div className="flex justify-between mt-4 text-sm text-gray-600 items-center">
              <div>Үгийн тоо: {wordCount}</div>
              <div>
                Тэмдэгтийн тоо: {charCount}/1200
                <button
                  onClick={handleCheck}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-green-700 rounded-xl ml-4"
                >
                  Алдааг шалгах
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full grid col-span-1 ml-3 md:w-1/4 gap-3">
          <div className=" border-gray-200 p-3 bg-white rounded-lg shadow row-span-3">
            <h2 className="text-sm font-semibold pb-1">
              Алдаатай үгсийн жагсаалт
            </h2>
            <div className="w-full border bg-gray-700" />
          </div>
          <div className=" border-gray-200 p-3 bg-white rounded-lg shadow row-span-2">
            <h2 className="text-sm font-semibold pb-1">Текстийн төрөл</h2>
            <div className="w-full border bg-gray-700" />
          </div>
          <div className=" border-gray-200 p-3 bg-white rounded-lg shadow row-span-1">
            <h2 className="text-sm font-semibold pb-1">Ялгаатай үгийн тоо</h2>
            <div className="w-full border bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
