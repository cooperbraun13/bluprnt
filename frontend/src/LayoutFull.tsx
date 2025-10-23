import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

export default function LayoutFull() {
  return (
    <>
      <Header />
      <Nav />
      <main className="flex-container with-topbar">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
