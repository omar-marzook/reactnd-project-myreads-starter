import React, { Component } from 'react';

class Book extends Component {

    updateBook(book, option, parent, history) {
        if (history !== undefined) {
            history.push('/');
        }
        parent.updateBook(book, option);
    }

    render() {
        const book = this.props.book;

        return (
            <li key={book.id}>
                <div className='book'>
                    <div className='book-top'>
                        <div className='book-cover'
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks === undefined ? null : book.imageLinks.thumbnail})`
                            }}>
                        </div>
                        <div className='book-shelf-changer'>
                            <select value={book.shelf === undefined ? 'none' : book.shelf}
                                onChange={(event) => this.updateBook(book, event.target.value, this.props.parent, this.props.history)}>
                                <option value='move' disabled>Move to...</option>
                                <option value='currentlyReading'>Currently Reading</option>
                                <option value='wantToRead'>Want to Read</option>
                                <option value='read'>Read</option>
                                <option value='none'>None</option>
                            </select>
                        </div>
                    </div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book;