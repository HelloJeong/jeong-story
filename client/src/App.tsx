import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import HomeContainer from "./containers/HomeContainer";
import SignupContainer from "./containers/SignupContainer";

function App() {
  return (
    <div className="h-full bg-black text-white">
      <Router>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/signup" element={<SignupContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
