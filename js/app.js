// add leaf to h2s
$('h2').prepend('<i class="fab fa-pagelines"></i> ');

//scrollbar
$('main').overlayScrollbars({ className : 'os-theme-minimal-dark' });

// get page placeholders
var quizPhoto = $('#quiz-photo img');
var quizInputs = $('.quiz-question-input');
var quizAnswers = $('.answer');

// global variables
// current question on page
var currentQuestion;
// questions that have already been used.
var usedQuestions = [];
// if false = waiting for answers. if true = answers are shown, waiting for "next"
var waitingToContinue = false;

// plug in a number to set number of questions or
// plug in Flora.all.length to set the number of questions to be the number of plants
var numberOfQuestions = 3;

// scores - common, scientific, family
var quizScore = [0, 0, 0];

// this randoms a new question and sets the next question on the page
function setQuestion() {
  getCurrentQuestion();
  quizPhoto.attr('src', 'images/' + currentQuestion + '.jpg');
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
        $('.answer:eq(' + i + ')').text('Correct! ' + Flora.all[currentQuestion].data[i]);
        $('.answer:eq(' + i + ')').addClass('correct');
      } else {
        $('.answer:eq(' + i + ')').text('Incorrect! ' + Flora.all[currentQuestion].data[i]);
        $('.answer:eq(' + i + ')').addClass('incorrect');
      }
    }
    numberOfQuestions--;
    $('.quiz-submit button').text('Next');
    waitingToContinue = true;
  } else {
    if (numberOfQuestions > 0) {
      setQuestion();
      quizAnswers.removeClass('correct');
      quizAnswers.removeClass('incorrect');
      quizAnswers.text('Click submit to check');
      $('.quiz-question-input').val('');
      $('.quiz-submit button').text('Submit');
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
  var totalScore = Math.floor(100 * ((quizScore[0] + quizScore[1] + quizScore[2]) / (numberOfQuestions * 3)));
  if (isNaN(totalScore)) {
    totalScore = 0;
  }
  $('#quiz-container').text(quizScore[0] + '/' + numberOfQuestions + ' Common Name(s), ' + quizScore[1] + '/' + numberOfQuestions + ' Scientific Name(s), ' + quizScore[2] + '/' + numberOfQuestions + ' Family Name(s). Total score: ' + totalScore + '%');
}

function initializeQuiz(event) {
  event.preventDefault();
  $('#start-quiz').remove();
  setQuestion();
  $('#quiz-container').css('display', 'flex');
}

$('#start-quiz').on('click', initializeQuiz);
$('.quiz-submit button').on('click', checkAnswers);