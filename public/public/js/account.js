const API_URL = 'https://moser-server.onrender.com';

const plans = {
    month: {
        name: '1 МЕСЯЦ',
        amount: 129,
        period: 'за 30 дней',
        tag: '',
        days: 30,
        features: ['Все функции клиента', 'Обход античитов', 'Бесплатные обновления']
    },
    year: {
        name: '90 ДНЕЙ',
        amount: 169,
        period: 'за 90 дней',
        tag: 'популярный',
        days: 90,
        features: ['Всё из тарифа «1 месяц»', 'Приоритетная поддержка', 'Ранний доступ к функциям', 'Эксклюзивные темы']
    },
    lifetime: {
        name: 'НАВСЕГДА',
        amount: 229,
        period: 'Lifetime · навсегда',
        tag: 'LIFETIME',
        days: 36500,
        features: ['Всё из тарифа «1 год»', 'Бессрочный доступ', 'Все будущие обновления', 'Приоритет во всём']
    },
    beta: {
        name: 'BETA',
        amount: 349,
        period: 'Премиум-доступ',
        tag: 'BETA',
        days: 36500,
        features: ['Всё из тарифа «Навсегда»', 'Доступ к бета-версиям', 'Личная поддержка', 'Эксклюзивные функции раннего доступа']
    }
};

let currentUser = null;

function getHwid() {
    let hwid = localStorage.getItem('moser_hwid');
    if (!hwid) {
        var hex = '0123456789abcdef';
        hwid = '';
        for (var i = 0; i < 32; i++) {
            hwid += hex.charAt(Math.floor(Math.random() * 16));
        }
        localStorage.setItem('moser_hwid', hwid);
    }
    return hwid;
}

function getToken() {
    return localStorage.getItem('moser_token');
}

function setToken(token) {
    if (token) {
        localStorage.setItem('moser_token', token);
    } else {
        localStorage.removeItem('moser_token');
    }
}

function formatRegDate() {
    var d = new Date();
    var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' г. в ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
}

function showAuth() {
    document.getElementById('authSection').style.display = 'flex';
    document.getElementById('dashboardSection').style.display = 'none';
}

function showDashboard(user) {
    currentUser = user;
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('userName').textContent = user.username || user.login;
    document.getElementById('userEmail').textContent = user.email || user.login;

    var savedAvatar = localStorage.getItem('moser_avatar_' + user.login);
    if (savedAvatar) {
        user.avatar = savedAvatar;
    }

    var avatarEl = document.getElementById('userAvatar');
    if (user.avatar) {
        avatarEl.innerHTML = '<img src="' + user.avatar + '" alt="Avatar">';
    } else {
        avatarEl.textContent = (user.username || user.login || 'U').charAt(0).toUpperCase();
        var img = avatarEl.querySelector('img');
        if (img) img.remove();
    }

    const isAdmin = (user.role === 'admin' || (user.login && user.login.toLowerCase() === 'moserdlc'));
    const adminSidebarItem = document.getElementById('adminSidebarItem');
    if (adminSidebarItem) {
        adminSidebarItem.style.display = isAdmin ? 'flex' : 'none';
    }

    let roleText = 'Пользователь';
    if (isAdmin) {
        roleText = 'Администратор';
    } else if (user.plan && user.plan !== 'free') {
        roleText = 'Премиум';
    }

    // Fill details
    document.getElementById('detailUid').textContent = user.uid || '—';
    document.getElementById('detailRole').textContent = roleText;
    document.getElementById('detailLogin').textContent = user.login || user.username;
    document.getElementById('detailEmail').textContent = user.email || user.login;
    document.getElementById('detailDate').textContent = user.regDate || '—';
    document.getElementById('detailHwid').textContent = user.hwid || getHwid();

    updateStatus(user);
}

function updateStatus(user) {
    const statusCard = document.getElementById('statusCard');
    if (user.plan && user.plan !== 'free') {
        const planKey = user.plan === '3months' ? 'year' : user.plan;
        const plan = plans[planKey] || { name: user.plan.toUpperCase() };
        const expiry = user.plan === 'lifetime' ? 'Бессрочно' : (user.planExpiry ? 'До ' + new Date(user.planExpiry).toLocaleDateString('ru-RU') : (user.expires ? 'До ' + new Date(user.expires).toLocaleDateString('ru-RU') : 'Активна'));
        statusCard.className = 'dashboard-status active';
        statusCard.innerHTML = `
            <div class="status-icon">✓</div>
            <div>
                <h3>Подписка активна — ${plan.name}</h3>
                <p>${expiry}</p>
            </div>
        `;
        return;
    }
    statusCard.className = 'dashboard-status';
    statusCard.innerHTML = `
        <div class="status-icon">⏳</div>
        <div>
            <h3>Нет активной подписки</h3>
            <p>Введи ключ или купи подписку ниже</p>
        </div>
    `;
}

