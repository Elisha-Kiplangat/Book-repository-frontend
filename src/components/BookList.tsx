import React, { useState } from 'react';
import './BookList.scss';
import { Book } from './BookReducer';
import Form from './Form';

interface BookListProps {
  books: Book[];
  dispatch: React.Dispatch<any>;
}

const BookList: React.FC<BookListProps> = ({ books, dispatch }) => {
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_BOOK', payload: id });
  };

  return (
    <div className="book-list-container">
      <Form dispatch={dispatch} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
      <h2>Book List</h2>
      <div>
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
