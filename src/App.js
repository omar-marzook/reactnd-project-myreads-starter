import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import Shelves from './Shelves';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResult: [],
    query: ''
  };

  componentDidMount() {
    if (!window.location.href.includes('search')) {
      BooksAPI.getAll().then(books => {
        this.setState({ books: books });
      });
    } else {
      BooksAPI.getAll().then(books => {
        this.setState({ searchResult: books });
      });
    }
  }

  reload() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  updateBook(book, option) {
    BooksAPI.update(book, option).then(books => {
      this.componentDidMount();
    });
  }

  checkKey(booksMap, book) {
    if (booksMap.has(book.id)) {
      booksMap.set(book.id, book);
    }
  }

  softBooks(searchResults, books) {
    let booksMap = new Map();
    books.map(book => booksMap.set(book.id, book));
    searchResults.map(book => this.checkKey(booksMap, book));
    let searchResultArray = [];
    Array.from(booksMap.keys()).map(key =>
      searchResultArray.push(booksMap.get(key))
    );
    this.setState({ books: searchResultArray });
  }

  updateQuery(query) {
    this.setState({
      query: query.trim()
    });
    BooksAPI.search(query).then(books => {
      if (books !== undefined && books.constructor === Array) {
        this.softBooks(this.state.searchResult, books);
      } else {
        this.setState({ books: [] });
      }
    });
  }

  render() {
    return <div className='app'>
    
      <Route path='/search' render={({ history }) => <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/' onClick={() => this.reload()}>
            Close
                </Link>
          <div className='search-books-input-wrapper'>
            <input className='search-contacts' autoFocus type='text' placeholder='Search by title or author'
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map(book => (
              <Book key={book.id} book={book} parent={this} history={history} />
            ))}
          </ol>
        </div>
      </div>} />

      <Route exact path='/' render={() => <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <Shelves key={'currentlyReading'} books={this.state.books} shelf={'currentlyReading'} parent={this} />
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <Shelves key={'wantToRead'} books={this.state.books} shelf={'wantToRead'} parent={this} />
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <Shelves key={'read'} books={this.state.books} shelf={'read'} parent={this} />
              </div>
            </div>
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search' className='search-books'
            onClick={() => this.setState(
              {
                searchResult: this.state.books,
                books: [],
                query: ''
              }
            )}>
            Add a book
          </Link>
        </div>
      </div>} />

    </div>
  }
}

export default BooksApp;