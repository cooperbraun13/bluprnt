export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="heading">
      <h1>{title}</h1>
      <p className="tagline">Your blueprint for success.</p>
    </div>
  );
}
