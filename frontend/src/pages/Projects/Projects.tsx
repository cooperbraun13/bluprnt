import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Projects.css";

export default function Projects() {
  return (
    <>
      <Header 
        title="Projects" 
        showTagline={false} 
        background="alt" 
        leftSlot={<BackButton />} 
      />
      <div className="projects-page">
      </div>
    </>
  );
}