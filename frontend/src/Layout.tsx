import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Layout() {
  const { pathname } = useLocation();

  // pages that should not show main header or nav
  const hideOn = ["/vendors", "/projects", "/products"];

  // use startsWith in case we add nested routes like /projects/username/number
  const shouldHide = hideOn.some((p) => pathname.startsWith(p));

  return (
    <>
      {!shouldHide && <Header />}
      {!shouldHide && <Nav />}
      <main
        className={`flex-container ${shouldHide ? "no-topbar" : "with-topbar"}`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
