const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");

const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;
let timeLeft = 15;
let timer;
loadQuestion();

function loadQuestion(){
    clearInterval(timer);
    timeLeft = 15;
    startTimer();
    selectedAnswer = -1;
    let q = questions[currentQuestion];
    questionElement.innerHTML = q.question;
    questionNumber.innerHTML =
    `Question ${currentQuestion+1} / ${questions.length}`;
    progressBar.style.width =
    ((currentQuestion+1)/questions.length)*100 + "%";
    optionButtons.forEach((btn,index)=>{
        btn.textContent = q.options[index];
        btn.classList.remove("correct");
        btn.classList.remove("wrong");
        btn.disabled=false;
        btn.onclick=()=>selectAnswer(index);
    });
}

function selectAnswer(index){
    selectedAnswer=index;
    let correct=questions[currentQuestion].answer;
    optionButtons.forEach(btn=>btn.disabled=true);
    if(index===correct){
        optionButtons[index].classList.add("correct");
        score++;
    }
    else{
        optionButtons[index].classList.add("wrong");
        optionButtons[correct].classList.add("correct");
    }
    clearInterval(timer);
}
nextBtn.addEventListener("click",()=>{
    if(currentQuestion<questions.length-1){
        currentQuestion++;
        loadQuestion();
    }
    else{
        showResult();
    }
});
prevBtn.addEventListener("click",()=>{
    if(currentQuestion>0){
        currentQuestion--;
        loadQuestion();
    }
});

function startTimer(){
    timerElement.innerHTML="⏱ "+timeLeft+"s";
    timer=setInterval(()=>{
        timeLeft--;
        timerElement.innerHTML="⏱ "+timeLeft+"s";
        if(timeLeft<=0){
            clearInterval(timer);
            optionButtons.forEach(btn=>btn.disabled=true);
        }
    },1000);
}

function showResult(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreElement.innerHTML=
    `Score : ${score} / ${questions.length}`;
    if(score>=8){
        messageElement.innerHTML="Excellent Work!";
    }
    else if(score>=5){
        messageElement.innerHTML="Good Job!";

    }
    else{
        messageElement.innerHTML="Keep Practicing!";
    }
}
restartBtn.addEventListener("click",()=>{
    currentQuestion=0;
    score=0;
    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");
    loadQuestion();
});