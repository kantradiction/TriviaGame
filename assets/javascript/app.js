var correctAnswers = 0;
var incorrectAnswers = 0;
var questionsUnanswered = 0;
var currentQuestion = 1;
var currentQuestionObject = question1;
var gameOver = false;

var intervalId;
var answerInterval;
var clockRunning = false;

var stopwatch = {
	time: 10,
	lap: 1,
	reset: function() {
		stopwatch.time = 10;
		stopwatch.lap = 1;
		$("#display").html("10");
		$("#laps").html("");
	},
	start: function() {
		if (!clockRunning) {
		    intervalId = setInterval(stopwatch.count, 1000);
		    clockRunning = true;
    	}
	},
	stop: function() {
		clearInterval(intervalId);
    	clockRunning = false;
	},
	recordLap: function() {
		var converted = stopwatch.timeConverter(stopwatch.time);
		$("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");
		stopwatch.lap++;
	},
	count: function() {
		stopwatch.time--;
		console.log(stopwatch.time);
		var converted = stopwatch.timeConverter(stopwatch.time);
		console.log(converted);
		$("#display").html(converted);
		if(stopwatch.time <= 0) {
			stopwatch.stop();
			stopwatch.reset();
			timeExpired();
		}
	},
	timeConverter: function(t) {
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
		  seconds = "0" + seconds;
		}

		if (minutes === 0) {
		  minutes = "00";
		}
		else if (minutes < 10) {
		  minutes = "0" + minutes;
		}

		return minutes + ":" + seconds;
	}
}

var question1 = {
	question: "Brittney Spears's first song was...",
	option1: ["You Drive Me Crazy", true],
	option2: ["Baby One More Time", false],
	option3: ["Sometimes", false],
	option4: ["Toxic", false],
	imageQuestion: "assets/images/question1.gif",
	imageAnswer: "assets/images/question1Answer.gif",
	correctAnswer: "You Drive Me Crazy"
};

var question2 = {
	question: "Which Basketball Player was in \"Space Jam\"?",
	option1: ["Dennis Rodman", false],
	option2: ["Michael Jordan", true],
	option3: ["Scotty Pippen", false],
	option4: ["Tim Hardaway", false],
	imageQuestion: "assets/images/question2.gif",
	imageAnswer: "assets/images/question2Answer.gif",
	correctAnswer: "Michael Jordan"
};

var question3 = {
	question: "What was Tommy's last name in \"Rugrats\"?",
	option1: ["DeVille", false],
	option2: ["Pickles", true],
	option3: ["Finster", false],
	option4: ["Bell", false],
	imageQuestion: "assets/images/question3.gif",
	imageAnswer: "assets/images/question3Answer.gif",
	correctAnswer: "Pickles"
};

var question4 = {
	question: "Who wrote the book series \"Goosebumps\"?",
	option1: ["Shell Silverstein", false],
	option2: ["Louis Lowry", false],
	option3: ["Dav Pilkey", false],
	option4: ["R. L. Stine", true],
	imageQuestion: "assets/images/question4.gif",
	imageAnswer: "assets/images/question4Answer.gif",
	correctAnswer: "R. L. Stine"
};

var question5 = {
	question: "Who was the main character in Pokemon?",
	option1: ["Onix", false],
	option2: ["Kai", false],
	option3: ["Ash", true],
	option4: ["<Poli></Poli>", false],
	imageQuestion: "assets/images/question5.gif",
	imageAnswer: "assets/images/question5Answer.gif",
	correctAnswer: "Ash"
};

function newQuestion(questionObject) {
	$("h1").text(questionObject.question);
	$("img").attr("src", (questionObject.imageQuestion));
	$("#option1Button").text(Object.values(questionObject)[1][0]);
	$("#option1Button").attr("value", (Object.values(questionObject)[1][1]));

	$("#option2Button").text(Object.values(questionObject)[2][0]);
	$("#option2Button").attr("value", (Object.values(questionObject)[2][1]));

	$("#option3Button").text(Object.values(questionObject)[3][0]);
	$("#option3Button").attr("value", (Object.values(questionObject)[3][1]));

	$("#option4Button").text(Object.values(questionObject)[4][0]);
	$("#option4Button").attr("value", (Object.values(questionObject)[4][1]));

	$("#answerImage").attr("src", (questionObject.imageAnswer));
};	

