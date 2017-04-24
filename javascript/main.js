$(document).ready(function() {

    const outputContainer = $("#output");
    let user1 = [];
    let user2 = [];

    const loadUser = (userInput) => {
        return new Promise((resolve, reject) => {
            let userString = `https://teamtreehouse.com/${userInput}.json`;
            $.ajax(userString)
                .done((data1) => resolve(data1))
                .fail((error) => reject(error));
        });
    };

    const printUsers = (user1, user2) => {
        let newString = "";
        newString += `<div class="row" id="contestants">`;
        newString += buildUser(user1);
        newString += buildUser(user2);
        newString += `</div>`;
        return newString;
    };

    const printBadges = (userBadges) => {
        let badgeBox = "";
        userBadges.reverse();
        userBadges.forEach((badge) => {
            badgeBox += `<img src=${badge.icon_url} alt=${badge.name}>`;
        });
        return badgeBox;
    };

    const buildUser = (user) => {
        let domString = "";
        domString += `<div class="col-md-6 thumbnail">
                  <h3 class="name" id="name">${user.name}</h3>
                  <img src=${user.gravatar_url} class="gravatar" alt="image">
                  <h2>${user.points.total} Points</h2>
                  <h1 id="win" class="win">WINNER</h1>
                  <div id="badges" class="badges"></div>
                  </div>`;
        return domString;
    };

    const invalidUsername = (error) => {
        $("#errorMessage").show();
        console.log(error);
    };

    const animateMatch = (winner, loser) => {
        winner.find("#win").delay(300).animate({
            color: "crimson",
            backgroundColor: "green"
        }, "slow");
        $(".battleArea").delay(2000).animate({
            height: "520px",
            overflow: "scroll"
        });
        winner.find("#badges img").delay(3000).effect("shake");
        winner.find("#badges").delay(2500).animate({
            height: "200px"
        });
        loser.find("#badges").delay(300).animate({
            fontSize: "70px",
        }, "slow");
        loser.find("#badges").delay(300).text("LOSER");
        loser.delay(2000).effect("explode");
        winner.delay(2000).animate({
            width: "100%"
        });
    };

    $("button").click(() => {
        outputContainer.empty();
        $("#errorMessage").hide();
        let userInput1 = $("#userName1").val();
        let userInput2 = $("#userName2").val();
        cageMatch(userInput1, userInput2);
    });

    const cageMatch = (user1, user2) => {
        Promise.all([loadUser(user1), loadUser(user2)])
            .then((result) => {
                let loadedUser1 = result[0];
                let loadedUser2 = result[1];
                outputContainer.append(printUsers(loadedUser1, loadedUser2));

                let leftUser = $("#contestants").children().first();
                let rightUser = $("#contestants").children().first().next();

                if (loadedUser1.points.total > loadedUser2.points.total) {
                    leftUser.find("#win").show();
                    leftUser.find("#badges").append(printBadges(loadedUser1.badges));
                    animateMatch(leftUser, rightUser);
                } else if (loadedUser2.points.total > loadedUser1.points.total) {
                    rightUser.find("#win").fadeIn(100).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
                    rightUser.find("#badges").append(printBadges(loadedUser2.badges));
                    animateMatch(rightUser, leftUser);
                }

            })
            .catch((error) => {
                invalidUsername(error);
            });
    };
});
