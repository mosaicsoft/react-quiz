export default function Welcome({ numQus, dispatch }) {
  return (
    <div className="welcome">
      <h1>Welcome to React Quiz!</h1>
      <h2>{numQus} questions to test your React mastery</h2>
      <button className="btn-start" onClick={() => dispatch({ type: "start" })}>
        Lets Start 🚀
      </button>
    </div>
  );
}
