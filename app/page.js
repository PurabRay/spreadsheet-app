import Grid from './components/Grid';
import SearchBar from './components/SearchBar';

export const metadata = {
  title: 'Spreadsheet App',
};

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Spreadsheet App</h1>
      <SearchBar />
      <Grid />
    </div>
  );
}
