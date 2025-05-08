const form = document.getElementById('examForm');
const linkContainer = document.getElementById('linkContainer');
const examLink = document.getElementById('examLink');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const targetAudience = document.getElementById('targetAudience').value;

  const response = await fetch('/api/exams/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, targetAudience }),
  });

  const data = await response.json();

  if (response.ok) {
    linkContainer.style.display = 'block';
    examLink.textContent = data.uniqueLink;
    form.reset();
  } else {
    alert('Erreur lors de la création : ' + data.error);
  }
});
