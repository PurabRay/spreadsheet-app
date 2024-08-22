import create from 'zustand';

const loadData = () => {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem('spreadsheetData');
    return savedData ? JSON.parse(savedData) : Array.from({ length: 20 }, () => Array(50).fill(''));
  } else {
    return Array.from({ length: 20 }, () => Array(50).fill('')); // Default data for server-side rendering
  }
};

const useStore = create((set) => ({
  data: loadData(),
  history: [],
  future: [],
  searchQuery: '',

  updateCell: (row, col, value) =>
    set((state) => {
      const newData = [...state.data];
      const previousValue = state.data[row][col];
      newData[row][col] = value;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData)); // Persist data
      }

      return {
        data: newData,
        history: [...state.history, { row, col, previousValue }],
        future: [], // Clear future on new changes
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const lastChange = state.history.pop();
      const newData = [...state.data];
      newData[lastChange.row][lastChange.col] = lastChange.previousValue;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData)); // Persist data
      }

      return {
        data: newData,
        history: [...state.history],
        future: [...state.future, { row: lastChange.row, col: lastChange.col, nextValue: newData[lastChange.row][lastChange.col] }],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const lastUndo = state.future.pop();
      const newData = [...state.data];
      const previousValue = state.data[lastUndo.row][lastUndo.col];
      newData[lastUndo.row][lastUndo.col] = lastUndo.nextValue;

      if (typeof window !== 'undefined') {
        localStorage.setItem('spreadsheetData', JSON.stringify(newData)); // Persist data
      }

      return {
        data: newData,
        history: [...state.history, { row: lastUndo.row, col: lastUndo.col, previousValue }],
        future: [...state.future],
      };
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;
