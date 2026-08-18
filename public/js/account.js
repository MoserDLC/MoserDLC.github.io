var API_URL = 'https://moser-server.onrender.com';

function t(err) {
    if (!err) return '\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430';
    var c = err.charCodeAt(0);
    if (c > 1024 && c < 1280 && err.length > 15) return '\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430';
    var map = {
        'Login min 3 characters': '\u041b\u043e\u0433\u0438\u043d \u043c\u0438\u043d\u0438\u043c\u0443\u043c 3 \u0441\u0438\u043c\u0432\u043e\u043b\u0430',
        'Password min 6 characters': '\u041f\u0430\u0440\u043e\u043b\u044c \u043c\u0438\u043d\u0438\u043c\u0443\u043c 6 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432',
        'HWID required': 'HWID \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d',
        'Login already taken': '\u041b\u043e\u0433\u0438\u043d \u0443\u0436\u0435 \u0437\u0430\u043d\u044f\u0442',
        'Registration failed': '\u041e\u0448\u0438\u0431\u043a\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438',
        'All fields required': '\u0417\u0430\u043f\u043e\u043b\u043d\u0438 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f',
        'Invalid login or password': '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c',
        'Account bound to another device': '\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u043f\u0440\u0438\u0432\u044f\u0437\u0430\u043d \u043a \u0434\u0440\u0443\u0433\u043e\u043c\u0443 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0443',
        'token and hwid required': 'token \u0438 hwid \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b',
        'Invalid token': '\u041d\u0435\u0432\u0430\u043b\u0438\u0434\u043d\u044b\u0439 \u0442\u043e\u043a\u0435\u043d',
        'HWID mismatch': 'HWID \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0435\u0442',
        'Key and HWID required': '\u041a\u043b\u044e\u0447 \u0438 HWID \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b',
        'Invalid or used key': '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u0438\u043b\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043a\u043b\u044e\u0447',
        'plan and count required': 'plan \u0438 count \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b',
        'File not found': '\u0424\u0430\u0439\u043b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d'
    };
    return map[err] || err;
}

var plans = {
    month: { name: '1 \u041c\u0415\u0421\u042f\u0426', amount: 129, period: '\u0437\u0430 30 \u0434\u043d\u0435\u0439', tag: '', days: 30, features: ['\u0412\u0441\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438 \u043a\u043b\u0438\u0435\u043d\u0442\u0430', '\u041e\u0431\u0445\u043e\u0434 \u0430\u043d\u0442\u0438\u0447\u0438\u0442\u043e\u0432', '\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f'] },
    year: { name: '90 \u0414\u041d\u0415\u0419', amount: 169, period: '\u0437\u0430 90 \u0434\u043d\u0435\u0439', tag: '\u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0439', days: 90, features: ['\u0412\u0441\u0451 \u0438\u0437 \u0442\u0430\u0440\u0438\u0444\u0430 "\u041c\u0435\u0441\u044f\u0446"', '\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442\u043d\u0430\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430', '\u0420\u0430\u043d\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0444\u0443\u043d\u043a\u0446\u0438\u044f\u043c', '\u042d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u0435 \u0442\u0435\u043c\u044b'] },
    lifetime: { name: '\u041d\u0410\u0412\u0421\u0415\u0413\u0414\u0410', amount: 229, period: 'Lifetime \u00b7 \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430', tag: 'LIFETIME', days: 36500, features: ['\u0412\u0441\u0451 \u0438\u0437 \u0442\u0430\u0440\u0438\u0444\u0430 "\u0413\u043e\u0434"', '\u0411\u0435\u0441\u0441\u0440\u043e\u0447\u043d\u044b\u0439 \u0434\u043e\u0441\u0442\u0443\u043f', '\u0412\u0441\u0435 \u0431\u0443\u0434\u0443\u0449\u0438\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f', '\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0432\u043e \u0432\u0441\u0451\u043c'] },
    beta: { name: 'BETA', amount: 349, period: '\u041f\u0440\u0435\u043c\u0438\u0443\u043c-\u0434\u043e\u0441\u0442\u0443\u043f', tag: 'BETA', days: 36500, features: ['\u0412\u0441\u0451 \u0438\u0437 \u0442\u0430\u0440\u0438\u0444\u0430 "\u041d\u0430\u0432\u0441\u0435\u0433\u0434\u0430"', '\u0414\u043e\u0441\u0442\u0443\u043f \u043a \u0431\u0435\u0442\u0430-\u0432\u0435\u0440\u0441\u0438\u044f\u043c', '\u041b\u0438\u0447\u043d\u0430\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430', '\u042d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438 \u0440\u0430\u043d\u043d\u0435\u0433\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u0430'] }
};

