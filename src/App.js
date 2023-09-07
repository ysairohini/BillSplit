import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App" fluid>
      <Navigate to="/ShowGroup" />
    </div>
  );
}

export default App;
