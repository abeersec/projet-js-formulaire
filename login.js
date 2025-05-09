window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  if (!form) {
    console.error('Formulaire de connexion non trouvé !');
    return;
  }
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let msg = document.getElementById('message');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'message';
      document.querySelector('.wrapper').appendChild(msg);
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Réponse backend:', data);
      msg.textContent = data.message || (data.success ? 'Connexion réussie' : 'Erreur de connexion');

      if (data.success && data.token && data.role) {
        console.log('Redirection vers:', data.role);
        setTimeout(() => {
          if (data.role === 'teacher') {
            window.location.href = '/teacher/creation.html';
          } else if (data.role === 'student') {
            window.location.href = '/PASS/url_exam.html';
          }
        }, 1200); // Redirection après 1,2 seconde
      }
    } catch (err) {
      msg.textContent = 'Erreur réseau ou serveur.';
      console.error(err);
    }
  });
}); 