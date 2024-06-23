import React from "react";

export default function Result({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const perc = (points / maxPossiblePoints) * 100;

  let emoji;
  if (perc === 100) emoji = "🏅";
  if (perc > 80 && perc < 100) emoji = "🙌";
  if (perc > 50 && perc < 80) emoji = "😅";
  if (perc > 0 && perc < 50) emoji = "🤔";
  if (perc === 0) emoji = "😢";

  return (
    <>
      <div className="result">
        {emoji} You scored {points} out of {maxPossiblePoints} (
        {Math.ceil(perc)}
        %)
      </div>
      <p className="highscore">Highscore : {highscore} points</p>
      <div className="restart">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}
