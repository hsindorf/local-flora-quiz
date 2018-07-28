// add leaf to h2s
jQuery('h2').prepend('<i class="fab fa-pagelines"></i> ');

//scrollbar
jQuery('main').overlayScrollbars({ className : 'os-theme-minimal-dark' });

// get page placeholders
var quizPhoto = jQuery('#quiz-photo img');
var quizInputs = jQuery('.quiz-question-input');
var quizAnswers = jQuery('.answer');

// global variables
// current question on page
var currentQuestion;
// questions that have already been used.
var usedQuestions = [];
// if false = waiting for answers. if true = answers are shown, waiting for "next"
var waitingToContinue = false;

// plug in a number to set number of questions or
// plug in Flora.all.length to set the number of questions to be the number of plants
var numberOfQuestions = Flora.all.length;

// scores - common, scientific, family
var quizScore = [0, 0, 0];

// this randoms a new question and sets the next question on the page
function setQuestion() {
  getCurrentQuestion();
  quizPhoto.attr('src', 'images/' + currentQuestion + '.jpg');
  quizPhoto.attr('alt', Flora.all[currentQuestion].name);
}

// this:
// checks the answer when you click submit
// changes the button to "next"
function checkAnswers(event) {
  event.preventDefault;
  if (!waitingToContinue) {
    for(let i = 0; i < 3; i++) {
      if (quizInputs[i].value.toLowerCase() === (Flora.all[currentQuestion].data[i]).toLowerCase()) {
        quizScore[i]++;
        jQuery('.answer:eq(' + i + ')').text('Correct! ' + Flora.all[currentQuestion].data[i]);
        jQuery('.answer:eq(' + i + ')').addClass('correct');
      } else {
        jQuery('.answer:eq(' + i + ')').text('Incorrect! ' + Flora.all[currentQuestion].data[i]);
        jQuery('.answer:eq(' + i + ')').addClass('incorrect');
      }
    }
    numberOfQuestions--;
    jQuery('.quiz-submit button').text('Next');
    waitingToContinue = true;
  } else {
    if (numberOfQuestions > 0) {
      setQuestion();
      quizAnswers.removeClass('correct');
      quizAnswers.removeClass('incorrect');
      quizAnswers.text('Click submit to check');
      jQuery('.quiz-submit button').text('Submit');
      waitingToContinue = false;
    } else {
      endOfQuiz();
    }
  }
}

// this gets what question to show - checks if it has been used already
function getCurrentQuestion() {
  do {
    var questionUsed = false;
    currentQuestion = Math.floor(Math.random() * Flora.all.length);
    for(let i = 0; i < usedQuestions.length; i++) {
      if (currentQuestion === usedQuestions[i]) {
        questionUsed = true;
        break;
      }
    }
  } while (questionUsed);
  usedQuestions.push(currentQuestion);
}

//what to do when the quiz is over.
function endOfQuiz() {
  var totalScore = Math.floor(100 * ((quizScore[0] + quizScore[1] + quizScore[2]) / (Flora.all.length * 3)));
  jQuery('#quiz-container').text(quizScore[0] + ' Common Name(s), ' + quizScore[1] + ' Scientific Name(s), ' + quizScore[2] + ' Family Name(s). Total score: ' + totalScore + '%');
}

setQuestion();
jQuery('.quiz-submit button').on('click', checkAnswers);

// save this for later - this adds in correct/incorrect text
// jQuery('.quiz-question-outer').append('<p>Correct?</p>')