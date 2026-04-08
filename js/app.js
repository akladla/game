/**
 * DreamWin Gaming Platform - Main Application
 * Version: 1.0.0
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    APP_NAME: 'DreamWin',
    VERSION: '1.0.0',
    CURRENCY: '₹',
    MIN_SPIN_REWARD: 90,
    MAX_LEVEL: 10,
    XP_PER_LEVEL: 1000,
    REFERRAL_BONUS: 50,
    REFERRED_BONUS: 20,
    DAILY_SPINS: 1,
    PREMIUM_SPIN_COST: 10,
};

// ============================================
// GAME DATA
// ============================================
const GAMES_DATA = [
    // Level 0 Games (Unlocked by default)
    { id: 1, name: 'Lucky Dice', category: 'dice', image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=400', level: 0, players: '10K+', rating: 4.5, reward: '₹50-500', type: 'free', ai: true, multiplayer: true },
    { id: 2, name: 'Coin Flip', category: 'coin', image: 'https://images.unsplash.com/photo-1526304640581-33b6ddc3e7c4?w=400', level: 0, players: '8K+', rating: 4.3, reward: '₹20-200', type: 'free', ai: true, multiplayer: false },
    { id: 3, name: 'Number Guess', category: 'puzzle', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400', level: 0, players: '15K+', rating: 4.7, reward: '₹30-300', type: 'free', ai: true, multiplayer: true },
    
    // Level 1 Games
    { id: 4, name: 'Blackjack', category: 'cards', image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400', level: 1, players: '25K+', rating: 4.8, reward: '₹100-1000', type: 'free', ai: true, multiplayer: true },
    { id: 5, name: 'Roulette', category: 'wheel', image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400', level: 1, players: '30K+', rating: 4.6, reward: '₹50-5000', type: 'free', ai: false, multiplayer: true },
    
    // Level 2 Games
    { id: 6, name: 'Poker Pro', category: 'cards', image: 'https://images.unsplash.com/photo-1511193311914-0346f8ffe5e2?w=400', level: 2, players: '40K+', rating: 4.9, reward: '₹200-20000', type: 'premium', ai: true, multiplayer: true },
    { id: 7, name: 'Slots Deluxe', category: 'slots', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', level: 2, players: '50K+', rating: 4.4, reward: '₹100-10000', type: 'premium', ai: false, multiplayer: false },
    
    // Level 3 Games
    { id: 8, name: 'Teen Patti', category: 'cards', image: 'https://images.unsplash.com/photo-1512783120291-04f3b8a56f49?w=400', level: 3, players: '100K+', rating: 4.8, reward: '₹500-50000', type: 'free', ai: true, multiplayer: true },
    { id: 9, name: 'Dragon Tiger', category: 'cards', image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?w=400', level: 3, players: '80K+', rating: 4.7, reward: '₹200-20000', type: 'free', ai: true, multiplayer: true },
    { id: 10, name: 'Andar Bahar', category: 'cards', image: 'https://images.unsplash.com/photo-1541562232579-512a21360f87?w=400', level: 3, players: '120K+', rating: 4.9, reward: '₹100-10000', type: 'free', ai: true, multiplayer: true },
    
    // Level 4 Games
    { id: 11, name: 'Baccarat', category: 'cards', image: 'https://images.unsplash.com/photo-1594912772985-a54d52404a9b?w=400', level: 4, players: '60K+', rating: 4.6, reward: '₹500-100000', type: 'premium', ai: true, multiplayer: true },
    { id: 12, name: 'Fantasy Cricket', category: 'sports', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', level: 4, players: '200K+', rating: 4.9, reward: '₹1000-500000', type: 'premium', ai: false, multiplayer: true },
    
    // Level 5 Games
    { id: 13, name: 'Ludo King', category: 'board', image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=400', level: 5, players: '500K+', rating: 4.8, reward: '₹50-5000', type: 'free', ai: true, multiplayer: true },
    { id: 14, name: 'Carrom Pool', category: 'board', image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=400', level: 5, players: '300K+', rating: 4.7, reward: '₹50-3000', type: 'free', ai: true, multiplayer: true },
    
    // Level 6 Games
    { id: 15, name: 'Rummy Royale', category: 'cards', image: 'https://images.unsplash.com/photo-1512783120291-04f3b8a56f49?w=400', level: 6, players: '150K+', rating: 4.8, reward: '₹200-25000', type: 'premium', ai: true, multiplayer: true },
    { id: 16, name: 'Chess Master', category: 'board', image: 'https://images.unsplash.com/photo-1529612703005-096e162355a9?w=400', level: 6, players: '100K+', rating: 4.9, reward: '₹100-10000', type: 'free', ai: true, multiplayer: true },
    
    // Level 7 Games
    { id: 17, name: 'Fantasy Football', category: 'sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', level: 7, players: '250K+', rating: 4.8, reward: '₹500-100000', type: 'premium', ai: false, multiplayer: true },
    { id: 18, name: 'Cricket Battle', category: 'sports', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', level: 7, players: '400K+', rating: 4.9, reward: '₹100-50000', type: 'free', ai: true, multiplayer: true },
    
    // Level 8 Games
    { id: 19, name: 'PUBG Tournament', category: 'esports', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', level: 8, players: '1M+', rating: 4.9, reward: '₹1000-500000', type: 'premium', ai: false, multiplayer: true },
    { id: 20, name: 'Free Fire', category: 'esports', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', level: 8, players: '800K+', rating: 4.8, reward: '₹500-200000', type: 'premium', ai: false, multiplayer: true },
    
    // Level 9 Games
    { id: 21, name: 'VIP Poker', category: 'cards', image: 'https://images.unsplash.com/photo-1511193311914-0346f8ffe5e2?w=400', level: 9, players: '50K+', rating: 4.9, reward: '₹5000-500000', type: 'vip', ai: true, multiplayer: true },
    { id: 22, name: 'High Stakes Blackjack', category: 'cards', image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400', level: 9, players: '30K+', rating: 4.9, reward: '₹10000-1000000', type: 'vip', ai: true, multiplayer: true },
    
    // Level 10 Games
    { id: 23, name: 'Millionaire Slots', category: 'slots', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400', level: 10, players: '20K+', rating: 5.0, reward: '₹10000-10000000', type: 'vip', ai: false, multiplayer: false },
    { id: 24, name: 'Elite Tournament', category: 'tournament', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', level: 10, players: '10K+', rating: 5.0, reward: '₹50000-5000000', type: 'vip', ai: false, multiplayer: true },
];

// ============================================
// CHARACTER DATA
// ============================================
const CHARACTERS_DATA = [
    // Boys - Free
    { id: 1, name: 'Warrior', category: 'boy', type: 'free', level: 0, emoji: '🦸', color: '#ef4444' },
    { id: 2, name: 'Ninja', category: 'boy', type: 'free', level: 0, emoji: '🥷', color: '#1f2937' },
    { id: 3, name: 'Knight', category: 'boy', type: 'free', level: 1, emoji: '🛡️', color: '#3b82f6' },
    { id: 4, name: 'Archer', category: 'boy', type: 'free', level: 2, emoji: '🏹', color: '#22c55e' },
    
    // Boys - Premium
    { id: 5, name: 'Dragon Knight', category: 'boy', type: 'premium', level: 3, price: 500, emoji: '🐉', color: '#f59e0b' },
    { id: 6, name: 'Cyber Warrior', category: 'boy', type: 'premium', level: 5, price: 1000, emoji: '🤖', color: '#06b6d4' },
    
    // Girls - Free
    { id: 7, name: 'Princess', category: 'girl', type: 'free', level: 0, emoji: '👸', color: '#ec4899' },
    { id: 8, name: 'Fairy', category: 'girl', type: 'free', level: 1, emoji: '🧚', color: '#a855f7' },
    { id: 9, name: 'Mermaid', category: 'girl', type: 'free', level: 2, emoji: '🧜‍♀️', color: '#06b6d4' },
    
    // Girls - Premium
    { id: 10, name: 'Queen', category: 'girl', type: 'premium', level: 4, price: 750, emoji: '👑', color: '#fbbf24' },
    { id: 11, name: 'Goddess', category: 'girl', type: 'premium', level: 6, price: 1500, emoji: '✨', color: '#f472b6' },
    
    // Fantasy - Premium
    { id: 12, name: 'Wizard', category: 'fantasy', type: 'premium', level: 3, price: 600, emoji: '🧙', color: '#8b5cf6' },
    { id: 13, name: 'Dragon', category: 'fantasy', type: 'premium', level: 5, price: 1200, emoji: '🐲', color: '#ef4444' },
    { id: 14, name: 'Phoenix', category: 'fantasy', type: 'premium', level: 7, price: 2000, emoji: '🔥', color: '#f97316' },
    { id: 15, name: 'Unicorn', category: 'fantasy', type: 'premium', level: 6, price: 1800, emoji: '🦄', color: '#ec4899' },
    
    // Robot - Premium
    { id: 16, name: 'Mecha', category: 'robot', type: 'premium', level: 4, price: 800, emoji: '🤖', color: '#6366f1' },
    { id: 17, name: 'Cyborg', category: 'robot', type: 'premium', level: 5, price: 1000, emoji: '🦾', color: '#14b8a6' },
    { id: 18, name: 'Transformer', category: 'robot', type: 'premium', level: 8, price: 2500, emoji: '⚡', color: '#eab308' },
    
    // Animal - Free
    { id: 19, name: 'Tiger', category: 'animal', type: 'free', level: 0, emoji: '🐯', color: '#f97316' },
    { id: 20, name: 'Lion', category: 'animal', type: 'free', level: 1, emoji: '🦁', color: '#fbbf24' },
    { id: 21, name: 'Wolf', category: 'animal', type: 'free', level: 2, emoji: '🐺', color: '#6b7280' },
    
    // Animal - Premium
    { id: 22, name: 'Dragon Pet', category: 'animal', type: 'premium', level: 5, price: 1500, emoji: '🐲', color: '#ef4444' },
    { id: 23, name: 'Phoenix Pet', category: 'animal', type: 'premium', level: 7, price: 2200, emoji: '🦅', color: '#f97316' },
    { id: 24, name: 'Legendary Beast', category: 'animal', type: 'premium', level: 9, price: 5000, emoji: '🦁', color: '#fbbf24' },
];

// ============================================
// TASKS DATA
// ============================================
const TASKS_DATA = [
    { id: 1, title: 'Daily Login', description: 'Login to the app daily', reward: 10, type: 'daily', icon: '📅' },
    { id: 2, title: 'Play 5 Games', description: 'Play any 5 games today', reward: 25, type: 'daily', icon: '🎮' },
    { id: 3, title: 'Win 3 Games', description: 'Win 3 games in any mode', reward: 50, type: 'daily', icon: '🏆' },
    { id: 4, title: 'Refer a Friend', description: 'Invite friends using your code', reward: 50, type: 'referral', icon: '👥' },
    { id: 5, title: 'Add Money', description: 'Add ₹100 or more', reward: 20, type: 'deposit', icon: '💰' },
    { id: 6, title: 'Play Tournament', description: 'Join any tournament', reward: 30, type: 'tournament', icon: '🎯' },
    { id: 7, title: 'Weekly Streak', description: 'Login 7 days in a row', reward: 100, type: 'weekly', icon: '🔥' },
    { id: 8, title: 'VIP Member', description: 'Subscribe to VIP', reward: 200, type: 'special', icon: '👑' },
    { id: 9, title: 'Spin Master', description: 'Use 10 spins', reward: 75, type: 'daily', icon: '🎡' },
    { id: 10, title: 'Game Master', description: 'Play 50 games total', reward: 500, type: 'achievement', icon: '🏅' },
];

// ============================================
// ACHIEVEMENTS DATA
// ============================================
const ACHIEVEMENTS_DATA = [
    { id: 1, name: 'First Win', icon: '🏆', description: 'Win your first game', reward: 50, unlocked: false },
    { id: 2, name: 'Streak Master', icon: '🔥', description: 'Win 5 games in a row', reward: 200, unlocked: false },
    { id: 3, name: 'Social Butterfly', icon: '🦋', description: 'Refer 10 friends', reward: 500, unlocked: false },
    { id: 4, name: 'High Roller', icon: '💎', description: 'Win ₹10,000 in a single game', reward: 1000, unlocked: false },
    { id: 5, name: 'Level Up', icon: '⬆️', description: 'Reach Level 5', reward: 250, unlocked: false },
    { id: 6, name: 'Champion', icon: '🥇', description: 'Win a tournament', reward: 500, unlocked: false },
    { id: 7, name: 'Collector', icon: '收藏', description: 'Unlock 5 characters', reward: 300, unlocked: false },
    { id: 8, name: 'VIP Status', icon: '👑', description: 'Become a VIP member', reward: 1000, unlocked: false },
    { id: 9, name: 'Millionaire', icon: '💰', description: 'Earn ₹1,00,000 total', reward: 5000, unlocked: false },
    { id: 10, name: 'Legend', icon: '🌟', description: 'Reach Level 10', reward: 10000, unlocked: false },
];

// ============================================
// SHOP ITEMS
// ============================================
const SHOP_DATA = [
    { id: 1, name: 'Extra Spin', description: 'Get 1 extra spin', price: 10, type: 'spins', icon: '🎡' },
    { id: 2, name: '5 Spins Pack', description: 'Get 5 extra spins', price: 45, type: 'spins', icon: '🎡' },
    { id: 3, name: 'XP Booster', description: '2x XP for 1 hour', price: 50, type: 'booster', icon: '⚡' },
    { id: 4, name: 'Coin Booster', description: '2x Coins for 1 hour', price: 75, type: 'booster', icon: '💰' },
    { id: 5, name: 'VIP Weekly', description: 'VIP for 7 days', price: 199, type: 'vip', icon: '👑' },
    { id: 6, name: 'VIP Monthly', description: 'VIP for 30 days', price: 499, type: 'vip', icon: '👑' },
    { id: 7, name: 'Mystery Box', description: 'Random rewards', price: 100, type: 'special', icon: '🎁' },
    { id: 8, name: 'Lucky Charm', description: 'Increase luck by 10%', price: 150, type: 'special', icon: '🍀' },
];

// ============================================
// SPIN WHEEL REWARDS
// ============================================
const SPIN_REWARDS = [
    { value: 90, color: '#ef4444', label: '₹90' },
    { value: 100, color: '#f97316', label: '₹100' },
    { value: 150, color: '#f59e0b', label: '₹150' },
    { value: 200, color: '#84cc16', label: '₹200' },
    { value: 250, color: '#22c55e', label: '₹250' },
    { value: 300, color: '#14b8a6', label: '₹300' },
    { value: 500, color: '#06b6d4', label: '₹500' },
    { value: 1000, color: '#3b82f6', label: '₹1000' },
    { value: 2500, color: '#8b5cf6', label: '₹2500' },
    { value: 5000, color: '#ec4899', label: '₹5000' },
];

// ============================================
// USER STATE
// ============================================
let USER = {
    id: null,
    phone: '',
    name: 'Player',
    email: '',
    character: null,
    level: 0,
    xp: 0,
    totalXP: 0,
    wallet: {
        balance: 0,
        bonus: 100,
        totalDeposited: 0,
        totalWithdrawn: 0,
        totalWon: 0,
    },
    referral: {
        code: '',
        referredBy: null,
        referrals: [],
        totalEarned: 0,
    },
    stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        totalEarnings: 0,
        currentStreak: 0,
        bestStreak: 0,
        loginStreak: 0,
    },
    spins: {
        daily: 1,
        extra: 0,
        lastSpin: null,
        totalSpins: 0,
    },
    vip: {
        active: false,
        expiresAt: null,
        level: 0,
    },
    clan: null,
    achievements: [],
    unlockedCharacters: [1, 2, 7, 19],
    unlockedGames: [1, 2, 3],
    tasks: [],
    notifications: [],
    settings: {
        sound: true,
        music: true,
        notifications: true,
        darkMode: true,
    },
    createdAt: new Date().toISOString(),
    lastLogin: null,
};

// ============================================
// LEVEL CONFIGURATION
// ============================================
const LEVEL_CONFIG = {
    0: { games: 3, xpRequired: 0, rewards: { coins: 0, spins: 1 } },
    1: { games: 5, xpRequired: 500, rewards: { coins: 100, spins: 2 } },
    2: { games: 7, xpRequired: 1000, rewards: { coins: 250, spins: 2 } },
    3: { games: 10, xpRequired: 2000, rewards: { coins: 500, spins: 3 } },
    4: { games: 13, xpRequired: 3500, rewards: { coins: 750, spins: 3 } },
    5: { games: 15, xpRequired: 5000, rewards: { coins: 1000, spins: 4 } },
    6: { games: 17, xpRequired: 7500, rewards: { coins: 1500, spins: 4 } },
    7: { games: 19, xpRequired: 10000, rewards: { coins: 2000, spins: 5 } },
    8: { games: 21, xpRequired: 15000, rewards: { coins: 3000, spins: 5 } },
    9: { games: 23, xpRequired: 20000, rewards: { coins: 5000, spins: 6 } },
    10: { games: 24, xpRequired: 30000, rewards: { coins: 10000, spins: 10 } },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Generate referral code
    generateReferralCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },
    
    // Format currency
    formatCurrency(amount) {
        return CONFIG.CURRENCY + amount.toLocaleString('en-IN');
    },
    
    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Format time ago
    timeAgo(date) {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    },
    
    // Save to localStorage
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // Load from localStorage
    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // Remove from localStorage
    remove(key) {
        localStorage.removeItem(key);
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // Vibrate device
    vibrate(pattern = [100]) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    },
    
    // Play sound
    playSound(sound) {
        if (USER.settings.sound) {
            const audio = new Audio(`sounds/${sound}.mp3`);
            audio.volume = 0.5;
            audio.play().catch(() => {});
        }
    },
    
    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copied to clipboard!', 'success');
            return true;
        } catch (err) {
            this.showNotification('Failed to copy', 'error');
            return false;
        }
    },
    
    // Validate phone number
    validatePhone(phone) {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phone);
    },
    
    // Generate OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },
    
    // Calculate level from XP
    calculateLevel(xp) {
        for (let level = 10; level >= 0; level--) {
            if (xp >= LEVEL_CONFIG[level].xpRequired) {
                return level;
            }
        }
        return 0;
    },
    
    // Calculate XP progress
    calculateXPProgress(xp, level) {
        const currentLevelXP = LEVEL_CONFIG[level].xpRequired;
        const nextLevelXP = level < 10 ? LEVEL_CONFIG[level + 1].xpRequired : LEVEL_CONFIG[10].xpRequired;
        const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        return Math.min(100, Math.max(0, progress));
    },
    
    // Get games for level
    getGamesForLevel(level) {
        return GAMES_DATA.filter(game => game.level <= level);
    },
    
    // Check if game is unlocked
    isGameUnlocked(gameId) {
        return USER.unlockedGames.includes(gameId);
    },
    
    // Check if character is unlocked
    isCharacterUnlocked(characterId) {
        return USER.unlockedCharacters.includes(characterId);
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ============================================
// AUTHENTICATION MANAGER
// ============================================
const AuthManager = {
    // Initialize
    init() {
        const savedUser = Utils.load('dreamwin_user');
        if (savedUser) {
            USER = { ...USER, ...savedUser };
            return true;
        }
        return false;
    },
    
    // Login
    login(phone, otp) {
        // Simulate OTP verification
        if (otp === '123456' || otp === localStorage.getItem('dreamwin_otp')) {
            USER.phone = phone;
            USER.id = Utils.generateId();
            USER.referral.code = Utils.generateReferralCode();
            USER.lastLogin = new Date().toISOString();
            
            if (!USER.createdAt) {
                USER.createdAt = new Date().toISOString();
            }
            
            this.saveUser();
            Utils.showNotification('Login successful!', 'success');
            return true;
        }
        Utils.showNotification('Invalid OTP', 'error');
        return false;
    },
    
    // Send OTP
    sendOTP(phone) {
        const otp = Utils.generateOTP();
        localStorage.setItem('dreamwin_otp', otp);
        console.log('OTP:', otp); // For demo purposes
        Utils.showNotification(`OTP sent to ${phone}`, 'success');
        return otp;
    },
    
    // Register
    register(name, phone, referralCode = null) {
        USER.name = name;
        USER.phone = phone;
        USER.id = Utils.generateId();
        USER.referral.code = Utils.generateReferralCode();
        USER.createdAt = new Date().toISOString();
        
        // Apply referral code
        if (referralCode && referralCode !== USER.referral.code) {
            this.applyReferral(referralCode);
        }
        
        // Welcome bonus
        USER.wallet.bonus += 100;
        
        this.saveUser();
        Utils.showNotification('Account created successfully!', 'success');
        return true;
    },
    
    // Apply referral
    applyReferral(code) {
        // In a real app, this would verify the code on the server
        USER.referral.referredBy = code;
        USER.wallet.bonus += CONFIG.REFERRED_BONUS;
        Utils.showNotification(`Referral bonus of ${Utils.formatCurrency(CONFIG.REFERRED_BONUS)} added!`, 'success');
    },
    
    // Logout
    logout() {
        Utils.remove('dreamwin_user');
        USER = {
            id: null,
            phone: '',
            name: 'Player',
            email: '',
            character: null,
            level: 0,
            xp: 0,
            totalXP: 0,
            wallet: { balance: 0, bonus: 100, totalDeposited: 0, totalWithdrawn: 0, totalWon: 0 },
            referral: { code: '', referredBy: null, referrals: [], totalEarned: 0 },
            stats: { gamesPlayed: 0, gamesWon: 0, totalEarnings: 0, currentStreak: 0, bestStreak: 0, loginStreak: 0 },
            spins: { daily: 1, extra: 0, lastSpin: null, totalSpins: 0 },
            vip: { active: false, expiresAt: null, level: 0 },
            clan: null,
            achievements: [],
            unlockedCharacters: [1, 2, 7, 19],
            unlockedGames: [1, 2, 3],
            tasks: [],
            notifications: [],
            settings: { sound: true, music: true, notifications: true, darkMode: true },
            createdAt: new Date().toISOString(),
            lastLogin: null,
        };
        Utils.showNotification('Logged out successfully', 'success');
    },
    
    // Save user
    saveUser() {
        Utils.save('dreamwin_user', USER);
    },
    
    // Check if logged in
    isLoggedIn() {
        return !!USER.id;
    }
};

// ============================================
// WALLET MANAGER
// ============================================
const WalletManager = {
    // Add money
    addMoney(amount, type = 'deposit') {
        USER.wallet.balance += amount;
        if (type === 'deposit') {
            USER.wallet.totalDeposited += amount;
        }
        AuthManager.saveUser();
        Utils.showNotification(`${Utils.formatCurrency(amount)} added to wallet`, 'success');
        return true;
    },
    
    // Withdraw money
    withdraw(amount) {
        if (USER.wallet.balance >= amount) {
            USER.wallet.balance -= amount;
            USER.wallet.totalWithdrawn += amount;
            AuthManager.saveUser();
            Utils.showNotification(`${Utils.formatCurrency(amount)} withdrawal initiated`, 'success');
            return true;
        }
        Utils.showNotification('Insufficient balance', 'error');
        return false;
    },
    
    // Add bonus
    addBonus(amount) {
        USER.wallet.bonus += amount;
        AuthManager.saveUser();
        Utils.showNotification(`Bonus of ${Utils.formatCurrency(amount)} added!`, 'success');
    },
    
    // Use balance
    useBalance(amount) {
        // First use bonus, then main balance
        if (USER.wallet.bonus >= amount) {
            USER.wallet.bonus -= amount;
            AuthManager.saveUser();
            return true;
        }
        
        const remaining = amount - USER.wallet.bonus;
        USER.wallet.bonus = 0;
        
        if (USER.wallet.balance >= remaining) {
            USER.wallet.balance -= remaining;
            AuthManager.saveUser();
            return true;
        }
        
        Utils.showNotification('Insufficient balance', 'error');
        return false;
    },
    
    // Get total balance
    getTotalBalance() {
        return USER.wallet.balance + USER.wallet.bonus;
    },
    
    // Add winning
    addWinning(amount) {
        USER.wallet.balance += amount;
        USER.wallet.totalWon += amount;
        USER.stats.totalEarnings += amount;
        AuthManager.saveUser();
        Utils.showNotification(`You won ${Utils.formatCurrency(amount)}!`, 'success');
    }
};

// ============================================
// SPIN MANAGER
// ============================================
const SpinManager = {
    isSpinning: false,
    currentRotation: 0,
    
    // Check if can spin
    canSpin() {
        const today = new Date().toDateString();
        const lastSpin = USER.spins.lastSpin ? new Date(USER.spins.lastSpin).toDateString() : null;
        return lastSpin !== today || USER.spins.extra > 0;
    },
    
    // Get available spins
    getAvailableSpins() {
        const today = new Date().toDateString();
        const lastSpin = USER.spins.lastSpin ? new Date(USER.spins.lastSpin).toDateString() : null;
        const dailySpins = lastSpin !== today ? CONFIG.DAILY_SPINS : 0;
        return dailySpins + USER.spins.extra;
    },
    
    // Spin the wheel
    spin() {
        if (this.isSpinning || !this.canSpin()) {
            Utils.showNotification('No spins available', 'error');
            return null;
        }
        
        this.isSpinning = true;
        
        // Calculate winning segment (weighted random)
        const weights = [30, 25, 20, 10, 5, 4, 3, 2, 0.5, 0.5];
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let winningIndex = 0;
        
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                winningIndex = i;
                break;
            }
        }
        
        const reward = SPIN_REWARDS[winningIndex];
        
        // Update user data
        const today = new Date().toDateString();
        const lastSpin = USER.spins.lastSpin ? new Date(USER.spins.lastSpin).toDateString() : null;
        
        if (lastSpin !== today) {
            USER.spins.lastSpin = new Date().toISOString();
        } else {
            USER.spins.extra--;
        }
        USER.spins.totalSpins++;
        
        // Add reward to wallet
        WalletManager.addWinning(reward.value);
        
        // Check for spin achievement
        if (USER.spins.totalSpins >= 10) {
            AchievementManager.unlock(9);
        }
        
        AuthManager.saveUser();
        
        return {
            reward: reward,
            rotation: this.calculateRotation(winningIndex)
        };
    },
    
    // Calculate rotation for winning segment
    calculateRotation(segmentIndex) {
        const segmentAngle = 360 / SPIN_REWARDS.length;
        const targetAngle = segmentIndex * segmentAngle + (segmentAngle / 2);
        const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.6);
        const baseRotation = 360 * 5; // 5 full rotations
        return baseRotation + (360 - targetAngle) + randomOffset;
    },
    
    // Add extra spins
    addExtraSpins(count) {
        USER.spins.extra += count;
        AuthManager.saveUser();
        Utils.showNotification(`${count} extra spin(s) added!`, 'success');
    },
    
    // Complete spinning animation
    completeSpinning() {
        this.isSpinning = false;
    }
};

// ============================================
// LEVEL MANAGER
// ============================================
const LevelManager = {
    // Add XP
    addXP(amount) {
        const oldLevel = USER.level;
        USER.xp += amount;
        USER.totalXP += amount;
        
        // Check for level up
        const newLevel = Utils.calculateLevel(USER.xp);
        
        if (newLevel > oldLevel) {
            USER.level = newLevel;
            this.onLevelUp(oldLevel, newLevel);
        }
        
        AuthManager.saveUser();
        return { xpGained: amount, levelUp: newLevel > oldLevel, newLevel };
    },
    
    // Handle level up
    onLevelUp(oldLevel, newLevel) {
        const rewards = LEVEL_CONFIG[newLevel].rewards;
        
        // Add rewards
        USER.wallet.balance += rewards.coins;
        USER.spins.extra += rewards.spins;
        
        // Unlock new games
        for (let level = oldLevel + 1; level <= newLevel; level++) {
            const gamesToUnlock = GAMES_DATA.filter(g => g.level === level);
            gamesToUnlock.forEach(game => {
                if (!USER.unlockedGames.includes(game.id)) {
                    USER.unlockedGames.push(game.id);
                }
            });
        }
        
        Utils.showNotification(`Level Up! You're now Level ${newLevel}!`, 'success');
        Utils.vibrate([100, 50, 100]);
        
        // Check achievements
        if (newLevel >= 5) AchievementManager.unlock(5);
        if (newLevel >= 10) AchievementManager.unlock(10);
        
        AuthManager.saveUser();
    },
    
    // Get level info
    getLevelInfo() {
        const currentXP = USER.xp;
        const level = USER.level;
        const currentLevelXP = LEVEL_CONFIG[level].xpRequired;
        const nextLevelXP = level < 10 ? LEVEL_CONFIG[level + 1].xpRequired : LEVEL_CONFIG[10].xpRequired;
        const progress = Utils.calculateXPProgress(currentXP, level);
        const gamesUnlocked = USER.unlockedGames.length;
        const totalGames = GAMES_DATA.length;
        
        return {
            level,
            currentXP,
            currentLevelXP,
            nextLevelXP,
            progress,
            gamesUnlocked,
            totalGames
        };
    }
};

// ============================================
// GAME MANAGER
// ============================================
const GameManager = {
    currentGame: null,
    
    // Play game
    playGame(gameId, betAmount = 0) {
        const game = GAMES_DATA.find(g => g.id === gameId);
        
        if (!game) {
            Utils.showNotification('Game not found', 'error');
            return false;
        }
        
        if (game.level > USER.level) {
            Utils.showNotification(`Unlock this game at Level ${game.level}`, 'error');
            return false;
        }
        
        if (betAmount > 0 && !WalletManager.useBalance(betAmount)) {
            return false;
        }
        
        this.currentGame = game;
        USER.stats.gamesPlayed++;
        
        AuthManager.saveUser();
        
        return true;
    },
    
    // End game
    endGame(won, amount = 0) {
        if (won) {
            USER.stats.gamesWon++;
            USER.stats.currentStreak++;
            
            if (USER.stats.currentStreak > USER.stats.bestStreak) {
                USER.stats.bestStreak = USER.stats.currentStreak;
            }
            
            if (amount > 0) {
                WalletManager.addWinning(amount);
            }
            
            // Add XP
            LevelManager.addXP(10 + Math.floor(amount / 100));
            
            // Check achievements
            if (USER.stats.gamesWon === 1) AchievementManager.unlock(1);
            if (USER.stats.currentStreak >= 5) AchievementManager.unlock(2);
            if (amount >= 10000) AchievementManager.unlock(4);
            
            Utils.vibrate([100, 50, 100]);
        } else {
            USER.stats.currentStreak = 0;
        }
        
        // Check game achievements
        if (USER.stats.gamesPlayed >= 50) AchievementManager.unlock(10);
        
        this.currentGame = null;
        AuthManager.saveUser();
    },
    
    // Get games list
    getGames(category = null, unlockedOnly = true) {
        let games = GAMES_DATA;
        
        if (category) {
            games = games.filter(g => g.category === category);
        }
        
        if (unlockedOnly) {
            games = games.filter(g => USER.level >= g.level);
        }
        
        return games;
    },
    
    // Get featured games
    getFeaturedGames() {
        return GAMES_DATA.filter(g => g.rating >= 4.8).slice(0, 6);
    },
    
    // Get popular games
    getPopularGames() {
        return [...GAMES_DATA].sort((a, b) => {
            const aPlayers = parseInt(a.players.replace('K+', '000').replace('M+', '000000'));
            const bPlayers = parseInt(b.players.replace('K+', '000').replace('M+', '000000'));
            return bPlayers - aPlayers;
        }).slice(0, 8);
    }
};

// ============================================
// REFERRAL MANAGER
// ============================================
const ReferralManager = {
    // Get referral link
    getReferralLink() {
        return `https://dreamwin.app/register?ref=${USER.referral.code}`;
    },
    
    // Share referral
    async shareReferral() {
        const link = this.getReferralLink();
        const text = `Join DreamWin and earn money playing games! Use my referral code: ${USER.referral.code} to get ${Utils.formatCurrency(CONFIG.REFERRED_BONUS)} bonus! ${link}`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join DreamWin',
                    text: text,
                    url: link
                });
            } catch (err) {
                Utils.copyToClipboard(USER.referral.code);
            }
        } else {
            Utils.copyToClipboard(USER.referral.code);
        }
    },
    
    // Add referral (called when someone uses your code)
    addReferral(userId, userName) {
        USER.referral.referrals.push({
            id: userId,
            name: userName,
            date: new Date().toISOString()
        });
        
        USER.wallet.bonus += CONFIG.REFERRAL_BONUS;
        USER.referral.totalEarned += CONFIG.REFERRAL_BONUS;
        
        // Check achievements
        if (USER.referral.referrals.length >= 10) {
            AchievementManager.unlock(3);
        }
        
        AuthManager.saveUser();
        Utils.showNotification(`Referral bonus of ${Utils.formatCurrency(CONFIG.REFERRAL_BONUS)} added!`, 'success');
    },
    
    // Get referral stats
    getStats() {
        return {
            code: USER.referral.code,
            totalReferrals: USER.referral.referrals.length,
            totalEarned: USER.referral.totalEarned,
            referrals: USER.referral.referrals
        };
    }
};

// ============================================
// TASK MANAGER
// ============================================
const TaskManager = {
    // Get all tasks
    getTasks() {
        return TASKS_DATA.map(task => ({
            ...task,
            completed: USER.tasks.includes(task.id),
            progress: this.getTaskProgress(task.id)
        }));
    },
    
    // Get task progress
    getTaskProgress(taskId) {
        // Simulate progress tracking
        const task = TASKS_DATA.find(t => t.id === taskId);
        if (!task) return 0;
        
        switch (task.type) {
            case 'daily':
                return Math.random() > 0.5 ? 100 : Math.floor(Math.random() * 100);
            case 'referral':
                return USER.referral.referrals.length > 0 ? 100 : 0;
            default:
                return 0;
        }
    },
    
    // Complete task
    completeTask(taskId) {
        const task = TASKS_DATA.find(t => t.id === taskId);
        if (!task || USER.tasks.includes(taskId)) return false;
        
        USER.tasks.push(taskId);
        USER.wallet.bonus += task.reward;
        
        AuthManager.saveUser();
        Utils.showNotification(`Task completed! +${Utils.formatCurrency(task.reward)}`, 'success');
        return true;
    },
    
    // Reset daily tasks
    resetDailyTasks() {
        const today = new Date().toDateString();
        const lastReset = localStorage.getItem('dreamwin_tasks_reset');
        
        if (lastReset !== today) {
            USER.tasks = USER.tasks.filter(taskId => {
                const task = TASKS_DATA.find(t => t.id === taskId);
                return task && task.type !== 'daily';
            });
            localStorage.setItem('dreamwin_tasks_reset', today);
            AuthManager.saveUser();
        }
    }
};

// ============================================
// ACHIEVEMENT MANAGER
// ============================================
const AchievementManager = {
    // Get all achievements
    getAchievements() {
        return ACHIEVEMENTS_DATA.map(achievement => ({
            ...achievement,
            unlocked: USER.achievements.includes(achievement.id)
        }));
    },
    
    // Unlock achievement
    unlock(achievementId) {
        if (USER.achievements.includes(achievementId)) return false;
        
        const achievement = ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
        if (!achievement) return false;
        
        USER.achievements.push(achievementId);
        USER.wallet.bonus += achievement.reward;
        
        AuthManager.saveUser();
        Utils.showNotification(`Achievement Unlocked: ${achievement.name}!`, 'success');
        Utils.vibrate([100, 50, 100, 50, 100]);
        return true;
    }
};

// ============================================
// SHOP MANAGER
// ============================================
const ShopManager = {
    // Get shop items
    getItems() {
        return SHOP_DATA;
    },
    
    // Purchase item
    purchase(itemId) {
        const item = SHOP_DATA.find(i => i.id === itemId);
        if (!item) return false;
        
        if (!WalletManager.useBalance(item.price)) {
            return false;
        }
        
        // Apply item effects
        switch (item.type) {
            case 'spins':
                SpinManager.addExtraSpins(item.name.includes('5') ? 5 : 1);
                break;
            case 'vip':
                this.activateVIP(item.name.includes('Monthly') ? 30 : 7);
                break;
            case 'booster':
                Utils.showNotification(`${item.name} activated!`, 'success');
                break;
            case 'special':
                if (item.name === 'Mystery Box') {
                    const reward = SPIN_REWARDS[Math.floor(Math.random() * SPIN_REWARDS.length)];
                    WalletManager.addWinning(reward.value);
                }
                break;
        }
        
        AuthManager.saveUser();
        return true;
    },
    
    // Activate VIP
    activateVIP(days) {
        USER.vip.active = true;
        USER.vip.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
        USER.vip.level = Math.min(10, USER.vip.level + 1);
        
        AchievementManager.unlock(8);
        
        AuthManager.saveUser();
        Utils.showNotification(`VIP activated for ${days} days!`, 'success');
    },
    
    // Purchase character
    purchaseCharacter(characterId) {
        const character = CHARACTERS_DATA.find(c => c.id === characterId);
        if (!character || USER.unlockedCharacters.includes(characterId)) return false;
        
        if (!WalletManager.useBalance(character.price)) {
            return false;
        }
        
        USER.unlockedCharacters.push(characterId);
        
        // Check achievement
        if (USER.unlockedCharacters.length >= 5) {
            AchievementManager.unlock(7);
        }
        
        AuthManager.saveUser();
        Utils.showNotification(`${character.name} unlocked!`, 'success');
        return true;
    }
};

// ============================================
// NOTIFICATION MANAGER
// ============================================
const NotificationManager = {
    // Get notifications
    getNotifications() {
        return USER.notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    
    // Add notification
    add(title, message, type = 'info') {
        USER.notifications.unshift({
            id: Utils.generateId(),
            title,
            message,
            type,
            read: false,
            date: new Date().toISOString()
        });
        
        AuthManager.saveUser();
    },
    
    // Mark as read
    markAsRead(notificationId) {
        const notification = USER.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            AuthManager.saveUser();
        }
    },
    
    // Mark all as read
    markAllAsRead() {
        USER.notifications.forEach(n => n.read = true);
        AuthManager.saveUser();
    },
    
    // Get unread count
    getUnreadCount() {
        return USER.notifications.filter(n => !n.read).length;
    }
};

// ============================================
// LEADERBOARD MANAGER
// ============================================
const LeaderboardManager = {
    // Get leaderboard data
    getLeaderboard(type = 'daily') {
        // Simulated leaderboard data
        const leaderboard = [];
        const names = ['ProGamer', 'LuckyKing', 'WinMaster', 'GamePro', 'Champion', 'StarPlayer', 'MasterMind', 'VictoryKing', 'TopGamer', 'ElitePlayer'];
        
        for (let i = 0; i < 10; i++) {
            leaderboard.push({
                rank: i + 1,
                name: names[i],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${names[i]}`,
                score: Math.floor(Math.random() * 100000) + 10000,
                wins: Math.floor(Math.random() * 100) + 10,
                level: Math.floor(Math.random() * 10) + 1
            });
        }
        
        // Add current user
        leaderboard.push({
            rank: Math.floor(Math.random() * 50) + 11,
            name: USER.name,
            avatar: USER.character ? CHARACTERS_DATA.find(c => c.id === USER.character)?.emoji : '🎮',
            score: USER.stats.totalEarnings,
            wins: USER.stats.gamesWon,
            level: USER.level,
            isUser: true
        });
        
        return leaderboard.sort((a, b) => b.score - a.score);
    }
};

// ============================================
// CHAT MANAGER
// ============================================
const ChatManager = {
    messages: [],
    
    // Send message
    send(message) {
        this.messages.push({
            id: Utils.generateId(),
            user: USER.name,
            message,
            timestamp: new Date().toISOString(),
            isUser: true
        });
    },
    
    // Get messages
    getMessages() {
        return this.messages;
    }
};

// ============================================
// CLAN MANAGER
// ============================================
const ClanManager = {
    // Get clans
    getClans() {
        return [
            { id: 1, name: 'Dragon Warriors', members: 150, level: 10, icon: '🐉' },
            { id: 2, name: 'Phoenix Legends', members: 120, level: 8, icon: '🔥' },
            { id: 3, name: 'Shadow Knights', members: 100, level: 7, icon: '🛡️' },
            { id: 4, name: 'Golden Eagles', members: 80, level: 6, icon: '🦅' },
            { id: 5, name: 'Thunder Gods', members: 60, level: 5, icon: '⚡' },
        ];
    },
    
    // Join clan
    joinClan(clanId) {
        USER.clan = clanId;
        AuthManager.saveUser();
        Utils.showNotification('Successfully joined clan!', 'success');
    },
    
    // Leave clan
    leaveClan() {
        USER.clan = null;
        AuthManager.saveUser();
        Utils.showNotification('Left clan', 'success');
    }
};

// ============================================
// SETTINGS MANAGER
// ============================================
const SettingsManager = {
    // Toggle dark mode
    toggleDarkMode() {
        USER.settings.darkMode = !USER.settings.darkMode;
        document.documentElement.setAttribute('data-theme', USER.settings.darkMode ? 'dark' : 'light');
        AuthManager.saveUser();
    },
    
    // Toggle sound
    toggleSound() {
        USER.settings.sound = !USER.settings.sound;
        AuthManager.saveUser();
    },
    
    // Toggle music
    toggleMusic() {
        USER.settings.music = !USER.settings.music;
        AuthManager.saveUser();
    },
    
    // Toggle notifications
    toggleNotifications() {
        USER.settings.notifications = !USER.settings.notifications;
        AuthManager.saveUser();
    },
    
    // Apply settings
    applySettings() {
        document.documentElement.setAttribute('data-theme', USER.settings.darkMode ? 'dark' : 'light');
    }
};

// ============================================
// ADMIN MANAGER
// ============================================
const AdminManager = {
    isAdmin: false,
    
    // Check admin status
    checkAdmin() {
        // In real app, this would verify admin token
        return this.isAdmin;
    },
    
    // Get dashboard stats
    getStats() {
        return {
            totalUsers: Math.floor(Math.random() * 100000) + 50000,
            activeUsers: Math.floor(Math.random() * 10000) + 5000,
            totalGames: GAMES_DATA.length,
            totalTransactions: Math.floor(Math.random() * 1000000) + 100000,
            revenue: Math.floor(Math.random() * 10000000) + 1000000,
            pendingWithdrawals: Math.floor(Math.random() * 100) + 10,
        };
    },
    
    // Get all users (admin)
    getUsers(page = 1, limit = 20) {
        const users = [];
        for (let i = 0; i < limit; i++) {
            users.push({
                id: Utils.generateId(),
                name: `User${i + 1}`,
                email: `user${i + 1}@example.com`,
                level: Math.floor(Math.random() * 10),
                balance: Math.floor(Math.random() * 10000),
                status: Math.random() > 0.1 ? 'active' : 'banned',
                createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
            });
        }
        return users;
    }
};

// ============================================
// UI MANAGER
// ============================================
const UIManager = {
    // Show modal
    showModal(id, content = null) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            if (content) {
                const modalBody = modal.querySelector('.modal-body');
                if (modalBody) modalBody.innerHTML = content;
            }
        }
    },
    
    // Hide modal
    hideModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    // Show loading
    showLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) loader.style.display = 'flex';
    },
    
    // Hide loading
    hideLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) loader.style.display = 'none';
    },
    
    // Update element content
    updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = content;
    },
    
    // Toggle class
    toggleClass(selector, className) {
        const element = document.querySelector(selector);
        if (element) element.classList.toggle(className);
    },
    
    // Add class
    addClass(selector, className) {
        const element = document.querySelector(selector);
        if (element) element.classList.add(className);
    },
    
    // Remove class
    removeClass(selector, className) {
        const element = document.querySelector(selector);
        if (element) element.classList.remove(className);
    }
};

// ============================================
// ROUTER
// ============================================
const Router = {
    currentRoute: 'home',
    routes: {},
    
    // Register route
    register(path, handler) {
        this.routes[path] = handler;
    },
    
    // Navigate to route
    navigate(path) {
        if (this.routes[path]) {
            this.currentRoute = path;
            this.routes[path]();
            
            // Update URL
            history.pushState({ path }, '', `#${path}`);
            
            // Update active nav
            document.querySelectorAll('.sidebar-link, .bottom-nav-item').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${path}`) {
                    link.classList.add('active');
                }
            });
        }
    },
    
    // Handle back/forward
    handlePopState(event) {
        if (event.state && event.state.path) {
            this.navigate(event.state.path);
        }
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize auth
    const isLoggedIn = AuthManager.init();
    
    // Apply settings
    SettingsManager.applySettings();
    
    // Reset daily tasks
    TaskManager.resetDailyTasks();
    
    // Hide loading
    setTimeout(() => UIManager.hideLoading(), 500);
    
    // Handle navigation
    window.addEventListener('popstate', Router.handlePopState.bind(Router));
    
    // Handle hash changes
    if (window.location.hash) {
        const path = window.location.hash.slice(1);
        Router.navigate(path);
    }
});

// Export for use in other modules
window.DreamWin = {
    CONFIG,
    USER,
    Utils,
    AuthManager,
    WalletManager,
    SpinManager,
    LevelManager,
    GameManager,
    ReferralManager,
    TaskManager,
    AchievementManager,
    ShopManager,
    NotificationManager,
    LeaderboardManager,
    ChatManager,
    ClanManager,
    SettingsManager,
    AdminManager,
    UIManager,
    Router,
    GAMES_DATA,
    CHARACTERS_DATA,
    TASKS_DATA,
    ACHIEVEMENTS_DATA,
    SHOP_DATA,
    SPIN_REWARDS,
    LEVEL_CONFIG
};