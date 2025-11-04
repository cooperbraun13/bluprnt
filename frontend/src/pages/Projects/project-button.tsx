import React from "react";


// export default function ProjectClickedButton({ projectName }: { projectName: string }) {
//     return <button className="proj-button">{projectName}</button>
// }



export default function OpenProject() {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("Project button clicked!");
    }
}