var currentUser = null;

function getHwid() {
    var hwid = localStorage.getItem('moser_hwid');
    if (!hwid) {
        var hex = '0123456789abcdef';
        hwid = '';
        for (var i = 0; i < 32; i++) { hwid += hex.charAt(Math.floor(Math.random() * 16)); }
        localStorage.setItem('moser_hwid', hwid);
    }
    return hwid;
}

function getToken() { return localStorage.getItem('moser_token'); }

function setToken(token) {
    if (token) { localStorage.setItem('moser_token', token); } else { localStorage.removeItem('moser_token'); }
}

function saveCreds(login, password) {
    try { localStorage.setItem('moser_login', login); localStorage.setItem('moser_pass', btoa(password)); } catch (e) {}
}
function getSavedLogin() { return localStorage.getItem('moser_login'); }
function getSavedPassword() { var p = localStorage.getItem('moser_pass'); return p ? atob(p) : null; }
function clearCreds() { localStorage.removeItem('moser_login'); localStorage.removeItem('moser_pass'); }

function doLoginFetch(login, password, hwid) {
    return fetch(API_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login, password: password, hwid: hwid })
    }).then(function(r) { return r.json(); });
}

function doRegisterFetch(login, password, hwid) {
    return fetch(API_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login, password: password, hwid: hwid })
    }).then(function(r) { return r.json(); });
}

function autoRelogin() {
    var login = getSavedLogin();
    var pass = getSavedPassword();
    if (!login || !pass) return Promise.resolve(null);
    var hwid = getHwid();
    return doLoginFetch(login, pass, hwid).then(function(data) {
        if (data && data.token) return data;
        if (data && data.error && (data.error === 'Invalid login or password' || data.error === 'Account bound to another device')) {
            return doRegisterFetch(login, pass, hwid).then(function(regData) {
                if (regData && regData.token) return regData;
                return doLoginFetch(login, pass, hwid);
            });
        }
        return null;
    }).catch(function() { return null; });
}

