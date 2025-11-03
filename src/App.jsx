import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Search } from "./components/search";
import { MealDetail } from "./components/mealDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/meal/:idMeal" element={<MealDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

