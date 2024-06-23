import React from "react";

export default function Progress({
  index,
  numQus,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQus} value={index + Number(answer != null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQus}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
