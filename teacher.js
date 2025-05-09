let questions = [];

function toggleFields() {
    const type = document.getElementById('type').value;
    document.getElementById('directeFields').style.display = type === 'directe' ? 'block' : 'none';
    document.getElementById('qcmFields').style.display = type === 'qcm' ? 'block' : 'none';
}

function addQCMOption() {
    const optionsContainer = document.getElementById('qcmOptions');
    const existingOptions = document.querySelectorAll('#qcmOptions input[type="text"]');
    const newIndex = existingOptions.length;

    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.name = 'option[]';
    optionInput.placeholder = `Option ${newIndex + 1}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'correct[]';
    checkbox.value = newIndex;
    
    const lineBreak = document.createElement('br');
    
    optionsContainer.appendChild(optionInput);
    optionsContainer.appendChild(checkbox);
    optionsContainer.appendChild(document.createTextNode(' Correcte'));
    optionsContainer.appendChild(lineBreak);
}

document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('type').value;
    const statement = document.getElementById('statement').value;
    const media = document.getElementById('media').files[0];
    const note = document.getElementById('note').value;
    const duration = document.getElementById('duration').value;
    
    let questionData = {
        type,
        statement,
        media: media ? media.name : null,
        note,
        duration,
        timestamp: new Date().toISOString()
    };

    if (type === 'directe') {
        questionData.answer = document.getElementById('answer').value;
        questionData.tolerance = document.getElementById('tolerance').value;
    } else {
        const options = Array.from(document.querySelectorAll('#qcmOptions input[type="text"]')).map(input => input.value);
        const correctAnswers = Array.from(document.querySelectorAll('#qcmOptions input[type="checkbox"]:checked')).map(checkbox => parseInt(checkbox.value));
        
        questionData.options = options;
        questionData.correctAnswers = correctAnswers;
    }

    questions.push(questionData);
    updateQuestionList();
    this.reset();
    toggleFields();
});

function updateQuestionList() {
    const list = document.getElementById('questions');
    list.innerHTML = '';

    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Question ${index + 1}:</strong> ${question.statement}<br>
            <em>Type:</em> ${question.type.toUpperCase()}<br>
            ${question.media ? `<em>Média:</em> ${question.media}<br>` : ''}
            ${question.type === 'directe' ? `
                <em>Réponse:</em> ${question.answer}<br>
                <em>Tolérance:</em> ${question.tolerance}%
            ` : `
                <em>Options:</em> ${question.options.map((opt, i) => 
                    `${opt}${question.correctAnswers.includes(i) ? ' (Correcte)' : ''}`
                ).join(', ')}
            `}
            <div style="margin-top: 8px; color: #667781; font-size: 0.9em">
                Note: ${question.note} pts | Durée: ${question.duration}s
            </div>
        `;
        list.appendChild(li);
    });
}

toggleFields();

const response = await fetch ('http://localhost:3000/api/exams/creer', { ... } );
const data = await response.json();
if (data.lienUnique) {
  document.getElementById('examLink').textContent = `Lien à transmettre : http://localhost:3000/PASS/url_exam.html?exam=${data.lienUnique}`;
}