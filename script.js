const form = document.getElementById('report-form');
const btn  = document.getElementById('generate-btn');
const spinner = document.querySelector('.spinner');
const message = document.getElementById('message');

// Changez cette URL vers votre API déployée
const API_URL = 'https://hilton-form-reporter-backend.onrender.com/generate';

form.addEventListener('submit', async e => {
  e.preventDefault();
  btn.disabled = true;
  spinner.hidden = false;
  message.textContent = 'Génération en cours…';

  const data = new FormData(form);
  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      body: data
    });
    if (!resp.ok) throw new Error(resp.statusText);

    const blob = await resp.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'reports.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    message.textContent = 'Téléchargement prêt !';
  } catch (err) {
    console.error(err);
    message.textContent = 'Erreur : ' + err.message;
  } finally {
    btn.disabled = false;
    spinner.hidden = true;
  }
});
