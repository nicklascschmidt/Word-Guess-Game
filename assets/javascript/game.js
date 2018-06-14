

// Doesn't register until the doc is fully loaded
$(document).ready(function() {

    // Click example
    $("#onClickEvent").on("click", function(clickEvent) {
        alert("text clicked!");

    });

    // Gets Link for Theme Song
    var lotrTheme = document.createElement("audio");
    lotrTheme.setAttribute("src", "assets/images/LOTR-theme.mp3");

    // Theme Button
    $(".lotrTheme-play-button").on("click", function() {
        lotrTheme.play();
    });
    $(".lotrTheme-pause-button").on("click", function() {
        lotrTheme.pause();
    });

    

    // array of possible words
    var hangmanWordArray = ["frodo","gandalf","samwise","merry","pippin","aragorn","mithrandir","strider","legolas","gimli","boromir","sauron","nazgul","gollum","smeagol","bilbo","glorfindel","elrond","arwen","galadriel","saruman","eomer","theoden","wormtongue","shadowfax","treebeard","shelob","faramir","denethor"];
    var hangmanWord = "";

    // sets the hangman word
    function setHangmanWord() {
        hangmanWord = hangmanWordArray[Math.floor(Math.random() * hangmanWordArray.length)];
        console.log(hangmanWord); // for DEV
        $("#hangmanWordHere").html(underscoreWord);
    }
    setHangmanWord();



    // defines and prints wins counter
    var winsCounter = 0;
    $("#winsHere").html(winsCounter);
    var letterArray = [];


    // defines and prints guess counter
    var guessCounter = 5;
    $("#guessesHere").html(guessCounter);


    // defines letter array
    var letterPressed = "not pressed yet";
    var letterArray = [];

    // checks if letter typed is a new letter
    var letterUnique = true;


    // pushes letterPressed into letterArray
    function addGuessedLetter(key) {
        letterArray.push(key);
        console.log(letterArray); // for DEV
    }

    // creates the hangman word
    function getUnderscoreWord() {
        var word = "";

        for (n=0; n < hangmanWord.length; n++) {

            var letterFound = false;
            
            // LOOP - are any letters in the letterArray in the hangman word?
            for (m=0; m < letterArray.length; m++) {
                if (hangmanWord[n] === letterArray[m]) {
                    letterFound = true;
                }
            }

            // creates the actual word
            if (letterFound === true) {
                word = word + hangmanWord[n] + " ";
            } else {
                word = word + "_ ";
            }
        }
        
        return word;
    };

    // subtracts from the guessCounter - also GAME OVER alert
    function guessSubtract() {
        var wasLetterFound = false;

        // LOOP - checks if key typed 
        for (n=0; n < hangmanWord.length; n++) {
            
            if (letterPressed === hangmanWord[n]) {
                wasLetterFound = true;
            }
        }
        // subtracts from # of guesses remaining
        if (wasLetterFound === false) {
            guessCounter--;
            if (guessCounter === 0) {
                alert("GAME OVER. Restarting game now!");
                restart();
            }
        }

        // reset if letter was correct
        wasLetterFound = false;
    };
    

    // sees if you won
    function didYouWin() {
        underscoreWord = getUnderscoreWord();

        // IF - there are underscores in the word, then do all these things
        if (underscoreWord.indexOf("_") < 0) {

            winsCounter++;
            setHangmanWord();
            letterArray = [];
            alert("You win! Hit the Restart button to play again.");

        }
    };

    // prints the word to the page on document.ready
    var underscoreWord = getUnderscoreWord();
    $("#hangmanWordHere").html(underscoreWord);


    // has the letter been typed yet?
    function isLetterUnique() {
        // LOOP - checks if the letter has already been typed
        for (n = 0; n <= letterArray.length; n++) {
                
            // IF letter has been typed already, set letterUnique to false
            if (letterPressed === letterArray[n]) {
                letterUnique = false;
            }
        }
    };

    // reset everything
    function restart() {
        letterArray = [];
        $("#lettersHere").html("<h1>" + letterArray.join(" ") + "</h1>");

        setHangmanWord();
        var underscoreWord = getUnderscoreWord();
        $("#hangmanWordHere").html(underscoreWord);
        guessCounter = 5;
        $("#guessesHere").html(guessCounter);
    }
    
    // reset everything when RESTART button is clicked
    $("#restart-button").on("click", function(event) {
        restart();
    });


    // when a key is pressed - everything happens
    $("#onKeyUp").keypress(function(keyPressEvent) {

        
        // IF - checks if key is a letter
        if ((keyPressEvent.which < 97) || (keyPressEvent.which > 122)) {
            alert("please type a letter (lowercase)");
            
        } else {
    
            // logs key pressed as a letter
            letterPressed = String.fromCharCode(keyPressEvent.which);
            
            // checks if the letter has already been typed
            isLetterUnique();

            
            // IF - checks if letter is unique
            if (letterUnique) {

                                
                // adds letter to the array
                addGuessedLetter(letterPressed);
                
                // puts word _ together and prints to page
                underscoreWord = getUnderscoreWord();
                $("#hangmanWordHere").html(underscoreWord);

                guessSubtract();

                // sees if _ are in the word, tells you if you won
                didYouWin();

                
            // IF - letter is NOT unique
            } else {

                alert("you've already typed that letter, sir/madam");
                letterUnique = true;

            }; // close - is letter unique

        

        }; // close - is the key a letter

        $("#lettersHere").html("<h1>" + letterArray.join(" ") + "</h1>");
        $("#guessesHere").html(guessCounter);
        $("#winsHere").html(winsCounter);

    }); // close - key pressed

}); // close - doc.ready







        
        
        
        
        
        
        