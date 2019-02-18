// Variable to store the score
var score;
// Variable to check if the play status
var playing = false;
// Variable to store number of trials
var trialsLeft;
// Inside document ready
$(function(){
	// Start Reset Action Button
	$("#startreset").click(function(){
		// Check if the game is on
		if (playing == true) {
			location.reload();
		} else {
			playing = true; // change the status of playing
			score = 0; // initiate the score value
			$("#scorevalue").html(score); // show the initial score value
			$("#trialsLeft").show(); // show the hearts container
			trialsLeft = 3;
			addHearts();
		}
	});
});

// Auxiliary Functions
function addHearts() {
	for (i = 0; i < trialsLeft; i++) {
		$("#trialsLeft").append(" X ");
	}
}
