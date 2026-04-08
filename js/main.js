/**
 * DreamWin - Main Application Controller
 * Handles all UI interactions and page rendering
 */

// ============================================
// GLOBAL VARIABLES
// ============================================
let currentPage = 'home';
let currentOTP = null;
let authType = 'login';

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (DreamWin.AuthManager.init()) {
        showApp();
        initializeApp();
    } else {
        showAuth();
    }
    
    // Initialize spin wheel
    initSpinWheel();
    
    // Setup OTP inputs
    setupOTPInputs();
    
    // Handle hash navigation
    handleHashNavigation();
});

// ============================================
// AUTH FUNCTIONS
// ============================================
function showAuth() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}

function showApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
}

function showAuthTab(tab) {
    authType = tab;
    document.querySelectorAll('#auth-tabs .tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
    } else {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    }
}

function sendOTP(type) {
    const phoneInput = document.getElementById(type === 'login' ? 'login-phone' : 'register-phone');
    const phone = phoneInput.value.trim();
    
    if (!DreamWin.Utils.validatePhone(phone)) {
        DreamWin.Utils.showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    currentOTP = DreamWin.AuthManager.sendOTP(phone);
    DreamWin.Utils.showNotification('OTP sent successfully!', 'success');
    
    if (type === 'login') {
        document.getElementById('login-otp-section').classList.remove('hidden');
    } else {
        document.getElementById('register-otp-section').classList.remove('hidden');
    }
}

function verifyLoginOTP() {
    const phone = document.getElementById('login-phone').value.trim();
    const otp = getOTPInput();
    
    if (DreamWin.AuthManager.login(phone, otp)) {
        showApp();
        initializeApp();
        
        // Show character selection if first time
        if (!DreamWin.USER.character) {
            navigateTo('characters');
            DreamWin.Utils.showNotification('Please select your character!', 'warning');
        }
    }
}

function verifyRegisterOTP() {
    const name = document.getElementById('register-name').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const referral = document.getElementById('register-referral').value.trim();
    const otp = getOTPInput();
    
    if (!name) {
        DreamWin.Utils.showNotification('Please enter your name', 'error');
        return;
    }
    
    if (otp === '123456' || otp === localStorage.getItem('dreamwin_otp')) {
        DreamWin.AuthManager.register(name, phone, referral || null);
        showApp();
        initializeApp();
        navigateTo('characters');
        DreamWin.Utils.showNotification('Welcome to DreamWin! Select your character.', 'success');
    } else {
        DreamWin.Utils.showNotification('Invalid OTP', 'error');
    }
}

function getOTPInput() {
    const inputs = document.querySelectorAll('.otp-input');
    let otp = '';
    inputs.forEach(input => otp += input.value);
    return otp;
}

function setupOTPInputs() {
    document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
        input.addEventListener('input', (e) => {
            if (e.target.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
}

function socialLogin(provider) {
    DreamWin.Utils.showNotification(`${provider} login coming soon!`, 'warning');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        DreamWin.AuthManager.logout();
        showAuth();
    }
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    
    // Show selected page
    const pageElement = document.getElementById(`page-${page}`);
    if (pageElement) {
        pageElement.classList.remove('hidden');
        currentPage = page;
        
        // Update active states
        document.querySelectorAll('.sidebar-link, .bottom-nav-item').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });
        
        // Load page content
        loadPageContent(page);
        
        // Update URL hash
        history.pushState({ page }, '', `#${page}`);
    }
}

function handleHashNavigation() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        navigateTo(hash);
    }
}

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        navigateTo(e.state.page);
    }
});

// ============================================
// PAGE CONTENT LOADERS
// ============================================
function initializeApp() {
    updateUserData();
    loadPageContent('home');
    
    // Check for daily spin
    if (!DreamWin.SpinManager.canSpin()) {
        document.getElementById('daily-bonus-banner').classList.add('hidden');
    }
}

function loadPageContent(page) {
    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'games':
            loadGamesPage();
            break;
        case 'wallet':
            loadWalletPage();
            break;
        case 'spin':
            loadSpinPage();
            break;
        case 'referral':
            loadReferralPage();
            break;
        case 'tasks':
            loadTasksPage();
            break;
        case 'leaderboard':
            loadLeaderboardPage();
            break;
        case 'shop':
            loadShopPage();
            break;
        case 'profile':
            loadProfilePage();
            break;
        case 'characters':
            loadCharactersPage();
            break;
        case 'achievements':
            loadAchievementsPage();
            break;
        case 'clans':
            loadClansPage();
            break;
        case 'chat':
            loadChatPage();
            break;
        case 'tournaments':
            loadTournamentsPage();
            break;
        case 'settings':
            loadSettingsPage();
            break;
    }
}

