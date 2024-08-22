"use client";
import useStore from '../../store';
const SearchBar = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: '100%',
          maxWidth: '20rem',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '0.25rem',
        }}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;