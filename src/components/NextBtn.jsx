import React from "react";

export default function NextBtn({ dispatch, answer, index, numQus }) {
  if (answer === null) return;

  if (index < numQus - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQus" })}
      >
        Next
      </button>
    );

  if (index === numQus - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "result" })}
      >
        End Quiz
      </button>
    );
}
