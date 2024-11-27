import React from "react";

interface SuggestionProps {
  suggestions: string[];
  children: React.ReactNode;
}

const Suggestion: React.FC<SuggestionProps> = ({ suggestions, children }) => {
  return (
    <div className="relative inline-flex items-center group">
      {children}
      <div className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {suggestions.map((suggestion, index) => {
          return <div key={index}>{suggestion}</div>;
        })}
      </div>
    </div>
  );
};

export default Suggestion;
