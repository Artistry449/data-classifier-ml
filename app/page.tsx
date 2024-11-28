"use client";
import React, { useState, useEffect } from "react";
import Toolbar from "./_components/toolbar";
import Input from "./_components/input";
import Results from "./_components/results";
import Rootwords from "./_components/rootwords";

const HomePage = () => {
  const [text, setText] = useState("");
  const [wrongWords, setWrongWords] = useState<string[]>([]);
  const [summaryText, setSummaryText] = useState("");
  const [numberOfDifferentWord, setNumberOfDifferentWord] = useState(0);
  const [suggestions, setSuggestions] = useState<Object>();
  const [topic, setTopic] = useState("");
  const [isClipboardAvailable, setClipboardAvailable] = useState(false);
  const [rootWords, setRootWords] = useState("");
  const serverURL = "https://68ce-34-73-149-71.ngrok-free.app/process";

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
          setRootWords(parsedRes.final_sentence);
          setNumberOfDifferentWord(parsedRes.final_sentence.split(" ").length);
        }
        console.log(suggestions);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const handleSummary = async () => {
    if (!text) {
      console.log("Text is empty or undefined!");
      return;
    }

    const res = await fetch("http://172.16.152.188:3300/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({content: text }),
    })
    const parsedRes = await res.json()
    if (parsedRes.summary) {
      setSummaryText(parsedRes.summary)
    }
  }
  
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
  const charCount = text.replace(/\s/g, "").length;

  return (
    <div className="bg-[#F5F7F8] flex flex-col items-center h-full justify-center text-gray-600">
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
            wrongWords={wrongWords}
            suggestions={suggestions}
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
      <Rootwords rootWords={rootWords} />
    </div>
  );
};

export default HomePage;
