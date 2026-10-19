/**
 * HIT API — Full In-Browser Backend
 *
 * Implements the exact same REST API as github.com/Hcatlab/HIT (Haskell/PostgreSQL)
 * but runs entirely in the browser using IndexedDB for persistent storage.
 *
 * API shape is 100% compatible — when the real Docker backend is available,
 * just change BACKEND_MODE to 'remote' and set REMOTE_URL.
 *
 * Endpoints implemented:
 *   /health
 *   POST /auth/signup   { id, email, password }
 *   POST /auth/login    { email, password }
 *   GET/POST /habits/daily
 *   GET/PUT/DELETE /habits/daily/:id
 *   GET/POST /habits/weekly
 *   GET/PUT/DELETE /habits/weekly/:id
 *   GET/POST /goals
 *   GET/PUT/DELETE /goals/:id
 *   GET/POST /intentions
 *   GET/PUT/DELETE /intentions/:id
 *   GET /users/:id
 */

(function () {
    'use strict';

    // ─── Config ──────────────────────────────────────────────────────────────
    const BACKEND_MODE = 'local';   // 'local' = IndexedDB | 'remote' = real Haskell server
    const REMOTE_URL   = 'http://localhost:8080';
    const DB_NAME      = 'hit_db';
    const DB_VERSION   = 1;

    // ─── IndexedDB Setup ─────────────────────────────────────────────────────
    let _db = null;

    function openDB() {
        return new Promise((resolve, reject) => {
            if (_db) return resolve(_db);
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                ['users', 'habits_daily', 'habits_weekly', 'goals', 'intentions'].forEach(store => {
                    if (!db.objectStoreNames.contains(store)) {
                        db.createObjectStore(store, { keyPath: 'id' });
                    }
                });
            };
            req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
            req.onerror   = (e) => reject(e.target.error);
        });
    }

    async function dbGetAll(store) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readonly');
            const req = tx.objectStore(store).getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror   = () => reject(req.error);
        });
    }

    async function dbGet(store, id) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readonly');
            const req = tx.objectStore(store).get(id);
            req.onsuccess = () => resolve(req.result);
            req.onerror   = () => reject(req.error);
        });
    }

    async function dbPut(store, obj) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readwrite');
            const req = tx.objectStore(store).put(obj);
            req.onsuccess = () => resolve(obj);
            req.onerror   = () => reject(req.error);
        });
    }

    async function dbDelete(store, id) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readwrite');
            const req = tx.objectStore(store).delete(id);
            req.onsuccess = () => resolve(true);
            req.onerror   = () => reject(req.error);
        });
    }

    function genId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function now() { return new Date().toISOString(); }

    // ─── Token / Session ─────────────────────────────────────────────────────
    function getToken()        { return localStorage.getItem('hit_jwt_token'); }
    function setToken(t)       { localStorage.setItem('hit_jwt_token', t); }
    function clearToken()      { localStorage.removeItem('hit_jwt_token'); localStorage.removeItem('hit_user_id'); }
    function getUserId()       { return localStorage.getItem('hit_user_id'); }
    function setUserId(id)     { localStorage.setItem('hit_user_id', id); }
    function isLoggedIn()      { return !!getToken(); }

    // Simple deterministic "token" — not real crypto, just a session marker
    function makeToken(id) { return btoa(id + ':' + Date.now()); }

    // ─── Helpers ─────────────────────────────────────────────────────────────
    function simpleHash(str) {
        // Very simple hash for demo — NOT secure, just for local demo matching
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        return h.toString(16);
    }

    // ─── Local API Implementation ─────────────────────────────────────────────

    // Health
    async function checkHealth() {
        if (BACKEND_MODE === 'remote') {
            try {
                const r = await fetch(REMOTE_URL + '/health');
                return r.ok;
            } catch { return false; }
        }
        return true; // Local is always "online"
    }

    // ── Auth ──────────────────────────────────────────────────────────────────
    async function signup(id, email, password) {
        if (BACKEND_MODE === 'remote') return remotePost('/auth/signup', { id, email, password });

        const existing = await dbGet('users', id);
        if (existing) return { error: 'User ID already exists' };

        const existingByEmail = (await dbGetAll('users')).find(u => u.email === email);
        if (existingByEmail) return { error: 'Email already registered' };

        const user = {
            id, email,
            passwordHash: simpleHash(password),
            createdAt: now()
        };
        await dbPut('users', user);

        const token = makeToken(id);
        setToken(token);
        setUserId(id);

        return {
            token,
            user: { id, email, createdAt: user.createdAt }
        };
    }

    async function login(email, password) {
        if (BACKEND_MODE === 'remote') return remotePost('/auth/login', { email, password });

        const users = await dbGetAll('users');
        const user  = users.find(u => u.email === email && u.passwordHash === simpleHash(password));

        if (!user) return null;

        const token = makeToken(user.id);
        setToken(token);
        setUserId(user.id);

        return {
            token,
            user: { id: user.id, email: user.email }
        };
    }

    function logout() {
        clearToken();
    }

    // ── Habits (Daily) ────────────────────────────────────────────────────────
    async function getDailyHabits() {
        if (BACKEND_MODE === 'remote') return remoteGet('/habits/daily');
        const uid = getUserId();
        const all = await dbGetAll('habits_daily');
        return all.filter(h => h.userId === uid);
    }

    async function createDailyHabit(payload) {
        if (BACKEND_MODE === 'remote') return remotePost('/habits/daily', payload);
        const habit = {
            id: genId(),
            userId: getUserId(),
            name: payload.name || payload.title || '',
            description: payload.description || '',
            timeOfDay: payload.timeOfDay || 'Morning',
            completed: false,
            streak: 0,
            interval: 'Daily',
            createdAt: now()
        };
        return dbPut('habits_daily', habit);
    }

    async function updateDailyHabit(id, payload) {
        if (BACKEND_MODE === 'remote') return remotePut('/habits/daily/' + id, payload);
        const habit = await dbGet('habits_daily', id);
        if (!habit) return null;
        const updated = { ...habit, ...payload, updatedAt: now() };
        return dbPut('habits_daily', updated);
    }

    async function deleteDailyHabit(id) {
        if (BACKEND_MODE === 'remote') return remoteDel('/habits/daily/' + id);
        return dbDelete('habits_daily', id);
    }

    // ── Habits (Weekly) ───────────────────────────────────────────────────────
    async function getWeeklyHabits() {
        if (BACKEND_MODE === 'remote') return remoteGet('/habits/weekly');
        const uid = getUserId();
        const all = await dbGetAll('habits_weekly');
        return all.filter(h => h.userId === uid);
    }

    async function createWeeklyHabit(payload) {
        if (BACKEND_MODE === 'remote') return remotePost('/habits/weekly', payload);
        const habit = {
            id: genId(),
            userId: getUserId(),
            name: payload.name || payload.title || '',
            description: payload.description || '',
            daysOfWeek: payload.daysOfWeek || ['Monday'],
            completed: false,
            streak: 0,
            interval: 'Weekly',
            createdAt: now()
        };
        return dbPut('habits_weekly', habit);
    }

    async function updateWeeklyHabit(id, payload) {
        if (BACKEND_MODE === 'remote') return remotePut('/habits/weekly/' + id, payload);
        const habit = await dbGet('habits_weekly', id);
        if (!habit) return null;
        const updated = { ...habit, ...payload, updatedAt: now() };
        return dbPut('habits_weekly', updated);
    }

    async function deleteWeeklyHabit(id) {
        if (BACKEND_MODE === 'remote') return remoteDel('/habits/weekly/' + id);
        return dbDelete('habits_weekly', id);
    }

    // ── Goals ────────────────────────────────────────────────────────────────
    async function getGoals() {
        if (BACKEND_MODE === 'remote') return remoteGet('/goals');
        const uid = getUserId();
        const all = await dbGetAll('goals');
        return all.filter(g => g.userId === uid);
    }

    async function createGoal(payload) {
        if (BACKEND_MODE === 'remote') return remotePost('/goals', payload);
        const goal = {
            id: genId(),
            userId: getUserId(),
            name: payload.name || payload.title || '',
            description: payload.description || '',
            target: payload.target || 10,
            progress: 0,
            deadline: payload.deadline || null,
            createdAt: now()
        };
        return dbPut('goals', goal);
    }

    async function updateGoal(id, payload) {
        if (BACKEND_MODE === 'remote') return remotePut('/goals/' + id, payload);
        const goal = await dbGet('goals', id);
        if (!goal) return null;
        const updated = { ...goal, ...payload, updatedAt: now() };
        return dbPut('goals', updated);
    }

    async function deleteGoal(id) {
        if (BACKEND_MODE === 'remote') return remoteDel('/goals/' + id);
        return dbDelete('goals', id);
    }

    // ── Intentions ────────────────────────────────────────────────────────────
    async function getIntentions() {
        if (BACKEND_MODE === 'remote') return remoteGet('/intentions');
        const uid = getUserId();
        const all = await dbGetAll('intentions');
        return all.filter(i => i.userId === uid);
    }

    async function createIntention(payload) {
        if (BACKEND_MODE === 'remote') return remotePost('/intentions', payload);
        const intention = {
            id: genId(),
            userId: getUserId(),
            name: payload.name || payload.title || '',
            description: payload.description || '',
            createdAt: now()
        };
        return dbPut('intentions', intention);
    }

    async function updateIntention(id, payload) {
        if (BACKEND_MODE === 'remote') return remotePut('/intentions/' + id, payload);
        const intention = await dbGet('intentions', id);
        if (!intention) return null;
        const updated = { ...intention, ...payload, updatedAt: now() };
        return dbPut('intentions', updated);
    }

    async function deleteIntention(id) {
        if (BACKEND_MODE === 'remote') return remoteDel('/intentions/' + id);
        return dbDelete('intentions', id);
    }

    // ── Users ────────────────────────────────────────────────────────────────
    async function getUser(id) {
        if (BACKEND_MODE === 'remote') return remoteGet('/users/' + id);
        return dbGet('users', id);
    }

    // ─── Remote fetch helpers ─────────────────────────────────────────────────
    async function remoteGet(path) {
        const r = await fetch(REMOTE_URL + path, {
            headers: { 'Authorization': 'Bearer ' + getToken(), 'Accept': 'application/json' }
        });
        return r.ok ? r.json() : null;
    }

    async function remotePost(path, body) {
        const r = await fetch(REMOTE_URL + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify(body)
        });
        return r.ok ? r.json() : null;
    }

    async function remotePut(path, body) {
        const r = await fetch(REMOTE_URL + path, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify(body)
        });
        return r.ok ? r.json() : null;
    }

    async function remoteDel(path) {
        const r = await fetch(REMOTE_URL + path, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        return r.ok;
    }

    // ─── Data Map Helpers ─────────────────────────────────────────────────────
    function mapHabitFromApi(h) {
        return {
            id:        h.id,
            name:      h.name || h.title || '',
            category:  h.description || h.category || 'General',
            timeOfDay: h.timeOfDay || 'Morning',
            completed: h.completed || false,
            streak:    h.streak    || 0
        };
    }

    function mapGoalFromApi(g) {
        return {
            id:       g.id,
            name:     g.name || g.title || '',
            category: g.description || g.category || 'Personal',
            target:   g.target   || 10,
            progress: g.progress || 0,
            dueDate:  g.deadline || g.dueDate || ''
        };
    }

    function mapHabitToApi(h) {
        return {
            name:        h.name,
            description: h.category || 'General',
            timeOfDay:   h.timeOfDay || 'Morning'
        };
    }

    function mapGoalToApi(g) {
        return {
            name:        g.name,
            description: g.category || 'Personal',
            target:      g.target   || 10,
            deadline:    g.dueDate  || null
        };
    }

    // ─── Sync on login: pull IndexedDB data into app state ───────────────────
    async function syncToAppState() {
        if (!isLoggedIn() || !window.HIT) return;
        try {
            const [habits, goals] = await Promise.all([getDailyHabits(), getGoals()]);
            if (habits && habits.length > 0) {
                window.HIT.state.habits = habits.map(mapHabitFromApi);
            }
            if (goals && goals.length > 0) {
                window.HIT.state.goals = goals.map(mapGoalFromApi);
            }
            if (window.HIT_refresh) window.HIT_refresh();
        } catch (e) {
            console.warn('[HIT API] syncToAppState failed:', e);
        }
    }

    // ─── Expose Global ─────────────────────────────────────────────────────────
    window.HIT_API = {
        BACKEND_MODE,
        BASE_URL: BACKEND_MODE === 'remote' ? REMOTE_URL : 'IndexedDB (local)',

        // Health
        checkHealth,

        // Auth
        signup,
        login,
        logout,
        isLoggedIn,
        getToken,
        getUserId,

        // Habits
        getDailyHabits,
        createDailyHabit,
        updateDailyHabit,
        deleteDailyHabit,
        getWeeklyHabits,
        createWeeklyHabit,
        updateWeeklyHabit,
        deleteWeeklyHabit,

        // Goals
        getGoals,
        createGoal,
        updateGoal,
        deleteGoal,

        // Intentions
        getIntentions,
        createIntention,
        updateIntention,
        deleteIntention,

        // Users
        getUser,

        // Mappers
        mapHabitFromApi,
        mapGoalFromApi,
        mapHabitToApi,
        mapGoalToApi,

        // Sync
        syncToAppState
    };

    console.log('[HIT API] ✓ In-browser backend ready (IndexedDB). Mode:', BACKEND_MODE);
})();
