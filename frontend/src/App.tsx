import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Placeholder from "./components/Placeholder/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Placeholder title="All Products" />} />
        <Route path="projects" element={<Placeholder title="Projects" />} />
        <Route path="vendors" element={<Placeholder title="Vendor List" />} />
      </Route>
    </Routes>
  );
}
