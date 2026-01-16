import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Snowfall from "react-snowfall";

function App() {
  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
