const btn = document.querySelector('#container button');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

btn.addEventListener('click', () => overlay.classList.add('active'));
closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
});

document.getElementById('test-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const res = await fetch('submit.php', {
            method: 'POST',
            body: formData
        });

        const result = await res.json();

        if (result.success) {
            document.getElementById('test-form').style.display = 'none';
            document.getElementById('success-msg').style.display = 'block';
        } else {
            alert('Er ging iets mis: ' + result.error);
        }
    } catch (err) {
        alert('Er ging iets mis. Probeer opnieuw.');
        console.error(err);
    }
});