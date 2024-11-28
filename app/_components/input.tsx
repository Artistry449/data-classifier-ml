import React from "react";
import Suggestion from "./suggestion";

const renderHighlightedText = (
  text: string,
  wrongWords: string[],
  suggestions: string[]
) => {
  const words = text.split(/\s+/);
  return words.map((word, index) => {
    const isWrong = wrongWords.includes(word);
    return isWrong ? (
      <Suggestion suggestions={suggestions}>
        <span
          key={index}
          className="hover:cursor-pointer"
          style={{
            textDecoration: "underline",
            textDecorationColor: "red",
            color: "red",
            marginRight: "4px",
          }}
        >
          {word}
        </span>
      </Suggestion>
    ) : (
      <span
        key={index}
        style={{
          textDecoration: "none",
          textDecorationColor: "transparent",
          color: "black",
          marginRight: "4px",
        }}
      >
        {word}
      </span>
    );
  });
};

const input = ({
  text,
  summaryText,
  setText,
  wrongWords,
  suggestions,
  wordCount,
  handleSummary,
  charCount,
  handleCheck,
}: {
  text: string;
  summaryText: string;
  setText: (value: string) => void;
  wrongWords: string[];
  suggestions: object;
  wordCount: number;
  handleSummary: () => void;
  charCount: number;
  handleCheck: () => void;
}) => {
  const words = text.split(/\s+/);
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
          className="col-span-5 h-full outline-none bg-transparent z-0 text-black p-4 "
          style={{
            caretColor: "black",
          }}
        />
        <div className="flex justify-center">
          <div className="w-1 h-full bg-slate-400 rounded-full" />
        </div>
        <div className="h-full w-full col-span-5 max-h-[300px] overflow-auto">
          <div
            className="p-4"
            style={{
              color: "black",
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {words.map((word, index) => {
              const isWrong = wrongWords.includes(word);
              return isWrong ? (
                <Suggestion suggestions={suggestions[word]}>
                  <span
                    key={index}
                    className="hover:cursor-pointer"
                    style={{
                      textDecoration: "underline",
                      textDecorationColor: "red",
                      color: "red",
                      marginRight: "4px",
                    }}
                  >
                    {word}
                  </span>
                </Suggestion>
              ) : (
                <span
                  key={index + 1000}
                  style={{
                    textDecoration: "none",
                    textDecorationColor: "transparent",
                    color: "black",
                    marginRight: "4px",
                  }}
                >
                  {word}
                </span>
              );
            })}
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
          <button
            onClick={handleSummary}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-green-700 rounded-xl ml-4"
          >
            Агуулгыг хураангуйлах
          </button>
        </div>
      </div>
      <div>
      <textarea
      readOnly
      className="border w-full mt-4 h-16"
          placeholder="Хураангуй..."
          value={summaryText}
          style={{
            caretColor: "black",
          }}
        />
      </div>
    </div>
  );
};

export default input;
