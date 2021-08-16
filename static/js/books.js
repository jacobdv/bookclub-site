let content = d3.select('#booklist');
d3.json(`${linkFirstPart}/books/data/`).then(data => {
    console.log(data)
})