
let currentUser = null;
let currentExam = null;
let timerInterval = null;

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Vérification simple (à remplacer par une vraie authentification)
    if(email && password) {
        currentUser = { email };
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('geolocationSection').style.display = 'block';
    }
});

document.getElementById('enableGeoloc').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(
        position => {
            document.getElementById('geolocationSection').style.display = 'none';
            loadExam();
        },
        error => {
            alert('La géolocalisation est obligatoire !');
        }
    );
});

function loadExam() {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('id');
    
    if(!examId || !exams[examId]) {
        alert('Examen non trouvé !');
        return;
    }
    
    currentExam = exams[examId];
    document.getElementById('examSection').style.display = 'block';
    document.getElementById('examTitle').textContent = currentExam.title;
    document.getElementById('studentName').textContent = currentUser.email;
    
    // Charger les questions
    const container = document.getElementById('questionsContainer');
    currentExam.questions.forEach((q, index) => {
        const questionHTML = `
            <div class="question-item">
                <h3>Question ${index + 1}: ${q.question}</h3>
                ${q.options.map((opt, i) => `
                    <label class="option">
                        <input type="${q.type === 'qcm' ? 'checkbox' : 'radio'}" 
                               name="q${index}" 
                               value="${i}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        container.innerHTML += questionHTML;
    });
    
    startTimer(currentExam.duration);
}

function startTimer(duration) {
    let timeLeft = duration;
    const timerElement = document.getElementById('timer');
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if(--timeLeft < 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

document.getElementById('submitExam').addEventListener('click', function() {
    if(confirm('Soumettre l\'examen ?')) {
        submitExam();
    }
});

function submitExam() {
    clearInterval(timerInterval);
    alert('Examen soumis avec succès !');
    // Envoyer les réponses au serveur ici
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has('id')) {
        alert('Lien invalide !');
        window.location.href = '/';
    }
}
