import { useReducer, useEffect } from 'react';
import './App.scss';
import BookList from './components/BookList';
import BookReducer, { initialState } from './components/BookReducer';
import useLocalStorage from './components/hooks/UseLocalStorage';
// import Book from './components/BookReducer'

const App = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage('books', initialState.books);
  const [state, dispatch] = useReducer(BookReducer, { books: storedBooks });

  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  return (
    <div className="app-container">
      <h1>My Book Collection</h1>
      <BookList books={state.books} dispatch={dispatch} />
    </div>
  );
};

export default App;
