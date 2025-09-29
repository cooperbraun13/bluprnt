type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="search_container">
      <input
        type="text"
        id="searchBar"
        name="searchbar"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
