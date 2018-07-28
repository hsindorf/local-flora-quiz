// add leaf to h2s
jQuery('h2').prepend('<i class="fab fa-pagelines"></i> ');

//scrollbar
jQuery('main').overlayScrollbars({ className : 'os-theme-minimal-dark' });

// get page placeholders
var quizPhoto = jQuery('#quiz-photo img');
var quizInputs = jQuery('.quiz-question-input');

// global variables
var currentQuestion;

// plug in a number to set number of questions or
// plug in Flora.all.length to set the number of questions to be the number of plants
var numberOfQuestions = Flora.all.length;

function setQuestion() {
  getCurrentQuestion();
  quizPhoto.attr('src', 'images/' + currentQuestion + '.jpg');
  quizPhoto.attr('alt', Flora.all[currentQuestion].name);
}

function checkAnswers(event) {
  event.preventDefault;
  for(let i = 0; i < 3; i++) {
    if (quizInputs[i].value.toLowerCase() === (Flora.all[currentQuestion].data[i]).toLowerCase()) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }
}

function getCurrentQuestion() {
  currentQuestion = Math.floor(Math.random() * Flora.all.length);
}

setQuestion();
jQuery('.quiz-submit button').on('click', checkAnswers);

// save this for later - this adds in correct/incorrect text
// jQuery('.quiz-question-outer').append('<p>Correct?</p>')