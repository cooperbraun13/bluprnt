import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

export default function LayoutMinimal() {
  return (
    <>
      <main className="flex-container no-topbar">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
