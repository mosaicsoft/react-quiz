import { useEffect, useReducer } from "react";
import Nav from "./Nav";
import Loading from "./Loading";
import Error from "./Error";
import Welcome from "./Welcome";
import Questions from "./Questions";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
import Result from "./Result";
import Footer from "./Footer";
import Timer from "./Timer";

export default function App() {
  const SECS_PER_QUS = 30;

  const initState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUS,
        };
      case "newAns":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQus":
        return { ...state, index: state.index + 1, answer: null };
      case "result":
        return {
          ...state,
          status: "result",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...state,
          index: 0,
          points: 0,
          status: "ready",
          answer: null,
          secondsRemaining: state.questions.length * SECS_PER_QUS,
        };
      case "timer":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "result" : state.status,
        };
      default:
        throw new Error("Action unknown");
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const numQus = state.questions.length;
  const maxPossiblePoints = state.questions.reduce((x, y) => x + y.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataError" }));
  }, []);

  return (
    <div className="container">
      <div className="panel">
        <Nav />
        <div className="quiz">
          {state.status == "loading" && <Loading />}
          {state.status == "error" && <Error />}
          {state.status == "ready" && (
            <Welcome numQus={numQus} dispatch={dispatch} />
          )}
          {state.status == "active" && (
            <>
              <Progress
                index={state.index}
                numQus={numQus}
                points={state.points}
                maxPossiblePoints={maxPossiblePoints}
                answer={state.answer}
              />
              <Questions
                qus={state.questions[state.index]}
                dispatch={dispatch}
                ans={state.answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={state.secondsRemaining}
                />
                <NextBtn
                  dispatch={dispatch}
                  answer={state.answer}
                  index={state.index}
                  numQus={numQus}
                />
              </Footer>
            </>
          )}

          {state.status === "result" && (
            <Result
              points={state.points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={state.highscore}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </div>
  );
}
