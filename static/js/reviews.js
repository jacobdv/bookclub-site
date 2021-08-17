let bookSelection = d3.select('#bookTitleSelection');
d3.json(`${linkFirstPart}/future/get/title/author/`).then(books => {
    books.forEach(book => {
        bookSelection.append('option').attr('value',book.title).text(book.title);
    });
});

function reviewSearch() {
    let titleSearch = d3.select('#bookSelection')._groups[0][0].children[0].value;
    let personSearch = d3.select('#personSelection')._groups[0][0].value;
    console.log(titleSearch)
    console.log(personSearch)
    d3.json(`${linkFirstPart}/reviews/${titleSearch}/${personSearch}/`).then(reviews => {
        console.log(reviews)
    });
};