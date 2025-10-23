import { Routes, Route } from "react-router-dom";
import LayoutFull from "./LayoutFull";
import LayoutMinimal from "./LayoutMinimal";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Projects from "./pages/Projects/Projects";
import Vendors from "./pages/Vendors/Vendors";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutFull />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<LayoutMinimal />}>
        <Route path="products" element={<Products />} />
        <Route path="projects" element={<Projects />} />
        <Route path="vendors" element={<Vendors />} />
      </Route>
    </Routes>
  );
}
