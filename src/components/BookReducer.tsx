export interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

export interface State {
  books: Book[];
}

type Action =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'EDIT_BOOK'; payload: Book }
  | { type: 'SET_BOOKS'; payload: Book[] };

const BookReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? { ...book, title: action.payload.title, author: action.payload.author, year: action.payload.year }
            : book
        ),
      };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default BookReducer;

export const initialState = {
  books: [],
};