function switchToRegister() {
    document.getElementById('authTitle').textContent = 'Регистрация';
    document.getElementById('authSubtitle').textContent = 'Создай аккаунт для Moser Client';
    document.getElementById('authBtn').textContent = 'Зарегистрироваться';
    document.getElementById('usernameField').style.display = 'block';
    document.getElementById('authSwitchText').textContent = 'Уже есть аккаунт?';
    document.getElementById('authSwitchLink').textContent = 'Войти';
    document.getElementById('authError').textContent = '';
}

function switchToLogin() {
    document.getElementById('authTitle').textContent = 'Вход в аккаунт';
    document.getElementById('authSubtitle').textContent = 'Добро пожаловать обратно';
    document.getElementById('authBtn').textContent = 'Войти';
    document.getElementById('usernameField').style.display = 'none';
    document.getElementById('authSwitchText').textContent = 'Нет аккаунта?';
    document.getElementById('authSwitchLink').textContent = 'Зарегистрироваться';
    document.getElementById('authError').textContent = '';
}

// Session check on load
function checkSession() {
    const token = getToken();
    const hwid = getHwid();
    if (!token) {
        showAuth();
        return;
    }
    fetch(`${API_URL}/api/auth/check?token=${encodeURIComponent(token)}&hwid=${encodeURIComponent(hwid)}`)
        .then(res => res.json())
        .then(data => {
            if (data.valid) {
                const isAdmin = (data.role === 'admin' || (data.login && data.login.toLowerCase() === 'moserdlc'));
                showDashboard({
                    username: data.login,
                    email: data.login,
                    login: data.login,
                    plan: data.plan,
                    planExpiry: data.expires ? new Date(data.expires).getTime() : null,
                    expires: data.expires,
                    uid: '—',
                    role: isAdmin ? 'admin' : (data.plan && data.plan !== 'free' ? 'Премиум' : 'Пользователь'),
                    regDate: '—',
                    hwid: hwid
                });
            } else {
                setToken(null);
                showAuth();
            }
        })
        .catch(err => {
            console.error('Session check error:', err);
            showAuth();
        });
}
checkSession();

// Auth toggle
let isLogin = true;

document.getElementById('authSwitchLink').addEventListener('click', function(e) {
    e.preventDefault();
    isLogin = !isLogin;
    if (isLogin) {
        switchToLogin();
    } else {
        switchToRegister();
    }
});

// Auth form submit
document.getElementById('authForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const loginInput = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const errorEl = document.getElementById('authError');
    const hwid = getHwid();

    if (!loginInput || !password) {
        errorEl.textContent = 'Заполни все поля';
        return;
    }

    errorEl.textContent = 'Загрузка...';

    if (isLogin) {
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: loginInput, password, hwid })
            });
            const data = await res.json();
            if (data.error) {
                errorEl.textContent = data.error;
                return;
            }
            if (data.token) {
                setToken(data.token);
                const isAdmin = (data.role === 'admin' || (data.login && data.login.toLowerCase() === 'moserdlc'));
                showDashboard({
                    username: data.login,
                    email: data.login,
                    login: data.login,
                    plan: data.plan,
                    planExpiry: data.expires ? new Date(data.expires).getTime() : null,
                    expires: data.expires,
                    uid: '—',
                    role: isAdmin ? 'admin' : (data.plan && data.plan !== 'free' ? 'Премиум' : 'Пользователь'),
                    regDate: '—',
                    hwid: hwid
                });
            }
        } catch (err) {
            errorEl.textContent = 'Ошибка соединения с сервером';
            console.error(err);
        }
    } else {
        const username = document.getElementById('regUsername').value.trim() || loginInput;
        if (!username || username.length < 3) {
            errorEl.textContent = 'Логин минимум 3 символа';
            return;
        }
        if (password.length < 6) {
            errorEl.textContent = 'Пароль минимум 6 символов';
            return;
        }
        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: username, password, hwid })
            });
            const data = await res.json();
            if (data.error) {
                errorEl.textContent = data.error;
                return;
            }
            if (data.token) {
                setToken(data.token);
                const isAdmin = (data.role === 'admin' || (data.login && data.login.toLowerCase() === 'moserdlc'));
                showDashboard({
                    username: data.login,
                    email: data.login,
                    login: data.login,
                    plan: data.plan,
                    planExpiry: data.expires ? new Date(data.expires).getTime() : null,
                    expires: data.expires,
                    uid: '—',
                    role: isAdmin ? 'admin' : 'Пользователь',
                    regDate: formatRegDate(),
                    hwid: hwid
                });
            }
        } catch (err) {
            errorEl.textContent = 'Ошибка соединения с сервером';
            console.error(err);
        }
    }
    errorEl.textContent = '';
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    setToken(null);
    document.getElementById('dashboardSection').style.display = 'none';
    showAuth();
    document.getElementById('authForm').reset();
    switchToLogin();
});