function loadHomePage() {
    // Featured Games
    const featuredGrid = document.getElementById('featured-games-grid');
    if (featuredGrid) {
        const featured = DreamWin.GAMES_DATA.slice(0, 5);
        featuredGrid.innerHTML = featured.map(game => createGameCard(game)).join('');
    }
    
    // Popular Games
    const popularGrid = document.getElementById('popular-games-grid');
    if (popularGrid) {
        const popular = DreamWin.GameManager.getPopularGames().slice(0, 8);
        popularGrid.innerHTML = popular.map(game => createGameCard(game)).join('');
    }
    
    // Tournaments
    const tournamentsGrid = document.getElementById('tournaments-grid');
    if (tournamentsGrid) {
        tournamentsGrid.innerHTML = createTournamentCards();
    }
    
    // Top Winners
    const topWinnersList = document.getElementById('top-winners-list');
    if (topWinnersList) {
        const leaderboard = DreamWin.LeaderboardManager.getLeaderboard('daily').slice(0, 5);
        topWinnersList.innerHTML = leaderboard.map((player, index) => createLeaderboardItem(player, index + 1)).join('');
    }
}

function loadGamesPage() {
    const gamesGrid = document.getElementById('games-grid');
    if (gamesGrid) {
        const games = DreamWin.GameManager.getGames(null, false);
        gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
    }
}

function loadWalletPage() {
    updateWalletUI();
    loadTransactions();
}

function loadSpinPage() {
    const spinsAvailable = DreamWin.SpinManager.getAvailableSpins();
    document.getElementById('spins-available').textContent = `${spinsAvailable} Spin${spinsAvailable !== 1 ? 's' : ''} Available`;
    
    const spinBtn = document.getElementById('spin-btn');
    if (spinsAvailable > 0) {
        spinBtn.disabled = false;
    } else {
        spinBtn.disabled = true;
    }
}

function loadReferralPage() {
    const stats = DreamWin.ReferralManager.getStats();
    document.getElementById('referral-code').textContent = stats.code;
    document.getElementById('referral-count').textContent = stats.totalReferrals;
    document.getElementById('referral-earned').textContent = DreamWin.Utils.formatCurrency(stats.totalEarned);
    
    // Load referrals list
    const referralsList = document.getElementById('referrals-list');
    if (stats.referrals.length > 0) {
        referralsList.innerHTML = stats.referrals.map(ref => `
            <div class="leaderboard-item">
                <div class="leaderboard-rank">👤</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${ref.name}</div>
                    <div class="leaderboard-score">${DreamWin.Utils.timeAgo(ref.date)}</div>
                </div>
                <div class="badge badge-success">+₹50</div>
            </div>
        `).join('');
    } else {
        referralsList.innerHTML = '<p class="text-muted text-center p-4">No referrals yet. Share your code to earn!</p>';
    }
}

