import React from "react";

export default function Questions({ qus, dispatch, ans }) {
  const hasAnswered = ans !== null;

  return (
    <div>
      <h4>{qus.question}</h4>
      <div className="options">
        {qus.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === ans ? "answer" : ""} ${
              hasAnswered
                ? index === qus.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAns", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
