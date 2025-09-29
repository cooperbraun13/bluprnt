import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Nav />
      <div className="flex-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
