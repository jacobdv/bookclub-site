let bookSelection = d3.select('#bookTitleSelection');
d3.json(`${linkFirstPart}/future/get/title/author/`).then(books => {
    books.forEach(book => {
        bookSelection.append('option').attr('value',book.title).text(book.title);
    });
});

function reviewSearch() {
    let reviewDisplay = d3.select('#reviewDisplay').attr('style','display:block;');
    let reviewAddition = d3.select('#reviewAddition').attr('style','display:none;');
    let titleSearch = d3.select('#bookTitleSelection')._groups[0][0].value;
    let personSearch = d3.select('#personSelection')._groups[0][0].value;
    console.log(titleSearch)
    console.log(personSearch)
    d3.json(`${linkFirstPart}/reviews/${titleSearch}/${personSearch}/`).then(reviews => {
        console.log(reviews)
        let reviewDisplay = d3.select('#reviewDisplay').html('');
        reviews.forEach(review => {
            nameCompressed = ((review.name).replaceAll(' ','')).replaceAll('.','');
            titleCompressed = ((review.title).replaceAll(' ','')).replaceAll('.','');
            let reviewBox = reviewDisplay.append('div').classed('bookReview', true).attr('id',`${nameCompressed}${titleCompressed}`);
            reviewBox.append('h1').classed('reviewHeader', true).text(`${review.name} - ${review.title} - ${review.rating}`);
            reviewBox.append('p').classed('reviewContent', true).text(review.content);
        });
    });
};

function addReview() {
    let reviewDisplay = d3.select('#reviewDisplay').attr('style','display:none;');
    let reviewAddition = d3.select('#reviewAddition').attr('style','display:block;');
}

function submitReview() {
    let name = d3.select('#nameInput')._groups[0][0].value;
    let title = d3.select('#titleInput')._groups[0][0].value;
    let review = d3.select('#contentInput')._groups[0][0].value;
    let rating = d3.select('#ratingInput')._groups[0][0].value;
    //  Add functionality to pass info to python from user input.
    d3.json(`${linkFirstPart}/reviews/${name}/${title}/${review}/${rating}/`).then(data => {
        console.log(response)
    })
    let reviewDisplay = d3.select('#reviewDisplay').attr('style','display:block;');
    let reviewAddition = d3.select('#reviewAddition').attr('style','display:none;');
}