function formatRegDate() {
    var d = new Date();
    var months = ['\u044f\u043d\u0432\u0430\u0440\u044f','\u0444\u0435\u0432\u0440\u0430\u043b\u044f','\u043c\u0430\u0440\u0442\u0430','\u0430\u043f\u0440\u0435\u043b\u044f','\u043c\u0430\u044f','\u0438\u044e\u043d\u044f','\u0438\u044e\u043b\u044f','\u0430\u0432\u0433\u0443\u0441\u0442\u0430','\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f','\u043e\u043a\u0442\u044f\u0431\u0440\u044f','\u043d\u043e\u044f\u0431\u0440\u044f','\u0434\u0435\u043a\u0430\u0431\u0440\u044f'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' \u0433. \u0432 ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
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
    if (savedAvatar) user.avatar = savedAvatar;

    var avatarEl = document.getElementById('userAvatar');
    if (user.avatar) { avatarEl.innerHTML = '<img src="' + user.avatar + '" alt="Avatar">'; }
    else { avatarEl.textContent = (user.username || user.login || 'U').charAt(0).toUpperCase(); var img = avatarEl.querySelector('img'); if (img) img.remove(); }

    var isAdmin = (user.role === 'admin' || (user.login && (user.login.toLowerCase() === 'moserdlc' || user.login.toLowerCase() === 'shkwww')));
    var adminSidebarItem = document.getElementById('adminSidebarItem');
    if (adminSidebarItem) adminSidebarItem.style.display = isAdmin ? 'flex' : 'none';

    var roleText = '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c';
    if (isAdmin) roleText = '\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440';
    else if (user.plan && user.plan !== 'free') roleText = '\u041f\u0440\u0435\u043c\u0438\u0443\u043c';

    document.getElementById('detailUid').textContent = user.uid || '\u2014';
    document.getElementById('detailRole').textContent = roleText;
    document.getElementById('detailLogin').textContent = user.login || user.username;
    document.getElementById('detailEmail').textContent = user.email || user.login;
    document.getElementById('detailDate').textContent = user.regDate || '\u2014';
    document.getElementById('detailHwid').textContent = user.hwid || getHwid();
    updateStatus(user);
}

function updateStatus(user) {
    var statusCard = document.getElementById('statusCard');
    if (user.plan && user.plan !== 'free') {
        var planKey = user.plan === '3months' ? 'year' : user.plan;
        var plan = plans[planKey] || { name: user.plan.toUpperCase() };
        var expiry = user.plan === 'lifetime' ? '\u0411\u0435\u0441\u0441\u0440\u043e\u0447\u043d\u043e' : (user.planExpiry ? '\u0414\u043e ' + new Date(user.planExpiry).toLocaleDateString('ru-RU') : (user.expires ? '\u0414\u043e ' + new Date(user.expires).toLocaleDateString('ru-RU') : '\u0410\u043a\u0442\u0438\u0432\u043d\u0430'));
        statusCard.className = 'dashboard-status active';
        statusCard.innerHTML = '<div class="status-icon">&#10003;</div><div><h3>\u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 \u0430\u043a\u0442\u0438\u0432\u043d\u0430 \u2014 ' + plan.name + '</h3><p>' + expiry + '</p></div>';
        return;
    }
    statusCard.className = 'dashboard-status';
    statusCard.innerHTML = '<div class="status-icon">&#8987;</div><div><h3>\u041d\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0439 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0438</h3><p>\u0412\u0432\u0435\u0434\u0438 \u043a\u043b\u044e\u0447 \u0438\u043b\u0438 \u043a\u0443\u043f\u0438 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0443 \u043d\u0438\u0436\u0435</p></div>';
}

function switchToRegister() {
    document.getElementById('authTitle').textContent = '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f';
    document.getElementById('authSubtitle').textContent = '\u0421\u043e\u0437\u0434\u0430\u0439 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u0434\u043b\u044f Moser Client';
    document.getElementById('authBtn').textContent = '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f';
    document.getElementById('usernameField').style.display = 'block';
    document.getElementById('authSwitchText').textContent = '\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442?';
    document.getElementById('authSwitchLink').textContent = '\u0412\u043e\u0439\u0442\u0438';
    document.getElementById('authError').textContent = '';
}

function switchToLogin() {
    document.getElementById('authTitle').textContent = '\u0412\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442';
    document.getElementById('authSubtitle').textContent = '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u043e\u0431\u0440\u0430\u0442\u043d\u043e';
    document.getElementById('authBtn').textContent = '\u0412\u043e\u0439\u0442\u0438';
    document.getElementById('usernameField').style.display = 'none';
    document.getElementById('authSwitchText').textContent = '\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430?';
    document.getElementById('authSwitchLink').textContent = '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f';
    document.getElementById('authError').textContent = '';
}

function handleAuthData(data, hwid) {
    if (!data || !data.token) return false;
    setToken(data.token);
    saveCreds(data.login || '', '');
    var isAdmin = (data.role === 'admin' || (data.login && (data.login.toLowerCase() === 'moserdlc' || data.login.toLowerCase() === 'shkwww')));
    showDashboard({
        username: data.login,
        email: data.login,
        login: data.login,
        plan: data.plan,
        planExpiry: data.expires ? new Date(data.expires).getTime() : null,
        expires: data.expires,
        uid: '\u2014',
        role: isAdmin ? 'admin' : (data.plan && data.plan !== 'free' ? '\u041f\u0440\u0435\u043c\u0438\u0443\u043c' : '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c'),
        regDate: '\u2014',
        hwid: hwid
    });
    return true;
}

function checkSession() {
    var token = getToken();
    var hwid = getHwid();
    if (!token) {
        var savedLogin = getSavedLogin();
        var savedPass = getSavedPassword();
        if (savedLogin && savedPass) {
            autoRelogin().then(function(data) {
                if (data && data.token) {
                    setToken(data.token);
                    handleAuthData(data, hwid);
                } else {
                    clearCreds();
                    showAuth();
                }
            }).catch(function() { showAuth(); });
        } else {
            showAuth();
        }
        return;
    }
    fetch(API_URL + '/api/auth/check?token=' + encodeURIComponent(token) + '&hwid=' + encodeURIComponent(hwid))
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.valid) {
                handleAuthData({ token: token, login: data.login, plan: data.plan, role: data.role, expires: data.expires }, hwid);
            } else {
                autoRelogin().then(function(redata) {
                    if (redata && redata.token) {
                        setToken(redata.token);
                        handleAuthData(redata, hwid);
                    } else {
                        setToken(null);
                        clearCreds();
                        showAuth();
                    }
                }).catch(function() {
                    setToken(null);
                    clearCreds();
                    showAuth();
                });
            }
        })
        .catch(function(err) {
            console.error('Session check error:', err);
            autoRelogin().then(function(redata) {
                if (redata && redata.token) {
                    setToken(redata.token);
                    handleAuthData(redata, hwid);
                } else {
                    clearCreds();
                    showAuth();
                }
            }).catch(function() { showAuth(); });
        });
}
checkSession();

