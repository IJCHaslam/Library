
// Event listeners to open and close the form popup
document.getElementById('newbook').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'flex';
});

document.querySelector('.c').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.display = 'none';
    }
})

// let infoButtons;
// let removeButtons;

// Array containing books. 
let myLibrary = [];

// // Sample books
// addBookToLibrary("Crime and Punishment", "Fyodor Dostoyevsky", 656, "Read", "10");
// addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 479, "Read", "10");
// addBookToLibrary("Stoner", "John Williams", 278, "Read", "10");

// Book constructor
function Book(title, author, pages, status, rating, info) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.rating = rating
    this.info = info
}

// Adds book to array
function addBookToLibrary(title, author, pages, status, rating, info) {
    let newBook = new Book(title, author, pages, status, rating, info);
    if (myLibrary.some((book) => book.title === newBook.title)) return false;
    myLibrary.push(newBook);
    saveLocal();
    return;
}

// Adds book from form. nb - make popup later (CSS?)
function addBookFromInput(title, author, pages = "N/A", status, rating = "N/A", info = "No synopsis provided") {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    status = document.querySelector("#status").value;
    rating = document.querySelector("#rating").value;
    info = document.querySelector("#info").value;
    if (!title || !author) return false;
    addBookToLibrary(title, author, pages, status, rating, info);
    return;
}

// Add books to a table
function displayBooks() {
    let table = document.getElementById('mytable')
    table.innerHTML = '';
    myLibrary.forEach(book => {
        let row = `<tr> 
                    <td class = info-cell><button class = info-button>ℹ</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pages}</td>
                    <td><button class = status-button>${book.status}</td>
                    <td>${book.rating}</td>
                    <td><button class = remove-button>&times;</button>`
        table.innerHTML += row
    });
    // Button variables
    const removeButtons = document.getElementsByClassName('remove-button');
    const infoButtons = document.getElementsByClassName('info-button');
    const statusButtons = document.getElementsByClassName('status-button');
        for (let i = 0; i < myLibrary.length; i++) {
            // Removes a book from the library and reloads the table
            removeButtons[i].addEventListener('click', () => {
                let filtered = myLibrary.filter(book => book !== myLibrary[i]);
                myLibrary = filtered;
                saveLocal();
                displayBooks();
            });
            // Proves info on the book as an alert. note- change to popup.
            infoButtons[i].addEventListener('click', () => {
                alert(myLibrary[i].info);
            });
            // Toggles through the book status on the library and reloads table each time. 
            statusButtons[i].addEventListener('click', () => {
                if (myLibrary[i].status === "Read") {
                    myLibrary[i].status = "Not Read";
                    saveLocal();
                    displayBooks();
                } else if (myLibrary[i].status === "Not Read") {
                    myLibrary[i].status = "Currently Reading";
                    saveLocal();
                    displayBooks();
                } else if (myLibrary[i].status === "Currently Reading") {
                    myLibrary[i].status = "DNF";
                    saveLocal();
                    displayBooks();
                } else if (myLibrary[i].status === "DNF") {
                    myLibrary[i].status = "Read";
                    saveLocal();
                    displayBooks();
                }
            })
        }
}

// Submit button adds book to library and reloads table
document.getElementById("submit").addEventListener('click', function submitForm(e) {
    e.preventDefault()
    addBookFromInput();
    displayBooks()
    document.querySelector('.modal').style.display = 'none';
});

// Saves myLibrary to local storage
function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Adds local storage books to myLibrary
function  restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    displayBooks();
}

// Loads books and grid on window open
restoreLocal();

// // // Function to remove book when clear button pressed.
// function removeFromLib(book) {
//     myLibrary.splice(book, book + 1);
//     displayBooks()
// }

// // // Alerts user with book info. nb - change to popup later
// function bookInfo(book) {
//     console.log(book.info());
// }

// function changeStatus(book) {
//     if (book.status === "Read") {
//         book.status = "Not Read";
//         console.log(book.status);
//         displayBooks();
//     } else if (book.status === "Not Read") {
//         book.status = "Currently Reading";
//         console.log(book.status);
//         displayBooks();
//     } else if (book.status === "Currently Reading") {
//         book.status = "DNF";
//         console.log(book.status);
//         displayBooks();
//     } else if (book.status === "DNF") {
//         book.status = "Read";
//         console.log(book.status);
//         displayBooks();
//     }
// }


    //function displayBooks() {
    //     let table = document.getElementById('mytable');
    //     while (table.firstChild) {
    //         table.removeChild(table.firstChild);
    //       }
    //     myLibrary.forEach(book => {
    //         infoButtons = document.createElement('button');
    //         infoButtons.classList.add('info-button');
    //         infoButtons.textContent = 'ℹ️';
    //         removeButtons = document.createElement('button');
    //         removeButtons.classList.add('remove-button');
    //         removeButtons.textContent = 'x';
    //         let row = table.insertRow()
    //         let cell1 = row.insertCell(0);
    //         let cell2 = row.insertCell(1);
    //         let cell3 = row.insertCell(2);
    //         let cell4 = row.insertCell(3);
    //         let cell5 = row.insertCell(4);
    //         let cell6 = row.insertCell(5);
    //         let cell7 = row.insertCell(6);
    //         cell1.appendChild(infoButtons);
    //         cell7.appendChild(removeButtons);
    //         cell2.textContent = `${book.title}`;
    //         cell3.textContent = `${book.author}`;
    //         cell4.textContent = `${book.pages}`;
    //         cell5.textContent = `${book.status}`;
    //         cell6.textContent = `${book.rating}`;
    //         infoButtons.addEventListener('click', bookInfo());
    //         removeButtons.addEventListener('click', removeFromLib())
    //     })
    // 