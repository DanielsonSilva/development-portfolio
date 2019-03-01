// Variable to store the score
var score;
// Variable to check if the play status
var playing = false;
// Variable to store number of trials
var trialsLeft;
// Variable of fruits
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange',
	'peach', 'pear', 'pineapple', 'watermelon'];
// Variable to store the step of the falling fruits
var step;
// Variable to set interval function of falling fruits
var action;
// Inside document ready
$(function(){
	// Start Reset Action Button
	$("#startreset").click(function(){
		// Check if the game is on
		if (playing == true) {
			console.log("Reload");
			location.reload();
		} else {
			console.log("Play");
			playing = true; // change the status of playing
			score = 0; // initiate the score value
			$("#gameover").hide();
			$("#scorevalue").html(score); // show the initial score value
			$("#trialsLeft").show(); // show the hearts container
			trialsLeft = 3;
			addHearts(); // add the hearts into the game
			$("#startreset").html("Reset Game"); // change the text from start button
			startAction();
		}
	});

	// Auxiliary Functions
	function addHearts() {
		console.log("Update Hearts");
		$('#trialsLeft').empty();
		for (i = 0; i < trialsLeft; i++) {
			$("#trialsLeft").append('<img class="life" src="images/heart.png">');
		}
	}

	// Function when start button is pressed
	function startAction(){
		console.log("startAction");
		$('#fruit1').show();
		chooseFruit(); // choose a random fruit
		$('#fruit1').css({
			'left' : Math.round(550*Math.random()), //random position
			'top' : -50
		});
		console.log("Initiate position");
		step = 1 + Math.round(5*Math.random()); // change the step
		console.log("Step = " + step);
		action = setInterval(function(){
			console.log("Action initiated, step = " + step);
			$('#fruit1').css('top', $('#fruit1').position().top + step);
			console.log("Update position fruit, top = " + $('#fruit1').position().top);
			if ($('#fruit1').position().top > $('#fruitsContainer').height()) {
				console.log("Fruit passed");
				if (trialsLeft > 1) {
					//generate a fruit
	                $("#fruit1").show();
	                chooseFruit(); //choose a random fruit
	                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

	                //generate a random step
	                step = 1+ Math.round(5*Math.random()); // change step

	                //reduce trials by one
	                trialsLeft --;

	                //populate trialsLeft box
	                addHearts();
					// console.log("Trials Left");
					// // still have hearts
					// trialsLeft--;
					// addHearts();
					// $('#fruit1').show();
					// chooseFruit(); // choose a random fruit
					// $('#fruit1').css({
					// 	'left' : Math.round(550*Math.random()), //random position
					// 	'top' : -50
					// });
				} else {
					// game over
					console.log("Gameover");
					playing = false;
					$('#startreset').html("Start Game");
					$('#trialsLeft').hide();
					$('#gameover').show();
					$("#gameover").html("<p>Game Over!</p><p>Your score is " + score + "</p>");
					stopAction();
				}
			}
		}, 10); //make the fruit fall
	}

	// Choose a random fruit
	function chooseFruit(){
		var i = Math.round(8*Math.random());
		console.log("chooseFruit: fruit[" + i + "] = " + fruits[i]);
		$("#fruit1").attr('src', 'images/' + fruits[i] + '.png');
	}

	// stop dropping fruit
	function stopAction(){
		console.log("StopAction");
		clearInterval(action);
		$("#fruit1").hide();
	}

	$("#fruit1").mouseover(function(){
		console.log("Fruitslice");
		clearInterval(action); // stop falling fruit
		score++;
		$("#scorevalue").html(score); //update score
		$("#slicesound")[0].play(); //play sound
		$("#fruit1").hide("explode", 500); // explode the fruit
		setTimeout(startAction, 800); // send a new fruit after the animation
	});
});