var isLogin = true;

document.getElementById('authSwitchLink').addEventListener('click', function(e) {
    e.preventDefault();
    isLogin = !isLogin;
    if (isLogin) switchToLogin(); else switchToRegister();
});

document.getElementById('authForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    var loginInput = document.getElementById('authEmail').value.trim();
    var password = document.getElementById('authPassword').value;
    var errorEl = document.getElementById('authError');
    var hwid = getHwid();

    if (!loginInput || !password) { errorEl.textContent = '\u0417\u0430\u043f\u043e\u043b\u043d\u0438 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f'; return; }
    errorEl.textContent = '\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...';

    if (isLogin) {
        try {
            var res = await fetch(API_URL + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: loginInput, password: password, hwid: hwid }) });
            var data = await res.json();
            if (data.error) {
                var msg = t(data.error);
                if (msg === '\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430') msg = '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c';
                errorEl.textContent = msg;
                if (data.error === 'Invalid login or password') {
                    errorEl.textContent = '\u041f\u043e\u043f\u044b\u0442\u043a\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438...';
                    try {
                        var regRes = await fetch(API_URL + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: loginInput, password: password, hwid: hwid }) });
                        var regData = await regRes.json();
                        if (regData.token) {
                            saveCreds(loginInput, password);
                            setToken(regData.token);
                            handleAuthData(regData, hwid);
                            errorEl.textContent = '';
                            return;
                        }
                        errorEl.textContent = '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c';
                    } catch (re) { errorEl.textContent = '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c'; }
                }
                return;
            }
            if (data.token) {
                saveCreds(loginInput, password);
                setToken(data.token);
                handleAuthData(data, hwid);
            }
        } catch (err) { errorEl.textContent = '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c'; console.error(err); }
    } else {
        var username = document.getElementById('regUsername').value.trim() || loginInput;
        if (!username || username.length < 3) { errorEl.textContent = '\u041b\u043e\u0433\u0438\u043d \u043c\u0438\u043d\u0438\u043c\u0443\u043c 3 \u0441\u0438\u043c\u0432\u043e\u043b\u0430'; return; }
        if (password.length < 6) { errorEl.textContent = '\u041f\u0430\u0440\u043e\u043b\u044c \u043c\u0438\u043d\u0438\u043c\u0443\u043c 6 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432'; return; }
        try {
            var res = await fetch(API_URL + '/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ login: username, password: password, hwid: hwid }) });
            var data = await res.json();
            if (data.error) { var msg = t(data.error); if (msg === '\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430') msg = '\u041b\u043e\u0433\u0438\u043d \u0443\u0436\u0435 \u0437\u0430\u043d\u044f\u0442'; errorEl.textContent = msg; return; }
            if (data.token) { saveCreds(username, password); setToken(data.token); handleAuthData(data, hwid); }
        } catch (err) { errorEl.textContent = '\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d'; console.error(err); }
    }
    errorEl.textContent = '';
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    currentUser = null;
    setToken(null);
    clearCreds();
    document.getElementById('dashboardSection').style.display = 'none';
    showAuth();
    document.getElementById('authForm').reset();
    switchToLogin();
});

