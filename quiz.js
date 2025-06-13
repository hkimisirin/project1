document.addEventListener('DOMContentLoaded', function() {

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const body = document.body;


    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Mode clair';
    }


    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Mode clair';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Mode sombre';
            localStorage.setItem('theme', 'light');
        }
    });

    // Quiz
    const questions = [
        {
            question: "Quel est le surnom traditionnel de Béja ?",
            options: ["La ville des oliviers", "Le grenier à blé de la Tunisie", "La cité des sources", "La capitale du nord-ouest"],
            answer: 1
        },
        {
            question: "Quel monument romain important se trouve à Béja ?",
            options: ["Un cirque romain", "Le pont de Béja", "Des arènes", "Un forum impérial"],
            answer: 1
        },
        {
            question: "Quelle civilisation a construit le théâtre de Dougga ?",
            options: ["Les Phéniciens", "Les Romains", "Les Byzantins", "Les Numides"],
            answer: 1
        },
        {
            question: "Quel élément architectural unique trouve-t-on à Dougga ?",
            options: ["Un mausolée libyco-punique", "Une pyramide", "Un phare antique", "Des catacombes"],
            answer: 0
        },
        {
            question: "Quelle influence architecturale marque Testour ?",
            options: ["Ottomane", "Andalouse", "Française", "Italienne"],
            answer: 1
        },
        {
            question: "Quelle est la particularité de la Grande Mosquée de Testour ?",
            options: ["Son minaret octogonal", "Son horloge inversée", "Sa coupole bleue", "Ses inscriptions en hébreu"],
            answer: 1
        },
        {
            question: "Où se situe exactement Cap Negro ?",
            options: ["Près de Bizerte", "Dans le golfe de Hammamet", "Au sud de Sfax", "À l'extrême nord-ouest"],
            answer: 0
        },
        {
            question: "Quelle activité traditionnelle était pratiquée à Cap Negro ?",
            options: ["Construction navale", "Pêche au corail", "Extraction de marbre", "Culture du jasmin"],
            answer: 1
        },
        {
            question: "Quelle spécialité culinaire est typique de Béja ?",
            options: ["Le brik", "Le hlalem (soupe de blé)", "Le couscous au poisson", "La mloukhiya"],
            answer: 1
        },
        {
            question: "Quelle communauté a fondé Testour au 17ème siècle ?",
            options: ["Juifs tunisiens", "Andalous expulsés d'Espagne", "Marchands vénitiens", "Pirates barbaresques"],
            answer: 1
        }
    ];

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    
    let currentQuestionIndex = 0;
    let score = 0;
    let answerSelected = false;
    
    totalQuestionsElement.textContent = questions.length;
    
    function loadQuestion() {
        answerSelected = false;
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(optionElement);
        });
    }
    
    function selectAnswer(e) {
        if (answerSelected) return;
        
        answerSelected = true;
        const selectedOption = e.target;
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const currentQuestion = questions[currentQuestionIndex];
        
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(option => {
            const optionIndex = parseInt(option.dataset.index);
            
            if (optionIndex === currentQuestion.answer) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === currentQuestion.answer) {
            score++;
            scoreElement.textContent = score;
        }
        
        setTimeout(nextQuestion, 1000);
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            const percentage = Math.round((score / questions.length) * 100);
            let message = `Quiz terminé! Votre score est ${score}/${questions.length} (${percentage}%)`;
            
            if (percentage >= 80) {
                message += " - Excellent! Vous connaissez bien la Tunisie!";
            } else if (percentage >= 50) {
                message += " - Pas mal! Vous avez des connaissances sur la Tunisie.";
            } else {
                message += " - À améliorer! Découvrez plus sur la Tunisie.";
            }
            
            questionText.textContent = message;
            questionText.classList.add('final-message');
            optionsContainer.innerHTML = '';
        }
    }
    
    loadQuestion();
});