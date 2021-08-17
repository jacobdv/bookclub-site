retrieveData();
// Interative Portion of Future Books
let addButton = d3.select('#addButton');
let removeButton = d3.select('#removeButton');
let anotherButton = d3.select('#anotherButton');
let addBooks = d3.select('#addBooks');
let booksMessage = d3.select('#booksMessage');
let successMessage = d3.select('#successMessage');
let message;
addButton.on('click', function() {
    let title = d3.select('#titleInput')._groups[0][0].value;
    let author = d3.select('#authorInput')._groups[0][0].value;
    d3.json(`${linkFirstPart}/future/add/${title}/${author}/`).then(book => {
        message = 'added';
        successReset(title, author, message);
    });
});
removeButton.on('click', function() {
    let title = d3.select('#titleInput')._groups[0][0].value;
    let author = d3.select('#authorInput')._groups[0][0].value;
    d3.json(`${linkFirstPart}/future/remove/${title}/${author}/`).then(book => {
        message = 'removed';
        successReset(title, author, message);
    });
});
anotherButton.on('click', function() {
    booksMessage.attr('style','display: none')
    addBooks.attr('style','display: block;')
});

function successReset(title, author, message) {
    d3.select('#titleInput')._groups[0][0].value = '';
    d3.select('#authorInput')._groups[0][0].value = '';
    addBooks.attr('style','display:none;');
    booksMessage.attr('style','display:block;');
    successMessage.text(`${title} by ${author} was successfully ${message}.`);
    retrieveData();
};

// Displayed List
function retrieveData() {
    d3.json(`${linkFirstPart}/future/get/title/author/`).then(books => {
        let futureBooksList = d3.select('#futureBooksList').html('');
        console.log(books)
        books.forEach(book => {
            let titleCompressed = (book.title).replaceAll(' ','');
            let authorCompressed = (book.author).replaceAll(' ','');
            let bookDiv = futureBooksList.append('div').classed('bookRow', true).attr('id',`${titleCompressed}${authorCompressed}`);
            bookDiv = d3.select(`#${titleCompressed}${authorCompressed}`);
            let title = bookDiv.append('h1').text(book.title).classed('bookTitles', true);
            let author = bookDiv.append('h1').text(book.author).classed('bookAuthors', true);
        });
    });
}