const friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 999
        };

        let userData = req.body;
        let userScores = userData.scores;
        let totalDifference;

        for (var i = 0; i < friends.length; i++) {
            let currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            for (var j = 0; j < currentFriend.scores.length; j++) {
                let currentFriendScore = currentFriend.scores[j];
                let currentUserScore = userScores[j];
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            } if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
};