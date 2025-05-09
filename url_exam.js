

  document.getElementById('examUrlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const url = document.getElementById('examUrl').value;
    // Extraire l'ID de l'examen si besoin
    const examId = url.split('exam=')[1] || url;
    window.location.href = `K.html?exam=${examId}`;
  });