$(document).ready(function() {

    const outputContainer = $("#output");
    let user1 = [];
    let user2 = [];

    $("button").click(function() {
        loadUser($("#userName1").val());
        loadUser($("#userName2").val());
    });


    const loadUser = (userInput) => {
        return new Promise((resolve, reject) => {
            let userString = `https://teamtreehouse.com/${userInput}.json`;
            console.log(userString);
            $.ajax("https://teamtreehouse.com/geoffwebb.json")
                .done((data1) => resolve(data1))
                .fail((error) => reject(error));
        });

        //cageMatch();
    };



    const writeToDOM = (user1, user2) => {

        console.log(user1, user2);
        let domString = "";

        // .map here

        outputContainer.append(domString);
    };


    const cageMatch = () => {
        loadUser().then((user) => {
                // user1.forEach(function(user) {
                //     user1.push(user);
                // });

                Promise.all([loadUser()])
                    .then((result) => {
                        console.log(result);
                        // result.forEach((xhrResult) => {
                        //     xhrResult.forEach((animal) => {
                        //         myAnimals.push(animal);
                        //     });
                        // });

                        // .map the user
                        //writeToDOM(user1,user2);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(function(Error) {
                console.log(Error);
            });
    }

});
