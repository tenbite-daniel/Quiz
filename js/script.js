const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-weight", "text-size", "font-size", "text-style"],
    answer: 2
  },
  {
    question: "Which keyword declares a variable in modern JavaScript?",
    options: ["var", "let", "const", "Both let and const"],
    answer: 3
  },
  {
    question: "What does the '===' operator check in JavaScript?",
    options: ["Value only", "Type only", "Value and type", "Neither"],
    answer: 2
  },
  {
    question: "Which HTML tag links an external CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    answer: 2
  }
];

let current = 0, score = 0;

const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const questionEl    = document.getElementById('question');
const optionsEl     = document.getElementById('options');
const nextBtn       = document.getElementById('next-btn');
const currentQEl    = document.getElementById('current-q');
const totalQEl      = document.getElementById('total-q');
const scoreEl       = document.getElementById('score');
const totalScoreEl  = document.getElementById('total-score');

document.getElementById('start-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('retry-btn').addEventListener('click', startQuiz);

function startQuiz() {
  current = 0;
  score = 0;
  totalQEl.textContent = questions.length;
  show(quizScreen);
  hide(startScreen);
  hide(resultsScreen);
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  currentQEl.textContent = current + 1;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.classList.add('hidden');

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const q = questions[current];
  const options = optionsEl.querySelectorAll('.option');

  options.forEach(btn => btn.disabled = true);
  options[q.answer].classList.add('correct');

  if (index === q.answer) {
    score++;
  } else {
    options[index].classList.add('wrong');
  }

  nextBtn.textContent = current === questions.length - 1 ? 'See Results' : 'Next';
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  scoreEl.textContent = score;
  totalScoreEl.textContent = questions.length;
  show(resultsScreen);
  hide(quizScreen);
}

function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }
