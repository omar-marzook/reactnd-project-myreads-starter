import React, { Component } from 'react';
import Book from './Book';

class Shelves extends Component {
    filterBook(booksArray, key) {
        let newList = [];
        for (let item of booksArray) {
            if (item.shelf === key) {
                newList.push(item);
            }
        }
        return newList;
    }

    updateBook(book, option, parent) {
        parent.updateBook(book, option);
    }

    render() {
        return (
            <ol className='books-grid'>
                {this.filterBook(this.props.books, this.props.shelf).map(book => (
                    <Book key={book.id} book={book} parent={this.props.parent} />
                ))}
            </ol>
        );
    }
}

export default Shelves;
