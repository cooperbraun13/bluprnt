import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Products.css";

export default function Products() {
  return (
    <>
      <Header 
        title="Products" 
        showTagline={false} 
        background="alt" 
        leftSlot={<BackButton />} 
      />
      <div className="products-page">
      </div>
    </>
  );
}