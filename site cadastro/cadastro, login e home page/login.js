document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const messageEl = document.getElementById('loginMessage');
    
    try {
        // Chama API de login
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            
            // Salva token no localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redireciona para homepage
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            showMessage(`❌ ${error.message}`, 'error');
        }
    } catch (error) {
        showMessage('❌ Erro de conexão. Verifique sua internet.', 'error');
    }
});

function showMessage(text, type) {
    const messageEl = document.getElementById('loginMessage');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }
}

// Verifica se usuário já está logado
window.addEventListener('load', function() {
    const token = localStorage.getItem('token');
    if (token) {
        // Usuário já logado, redireciona para dashboard/home
        window.location.href = 'index.html';
    }
});