function loadTasksPage() {
    const tasksList = document.getElementById('tasks-list');
    const tasks = DreamWin.TaskManager.getTasks();
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-card" onclick="completeTask(${task.id})">
            <div class="task-icon">${task.icon}</div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-reward">+${DreamWin.Utils.formatCurrency(task.reward)}</div>
            </div>
            <div class="task-progress">
                ${task.completed 
                    ? '<span class="badge badge-success">Completed</span>'
                    : `<div class="level-progress"><div class="level-progress-bar" style="width: ${task.progress}%"></div></div>`
                }
            </div>
        </div>
    `).join('');
}

function loadLeaderboardPage(type = 'daily') {
    const leaderboard = DreamWin.LeaderboardManager.getLeaderboard(type);
    
    // Top 3
    const topThree = document.getElementById('top-three');
    if (topThree && leaderboard.length >= 3) {
        topThree.innerHTML = `
            <div class="top-player silver">
                <div class="top-player-avatar">${leaderboard[1].avatar}</div>
                <h4>${leaderboard[1].name}</h4>
                <p class="text-muted">${DreamWin.Utils.formatCurrency(leaderboard[1].score)}</p>
            </div>
            <div class="top-player gold">
                <div class="top-player-avatar">👑</div>
                <h4>${leaderboard[0].name}</h4>
                <p class="text-muted">${DreamWin.Utils.formatCurrency(leaderboard[0].score)}</p>
            </div>
            <div class="top-player bronze">
                <div class="top-player-avatar">${leaderboard[2].avatar}</div>
                <h4>${leaderboard[2].name}</h4>
                <p class="text-muted">${DreamWin.Utils.formatCurrency(leaderboard[2].score)}</p>
            </div>
        `;
    }
    
    // Rest of leaderboard
    const leaderboardList = document.getElementById('leaderboard-list');
    if (leaderboardList) {
        leaderboardList.innerHTML = leaderboard.slice(3).map((player, index) => 
            createLeaderboardItem(player, index + 4)
        ).join('');
    }
}

function loadShopPage() {
    const shopGrid = document.getElementById('shop-grid');
    const items = DreamWin.ShopManager.getItems();
    
    shopGrid.innerHTML = items.map(item => `
        <div class="card" onclick="purchaseItem(${item.id})">
            <div class="text-center">
                <div class="achievement-icon">${item.icon}</div>
                <h4>${item.name}</h4>
                <p class="text-muted">${item.description}</p>
                <button class="btn btn-primary btn-sm mt-2">
                    ${DreamWin.Utils.formatCurrency(item.price)}
                </button>
            </div>
        </div>
    `).join('');
}

function loadProfilePage() {
    const user = DreamWin.USER;
    
    document.getElementById('profile-avatar').textContent = 
        user.character ? DreamWin.CHARACTERS_DATA.find(c => c.id === user.character)?.emoji || '🎮' : '🎮';
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-phone').textContent = user.phone ? `+91 ${user.phone}` : 'Not set';
    document.getElementById('profile-level').textContent = `Level ${user.level}`;
    
    // Stats
    document.getElementById('profile-games-played').textContent = user.stats.gamesPlayed;
    document.getElementById('profile-games-won').textContent = user.stats.gamesWon;
    document.getElementById('profile-total-earnings').textContent = DreamWin.Utils.formatCurrency(user.stats.totalEarnings);
    document.getElementById('profile-streak').textContent = user.stats.currentStreak;
    
    // VIP badge
    if (user.vip.active) {
        document.getElementById('profile-vip').classList.remove('hidden');
    }
    
    // Account info
    document.getElementById('profile-joined').textContent = user.createdAt 
        ? DreamWin.Utils.formatDate(user.createdAt) 
        : '-';
    document.getElementById('profile-last-login').textContent = user.lastLogin 
        ? DreamWin.Utils.formatDate(user.lastLogin) 
        : '-';
    document.getElementById('profile-total-spins').textContent = user.spins.totalSpins;
}

function loadCharactersPage() {
    const charactersGrid = document.getElementById('characters-grid');
    const characters = DreamWin.CHARACTERS_DATA;
    
    charactersGrid.innerHTML = characters.map(char => `
        <div class="character-card ${char.type === 'premium' ? 'premium' : ''} ${DreamWin.USER.character === char.id ? 'selected' : ''}" 
             onclick="selectCharacter(${char.id})">
            <span class="character-emoji">${char.emoji}</span>
            <h4>${char.name}</h4>
            <span class="badge ${char.type === 'premium' ? 'badge-warning' : 'badge-success'}">
                ${char.type === 'premium' ? `₹${char.price}` : 'Free'}
            </span>
            ${char.level > 0 ? `<small class="text-muted">Unlock at Level ${char.level}</small>` : ''}
            ${DreamWin.USER.character === char.id ? '<i class="fas fa-check-circle text-success mt-2"></i>' : ''}
        </div>
    `).join('');
}

function loadAchievementsPage() {
    const achievementsGrid = document.getElementById('achievements-grid');
    const achievements = DreamWin.AchievementManager.getAchievements();
    
    achievementsGrid.innerHTML = achievements.map(ach => `
        <div class="achievement-card ${ach.unlocked ? 'unlocked' : ''}">
            <div class="achievement-icon">${ach.icon}</div>
            <h4>${ach.name}</h4>
            <p class="text-muted">${ach.description}</p>
            <span class="badge ${ach.unlocked ? 'badge-success' : 'badge-warning'}">
                ${ach.unlocked ? 'Unlocked' : `+${DreamWin.Utils.formatCurrency(ach.reward)}`}
            </span>
        </div>
    `).join('');
}

function loadClansPage() {
    const clansGrid = document.getElementById('clans-grid');
    const clans = DreamWin.ClanManager.getClans();
    
    // My clan
    const myClanDiv = document.getElementById('my-clan');
    if (DreamWin.USER.clan) {
        const myClan = clans.find(c => c.id === DreamWin.USER.clan);
        myClanDiv.innerHTML = `
            <div class="card">
                <h3>Your Clan</h3>
                <div class="flex items-center gap-3 mt-2">
                    <span style="font-size: 3rem">${myClan.icon}</span>
                    <div>
                        <h4>${myClan.name}</h4>
                        <p class="text-muted">${myClan.members} members • Level ${myClan.level}</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm mt-3" onclick="leaveClan()">Leave Clan</button>
            </div>
        `;
    } else {
        myClanDiv.innerHTML = '';
    }
    
    clansGrid.innerHTML = clans.map(clan => `
        <div class="clan-card" onclick="joinClan(${clan.id})">
            <div class="clan-icon">${clan.icon}</div>
            <h4>${clan.name}</h4>
            <p class="text-muted">${clan.members} members</p>
            <span class="badge badge-primary">Level ${clan.level}</span>
        </div>
    `).join('');
}

function loadChatPage() {
    const chatMessages = document.getElementById('chat-messages');
    const messages = DreamWin.ChatManager.getMessages();
    
    if (messages.length > 0) {
        chatMessages.innerHTML = messages.map(msg => `
            <div class="chat-bubble ${msg.isUser ? 'sent' : 'received'}">
                <small class="text-muted">${msg.user}</small>
                <p>${msg.message}</p>
            </div>
        `).join('');
    } else {
        chatMessages.innerHTML = '<p class="text-muted text-center p-4">No messages yet. Start a conversation!</p>';
    }
}

function loadTournamentsPage() {
    const tournamentsGrid = document.getElementById('tournaments-page-grid');
    tournamentsGrid.innerHTML = createTournamentCards(6);
}

function loadSettingsPage() {
    document.getElementById('setting-dark-mode').checked = DreamWin.USER.settings.darkMode;
    document.getElementById('setting-sound').checked = DreamWin.USER.settings.sound;
    document.getElementById('setting-notifications').checked = DreamWin.USER.settings.notifications;
}

function loadTransactions() {
    const transactionsList = document.getElementById('transactions-list');
    
    // Sample transactions
    const transactions = [
        { type: 'credit', title: 'Spin Reward', amount: 150, date: new Date() },
        { type: 'credit', title: 'Game Win', amount: 500, date: new Date(Date.now() - 86400000) },
        { type: 'debit', title: 'Game Entry', amount: 50, date: new Date(Date.now() - 172800000) },
        { type: 'credit', title: 'Referral Bonus', amount: 50, date: new Date(Date.now() - 259200000) },
    ];
    
    transactionsList.innerHTML = transactions.map(t => `
        <div class="transaction-item">
            <div class="transaction-icon ${t.type}">
                <i class="fas fa-${t.type === 'credit' ? 'arrow-down' : 'arrow-up'}"></i>
            </div>
            <div class="transaction-info">
                <div class="transaction-title">${t.title}</div>
                <div class="transaction-date">${DreamWin.Utils.formatDate(t.date)}</div>
            </div>
            <div class="transaction-amount ${t.type}">
                ${t.type === 'credit' ? '+' : '-'}${DreamWin.Utils.formatCurrency(t.amount)}
            </div>
        </div>
    `).join('');
}

// ============================================
// UI COMPONENTS
// ============================================
function createGameCard(game) {
    const isUnlocked = DreamWin.USER.level >= game.level;
    const isSelected = DreamWin.USER.character;
    
    return `
        <div class="game-card" onclick="${isUnlocked ? `openGame(${game.id})` : `showLockedMessage(${game.level})`}">
            ${game.type === 'premium' ? '<span class="game-card-badge badge badge-warning">Premium</span>' : ''}
            ${game.type === 'vip' ? '<span class="game-card-badge badge badge-vip">VIP</span>' : ''}
            <img src="${game.image}" alt="${game.name}" class="game-card-image" onerror="this.src='https://via.placeholder.com/400x200?text=${game.name}'">
            <div class="game-card-content">
                <h4 class="game-card-title">${game.name}</h4>
                <div class="game-card-meta">
                    <span><i class="fas fa-users"></i> ${game.players}</span>
                    <span><i class="fas fa-star text-warning"></i> ${game.rating}</span>
                </div>
                <div class="game-card-meta mt-1">
                    <span class="text-success">${game.reward}</span>
                </div>
            </div>
            ${!isUnlocked ? `
                <div class="game-card-locked">
                    <i class="fas fa-lock"></i>
                    <span>Unlock at Level ${game.level}</span>
                </div>
            ` : ''}
        </div>
    `;
}

function createLeaderboardItem(player, rank) {
    let rankClass = '';
    if (rank === 1) rankClass = 'gold';
    else if (rank === 2) rankClass = 'silver';
    else if (rank === 3) rankClass = 'bronze';
    
    return `
        <div class="leaderboard-item ${player.isUser ? 'border-primary' : ''}">
            <div class="leaderboard-rank ${rankClass}">${rank}</div>
            <div class="leaderboard-avatar">${player.avatar}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${player.name} ${player.isUser ? '(You)' : ''}</div>
                <div class="leaderboard-score">Level ${player.level} • ${player.wins} wins</div>
            </div>
            <div class="leaderboard-points">${DreamWin.Utils.formatCurrency(player.score)}</div>
        </div>
    `;
}

function createTournamentCards(count = 3) {
    const tournaments = [
        { name: 'Daily Championship', prize: '₹10,000', players: '500/1000', time: '2h left', icon: '🏆' },
        { name: 'Weekend Special', prize: '₹50,000', players: '1200/2000', time: 'Starts in 5h', icon: '🎮' },
        { name: 'VIP Exclusive', prize: '₹1,00,000', players: '50/100', time: '1d left', icon: '👑' },
        { name: 'Pro League', prize: '₹25,000', players: '300/500', time: '3h left', icon: '⚡' },
        { name: 'Mega Tournament', prize: '₹5,00,000', players: '5000/10000', time: '2d left', icon: '🎯' },
        { name: 'Beginner Cup', prize: '₹5,000', players: '200/500', time: '4h left', icon: '🌟' },
    ];
    
    return tournaments.slice(0, count).map(t => `
        <div class="card" onclick="joinTournament('${t.name}')">
            <div class="flex items-center gap-3 mb-2">
                <span style="font-size: 2rem">${t.icon}</span>
                <div>
                    <h4>${t.name}</h4>
                    <span class="badge badge-success">${t.time}</span>
                </div>
            </div>
            <div class="flex justify-between text-muted">
                <span>Prize: <strong class="text-gradient">${t.prize}</strong></span>
                <span><i class="fas fa-users"></i> ${t.players}</span>
            </div>
            <button class="btn btn-primary btn-sm w-full mt-3">Join Now</button>
        </div>
    `).join('');
}

// ============================================
// USER DATA UPDATES
// ============================================
function updateUserData() {
    const user = DreamWin.USER;
    
    // Sidebar
    document.getElementById('sidebar-name').textContent = user.name;
    document.getElementById('sidebar-level').textContent = `Level ${user.level}`;
    document.getElementById('sidebar-avatar').textContent = 
        user.character ? DreamWin.CHARACTERS_DATA.find(c => c.id === user.character)?.emoji || '🎮' : '🎮';
    
    // Level progress
    const levelInfo = DreamWin.LevelManager.getLevelInfo();
    document.getElementById('level-progress-text').textContent = `${Math.round(levelInfo.progress)}%`;
    document.getElementById('level-progress-bar').style.width = `${levelInfo.progress}%`;
    
    // Balance
    document.getElementById('nav-balance').textContent = DreamWin.Utils.formatCurrency(user.wallet.balance + user.wallet.bonus);
    
    // Quick stats
    document.getElementById('stat-balance').textContent = DreamWin.Utils.formatCurrency(user.wallet.balance);
    document.getElementById('stat-wins').textContent = user.stats.gamesWon;
    document.getElementById('stat-level').textContent = user.level;
    document.getElementById('stat-referrals').textContent = user.referral.referrals.length;
    
    // Update notification count
    const unreadCount = DreamWin.NotificationManager.getUnreadCount();
    document.getElementById('notification-count').textContent = unreadCount;
}

function updateWalletUI() {
    document.getElementById('wallet-balance').textContent = DreamWin.Utils.formatCurrency(DreamWin.USER.wallet.balance);
    document.getElementById('wallet-bonus').textContent = DreamWin.Utils.formatCurrency(DreamWin.USER.wallet.bonus);
    document.getElementById('withdraw-available').textContent = DreamWin.Utils.formatCurrency(DreamWin.USER.wallet.balance);
}

// ============================================
// GAME ACTIONS
// ============================================
function openGame(gameId) {
    const game = DreamWin.GAMES_DATA.find(g => g.id === gameId);
    if (!game) return;
    
    const modal = document.getElementById('game-modal');
    document.getElementById('game-modal-title').textContent = game.name;
    
    document.getElementById('game-modal-body').innerHTML = `
        <div class="text-center">
            <img src="${game.image}" alt="${game.name}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 12px;">
            <div class="mt-3">
                <span class="badge badge-primary mr-2">${game.category}</span>
                <span class="badge badge-success">${game.reward}</span>
            </div>
            <div class="flex gap-2 mt-3">
                ${game.ai ? '<button class="btn btn-primary flex-1" onclick="playGameAI(' + gameId + ')"><i class="fas fa-robot"></i> Play vs AI</button>' : ''}
                ${game.multiplayer ? '<button class="btn btn-success flex-1" onclick="playGameMultiplayer(' + gameId + ')"><i class="fas fa-users"></i> Multiplayer</button>' : ''}
            </div>
            <div class="mt-3">
                <h4>Entry Fee</h4>
                <div class="flex gap-2 justify-center flex-wrap">
                    <button class="btn btn-outline btn-sm" onclick="startGame(${gameId}, 10)">₹10</button>
                    <button class="btn btn-outline btn-sm" onclick="startGame(${gameId}, 50)">₹50</button>
                    <button class="btn btn-outline btn-sm" onclick="startGame(${gameId}, 100)">₹100</button>
                    <button class="btn btn-outline btn-sm" onclick="startGame(${gameId}, 500)">₹500</button>
                </div>
                <button class="btn btn-secondary btn-sm mt-2" onclick="startGame(${gameId}, 0)">Free Play</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showLockedMessage(level) {
    DreamWin.Utils.showNotification(`Unlock this game at Level ${level}!`, 'warning');
}

function playGameAI(gameId) {
    closeModal('game-modal');
    DreamWin.Utils.showNotification('Starting game vs AI...', 'success');
    // In real app, load the actual game
}

function playGameMultiplayer(gameId) {
    closeModal('game-modal');
    DreamWin.Utils.showNotification('Finding opponents...', 'success');
    // In real app, match with other players
}

function startGame(gameId, betAmount) {
    if (betAmount > 0 && !DreamWin.WalletManager.useBalance(betAmount)) {
        return;
    }
    
    closeModal('game-modal');
    
    // Simulate game result
    setTimeout(() => {
        const won = Math.random() > 0.4;
        const winAmount = won ? betAmount * (1.5 + Math.random()) : 0;
        
        DreamWin.GameManager.playGame(gameId, betAmount);
        DreamWin.GameManager.endGame(won, winAmount);
        
        updateUserData();
        updateWalletUI();
        
        if (won) {
            showGameResult(true, winAmount);
        } else {
            DreamWin.Utils.showNotification('Better luck next time!', 'error');
        }
    }, 1000);
}

function showGameResult(won, amount) {
    const modal = document.getElementById('game-modal');
    document.getElementById('game-modal-title').textContent = won ? '🎉 You Won!' : '😔 You Lost';
    
    document.getElementById('game-modal-body').innerHTML = `
        <div class="text-center p-4">
            <div style="font-size: 4rem">${won ? '🏆' : '😢'}</div>
            ${won ? `
                <h2 class="text-gradient mt-3">${DreamWin.Utils.formatCurrency(amount)}</h2>
                <p class="text-muted">Congratulations on your win!</p>
            ` : `
                <p class="text-muted">Better luck next time!</p>
            `}
            <button class="btn btn-primary btn-lg w-full mt-4" onclick="closeModal('game-modal')">Continue</button>
        </div>
    `;
    
    modal.classList.add('active');
}

// ============================================
// WALLET ACTIONS
// ============================================
function showAddMoneyModal() {
    document.getElementById('add-money-modal').classList.add('active');
}

function showWithdrawModal() {
    updateWalletUI();
    document.getElementById('withdraw-modal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function setAddAmount(amount) {
    document.getElementById('add-money-amount').value = amount;
}

function addQuickMoney(amount) {
    processAddMoneyTransaction(amount);
}

function processAddMoney() {
    const amount = parseInt(document.getElementById('add-money-amount').value);
    if (!amount || amount < 10) {
        DreamWin.Utils.showNotification('Minimum amount is ₹10', 'error');
        return;
    }
    processAddMoneyTransaction(amount);
}

function processAddMoneyTransaction(amount) {
    closeModal('add-money-modal');
    DreamWin.WalletManager.addMoney(amount);
    updateWalletUI();
    updateUserData();
    loadTransactions();
}

function processWithdraw() {
    const amount = parseInt(document.getElementById('withdraw-amount').value);
    if (!amount || amount < 100) {
        DreamWin.Utils.showNotification('Minimum withdrawal is ₹100', 'error');
        return;
    }
    
    if (DreamWin.WalletManager.withdraw(amount)) {
        closeModal('withdraw-modal');
        updateWalletUI();
        updateUserData();
        loadTransactions();
    }
}

// ============================================
// SPIN WHEEL
// ============================================
function initSpinWheel() {
    const svg = document.getElementById('wheel-svg');
    if (!svg) return;
    
    const segments = DreamWin.SPIN_REWARDS;
    const segmentAngle = 360 / segments.length;
    
    let html = '<defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1"/><stop offset="100%" style="stop-color:#ec4899"/></linearGradient></defs>';
    
    segments.forEach((segment, i) => {
        const startAngle = i * segmentAngle - 90;
        const endAngle = startAngle + segmentAngle;
        
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        
        const x1 = 100 + 100 * Math.cos(startRad);
        const y1 = 100 + 100 * Math.sin(startRad);
        const x2 = 100 + 100 * Math.cos(endRad);
        const y2 = 100 + 100 * Math.sin(endRad);
        
        const largeArc = segmentAngle > 180 ? 1 : 0;
        
        html += `
            <path d="M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z" 
                  fill="${segment.color}" stroke="#fff" stroke-width="2"/>
            <text x="${100 + 60 * Math.cos((startRad + endRad) / 2)}" 
                  y="${100 + 60 * Math.sin((startRad + endRad) / 2)}" 
                  text-anchor="middle" 
                  dominant-baseline="middle" 
                  fill="white" 
                  font-size="10" 
                  font-weight="bold"
                  transform="rotate(${(startAngle + endAngle) / 2 + 90}, ${100 + 60 * Math.cos((startRad + endRad) / 2)}, ${100 + 60 * Math.sin((startRad + endRad) / 2)})">
                ${segment.label}
            </text>
        `;
    });
    
    svg.innerHTML = html;
}

function spinWheel() {
    if (!DreamWin.SpinManager.canSpin()) {
        DreamWin.Utils.showNotification('No spins available. Come back tomorrow!', 'error');
        return;
    }
    
    const result = DreamWin.SpinManager.spin();
    if (!result) return;
    
    const wheel = document.getElementById('wheel-svg');
    const spinBtn = document.getElementById('spin-btn');
    
    spinBtn.disabled = true;
    
    // Add rotation
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${result.rotation}deg)`;
    
    // Show result after spin
    setTimeout(() => {
        DreamWin.SpinManager.completeSpinning();
        
        document.getElementById('spin-result-amount').textContent = result.reward.label;
        document.getElementById('spin-result-modal').classList.add('active');
        
        updateUserData();
        updateWalletUI();
        loadSpinPage();
    }, 4000);
}

function closeSpinResult() {
    document.getElementById('spin-result-modal').classList.remove('active');
}

// ============================================
// CHARACTER SELECTION
// ============================================
function selectCharacter(charId) {
    const character = DreamWin.CHARACTERS_DATA.find(c => c.id === charId);
    if (!character) return;
    
    // Check if premium and not owned
    if (character.type === 'premium' && !DreamWin.Utils.isCharacterUnlocked(charId)) {
        if (DreamWin.USER.level < character.level) {
            DreamWin.Utils.showNotification(`Unlock at Level ${character.level}`, 'error');
            return;
        }
        
        if (confirm(`Purchase ${character.name} for ₹${character.price}?`)) {
            if (DreamWin.ShopManager.purchaseCharacter(charId)) {
                DreamWin.USER.character = charId;
                DreamWin.AuthManager.saveUser();
                loadCharactersPage();
                updateUserData();
            }
        }
        return;
    }
    
    // Check level requirement
    if (DreamWin.USER.level < character.level) {
        DreamWin.Utils.showNotification(`Unlock at Level ${character.level}`, 'error');
        return;
    }
    
    DreamWin.USER.character = charId;
    DreamWin.AuthManager.saveUser();
    
    loadCharactersPage();
    updateUserData();
    DreamWin.Utils.showNotification(`${character.name} selected!`, 'success');
}

// ============================================
// FILTERS AND SEARCH
// ============================================
function filterGames(category) {
    // Update active tab
    document.querySelectorAll('#game-category-tabs .tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const gamesGrid = document.getElementById('games-grid');
    let games = DreamWin.GameManager.getGames(null, false);
    
    if (category !== 'all') {
        games = games.filter(g => g.category === category);
    }
    
    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
}

function searchGames(query) {
    const gamesGrid = document.getElementById('games-grid');
    let games = DreamWin.GameManager.getGames(null, false);
    
    if (query) {
        query = query.toLowerCase();
        games = games.filter(g => 
            g.name.toLowerCase().includes(query) ||
            g.category.toLowerCase().includes(query)
        );
    }
    
    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');
}

function filterCharacters(category) {
    const charactersGrid = document.getElementById('characters-grid');
    let characters = DreamWin.CHARACTERS_DATA;
    
    if (category !== 'all') {
        characters = characters.filter(c => c.category === category);
    }
    
    charactersGrid.innerHTML = characters.map(char => `
        <div class="character-card ${char.type === 'premium' ? 'premium' : ''} ${DreamWin.USER.character === char.id ? 'selected' : ''}" 
             onclick="selectCharacter(${char.id})">
            <span class="character-emoji">${char.emoji}</span>
            <h4>${char.name}</h4>
            <span class="badge ${char.type === 'premium' ? 'badge-warning' : 'badge-success'}">
                ${char.type === 'premium' ? `₹${char.price}` : 'Free'}
            </span>
        </div>
    `).join('');
}

// ============================================
// TASKS AND ACHIEVEMENTS
// ============================================
function completeTask(taskId) {
    DreamWin.TaskManager.completeTask(taskId);
    loadTasksPage();
    updateUserData();
}

// ============================================
// REFERRAL
// ============================================
function copyReferralCode() {
    DreamWin.Utils.copyToClipboard(DreamWin.USER.referral.code);
}

function shareReferral() {
    DreamWin.ReferralManager.shareReferral();
}

// ============================================
// CLAN
// ============================================
function joinClan(clanId) {
    DreamWin.ClanManager.joinClan(clanId);
    loadClansPage();
}

function leaveClan() {
    DreamWin.ClanManager.leaveClan();
    loadClansPage();
}

// ============================================
// TOURNAMENT
// ============================================
function joinTournament(name) {
    DreamWin.Utils.showNotification(`Joining ${name}...`, 'success');
}

// ============================================
// SHOP
// ============================================
function purchaseItem(itemId) {
    if (confirm('Are you sure you want to purchase this item?')) {
        DreamWin.ShopManager.purchase(itemId);
        updateWalletUI();
        updateUserData();
    }
}

// ============================================
// CHAT
// ============================================
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        DreamWin.ChatManager.send(message);
        input.value = '';
        loadChatPage();
    }
}

// ============================================
// SETTINGS
// ============================================
function toggleDarkModeSetting() {
    DreamWin.SettingsManager.toggleDarkMode();
}

function toggleSoundSetting() {
    DreamWin.SettingsManager.toggleSound();
}

function toggleNotificationsSetting() {
    DreamWin.SettingsManager.toggleNotifications();
}

function toggleTheme() {
    DreamWin.SettingsManager.toggleDarkMode();
    const icon = document.getElementById('theme-icon');
    icon.className = `fas fa-${DreamWin.USER.settings.darkMode ? 'moon' : 'sun'}`;
}

// ============================================
// NOTIFICATIONS
// ============================================
function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        loadNotifications();
    }
}

function loadNotifications() {
    const list = document.getElementById('notifications-list');
    const notifications = DreamWin.NotificationManager.getNotifications();
    
    if (notifications.length > 0) {
        list.innerHTML = notifications.map(n => `
            <div class="notification-item ${n.read ? '' : 'unread'}" onclick="markNotificationRead('${n.id}')">
                <h4>${n.title}</h4>
                <p class="text-muted">${n.message}</p>
                <small class="text-muted">${DreamWin.Utils.timeAgo(n.date)}</small>
            </div>
        `).join('');
    } else {
        list.innerHTML = '<p class="text-muted text-center p-4">No notifications</p>';
    }
}

function markNotificationRead(id) {
    DreamWin.NotificationManager.markAsRead(id);
    loadNotifications();
    updateUserData();
}

function markAllNotificationsRead() {
    DreamWin.NotificationManager.markAllAsRead();
    loadNotifications();
    updateUserData();
}

// ============================================
// MENU TOGGLE
// ============================================
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('navbar-menu');
    sidebar.classList.toggle('active');
    menu.classList.toggle('active');
}

// ============================================
// LEADERBOARD
// ============================================
function loadLeaderboard(type) {
    document.querySelectorAll('#page-leaderboard .tabs .tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadLeaderboardPage(type);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showGameFilters() {
    DreamWin.Utils.showNotification('Filters coming soon!', 'warning');
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// Close notification panel on outside click
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notifications-panel');
    if (panel.classList.contains('active') && 
        !panel.contains(e.target) && 
        !e.target.closest('.navbar-actions')) {
        panel.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        document.getElementById('notifications-panel').classList.remove('active');
    }
});

console.log('🎮 DreamWin Gaming Platform Loaded!');