import "./App.css";
import PlanTrip from "./components/PlanTrip";
import Form from "./pages/Form";
// import Map from "./components/Map";
import MapComponent from "./components/Map";

function App() {
  return (
    <div className="App">
      {/* <h1>Your AI Trip Planner</h1>
      <PlanTrip /> */}
      <Form />
      {/* <div style={{ width: "100vw", height: "100vh" }}>
        <MapComponent /> */}
      {/* </div> */}
    </div>
  );
}

export default App;
