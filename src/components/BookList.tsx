import { useState, useContext } from 'react';
import axios from 'axios';
import './BookList.scss';
import { Book } from './BookReducer';
import Form from './Form';
import { refreshContext } from '../App';

interface BookListProps {
  books: Book[];
  dispatch: any;
}

const BookList = ({ books, dispatch }: BookListProps) => {
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;
  const { refresh, setRefresh } = useContext(refreshContext);

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`https://book-repository-api-64t5.onrender.com/books/${id}`);
      if (response.status === 200) {
        setRefresh(!refresh);
      }
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_year}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="control">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(books.length / booksPerPage)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList;
