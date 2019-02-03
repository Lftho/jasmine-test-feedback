/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


    // This is the RSS Feeds suite that tests the feeds 
    describe('RSS Feeds', function() {

        // Determines if allfeeds has been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Determines if allFeeds have a url and that the url is not empty
        it('urls are defined', function () {
            for (var i = 0; i < allFeeds.size; i++){
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0)
            };
        });

        // Determines if allFeeds have a name and that the name is not empty 
        it('urls are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });
    });


    // New test suite that will test the menu
    describe('The menu', function () {

        // Searches for the class of 'menu-hidden' in the body tag. If true, 
        // then the menu is hidden 
        it('menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true); //fazer um teste depois aqui, colocar false para verificar se gera erro, se gerar estou no caminho certo. OK

        });

        // Toggles on click event if the menu appears or disappears
        it('working toggle on click event', function () {
            // Calls the class of 'menu-icon-link' 
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
});
    
    // New test suite that will test initial entries
    describe('Initial Entries', function () {
        
        // Calls a function to do an asynchronous request 
        beforeEach(function(done){
        loadFeed(0, function (){
            done();
        }); 
    });
        
        //Tests if the loadFeed function has at least a single '.entry' witihin the '.feed' container
        it('define if feed has at least a sigle entry', function () {
        expect($('.feed .entry').length).toBeGreaterThan(0); 
        });
    });

    // New test suite that looks for new feed selections
    describe('New Feed Selection', function (){
        var firstFeed, secondFeed;
        
        // Ensures that the new feed is loaded via the loadFeed function
        beforeEach(function(done) {
                loadFeed(1, function (){

                    // Tests if first feed is loaded
                    console.log('first feed loaded!')

                    //Loads first entry an checks
                    firstFeed = $('.feed').html();
                    loadFeed(2, function () {

                        //tests if second feed is loaded
                        console.log('second feed loaded')
                        done();
                    });
                });
            });

        afterEach(function() {
            loadFeed(0);
        });

        // Tests to see if two entries are not equal
        it('checks if two feeds are different', function (){
        
            //checks second feed
            secondFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(secondFeed);
        });
        
    });
    
}());
