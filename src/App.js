import "./App.css";
import Form from "./pages/Form";
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Form />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/login" element = {<Login />} />
          {/*           <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}
//
export default App;
//
