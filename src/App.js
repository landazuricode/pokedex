import { HashRouter, Routes, Route, Link } from "react-router-dom";
import {
  ProtectedRoutes,
  Home,
  Pokedex,
  PokeItem,
  Settings,
} from "./components";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="pokeball__background"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokeItem />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Link className="btn__settings" to="/settings">
        <i className="bx bxs-cog"></i>
      </Link>
    </HashRouter>
  );
}

export default App;
