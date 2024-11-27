import React from "react";
import Tooltip from "./tooltip";
import { FaRegPaste, FaRegCopy } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";

const toolbar = ({
  handlePaste,
  handleCopy,
  handleClear,
  isClipboardAvailable,
}: {
  handlePaste: () => void;
  handleCopy: () => void;
  handleClear: () => void;
  isClipboardAvailable: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-2 mr-3">
      <Tooltip text="Бичвэрийг талбар дээр хуулах">
        <button
          onClick={handlePaste}
          className={`bg-white p-2 rounded hover:bg-gray-200 ${
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
          className={`bg-white p-2 rounded hover:bg-gray-200 ${
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
          className="bg-white p-2 rounded hover:bg-gray-200"
        >
          <MdOutlineDeleteForever size={20} />
        </button>
      </Tooltip>
    </div>
  );
};

export default toolbar;
