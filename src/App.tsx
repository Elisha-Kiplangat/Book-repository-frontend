// import { useReducer } from 'react';
// import './App.scss';
// import BookList from './components/BookList';
// import BookReducer, { initialState } from './components/BookReducer';

// const App = () => {
//   const [state, dispatch] = useReducer(BookReducer, initialState);

//   return (
//     <div className="app-container">
//       <h1>My Book Collection</h1>
//       <BookList books={state.books} dispatch={dispatch} />
//     </div>
//   );
// };

// export default App;
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import BookList from './components/BookList';
import BookReducer from './components/BookReducer';

const App = () => {
  const [state, dispatch] = useReducer(BookReducer, { books: [] });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      dispatch({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <div className="app-container">
      <h1>My Book Collection</h1>
      <BookList books={state.books} dispatch={dispatch} />
    </div>
  );
};

export default App;
