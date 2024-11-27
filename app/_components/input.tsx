import React from "react";

const input = ({
  text,
  setText,
  renderHighlightedText,
  wordCount,
  charCount,
  handleCheck,
}: {
  text: string;
  setText: (value: string) => void;
  renderHighlightedText: () => React.ReactNode;
  wordCount: number;
  charCount: number;
  handleCheck: () => void;
}) => {
  return (
    <div className="flex flex-col w-full border border-gray-300 bg-white rounded-lg shadow p-4 h-full">
      <div className="w-full h-full grid grid-cols-11 gap-2">
        <textarea
          placeholder="Текстээ оруулна уу..."
          value={text}
          onChange={(e) => {
            const input = e.target.value;
            setText(input.slice(0, 1200));
          }}
          maxLength={1200}
          className="col-span-5 h-full outline-none bg-transparent z-0 text-black p-4"
          style={{
            caretColor: "black",
          }}
        />
        <div className="flex justify-center">
          <div className="w-1 h-full bg-slate-400 rounded-full" />
        </div>
        <div className="h-full w-full col-span-5">
          <div
            className="p-4"
            style={{
              color: "black",
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {renderHighlightedText()}
          </div>
        </div>
      </div>

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
  );
};

export default input;
