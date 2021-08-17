let addButton = d3.select('#addButton');
let removeButton = d3.select('#removeButton');
let message;
addButton.on('click', function() {
    let title = d3.select('#titleInput')._groups[0][0].value;
    let author = d3.select('#authorInput')._groups[0][0].value;
    d3.json(`${linkFirstPart}/future/add/${title}/${author}/`).then(book => {
        console.log(book);
        message = 'added';
        successReset(title, author, message);
    });
});
removeButton.on('click', function() {
    let title = d3.select('#titleInput')._groups[0][0].value;
    let author = d3.select('#authorInput')._groups[0][0].value;
    d3.json(`${linkFirstPart}/future/remove/${title}/${author}/`).then(book => {
        console.log(book);
        message = 'removed';
        successReset(title, author, message);
    });
});

function successReset(title, author, message) {
    console.log('Success message + reset.')
    let addBooks = d3.select('#addBooks').html('');
    addBooks.append('h1').text(`${title} by ${author} was successfully ${message} from the future books list.`)
    addBooks.append('div').text('Make Another Change').attr('id','anotherButton').classed('editButton',true);
};

let anotherButton = d3.select('#anotherButton');
anotherButton.on('click', function() {
    
});