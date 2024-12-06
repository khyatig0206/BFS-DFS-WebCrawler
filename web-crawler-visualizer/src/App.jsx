import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RealTimeDFSVisualization from "./pages/DFSVisualization";
import RealTimeBFSVisualization from "./pages/BFSVisualization";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/realtime-dfs" element={<RealTimeDFSVisualization />} />
      <Route path="/bfs" element={<RealTimeBFSVisualization />} />
    </Routes>
  </Router>
);

export default App;