// Activate key
document.getElementById('keyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const key = document.getElementById('licenseKey').value.trim().toUpperCase();
    const resultEl = document.getElementById('keyResult');
    const hwid = getHwid();
    const token = getToken();

    if (!key) {
        resultEl.textContent = 'Введи ключ';
        resultEl.className = 'key-result error';
        return;
    }

    resultEl.textContent = 'Активация...';
    resultEl.className = 'key-result';

    try {
        const res = await fetch(`${API_URL}/api/auth/activate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, hwid, token })
        });
        const data = await res.json();
        if (data.error) {
            resultEl.textContent = data.error;
            resultEl.className = 'key-result error';
            return;
        }
        if (data.token) {
            setToken(data.token);
        }
        currentUser = {
            username: data.login,
            email: data.login,
            login: data.login,
            plan: data.plan,
            planExpiry: data.expires ? new Date(data.expires).getTime() : null,
            expires: data.expires,
            uid: currentUser ? currentUser.uid : '—',
            role: 'Премиум',
            regDate: currentUser ? currentUser.regDate : formatRegDate(),
            hwid: hwid,
            avatar: currentUser ? currentUser.avatar : null
        };
        showDashboard(currentUser);

        const planKey = data.plan === '3months' ? 'year' : data.plan;
        const planName = plans[planKey] ? plans[planKey].name : data.plan;
        resultEl.textContent = 'Ключ активирован! Подписка ' + planName + ' — активна';
        resultEl.className = 'key-result success';
        document.getElementById('licenseKey').value = '';
    } catch (err) {
        resultEl.textContent = 'Ошибка соединения с сервером';
        resultEl.className = 'key-result error';
        console.error(err);
    }
});

// Download button
document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = `${API_URL}/api/client/download/moser-client-1.0.0.jar`;
});

// Pricing
document.querySelectorAll('.plan-option').forEach(function(option) {
    option.addEventListener('click', function() {
        document.querySelectorAll('.plan-option').forEach(function(o) {
            o.classList.remove('active');
        });
        this.classList.add('active');
        this.querySelector('input').checked = true;

        const planKey = this.dataset.plan;
        const plan = plans[planKey];

        document.getElementById('detailsBadge').textContent = plan.name;
        document.getElementById('detailsAmount').textContent = plan.amount;
        document.getElementById('detailsPeriod').textContent = plan.period;
        document.getElementById('buyBtn').textContent = 'Купить за ' + plan.amount + ' ₽';

        const tagEl = document.getElementById('detailsTag');
        if (plan.tag) {
            tagEl.textContent = plan.tag;
            tagEl.style.display = 'inline-block';
        } else {
            tagEl.style.display = 'none';
        }

        const listEl = document.getElementById('detailsList');
        listEl.innerHTML = plan.features.map(function(f) {
            return '<li>' + f + '</li>';
        }).join('');
    });
});

// Buy button
document.getElementById('buyBtn').addEventListener('click', function() {
    const activePlan = document.querySelector('.plan-option.active');
    if (!activePlan) return;

    if (!currentUser) {
        alert('Сначала войди в аккаунт');
        return;
    }

    window.open('https://funpay.com/users/18355333/', '_blank');
});

// HWID
var hwidBtnEl = document.getElementById('hwidBtn');
if (hwidBtnEl) {
    hwidBtnEl.addEventListener('click', function() {
        if (!currentUser) {
            alert('Сначала войди в аккаунт');
            return;
        }
        window.open('https://t.me/shkwww', '_blank');
    });
}

// Avatar upload
document.getElementById('avatarInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file || !currentUser) return;
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой. Максимум 2 МБ.');
        return;
    }
    var reader = new FileReader();
    reader.onload = function(ev) {
        var dataUrl = ev.target.result;
        currentUser.avatar = dataUrl;
        localStorage.setItem('moser_avatar_' + currentUser.login, dataUrl);
        var avatarEl = document.getElementById('userAvatar');
        avatarEl.innerHTML = '<img src="' + dataUrl + '" alt="Avatar">';
    };
    reader.readAsDataURL(file);
});

// Sidebar tabs
document.querySelectorAll('.sidebar-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        var tab = this.dataset.tab;
        document.querySelectorAll('.sidebar-item').forEach(function(i) { i.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.dashboard-tab').forEach(function(t) { t.classList.remove('active'); });
        var target = document.getElementById('tab-' + tab);
        if (target) target.classList.add('active');

        if (tab === 'admin') {
            loadAdminUsers();
            loadAdminKeys();
        }
    });
});

async function loadAdminUsers() {
    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-secondary);">Загрузка...</td></tr>';
    try {
        const res = await fetch(`${API_URL}/api/admin/users`);
        const data = await res.json();
        if (data.users && data.users.length > 0) {
            tbody.innerHTML = data.users.map(u => `
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 12px 16px;">${u.id}</td>
                    <td style="padding: 12px 16px; font-weight: 600;">${u.login}</td>
                    <td style="padding: 12px 16px;"><span style="color: ${u.role === 'admin' || u.login.toLowerCase() === 'moserdlc' ? 'var(--accent)' : 'var(--text-primary)'};">${u.role || (u.login.toLowerCase() === 'moserdlc' ? 'admin' : 'user')}</span></td>
                    <td style="padding: 12px 16px;">${u.plan || 'free'}</td>
                    <td style="padding: 12px 16px; font-family: monospace; font-size: 11px;">${u.hwid || '—'}</td>
                    <td style="padding: 12px 16px; color: var(--text-secondary);">${u.created || '—'}</td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-secondary);">Нет пользователей</td></tr>';
        }
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: #ef4444;">Ошибка загрузки</td></tr>';
        console.error(err);
    }
}