document.getElementById('keyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    var key = document.getElementById('licenseKey').value.trim().toUpperCase();
    var resultEl = document.getElementById('keyResult');
    var hwid = getHwid();
    var token = getToken();
    if (!key) { resultEl.textContent = '\u0412\u0432\u0435\u0434\u0438 \u043a\u043b\u044e\u0447'; resultEl.className = 'key-result error'; return; }
    resultEl.textContent = '\u0410\u043a\u0442\u0438\u0432\u0430\u0446\u0438\u044f...'; resultEl.className = 'key-result';
    try {
        var res = await fetch(API_URL + '/api/auth/activate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: key, hwid: hwid, token: token }) });
        var data = await res.json();
        if (data.error) { resultEl.textContent = t(data.error); resultEl.className = 'key-result error'; return; }
        if (data.token) setToken(data.token);
        currentUser = { username: data.login, email: data.login, login: data.login, plan: data.plan, planExpiry: data.expires ? new Date(data.expires).getTime() : null, expires: data.expires, uid: currentUser ? currentUser.uid : '\u2014', role: '\u041f\u0440\u0435\u043c\u0438\u0443\u043c', regDate: currentUser ? currentUser.regDate : formatRegDate(), hwid: hwid, avatar: currentUser ? currentUser.avatar : null };
        showDashboard(currentUser);
        var planKey = data.plan === '3months' ? 'year' : data.plan;
        var planName = plans[planKey] ? plans[planKey].name : data.plan;
        resultEl.textContent = '\u041a\u043b\u044e\u0447 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d! \u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 ' + planName + ' \u2014 \u0430\u043a\u0442\u0438\u0432\u043d\u0430';
        resultEl.className = 'key-result success';
        document.getElementById('licenseKey').value = '';
    } catch (err) { resultEl.textContent = '\u0421\u0435\u0440\u0432\u0435\u0440 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d'; resultEl.className = 'key-result error'; console.error(err); }
});

document.getElementById('downloadBtn').addEventListener('click', function() { window.location.href = API_URL + '/api/client/download/moser-client-1.0.0.jar'; });

document.querySelectorAll('.plan-option').forEach(function(option) {
    option.addEventListener('click', function() {
        document.querySelectorAll('.plan-option').forEach(function(o) { o.classList.remove('active'); });
        this.classList.add('active');
        this.querySelector('input').checked = true;
        var planKey = this.dataset.plan;
        var plan = plans[planKey];
        document.getElementById('detailsBadge').textContent = plan.name;
        document.getElementById('detailsAmount').textContent = plan.amount;
        document.getElementById('detailsPeriod').textContent = plan.period;
        document.getElementById('buyBtn').textContent = '\u041a\u0443\u043f\u0438\u0442\u044c \u0437\u0430 ' + plan.amount + ' \u20bd';
        var tagEl = document.getElementById('detailsTag');
        if (plan.tag) { tagEl.textContent = plan.tag; tagEl.style.display = 'inline-block'; } else { tagEl.style.display = 'none'; }
        var listEl = document.getElementById('detailsList');
        listEl.innerHTML = plan.features.map(function(f) { return '<li>' + f + '</li>'; }).join('');
    });
});

document.getElementById('buyBtn').addEventListener('click', function() { if (!currentUser) { alert('\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u043e\u0439\u0434\u0438 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442'); return; } window.open('https://funpay.com/users/18355333/', '_blank'); });

var hwidBtnEl = document.getElementById('hwidBtn');
if (hwidBtnEl) { hwidBtnEl.addEventListener('click', function() { if (!currentUser) { alert('\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u043e\u0439\u0434\u0438 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442'); return; } window.open('https://t.me/shkwww', '_blank'); }); }

document.getElementById('avatarInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file || !currentUser) return;
    if (file.size > 2 * 1024 * 1024) { alert('\u0424\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439. \u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c 2 \u041c\u0411.'); return; }
    var reader = new FileReader();
    reader.onload = function(ev) { var dataUrl = ev.target.result; currentUser.avatar = dataUrl; localStorage.setItem('moser_avatar_' + currentUser.login, dataUrl); document.getElementById('userAvatar').innerHTML = '<img src="' + dataUrl + '" alt="Avatar">'; };
    reader.readAsDataURL(file);
});

document.querySelectorAll('.sidebar-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        var tab = this.dataset.tab;
        document.querySelectorAll('.sidebar-item').forEach(function(i) { i.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.dashboard-tab').forEach(function(t) { t.classList.remove('active'); });
        var target = document.getElementById('tab-' + tab);
        if (target) target.classList.add('active');
        if (tab === 'admin') { loadAdminUsers(); loadAdminKeys(); }
    });
});

