// const linkFirstPart = 'http://127.0.0.1:5000'
const linkFirstPart = 'https://zbookclub.herokuapp.com'
// Toggle Mobile Nav Menu
let mobileNav = d3.select('#mobileNavBar');
let navMenu = d3.select('#mobileNavMenu');
mobileNav.on('click', function() {
    let navMenuC = navMenu.attr('class')
    if (navMenuC.includes('noDisplay')) {
        navMenu = navMenu.classed('noDisplay', false);
    } else {
        navMenu = navMenu.classed('noDisplay', true);
    };
});

// Mobile Menu Navigation
let mobilePages = d3.selectAll('.navMenuItem');
mobilePages.on('click', function() {
    let page = d3.select(this)._groups[0][0].attributes[1].value;
    if (page !== 'home') {
        location = `/${page}/`;
    } else {
        location = '/';
    }
});

// Title Link Navigation
let titleLink = d3.select('#nameHeader');
titleLink.on('click', function() {
    location = '/';
});