function updateScores() {
	$("#correctAnswers").text(correctAnswers);
	$("#incorrectAnswers").text(incorrectAnswers);
	$("#unansweredQuestions").text(questionsUnanswered);
};

function answerCheck(x) {
	console.log(x);

	if (x == "true") {
		correctAnswers++;
		console.log("Correct Answers: " + correctAnswers);
		currentQuestion++;
		updateScores();
		$("#answer").text("Correct!");
	} else {
		var answer2answer = Object.values(currentQuestionObject)[7];
		incorrectAnswers++;
		console.log("Incorrect Answers: " + incorrectAnswers);
		currentQuestion++;
		updateScores();
		$("#answer").html("<span id=\"answer\">Incorrect! The correct answer was <span id=\"answer2\"></span></span>");
		$("#answer2").text(answer2answer);
	}
}

function hideQuestion() {
	$(".question").removeClass("visible invisible").addClass("invisible");
}

function hideAnswer() {
	$(".answer").removeClass("visible invisible").addClass("invisible");
}

function showQuestion() {
	$(".question").removeClass("visible invisible").addClass("visible");
}

function showAnswer() {
	$(".answer").removeClass("visible invisible").addClass("visible");
}

function timeExpired() {
	var score = correctAnswers + incorrectAnswers + questionsUnanswered;

	if(score >= 4 ) {
		stopwatch.stop();
	} else {
		questionsUnanswered++;
		updateScores();
		currentQuestion++;
		nextQuestion();
	}
		
}

function nextQuestion() {
	if (currentQuestion == 1) {
		newQuestion(question1);
		currentQuestionObject = question1;
	} else if (currentQuestion == 2) {
		newQuestion(question2);
		currentQuestionObject = question2;
	} else if (currentQuestion == 3) {
		newQuestion(question3);
		currentQuestionObject = question3;
	} else if (currentQuestion == 4) {
		newQuestion(question4);
		currentQuestionObject = question4;
	} else if (currentQuestion == 5) {
		newQuestion(question5);
		currentQuestionObject = question5;
	} 

	hideAnswer();
	showQuestion();
	stopwatch.reset();
	stopwatch.start();
	$("#answer").text("");
	$("#answer2").text("");
}

function showRestartButton() {
	$("#restartButton").removeClass("visible invisible").addClass("visible");
}

function hideRestartButton() {
	$("#restartButton").removeClass("visible invisible").addClass("invisible");
}

function restart() {
	correctAnswers = 0;
	incorrectAnswers = 0;
	questionsUnanswered = 0;
	currentQuestion = 1;
	currentQuestionObject = question1;
	gameOver = false;
	clockRunning = false;

	$("#answer").text("");
	$("#answer2").text("");


	updateScores();
	nextQuestion();
	hideRestartButton();
}

function isGameOver() {
	if (correctAnswers + incorrectAnswers + questionsUnanswered > 5) {
		stopwatch.stop();
		/*gameOver = true;*/
	} else {
		nextAnswer();
	};
}

function nextAnswer() {

	hideQuestion();
	showAnswer();
	stopwatch.reset();
	stopwatch.stop();

	if (correctAnswers + incorrectAnswers + questionsUnanswered >= 5) {
		gameOver = true;
	}

	if (!gameOver) {
		setTimeout(nextQuestion, 3000);
	} else {
		showRestartButton();
		$("#display").text("");
	};
}

$(document).ready(function() {

	nextQuestion();
	hideRestartButton();

	$("button").not("#restartButton").click(function() {
		var buttonValue = $(this).attr("value");
		answerCheck(buttonValue);
		/*nextQuestion();*/
		isGameOver();
	});

	$("#restartButton").click(function() {
		restart();
	});
});

