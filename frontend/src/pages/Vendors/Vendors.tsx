import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Vendors.css";

export default function Vendors() {
  return (
    <>
      <Header 
        title="Vendors" 
        showTagline={false} 
        background="alt" 
        leftSlot={<BackButton />} 
      />
      <div className="vendors-page">
      </div>
    </>
  );
}