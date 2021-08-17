// Adds current and former books to the home page.
let content = d3.select('#booklist');
d3.json(`${linkFirstPart}/books/data/`).then(books => {
    console.log(books)
    books.forEach(book => {
        let bookDiv = content.append('div').classed('book', true);
        bookDiv.append('img').attr('src', book.imgsrc);
        bookDiv.append('h1').attr('class', 'bookTitle bookText').text(book.title);
        bookDiv.append('h1').attr('class', 'bookAuthor bookText').text(book.author);
    })
})