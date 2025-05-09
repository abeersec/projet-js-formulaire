        document.getElementById('examForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const examId = crypto.randomUUID();
            const baseUrl = window.location.href.replace(/\/[^/]*$/, '');
            const examLink = `${baseUrl}/teacher.html?examId=${examId}`;

            document.getElementById('generatedLink').textContent = examLink;
            document.getElementById('generatedLink').href = examLink;
            document.getElementById('linkContainer').style.display = 'block';

            setTimeout(() => {
                window.location.href = examLink;
            }, 5000);
        });

        function copyLink() {
            const link = document.getElementById('generatedLink').href;
            navigator.clipboard.writeText(link)
                .then(() => alert('Lien copié dans le presse-papier !'))
                .catch(err => console.error('Erreur de copie : ', err));
        }
