
function scrollToSchedule() {
    document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
}


document.getElementById('date').addEventListener('change', function() {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="">Selecione horário</option>';
    
    const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        timeSelect.appendChild(option);
    });
});


document.getElementById('scheduleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const messageEl = document.getElementById('message');
        
        if (response.ok) {
            messageEl.textContent = '✅ Agendamento realizado com sucesso!';
            messageEl.className = 'message success';
            this.reset();
        } else {
            const error = await response.json();
            messageEl.textContent = `❌ Erro: ${error.message}`;
            messageEl.className = 'message error';
        }
        
        messageEl.style.display = 'block';
    } catch (error) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = '❌ Erro de conexão. Tente novamente.';
        messageEl.className = 'message error';
        messageEl.style.display = 'block';
    }
});



window.addEventListener('load', function() {
    const token = localStorage.getItem('token');
    const authLink = document.getElementById('authLink');
    
    if (token) {
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        authLink.innerHTML = `
            <span>Olá, ${user.name || 'Usuário'}!</span>
            <a href="#" onclick="logout()" style="margin-left: 1rem;">Sair</a>
        `;
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
}