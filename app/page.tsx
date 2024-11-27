"use client";
import React, { useState, useEffect } from "react";
import Toolbar from "./_components/toolbar";
import Input from "./_components/input";
import Results from "./_components/results";
import Tooltip from "./_components/tooltip";
import Suggestion from "./_components/suggestion";

const HomePage = () => {
  const [text, setText] = useState("");
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [numberOfDifferentWord, setNumberOfDifferentWord] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [topic, setTopic] = useState("");
  const [isClipboardAvailable, setClipboardAvailable] = useState(false);
  const serverURL = "https://bc32-34-41-92-217.ngrok-free.app/process";

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

    fetch(serverURL, {
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
        if (parsedRes.buruu_ug) {
          setWrongWords(parsedRes.buruu_ug);
        }
        if (parsedRes.sedev) {
          setTopic(parsedRes.sedev);
        }
        if (parsedRes.suggestions) {
          setSuggestions(parsedRes.suggestions);
        }
        if (parsedRes.final_sentence) {
          setNumberOfDifferentWord(parsedRes.final_sentence.split(" ").length);
        }
        console.log(suggestions);
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

  const renderHighlightedText = () => {
    const words = text.split(/\s+/);
    return words.map((word, index) => {
      const isWrong = wrongWords.includes(word);
      return isWrong ? (
        <Suggestion suggestions={[]}>
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

  return (
    <div className="bg-[#F5F7F8] flex items-center h-full justify-center text-gray-600">
      <div className="flex flex-col md:flex-row w-full h-full max-w-6xl max-h-96">
        <div className="w-full flex h-full">
          <Toolbar
            handlePaste={handlePaste}
            handleCopy={handleCopy}
            handleClear={handleClear}
            isClipboardAvailable={isClipboardAvailable}
          />
          <Input
            text={text}
            setText={setText}
            renderHighlightedText={renderHighlightedText}
            wordCount={wordCount}
            charCount={charCount}
            handleCheck={handleCheck}
          />
        </div>
        <Results
          wrongWords={wrongWords}
          topic={topic}
          numberOfDifferentWord={numberOfDifferentWord}
        />
      </div>
    </div>
  );
};

export default HomePage;
