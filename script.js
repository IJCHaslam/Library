// Array containing books. 
let myLibrary = [];

// Book constructor
function Book(title, author, pages, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.rating = rating
    this.info = function() {
        return(`${title} by ${author}, ${pages} pages, ${rating}/10`)
    }
}

function addBookToLibrary(title, author, pages, rating) {
    let newBook = new Book(title, author, pages, rating);
    myLibrary.push(newBook);
}

// Sample books
addBookToLibrary("Crime and Punishment", "Fyodor Dostoyevsky", 656, "10");
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 550, "10");
addBookToLibrary("Stoner", "John Williams", 450, "10");

// Add books to a table
function displayBooks() {
    let table = document.getElementById('mytable')
    myLibrary.forEach(book => {
        let row = `<tr> 
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pages}</td>
                    <td>${book.rating}</td>`
            table.innerHTML += row
    });
}

displayBooks();