async function loadAdminUsers() {
    var tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--text-secondary)">\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...</td></tr>';
    try {
        var res = await fetch(API_URL + '/api/admin/users');
        var data = await res.json();
        if (data.users && data.users.length > 0) {
            tbody.innerHTML = data.users.map(function(u) { return '<tr style="border-bottom:1px solid var(--border)"><td style="padding:12px 16px">' + u.id + '</td><td style="padding:12px 16px;font-weight:600">' + u.login + '</td><td style="padding:12px 16px"><span style="color:' + (u.role === 'admin' || u.login.toLowerCase() === 'moserdlc' || u.login.toLowerCase() === 'shkwww' ? 'var(--accent)' : 'var(--text-primary)') + '">' + (u.role || 'user') + '</span></td><td style="padding:12px 16px">' + (u.plan || 'free') + '</td><td style="padding:12px 16px;font-family:monospace;font-size:11px">' + (u.hwid || '\u2014') + '</td><td style="padding:12px 16px;color:var(--text-secondary)">' + (u.created || '\u2014') + '</td></tr>'; }).join('');
        } else { tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--text-secondary)">\u041d\u0435\u0442 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439</td></tr>'; }
    } catch (err) { tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;color:#ef4444">\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438</td></tr>'; console.error(err); }
}

async function loadAdminKeys() {
    var tbody = document.getElementById('adminKeysTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:var(--text-secondary)">\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...</td></tr>';
    try {
        var res = await fetch(API_URL + '/api/admin/keys');
        var data = await res.json();
        if (data.keys && data.keys.length > 0) {
            tbody.innerHTML = data.keys.map(function(k) { return '<tr style="border-bottom:1px solid var(--border)"><td style="padding:12px 16px">' + k.id + '</td><td style="padding:12px 16px;font-family:monospace;font-weight:600">' + k.key_code + '</td><td style="padding:12px 16px">' + k.plan + '</td><td style="padding:12px 16px"><span style="color:' + (k.used ? 'var(--green)' : 'var(--text-secondary)') + '">' + (k.used ? '\u0414\u0430' : '\u041d\u0435\u0442') + '</span></td><td style="padding:12px 16px">' + (k.user_id || '\u2014') + '</td></tr>'; }).join('');
        } else { tbody.innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:var(--text-secondary)">\u041d\u0435\u0442 \u043a\u043b\u044e\u0447\u0435\u0439</td></tr>'; }
    } catch (err) { tbody.innerHTML = '<tr><td colspan="5" style="padding:20px;text-align:center;color:#ef4444">\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438</td></tr>'; console.error(err); }
}

var adminRefreshUsers = document.getElementById('adminRefreshUsers');
if (adminRefreshUsers) adminRefreshUsers.addEventListener('click', loadAdminUsers);
var adminRefreshKeys = document.getElementById('adminRefreshKeys');
if (adminRefreshKeys) adminRefreshKeys.addEventListener('click', loadAdminKeys);

var adminGenForm = document.getElementById('adminGenForm');
if (adminGenForm) {
    adminGenForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        var plan = document.getElementById('adminGenPlan').value;
        var count = parseInt(document.getElementById('adminGenCount').value, 10) || 1;
        var resultEl = document.getElementById('adminGenResult');
        var genKeysSection = document.getElementById('adminGeneratedKeysSection');
        var genKeysList = document.getElementById('adminGeneratedKeysList');
        resultEl.textContent = '\u0413\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u044f...'; resultEl.style.color = 'var(--text-secondary)';
        try {
            var res = await fetch(API_URL + '/api/admin/keys/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: plan, count: count }) });
            var data = await res.json();
            if (data.error) { resultEl.textContent = t(data.error); resultEl.style.color = '#ef4444'; return; }
            if (data.keys) {
                resultEl.textContent = '\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043e \u043a\u043b\u044e\u0447\u0435\u0439: ' + data.keys.length; resultEl.style.color = 'var(--green)';
                genKeysSection.style.display = 'block';
                genKeysList.innerHTML = data.keys.map(function(key) { return '<div style="display:flex;justify-content:space-between;align-items:center;background:var(--bg-primary);padding:8px 12px;border-radius:8px;border:1px solid var(--border)"><span style="font-family:monospace;font-size:13px;font-weight:600">' + key + '</span><button class="btn btn-secondary" style="padding:4px 10px;font-size:11px" onclick="navigator.clipboard.writeText(\'' + key + '\'); this.textContent=\'\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e!\'; setTimeout(function(){this.textContent=\'\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c\'}.bind(this), 1500)">\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c</button></div>'; }).join('');
                loadAdminKeys();
            }
        } catch (err) { resultEl.textContent = '\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f'; resultEl.style.color = '#ef4444'; console.error(err); }
    });
}
