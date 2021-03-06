// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate Javascript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users 
        //know if they have a table or not.
        // It will do this by sending out the value "true" have a table
       
        var index, lowest = 40; // maximum difference;
        var myscore = req.body.scores;
        for (let i = 0; i < friendsData.length; i++) {
            var scores = friendsData[i].scores;
            let total = 0;
            for (let j = 0; j < 10; j++) {
                total += Math.abs(scores[j] - myscore[j]);
            }

            if (total < lowest) {
                lowest = total;
                index = i;
            }        
        }

     
        friendsData.push(req.body);
        res.json(friendsData[index]);

    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function() {
        // Empty out the arrays of data
        friendsData = [];

        console.log(friendsData);
    });
};
