export default function ProjectClickedButton({
  projectName,
}: {
  projectName: string;
}) {
  return <button className="proj-button">{projectName}</button>;
}
