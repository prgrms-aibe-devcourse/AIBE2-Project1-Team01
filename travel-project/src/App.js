import "./App.css";
import Navbar from "./category/Navbar";
import Footer from "./category/Footer";
import { BrowserRouter } from "react-router-dom"; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          {/* 여기에 Routes 나중에 넣을 수 있음 */}
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
