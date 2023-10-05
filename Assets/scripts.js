//Toggle icon navbar
function checkResponsive() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const threshold = 768; // You can adjust this value based on your design breakpoints

    if (screenWidth < threshold) {
        alert("This site is not mobile responsive. Please view it on a larger screen for the best experience.");
    }
}

// Check on page load and when the window is resized
window.onload = checkResponsive;
window.onresize = checkResponsive;


const startBtn = document.querySelector('.btn-start');
const popupInofo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainBtn = document.querySelector('.tryAgain-btn')
const goHomeBtn = document.querySelector('.goHome-btn')

startBtn.onclick = () => {
    popupInofo.classList.add('active');
    main.classList.add('active');

}

exitBtn.onclick = () => {
    popupInofo.classList.remove('active');
    main.classList.remove('active');

}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInofo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();

}



// Getting the question on

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');


nextBtn.onclick = () => {
    if (questionCount < questions.length -1){
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionCounter(questionNumber);
        nextBtn.classList.remove('active');

    }
    else {
        showResultBox(resultBox);
    }
    
}


prevBtn.onclick = () => {
    if (questionCount > questions.length -6){
        questionCount--;
        showQuestions(questionCount);

        questionNumber--;
        questionCounter(questionNumber);
    } 
    else {
        
      console.log("last of the question");
    }
}


const optionList = document.querySelector('.option-list');

// fetching questions and options from array
function showQuestions (index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    optionTag = 
        `<div class="option"> <span>${questions[index].options[0]}</span></div>
        <div class="option"> <span>${questions[index].options[1]}</span></div>
        <div class="option"> <span>${questions[index].options[2]}</span></div>
        <div class="option"> <span>${questions[index].options[3]}</span></div>`
        optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected (answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount] .answer;
    let allOptions = optionList.children.length;

    if(userAnswer === correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore();

    } else {
       answer.classList.add('incorrect');

       //if user answer is incorrect, auto selected corrrect answer
       for (let i = 0; i < allOptions; i++){
        if (optionList.children[i].textContent == correctAnswer){
            optionList.children[i].setAttribute('class', 'option correct')
        }
       }
    }

// if user selected an option, disable other options 
    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
    prevBtn.classList.add('active');
    
}


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;

}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


function showResultBox (){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `You score ${userScore} out of  ${questions.length}`

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore/questions.length) * 100;
    let speed = 20;

    let progress = setInterval(()=>{
        progressStartValue++;
    
        progressValue.textContent = `${progressStartValue}%`
        circularProgress.style.background = `conic-gradient(seagreen ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}













// function prevQuestion (){
//     if (questionCount > 0){
//         questionCount--;
//        updateButtonStatus();
//     }
// }

// function updateButtonStatus (){
//     if (questionCount === 0){
//         prevBtn.disabled = true;
//     }else {
//         prevBtn.disabled = false;
//     }
// }