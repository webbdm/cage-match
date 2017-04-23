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

    const buildUser = (user) => {
        let domString = "";
        domString += `<div class="col-md-6 thumbnail">
                      <h3 class-"name">${user.name}</h3>
                      <img src=${user.gravatar_url} class="gravatar" alt="image">
                      <h2>${user.points.total} Points</h2>
                      <h1 id="win" class="win win-shown">WINNER</h1>
                      </div>`;
        return domString;
    };

    const invalidUsername = (error) => {
        $("#errorMessage").show();
        console.log(error);
    };

    $("button").click(function() {
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

                if (loadedUser1.points.total > loadedUser2.points.total) {
                    leftWinner = $("#contestants").children().first();
                    leftWinner.find("#win").show();

                } else if (loadedUser2.points.total > loadedUser1.points.total) {
                    rightWinner = $("#contestants").children().first().next();
                    rightWinner.find("#win").show();
                };

            })
            .catch(function(error) {
                invalidUsername(error);
            });
    };
});
