import Header from "../../components/Header/Header";
import ProjectOverview from "./project-overview";
import ProjectButton from "./project-button";
import "./Projects.css";

export default function Projects() {
  return <div>
    <Header title="Projects" showTagline={false} background="alt" />

        <button className="proj-button">Add Project</button>
        
        <div className="projects-overview">
        <div className="proj">
            <h2>Project 1</h2>
        </div>
        <div className="proj">
            <h2>Project 2</h2>
        </div>
        <div className="proj">
            <h2>Project 3</h2>
        </div>
        </div>
    </div>
}
