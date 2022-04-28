let currentQuestion = 0;
let score = 0;
let hints = 0; //counter for hints shown
let maxHints = 3; // max hints to show

let timeleft = 20; // 10 second timer

let points = 0;

let questions = [
   {
	"question": "Who created Minecraft?",
	"a": "Jeb",
	"b": "Marcus",
	"c": "Technoblade",
	"d": "Hypixel",
	"image":"quizimages/q1.png",
	"hint":"Commonly known as Notch",
	"answer": "b"
   },
   {
	"question": "Creepers were an accidental creation when Notch miscoded the:",
	"a": "Pig",
	"b": "Chicken",
	"c": "Villager",
	"d": "Cows",
	"image":"quizimages/q2.jfif",
	"hint":"He accidently rotated the 'body' part the wrong way",
	"answer": "a"
   },
   {
	"question": "Which one of the following is not an ingredient for cake?",
	"a": "Wheat",
	"b": "Milk Bucket",
	"c": "Bread",
	"d": "Sugar",
	"image":"quizimages/q3.jpg",
	"hint":"Steve jumped a cooking step here...",
	"answer": "c"
   },
   {
	"question": "How many different biomes are in 1.16 nether?",
	"a": "3",
	"b": "5",
	"c": "4",
	"d": "9",
	"image":"quizimages/q4.jpg",
	"hint":"Red, Blue, Gray, and Brown... Mmmm, is that it? ",
	"answer": "b"
   },
   {
	"question": "What effect can an elder guardian give you?",
	"a": "Nausea",
	"b": "Regeneration II",
	"c": "Mining fatique III",
	"d": "Haste I",
	"image":"quizimages/q5.webp",
	"hint":"Think something hard to do under water, in minecraft...",
	"answer": "c"
   },
   {
	"question": "If you go too far away across the world border, what will happen to you?",
	"a": "Unable to move at a certain point",
	"b": "Receive void damage",
	"c": "Instantly teleports back to the border",
	"d": "Nothing and you can keep going",
	"image":"quizimages/q6.webp",
	"hint":"It's like passing y=-64",
	"answer": "b"
   },
   {
	"question": "Which one of them does the most explosive damage?",
	"a": "Charged creeper",
	"b": "End crystal",
	"c": "-Intentional Game Design-",
	"d": "TNT",
	"image":"quizimages/q7.webp",
	"hint":"The most hostile one of them, gifted by lightning",
	"answer": "a"
   },
   {
	"question": "Which one of them is not a glitch in vanilla minecraft in any version?",
	"a": "break bedrock",
	"b": "duplicate items",
	"c": "TNT duplication",
	"d": "have a rainbow sheep after naming it '_Jeb'",
	"image":"quizimages/q8.jpg",
	"hint":"Devs love to joke on their CEO",
	"answer": "d"
   },
   {
	"question": "When a skeleton shot down a creeper, what would it drop?",
	"a": "An enchanted golden apple",
	"b": "A creeper head",
	"c": "A random disk",
	"d": "Gunpowders",
	"image":"quizimages/q9.jpg",
	"hint":"Something special for sure, but only creepers that are blown up by charged creepers drop heads",
	"answer": "c"
   },
   {
	"question": "Which update is the 'World of Colors' update?",
	"a": "1.12",
	"b": "1.13",
	"c": "1.15",
	"d": "1.8",
	"image":"quizimages/q10.webp",
	"hint":"Which version is 2b2t on??? Haha",
	"answer": "a"
   },
   {
	"question": "BONUS: Which of the following structure has the best loot?",
	"a": "Village blacksmith",
	"b": "Piglin bastion",
	"c": "Stronghold",
	"d": "End City",
	"image":"quizimages/q11.jpg",
	"hint":"Where do you get an elytra?",
	"answer": "d"
   }
 ];
 
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
 
let getHintF = function getHint() {
	//if max hints not reached
	
	if (hints < maxHints){
		
		//get hint for current question
		
		
			let currentHint = questions[currentQuestion].hint;
			
			//show in page
			document.getElementById("hint").innerHTML = currentHint + ". And you have used " + (hints + 1) + " / " + maxHints + " of the hints.";

			
			//increment hints shown
			hints++;
		
	} else {
		
		//show a message that there are no hints left
		message = "Sorry, you have no hints left..."
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = message;
		
	}//else

	document.getElementById("hintButton").onclick = null;
}
 
// call the anonymous function every 1000 ms or 1 second
let downloadTimer;
let actualTimer = function (){
  
  
      // update display
    document.getElementById("countdown").innerHTML = (timeleft - 1) + " seconds remaining";
    timeleft -= 1;  // decrement time left
      
      // if time runs out, end timer
    if(timeleft <= 0){
		
		document.getElementById("countdown").innerHTML = "Finished";
		
		message = "Sorry, your time has surpassed 20 seconds, move on to the next question!"
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = message;
		
		currentQuestion++;
		loadQuestion();
		
	}
} // actual timer

 
 
 window.onload = function () {
	 document.getElementById("hintButton").onclick = getHintF;
	 loadQuestion();
}
 
 
 function loadQuestion() {
    clearInterval(downloadTimer);
	timeleft = 20;
	downloadTimer = setInterval(actualTimer, 1000);
	
	 
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.width = "auto";
	img.style.height = "500px";
	img.style.maxWidth = "800px";
	img.style.objectFit = "cover";
	
	document.getElementById("hint").innerHTML = "You have " + (maxHints - hints) + " hint left.";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
	
	document.getElementById("hintButton").onclick = getHintF;
 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
       
	   // calculate points
	   
	   points = points + timeleft * 50;
	   
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "YEEES!!!! Your score is " + score + " / " + questions.length + ". And you have " + points + " points in total.";
    } else {
       message = "AW Come On! You play Minecraft right? Your score is " + score + " / " + questions.length; 
    } // else
        
   
    
    // move to the next question
    currentQuestion++;
    if (currentQuestion >= questions.length) {
       // create a special message
       message = "Good Job. You have received a score of " + score + " / " + questions.length + ". And you have " + points + " points in total.";
	   
	   //add ability to restart quiz
	   message += "<div id='restart' onclick='restartQuiz()'>Restart Quiz</div>";
	   message += "<div id='exit' onclick='closeQuiz()'>Close Quiz</div>";
	   
	   // show the lightbox
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = message;
    } else {
		// show the lightbox
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = message;

		loadQuestion();
		
		// restart timer 
		timeleft = 20;
		//downloadTimer();
    }
    
	
	
 }  // markIt
 
 
 
 
 function closeLightBox() {
	 if (currentQuestion < questions.length){
		document.getElementById("lightbox").style.display = "none";

	 }
 } // closeLightbox

//show hint for current question if maximum not reached


  
 
function restartQuiz(){
	location.reload();
}

function closeQuiz() {
	window.close();
}