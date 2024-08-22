import create from 'zustand';

const useStore = create((set) => ({
  data: Array.from({ length: 20 }, () => Array(50).fill('')),
  searchQuery: '',
  updateCell: (row, col, value) =>
    set((state) => {
      const newData = [...state.data];
      newData[row][col] = value;
      return { data: newData };
    }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useStore;