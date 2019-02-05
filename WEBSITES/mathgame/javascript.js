// Keep if the game is playing or not
var playing = false;
// Keep the score value
var score;
// Keep the action of the time remaining
var action;
// Keep the time remaining
var timeremaining;
// Correct answer
var correctAnswer;
// Click Start/Reset button
document.getElementById("startreset").onclick = function() {
	// If we are playing
	if (playing == true) {
		// reload page
		location.reload();
	} else { // Not playing
		playing = true;
		// set score to 0
		score = 0;
		changeValue("scorevalue", score);
		// show countdown box
		show("timeremaining");
		// change button to reset
		changeValue("startreset", "Reset Game");
		// reduce time by 1 sec in loops
		timeremaining = 10;
		changeValue("timeremainingvalue",timeremaining);
		startCountDown();
		generateQA();
	}
}

// Get player answer
for(i = 1; i < 5; i++) {
	document.getElementById("box" + i).onclick = function () {
		if (playing === true) {
			var value = this.innerHTML;
			if (value == correctAnswer) {
				score += 1;
				changeValue("scorevalue", score);
				hide("wrong");
				show("correct");
				setTimeout(function() {
					hide("correct");
				}, 1000);
				generateQA();
			} else {
				hide("correct");
				show("wrong");
				setTimeout(function() {
					hide("wrong");
				}, 1000);
			}
		}
	}
}

// Functions
// Start counter
function startCountDown() {
	action = setInterval(function(){
		timeremaining = timeremaining - 1;
		changeValue("timeremainingvalue", timeremaining);
		if (timeremaining == 0) {
			// game over
			stopCountdown();
			show("gameover");
			changeValue("finalscore", score);
			changeValue("startreset", "Start Again");
			hide("timeremaining");
			hide("correct");
			hide("wrong");
		}
	}, 1000);
}

// Stop the counter
function stopCountdown() {
	clearInterval(action);
}

// Hide an element
function hide(id) {
	document.getElementById(id).style.display = "none";
}

// Show an element
function show(id) {
	document.getElementById(id).style.display = "block";
}

// Change value of an element
function changeValue(id, value) {
	document.getElementById(id).innerHTML = value;
}

// Clear counter
function stop(variable) {
	clearInterval(variable)
}

// Generate question
function generateQA() {
	var x = 1 + Math.round(Math.random()*9);
	var y = 1 + Math.round(Math.random()*9);
	correctAnswer = x * y;
	changeValue("question", x + " x " + y);
	var correctPosition = 1 + Math.round(Math.random()*3);
	changeValue("box" + correctPosition, correctAnswer);
	var boxFilled = 1;
	var i = 1;
	while(boxFilled < 4) {
		var wrongAnswer = (1 + Math.round(Math.random()*9)) * (1 + Math.round(Math.random()*9));
		if (wrongAnswer !== correctAnswer) {
			if (i !== correctPosition) {
				changeValue("box" + i, wrongAnswer);
				boxFilled++;
			}
			i++;
		}
	}
}
// if we click on answer box
// if we are playing
// correct?
// yes
// increase score
// show correct box for 1 sec
// generate new Q&A
// no
// show try again box for 1 sec