async function loadAdminKeys() {
    const tbody = document.getElementById('adminKeysTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" style="padding: 20px; text-align: center; color: var(--text-secondary);">Загрузка...</td></tr>';
    try {
        const res = await fetch(`${API_URL}/api/admin/keys`);
        const data = await res.json();
        if (data.keys && data.keys.length > 0) {
            tbody.innerHTML = data.keys.map(k => `
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 12px 16px;">${k.id}</td>
                    <td style="padding: 12px 16px; font-family: monospace; font-weight: 600;">${k.key_code}</td>
                    <td style="padding: 12px 16px;">${k.plan}</td>
                    <td style="padding: 12px 16px;"><span style="color: ${k.used ? 'var(--green)' : 'var(--text-secondary)'}">${k.used ? 'Да' : 'Нет'}</span></td>
                    <td style="padding: 12px 16px;">${k.user_id || '—'}</td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = '<tr><td colspan="5" style="padding: 20px; text-align: center; color: var(--text-secondary);">Нет ключей</td></tr>';
        }
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding: 20px; text-align: center; color: #ef4444;">Ошибка загрузки</td></tr>';
        console.error(err);
    }
}

document.getElementById('adminRefreshUsers')?.addEventListener('click', loadAdminUsers);
document.getElementById('adminRefreshKeys')?.addEventListener('click', loadAdminKeys);

document.getElementById('adminGenForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const plan = document.getElementById('adminGenPlan').value;
    const count = parseInt(document.getElementById('adminGenCount').value, 10) || 1;
    const resultEl = document.getElementById('adminGenResult');
    const genKeysSection = document.getElementById('adminGeneratedKeysSection');
    const genKeysList = document.getElementById('adminGeneratedKeysList');

    resultEl.textContent = 'Генерация...';
    resultEl.style.color = 'var(--text-secondary)';

    try {
        const res = await fetch(`${API_URL}/api/admin/keys/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, count })
        });
        const data = await res.json();
        if (data.error) {
            resultEl.textContent = data.error;
            resultEl.style.color = '#ef4444';
            return;
        }
        if (data.keys) {
            resultEl.textContent = `Успешно сгенерировано ключей: ${data.keys.length}`;
            resultEl.style.color = 'var(--green)';

            genKeysSection.style.display = 'block';
            genKeysList.innerHTML = data.keys.map(key => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-primary); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border);">
                    <span style="font-family: monospace; font-size: 13px; font-weight: 600;">${key}</span>
                    <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 11px;" onclick="navigator.clipboard.writeText('${key}'); this.textContent='Скопировано!'; setTimeout(() => this.textContent='Копировать', 1500);">Копировать</button>
                </div>
            `).join('');

            loadAdminKeys();
        }
    } catch (err) {
        resultEl.textContent = 'Ошибка соединения';
        resultEl.style.color = '#ef4444';
        console.error(err);
    }
});
