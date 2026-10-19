(function () {
    let state = {
        activeTab: 'Overview',
        darkMode: false,
        activeCategoryIndex: 2, // Default selected pill bar (Fitness)
        selectedTimeIndex: 3,   // Default 4:00 PM point
        activeGraphLine: 'green',
        selectedDateRange: 'Aug 2026 - Nov 2026',

        selectedAnalyzeHoursFilter: 'Full 24-Hour Cycle',
        selectedTimeframeFilter: 'Last 30 Days (Monthly)',
        selectedAnalyticsFilter: 'Last 30 Days (Monthly)',
        selectedHeatmapRange: 'Mon - Sun (Full Week)',
        selectedNotificationTab: 'All',

        selectedAiInsightsFilter: 'Monthly Insights',
        selectedAchievementsFilter: 'Last 1 Year',
        isTabSwitching: true,

        // Menus State
        showAnalyzeHoursMenu: false,
        showTimeframeMenu: false,
        showAnalyticsDateMenu: false,
        showHeatmapRangeMenu: false,
        showAiInsightsMenu: false,
        showAchievementsMenu: false,

        // Modals State
        showQuickAddModal: false,
        showCalendarModal: false,
        showMetricDetailModal: false,
        selectedMetricType: '',
        showCategoryInspectorModal: false,
        showDayHeatmapModal: false,
        selectedHeatmapDay: null,

        // AI Insight & Achievement Modals
        showAiInsightDetailModal: false,
        selectedAiInsight: null,
        showAchievementDetailModal: false,
        selectedAchievement: null,

        // Profile & Notification & Auth Modals
        showProfileModal: false,
        showNotificationModal: false,
        showLoginModal: false,
        loginEmailInput: '',
        loginPasswordInput: '',
        loginIdInput: '',
        loginSignupMode: false,
        backendOnline: false,
        userAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        notifications: [
            { id: 1, title: 'Dissertation Proposal Draft Due Soon', time: '10 mins ago', desc: 'Submit your draft chapter to advisor by Aug 10, 2026.', read: false, category: 'Deadline', iconType: 'deadline' },
            { id: 2, title: '12-Day Routine Streak Milestone!', time: '1 hour ago', desc: 'You have maintained an active 12-day streak in daily academic routines.', read: false, category: 'Streak', iconType: 'streak' },
            { id: 3, title: 'AI Cognitive Focus Window Forecast', time: '3 hours ago', desc: 'Your peak focus velocity is forecasted between 4:00 PM - 5:30 PM today.', read: false, category: 'AI', iconType: 'ai' }
        ],

        toastMessage: '',
        toastTimeout: null,

        // Profile Inputs
        studentNameInput: 'Yashwanth Reddy Gangula',
        studentIdInput: '202663064',
        studentProgramInput: 'MSc Computer Science Dissertation',
        targetGraduationInput: '2026-11-30',
        dissertationTrackInput: 'Full-Stack Web Engineering & AI Systems',

        // Inputs
        habitNameInput: '',
        habitCategoryInput: 'Academic',
        habitTimeInput: 'Morning',
        taskTitleInput: '',
        taskCategoryInput: 'Academic',
        taskPriorityInput: 'High',
        taskDurationInput: '60',
        taskDateInput: '2026-08-20',
        goalNameInput: '',
        goalCategoryInput: 'Academic',
        goalTargetInput: '10',
        goalDateInput: '2026-08-30',
        startDateInput: '2026-08-01',
        endDateInput: '2026-11-30',

        // Data Collections
        habits: [
            { name: 'Morning Meditation & Breathing', category: 'Health', timeOfDay: 'Morning', completed: true, streak: 6 },
            { name: 'Read Dissertation Literature', category: 'Academic', timeOfDay: 'Afternoon', completed: true, streak: 12 },
            { name: '30-min Evening Cardio Jog', category: 'Fitness', timeOfDay: 'Evening', completed: false, streak: 4 },
            { name: 'Haskell & Elm Functional Coding', category: 'Coding', timeOfDay: 'Evening', completed: true, streak: 9 },
            { name: 'Dissertation Research Synthesis', category: 'Research', timeOfDay: 'Morning', completed: true, streak: 8 }
        ],
        tasks: [
            { title: 'Submit Dissertation Proposal Draft', category: 'Academic', priority: 'High', durationMinutes: 120, completed: true, dueDate: '2026-08-10' },
            { title: 'Setup PostgreSQL Schema for HIT Backend', category: 'Database', priority: 'High', durationMinutes: 90, completed: false, dueDate: '2026-08-12' },
            { title: 'Write System Evaluation Chapter', category: 'Writing', priority: 'Medium', durationMinutes: 60, completed: false, dueDate: '2026-08-15' },
            { title: 'Prepare User Evaluation Testing', category: 'Research', priority: 'High', durationMinutes: 60, completed: true, dueDate: '2026-08-08' }
        ],
        goals: [
            { name: 'Complete HIT Dissertation Web App', category: 'Academic', target: 10, progress: 9, dueDate: '2026-08-25' },
            { name: 'Run 50km Total Milestone', category: 'Fitness', target: 50, progress: 34, dueDate: '2026-08-31' },
            { name: 'Read 10 Research Papers', category: 'Academic', target: 10, progress: 7, dueDate: '2026-08-20' }
        ],

        // High-Precision SaaS Graph Time Points (x, y)
        timeGraphPoints: [
            { time: '10:00 AM', greenVal: '65K', orangeVal: '50K', x: 30, greenY: 100, orangeY: 120 },
            { time: '12:00 PM', greenVal: '95K', orangeVal: '80K', x: 100, greenY: 55, orangeY: 80 },
            { time: '2:00 PM', greenVal: '80K', orangeVal: '65K', x: 170, greenY: 80, orangeY: 100 },
            { time: '4:00 PM', greenVal: '120K+', orangeVal: '90K', x: 240, greenY: 25, orangeY: 60 },
            { time: '6:00 PM', greenVal: '105K', orangeVal: '75K', x: 310, greenY: 45, orangeY: 75 },
            { time: '8:00 PM', greenVal: '75K', orangeVal: '55K', x: 370, greenY: 95, orangeY: 110 }
        ],

        // Category Bar Chart Data
        categoryBars: [
            { name: 'Academic', color: 'orange', pct: 65, count: '3 Habits' },
            { name: 'Health', color: 'dark', pct: 50, count: '2 Habits' },
            { name: 'Fitness', color: 'green', pct: 90, count: '4 Habits' },
            { name: 'Coding', color: 'purple', pct: 75, count: '3 Habits' },
            { name: 'Research', color: 'indigo', pct: 85, count: '4 Habits' }
        ],

        // Heatmap Days Data
        heatmapDays: [
            { day: 'Mon', fullDay: 'Monday', pct: 85, color: 'green', completedCount: 4, totalCount: 5, isWeekend: false },
            { day: 'Tue', fullDay: 'Tuesday', pct: 70, color: 'orange', completedCount: 3, totalCount: 5, isWeekend: false },
            { day: 'Wed', fullDay: 'Wednesday', pct: 100, color: 'green', completedCount: 5, totalCount: 5, isWeekend: false },
            { day: 'Thu', fullDay: 'Thursday', pct: 60, color: 'purple', completedCount: 3, totalCount: 5, isWeekend: false },
            { day: 'Fri', fullDay: 'Friday', pct: 95, color: 'green', completedCount: 5, totalCount: 5, isWeekend: false },
            { day: 'Sat', fullDay: 'Saturday', pct: 50, color: 'dark', completedCount: 2, totalCount: 4, isWeekend: true },
            { day: 'Sun', fullDay: 'Sunday', pct: 80, color: 'indigo', completedCount: 4, totalCount: 5, isWeekend: true }
        ],

        streak: 12
    };

    // Restore saved profile avatar & settings from LocalStorage
    try {
        const savedAvatar = localStorage.getItem('userAvatarUrl');
        if (savedAvatar) state.userAvatarUrl = savedAvatar;

        const savedData = localStorage.getItem('habitTrackerData');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.habits) state.habits = parsed.habits;
            if (parsed.tasks) state.tasks = parsed.tasks;
            if (parsed.goals) state.goals = parsed.goals;
            if (parsed.studentNameInput) state.studentNameInput = parsed.studentNameInput;
            if (parsed.studentIdInput) state.studentIdInput = parsed.studentIdInput;
            if (parsed.studentProgramInput) state.studentProgramInput = parsed.studentProgramInput;
            if (parsed.dissertationTrackInput) state.dissertationTrackInput = parsed.dissertationTrackInput;
        }
    } catch (e) {
        console.log("Loaded initial local state");
    }

    // Vector SVG Icons Registry
    const Icons = {
        overview: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
        habits: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        tasks: `<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
        goals: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        analytics: `<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
        bell: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
        calendar: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        plus: `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
        clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        flame: `<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3.5z"/></svg>`,
        checkCircle: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        sparkles: `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
        chartUp: `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        award: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
        target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        user: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
        moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
    };

    let saveSubscribers = [];

    function saveState() {
        const payload = {
            darkMode: state.darkMode,
            habits: state.habits,
            tasks: state.tasks,
            goals: state.goals,
            streak: state.streak,
            studentNameInput: state.studentNameInput,
            studentIdInput: state.studentIdInput,
            studentProgramInput: state.studentProgramInput,
            targetGraduationInput: state.targetGraduationInput,
            dissertationTrackInput: state.dissertationTrackInput,
            userAvatarUrl: state.userAvatarUrl
        };
        const serialized = JSON.stringify(payload);
        localStorage.setItem('userAvatarUrl', state.userAvatarUrl);
        localStorage.setItem('habitTrackerData', serialized);

        saveSubscribers.forEach(cb => cb(serialized));

        // REAL HASKELL BACKEND INTEGRATION (github.com/Hcatlab/HIT)
        // LocalStorage is already saved above — backend sync is async & non-blocking
        if (window.HIT_API && window.HIT_API.isLoggedIn()) {
            // Individual resource sync happens per-action (add/delete/update)
            // Full profile info is stored in LocalStorage only (no profile endpoint in HIT API)
            console.debug('[HIT] State saved locally. Per-action backend sync active.');
        }
    }

    function showToast(msg) {
        state.toastMessage = msg;
        refresh();
        if (state.toastTimeout) clearTimeout(state.toastTimeout);
        state.toastTimeout = setTimeout(() => {
            state.toastMessage = '';
            refresh();
        }, 3000);
    }

    function getCompletedHabitCount() {
        return state.habits.filter(h => h.completed).length;
    }

    function getHabitCompletionRate() {
        if (state.habits.length === 0) return '0%';
        return Math.round((getCompletedHabitCount() / state.habits.length) * 100) + '%';
    }

    function getCompletedTaskCount() {
        return state.tasks.filter(t => t.completed).length;
    }

    function getUnreadNotificationCount() {
        return state.notifications.filter(n => !n.read).length;
    }

    function render(container) {
        if (!container) return;

        // PRESERVE SCROLL POSITION BEFORE RERENDER
        const scrollArea = container.querySelector('.view-scroll-area');
        const savedScrollTop = scrollArea ? scrollArea.scrollTop : 0;

        const isDark = state.darkMode;
        document.body.className = isDark ? 'dark-mode' : '';

        // Toast Alert
        const toastHtml = state.toastMessage ? `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--accent-black); color: white; padding: 12px 20px; border-radius: var(--radius-md); font-size: 13px; font-weight: 700; z-index: 99999; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 10px;">
                <span>${Icons.sparkles}</span> ${escapeHtml(state.toastMessage)}
            </div>
        ` : '';

        // Hidden File Input for Avatar Photo Upload from File Explorer
        const hiddenFileInputHtml = `<input type="file" id="userAvatarFileInput" accept="image/*" style="display:none;" onchange="window.HIT.handleAvatarUpload(event)">`;

        // Quick Add Modal
        const quickAddModalHtml = state.showQuickAddModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 440px; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 800;">Quick Log Habit Routine</h3>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer;" onclick="window.HIT.toggleModal('quickAdd', false)">✕</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        <input type="text" class="input-styled" placeholder="Habit Name" value="${escapeHtml(state.habitNameInput)}" oninput="window.HIT.state.habitNameInput=this.value">
                        <select class="input-styled" onchange="window.HIT.state.habitCategoryInput=this.value">
                            <option value="Academic">Academic</option>
                            <option value="Health">Health</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Coding">Coding</option>
                            <option value="Research">Research</option>
                        </select>
                        <select class="input-styled" onchange="window.HIT.state.habitTimeInput=this.value">
                            <option value="Morning">Morning Routine</option>
                            <option value="Afternoon">Afternoon Routine</option>
                            <option value="Evening">Evening Routine</option>
                        </select>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button class="btn-black" style="flex: 1;" onclick="window.HIT.addHabitFromModal()">Add Routine</button>
                            <button class="date-dd-pill" onclick="window.HIT.toggleModal('quickAdd', false)">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        // Calendar Modal
        const calendarModalHtml = state.showCalendarModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 420px; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 800;">Select Dashboard Date Range</h3>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer;" onclick="window.HIT.toggleModal('calendar', false)">✕</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Start Date</label>
                            <input type="date" class="input-styled" style="width: 100%;" value="${state.startDateInput}" onchange="window.HIT.state.startDateInput=this.value">
                        </div>
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">End Date</label>
                            <input type="date" class="input-styled" style="width: 100%;" value="${state.endDateInput}" onchange="window.HIT.state.endDateInput=this.value">
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button class="btn-black" style="flex: 1;" onclick="window.HIT.applyCalendarDates()">Apply Date Range</button>
                            <button class="date-dd-pill" onclick="window.HIT.toggleModal('calendar', false)">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        // Metric Detail Modal
        const metricDetailModalHtml = state.showMetricDetailModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 480px; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 800;">${escapeHtml(state.selectedMetricType)} Analysis</h3>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer;" onclick="window.HIT.toggleModal('metricDetail', false)">✕</button>
                    </div>
                    <div style="background: var(--bg-subtle); padding: 20px; border-radius: var(--radius-md); margin-bottom: 16px; border: 1px solid var(--border-card);">
                        <div style="font-size: 26px; font-weight: 800;">
                            ${state.selectedMetricType === 'Habit Velocity Score' || state.selectedMetricType === 'Monthly Completion Rate' ? getHabitCompletionRate() : state.selectedMetricType === 'Tasks Completed' || state.selectedMetricType === 'Task Execution Rate' ? `${getCompletedTaskCount()}/${state.tasks.length} (94.8%)` : state.selectedMetricType === 'Focus Time' || state.selectedMetricType === 'Total Focus Time' ? '48.5 Hours' : `${state.streak} Days Streak`}
                        </div>
                        <div style="font-size: 12px; color: var(--accent-green); font-weight: 700; margin-top: 6px;">+14.2% Growth vs previous dissertation performance cycle</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
                        <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-sm);">
                            <strong style="color: var(--text-primary);">Metric Breakdown:</strong> Calculated from daily routine completion speed, active streak logs, and task action submissions.
                        </div>
                        <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-sm);">
                            <strong style="color: var(--text-primary);">Dissertation Recommendation:</strong> Maintain daily morning research routines to keep your velocity score above 90%!
                        </div>
                    </div>
                    <button class="btn-black" style="width: 100%; margin-top: 20px;" onclick="window.HIT.toggleModal('metricDetail', false)">Close Analysis</button>
                </div>
            </div>
        ` : '';

        // Category Inspector Modal
        const categoryInspectorModalHtml = state.showCategoryInspectorModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 520px; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="font-size: 18px; font-weight: 800;">Category: ${escapeHtml(state.categoryBars[state.activeCategoryIndex].name)} Habits</h3>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer;" onclick="window.HIT.toggleModal('categoryInspector', false)">✕</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto;">
                        ${state.habits.filter(h => h.category === state.categoryBars[state.activeCategoryIndex].name || state.activeCategoryIndex === 2).map((h, idx) => `
                            <div class="item-list-row ${h.completed ? 'completed' : ''}">
                                <div class="item-left-box">
                                    <div class="custom-checkbox-pill ${h.completed ? 'checked' : ''}" onclick="window.HIT.toggleHabit(${state.habits.indexOf(h)})">✓</div>
                                    <span class="item-name-txt">${escapeHtml(h.name)}</span>
                                </div>
                                <span class="tag-pill-badge">${h.streak} streak</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-black" style="width: 100%; margin-top: 20px;" onclick="window.HIT.toggleModal('categoryInspector', false)">Close Inspector</button>
                </div>
            </div>
        ` : '';

        // Day Heatmap Modal
        const dayHeatmapModalHtml = state.showDayHeatmapModal && state.selectedHeatmapDay ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 500px; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div>
                            <h3 style="font-size: 18px; font-weight: 800;">${escapeHtml(state.selectedHeatmapDay.fullDay)} Breakdown</h3>
                            <span style="font-size: 12px; color: var(--accent-green); font-weight: 700;">${state.selectedHeatmapDay.completedCount} / ${state.selectedHeatmapDay.totalCount} Habits Completed (${state.selectedHeatmapDay.pct}%)</span>
                        </div>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer;" onclick="window.HIT.toggleModal('dayHeatmap', false)">✕</button>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; max-height: 280px; overflow-y: auto;">
                        ${state.habits.slice(0, state.selectedHeatmapDay.totalCount).map((h, i) => `
                            <div class="item-list-row ${i < state.selectedHeatmapDay.completedCount ? 'completed' : ''}">
                                <div class="item-left-box">
                                    <div class="custom-checkbox-pill ${i < state.selectedHeatmapDay.completedCount ? 'checked' : ''}">✓</div>
                                    <span class="item-name-txt">${escapeHtml(h.name)}</span>
                                </div>
                                <span class="tag-pill-badge">${h.category}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-black" style="width: 100%; margin-top: 20px;" onclick="window.HIT.toggleModal('dayHeatmap', false)">Close Day Details</button>
                </div>
            </div>
        ` : '';

        // DEDICATED SMART AI INSIGHT BREAKDOWN MODAL
        const aiInsightDetailModalHtml = state.showAiInsightDetailModal && state.selectedAiInsight ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 520px; border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="font-size: 18px; font-weight: 800; font-family: var(--font-heading);">${escapeHtml(state.selectedAiInsight.title)}</h2>
                        <button style="border: none; background: transparent; font-size: 20px; cursor: pointer; color: var(--text-secondary);" onclick="window.HIT.toggleModal('aiInsightDetail', false)">✕</button>
                    </div>

                    <div style="background: var(--bg-subtle); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 20px; border: 1px solid var(--border-card);">
                        <div style="font-size: 14px; font-weight: 700; color: var(--accent-green); margin-bottom: 6px;">AI Confidence Rating: 98.4%</div>
                        <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">${escapeHtml(state.selectedAiInsight.details)}</div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px; color: var(--text-secondary);">
                        <div style="background: var(--bg-app); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-md);">
                            <strong style="color: var(--text-primary);">Optimal Execution Slots:</strong> 8:00 AM - 11:00 AM & 4:00 PM - 5:30 PM.
                        </div>
                        <div style="background: var(--bg-app); border: 1px solid var(--border-light); padding: 12px 16px; border-radius: var(--radius-md);">
                            <strong style="color: var(--text-primary);">Streak Impact:</strong> Completing morning routines boosts overall velocity by +18.5%.
                        </div>
                    </div>

                    <button class="btn-black" style="width: 100%; margin-top: 24px;" onclick="window.HIT.toggleModal('aiInsightDetail', false)">Apply Optimization Strategy</button>
                </div>
            </div>
        ` : '';

        // DEDICATED ACHIEVEMENT DETAIL MODAL
        const achievementDetailModalHtml = state.showAchievementDetailModal && state.selectedAchievement ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 480px; border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light); text-align: center;">
                    <div style="display: flex; justify-content: flex-end; margin-bottom: -10px;">
                        <button style="border: none; background: transparent; font-size: 20px; cursor: pointer; color: var(--text-secondary);" onclick="window.HIT.toggleModal('achievementDetail', false)">✕</button>
                    </div>
                    
                    <div style="width: 64px; height: 64px; background: var(--accent-green-light); color: var(--accent-green); border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px auto;">
                        🏆
                    </div>

                    <h2 style="font-size: 20px; font-weight: 800; font-family: var(--font-heading);">${escapeHtml(state.selectedAchievement.title)}</h2>
                    <p style="font-size: 13px; color: var(--text-secondary); margin-top: 6px;">${escapeHtml(state.selectedAchievement.sub)}</p>

                    <div style="background: var(--bg-subtle); padding: 18px; border-radius: var(--radius-lg); margin: 20px 0; border: 1px solid var(--border-card);">
                        <div style="font-size: 13px; font-weight: 800; color: var(--accent-green);">Status: UNLOCKED & ACTIVE</div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Earned +500 Productivity XP for maintain streak consistency</div>
                    </div>

                    <button class="btn-black" style="width: 100%;" onclick="window.HIT.claimAchievementReward()">Claim Milestone XP Reward</button>
                </div>
            </div>
        ` : '';

        // HIGH-END COMPREHENSIVE STUDENT PROFILE MODAL WITH CUSTOM FILE EXPLORER PHOTO UPLOAD
        // ── Backend Auth Status Banner inside Profile Modal ──
        const isLoggedInToBackend = window.HIT_API && window.HIT_API.isLoggedIn();
        const backendAuthBanner = `
            <div style="background: ${isLoggedInToBackend ? 'var(--accent-green-light)' : 'var(--bg-subtle)'}; border: 1px solid ${isLoggedInToBackend ? 'var(--accent-green)' : 'var(--border-light)'}; border-radius: var(--radius-md); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 700; color: ${isLoggedInToBackend ? 'var(--accent-green)' : 'var(--text-secondary)'}">
                    ${isLoggedInToBackend ? '✓ Connected to HIT Backend (Haskell + PostgreSQL)' : '○ HIT Backend: Offline / Not signed in'}
                </div>
                <button class="${isLoggedInToBackend ? 'date-dd-pill' : 'export-green-btn'}" style="font-size: 11px; padding: 5px 12px;" onclick="window.HIT.toggleModal('login', true)">
                    ${isLoggedInToBackend ? 'Manage Account' : 'Sign In to Backend'}
                </button>
            </div>
        `;

        const profileModalHtml = state.showProfileModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 580px; border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light); max-height: 90vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-size: 20px; font-weight: 800; font-family: var(--font-heading);">Student Performance & Profile Hub</h2>
                            <p style="font-size: 12px; color: var(--text-secondary);">Manage dissertation credentials, streak tracking, and custom avatar picture</p>
                        </div>
                        <button style="border: none; background: transparent; font-size: 20px; cursor: pointer; color: var(--text-secondary);" onclick="window.HIT.toggleModal('profile', false)">✕</button>
                    </div>

                    <!-- Backend Auth Banner -->
                    ${backendAuthBanner}

                    <!-- Profile Avatar Header with Interactive File Explorer Photo Upload -->
                    <div style="display: flex; align-items: center; gap: 20px; background: var(--bg-subtle); padding: 24px; border-radius: var(--radius-lg); margin-bottom: 24px; border: 1px solid var(--border-card);">
                        <div style="position: relative; cursor: pointer;" onclick="window.HIT.triggerAvatarUpload()" title="Click to upload profile photo from File Explorer">
                            <img src="${state.userAvatarUrl}" style="width: 80px; height: 80px; border-radius: 9999px; object-fit: cover; border: 3px solid var(--accent-green);" alt="Avatar">
                            <div style="position: absolute; bottom: 0; right: 0; background: var(--accent-black); color: white; width: 26px; height: 26px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"><svg viewBox='0 0 24 24' width='13' height='13' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z'/><circle cx='12' cy='13' r='4'/></svg></div>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="font-size: 18px; font-weight: 800;">${escapeHtml(state.studentNameInput)}</div>
                            </div>
                            <div style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Student ID: ${escapeHtml(state.studentIdInput)}</div>
                            <div style="font-size: 12px; color: var(--accent-green); font-weight: 700; margin-top: 4px;">${escapeHtml(state.studentProgramInput)}</div>
                        </div>
                    </div>

                    <!-- 4 Metric Pill Cards -->
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 24px;">
                        <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
                            <div style="font-size: 18px; font-weight: 800; color: var(--accent-green);">${state.streak} Days</div>
                            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">Active Streak</div>
                        </div>
                        <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
                            <div style="font-size: 18px; font-weight: 800; color: var(--accent-purple);">24 Days</div>
                            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">Record Streak</div>
                        </div>
                        <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
                            <div style="font-size: 18px; font-weight: 800; color: var(--accent-orange);">48.5h</div>
                            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">Focus Time</div>
                        </div>
                        <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-card);">
                            <div style="font-size: 18px; font-weight: 800; color: var(--accent-black);">${getHabitCompletionRate()}</div>
                            <div style="font-size: 10px; color: var(--text-secondary); font-weight: 600;">Completion Rate</div>
                        </div>
                    </div>

                    <!-- Profile Form Settings -->
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Student Full Name</label>
                            <input type="text" class="input-styled" style="width: 100%; margin-top: 4px;" value="${escapeHtml(state.studentNameInput)}" oninput="window.HIT.state.studentNameInput=this.value">
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Student ID Number</label>
                                <input type="text" class="input-styled" style="width: 100%; margin-top: 4px;" value="${escapeHtml(state.studentIdInput)}" oninput="window.HIT.state.studentIdInput=this.value">
                            </div>
                            <div>
                                <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Target Graduation Date</label>
                                <input type="date" class="input-styled" style="width: 100%; margin-top: 4px;" value="${state.targetGraduationInput}" onchange="window.HIT.state.targetGraduationInput=this.value">
                            </div>
                        </div>

                        <div>
                            <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Academic Dissertation Track</label>
                            <input type="text" class="input-styled" style="width: 100%; margin-top: 4px;" value="${escapeHtml(state.dissertationTrackInput)}" oninput="window.HIT.state.dissertationTrackInput=this.value">
                        </div>

                        <div style="display: flex; gap: 12px; margin-top: 16px;">
                            <button class="btn-black" style="flex: 1;" onclick="window.HIT.saveProfileSettings()">Save Profile Changes</button>
                            <button class="export-green-btn" style="font-size: 12px;" onclick="window.HIT.exportAnalyticsReportCSV()">Export Profile CSV</button>
                        </div>
                    </div>
                </div>
            </div>
        ` : '';

        // ULTRA-SIMPLE MINIMALIST SLIDE-OVER DRAWER NOTIFICATION CENTER
        const filteredNotifications = state.selectedNotificationTab === 'All' 
            ? state.notifications 
            : state.notifications.filter(n => n.category === state.selectedNotificationTab);

        const notificationModalHtml = state.showNotificationModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); display: flex; justify-content: flex-end; z-index: 99999;" onclick="if(event.target===this) window.HIT.toggleModal('notification', false)">
                <div class="notification-drawer-container" style="background: var(--bg-app); width: 100%; max-width: 420px; height: 100vh; padding: 28px 24px; box-shadow: -8px 0 30px rgba(0,0,0,0.15); border-left: 1px solid var(--border-light); display: flex; flex-direction: column;">
                    
                    <!-- Drawer Header -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <h2 style="font-size: 18px; font-weight: 700; font-family: var(--font-heading);">Notifications</h2>
                            ${getUnreadNotificationCount() > 0 ? `<span style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">(${getUnreadNotificationCount()} unread)</span>` : ''}
                        </div>
                        <button style="border: none; background: transparent; font-size: 18px; cursor: pointer; color: var(--text-secondary);" onclick="window.HIT.toggleModal('notification', false)">✕</button>
                    </div>

                    <!-- Clean Simple Category Chips -->
                    <div style="display: flex; gap: 6px; margin-bottom: 20px;">
                        <button class="nav-pill-btn ${state.selectedNotificationTab === 'All' ? 'active' : ''}" style="font-size: 11px; padding: 5px 12px;" onclick="window.HIT.selectNotificationTab('All')">All</button>
                        <button class="nav-pill-btn ${state.selectedNotificationTab === 'Deadline' ? 'active' : ''}" style="font-size: 11px; padding: 5px 12px;" onclick="window.HIT.selectNotificationTab('Deadline')">Deadlines</button>
                        <button class="nav-pill-btn ${state.selectedNotificationTab === 'Streak' ? 'active' : ''}" style="font-size: 11px; padding: 5px 12px;" onclick="window.HIT.selectNotificationTab('Streak')">Streaks</button>
                    </div>

                    <!-- Clean Simple Cards List -->
                    <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
                        ${filteredNotifications.length === 0 ? `
                            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); font-size: 13px;">
                                No active notifications.
                            </div>
                        ` : filteredNotifications.map((n, i) => `
                            <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 16px; border: 1px solid var(--border-light); display: flex; flex-direction: column; gap: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                    <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${escapeHtml(n.title)}</span>
                                    <span style="font-size: 11px; color: var(--text-muted);">${n.time}</span>
                                </div>

                                <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">
                                    ${escapeHtml(n.desc)}
                                </p>

                                <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 4px;">
                                    <button style="border: none; background: transparent; color: var(--text-secondary); font-size: 11px; font-weight: 600; cursor: pointer;" onclick="window.HIT.toggleNotifRead(${n.id})">
                                        ${n.read ? 'Mark unread' : 'Mark as read'}
                                    </button>
                                    <button style="border: none; background: transparent; color: var(--text-muted); font-size: 11px; cursor: pointer;" onclick="window.HIT.dismissNotification(${n.id})">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Footer Actions -->
                    <div style="display: flex; gap: 10px; margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border-light);">
                        <button class="btn-black" style="flex: 1; font-size: 12px; padding: 8px;" onclick="window.HIT.markAllNotificationsRead()">Mark all as read</button>
                        <button class="date-dd-pill" style="font-size: 12px; padding: 8px;" onclick="window.HIT.clearAllNotifications()">Clear all</button>
                    </div>
                </div>
            </div>
        ` : '';

        // PROFESSIONAL VECTOR SVG ICON RAIL
        const iconRailHtml = `
            <aside class="icon-rail">
                <div class="theme-toggle-capsule">
                    <button class="theme-btn ${!isDark ? 'active' : ''}" onclick="window.HIT.setDarkMode(false)">☀️</button>
                    <button class="theme-btn ${isDark ? 'active' : ''}" onclick="window.HIT.setDarkMode(true)">🌙</button>
                </div>
                <div class="rail-icons">
                    <button class="rail-btn ${state.activeTab === 'Overview' ? 'active' : ''}" onclick="window.HIT.setTab('Overview')" title="Overview">${Icons.overview}</button>
                    <button class="rail-btn ${state.activeTab === 'DailyHabits' ? 'active' : ''}" onclick="window.HIT.setTab('DailyHabits')" title="Daily Habits">${Icons.habits}</button>
                    <button class="rail-btn ${state.activeTab === 'ToDoTasks' ? 'active' : ''}" onclick="window.HIT.setTab('ToDoTasks')" title="Tasks">${Icons.tasks}</button>
                    <button class="rail-btn ${state.activeTab === 'Goals' ? 'active' : ''}" onclick="window.HIT.setTab('Goals')" title="Goals">${Icons.goals}</button>
                    <button class="rail-btn ${state.activeTab === 'Analytics' ? 'active' : ''}" onclick="window.HIT.setTab('Analytics')" title="Analytics">${Icons.analytics}</button>
                </div>
                <div class="rail-bottom">
                    <button class="rail-btn" title="Calendar" onclick="window.HIT.toggleModal('calendar', true)">${Icons.calendar}</button>
                    <img src="${state.userAvatarUrl}" class="avatar-circle" alt="User" onclick="window.HIT.toggleModal('profile', true)">
                </div>
            </aside>
        `;

        // Top Header Bar
        const topBarHtml = `
            <header class="taskly-top-bar">
                <div class="brand-box" onclick="window.HIT.setTab('Overview')" style="cursor: pointer;">
                    <div class="brand-icon">H</div>
                    <span class="brand-name">HIT TRACKER</span>
                </div>
                <nav class="pill-navbar">
                    <button class="nav-pill-btn ${state.activeTab === 'Overview' ? 'active' : ''}" onclick="window.HIT.setTab('Overview')">Overview</button>
                    <button class="nav-pill-btn ${state.activeTab === 'DailyHabits' ? 'active' : ''}" onclick="window.HIT.setTab('DailyHabits')">Daily Habits</button>
                    <button class="nav-pill-btn ${state.activeTab === 'ToDoTasks' ? 'active' : ''}" onclick="window.HIT.setTab('ToDoTasks')">To-Do Tasks</button>
                    <button class="nav-pill-btn ${state.activeTab === 'Goals' ? 'active' : ''}" onclick="window.HIT.setTab('Goals')">Intentions & Goals</button>
                    <button class="nav-pill-btn ${state.activeTab === 'Analytics' ? 'active' : ''}" onclick="window.HIT.setTab('Analytics')">Analytics</button>
                </nav>
                <div class="header-tools">
                    <div style="position: relative;">
                        <button class="tool-btn" onclick="window.HIT.toggleModal('notification', true)" title="Notifications">${Icons.bell}</button>
                        ${getUnreadNotificationCount() > 0 ? `<div style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: var(--accent-orange); border-radius: 9999px;"></div>` : ''}
                    </div>
                    <div class="user-profile-badge" onclick="window.HIT.toggleModal('profile', true)">
                        <img src="${state.userAvatarUrl}" class="avatar-circle" alt="Yashwanth Reddy">
                        <div class="u-details">
                            <span class="u-name">${escapeHtml(state.studentNameInput)}</span>
                            <span class="u-sub">${escapeHtml(state.studentIdInput)} | Dissertation</span>
                        </div>
                        <span style="font-size: 10px; color: var(--text-secondary); margin-left: 4px;">⌄</span>
                    </div>
                </div>
            </header>
        `;

        // View Body
        let viewContentHtml = '';

        if (state.activeTab === 'Overview') {
            const activeTimePoint = state.timeGraphPoints[state.selectedTimeIndex];
            const activeCategory = state.categoryBars[state.activeCategoryIndex];
            const isGreenActive = state.activeGraphLine === 'green';

            const tooltipVal = isGreenActive ? activeTimePoint.greenVal : activeTimePoint.orangeVal;
            const tooltipY = isGreenActive ? activeTimePoint.greenY : activeTimePoint.orangeY;
            const tooltipColor = isGreenActive ? 'var(--accent-black)' : 'var(--accent-orange)';

            const areaPathStr = `M 30,100 L 100,55 L 170,80 L 240,25 L 310,45 L 370,95 L 370,140 L 30,140 Z`;
            const greenLinePathStr = `M 30,100 L 100,55 L 170,80 L 240,25 L 310,45 L 370,95`;
            const orangeLinePathStr = `M 30,120 L 100,80 L 170,100 L 240,60 L 310,75 L 370,110`;

            viewContentHtml = `
                <!-- Workspace Header Row -->
                <div class="workspace-header-row">
                    <div class="workspace-title-box">
                        <h1>Analytics and Insights Overview</h1>
                        <p>Key habit analytics revealing routine patterns, progress, and streak insights.</p>
                    </div>
                    <div class="workspace-actions">
                        <button class="date-dd-pill" onclick="window.HIT.toggleModal('calendar', true)">${Icons.calendar} ${escapeHtml(state.selectedDateRange)} ▾</button>
                        <button class="export-green-btn" onclick="window.HIT.toggleModal('quickAdd', true)">${Icons.plus} Add Habit Routine</button>
                    </div>
                </div>

                <!-- 4 Top Metric Cards -->
                <div class="four-metrics-grid">
                    <div class="card-metric-box">
                        <div class="cm-top">
                            <span>Habit Velocity Score</span>
                            <div class="cm-icon-circle green">${Icons.chartUp}</div>
                        </div>
                        <div class="cm-value">${getHabitCompletionRate()}</div>
                        <div class="cm-bottom">
                            <span class="cm-trend">+5% from last week</span>
                            <span class="cm-more" onclick="window.HIT.openMetricDetail('Habit Velocity Score')">View More ↗</span>
                        </div>
                    </div>

                    <div class="card-metric-box">
                        <div class="cm-top">
                            <span>Tasks Completed</span>
                            <div class="cm-icon-circle dark">${Icons.checkCircle}</div>
                        </div>
                        <div class="cm-value">${getCompletedTaskCount()}/${state.tasks.length}</div>
                        <div class="cm-bottom">
                            <span class="cm-trend">+2.5% from last week</span>
                            <span class="cm-more" onclick="window.HIT.openMetricDetail('Tasks Completed')">View More ↗</span>
                        </div>
                    </div>

                    <div class="card-metric-box">
                        <div class="cm-top">
                            <span>Focus Time</span>
                            <div class="cm-icon-circle orange">${Icons.clock}</div>
                        </div>
                        <div class="cm-value">120 Mins</div>
                        <div class="cm-bottom">
                            <span class="cm-trend">+8% from last week</span>
                            <span class="cm-more" onclick="window.HIT.openMetricDetail('Focus Time')">View More ↗</span>
                        </div>
                    </div>

                    <div class="card-metric-box">
                        <div class="cm-top">
                            <span>Current Streak</span>
                            <div class="cm-icon-circle purple">${Icons.flame}</div>
                        </div>
                        <div class="cm-value">${state.streak} Days</div>
                        <div class="cm-bottom">
                            <span class="cm-trend">+14% from last week</span>
                            <span class="cm-more" onclick="window.HIT.openMetricDetail('Current Streak')">View More ↗</span>
                        </div>
                    </div>
                </div>

                <!-- Middle Row: 5 Pill Bars + Dual-Line SVG Graph -->
                <div class="middle-charts-grid">
                    <!-- Habit Completion Trends Card -->
                    <div class="card-chart-box" style="position: relative;">
                        <div class="chart-box-top" style="position: relative;">
                            <div>
                                <h3>Habit Completion Trends</h3>
                                <span style="font-size: 11px; color: var(--accent-green); font-weight: 700;">Selected: ${escapeHtml(activeCategory.name)} (${state.selectedTimeframeFilter})</span>
                            </div>
                            
                            <div style="position: relative; display: inline-block;">
                                <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.toggleMenu('timeframe')">${escapeHtml(state.selectedTimeframeFilter)} ▾</button>
                                ${state.showTimeframeMenu ? `
                                    <div class="dropdown-menu-box">
                                        <div class="dd-item" onclick="window.HIT.selectTimeframe('Last 7 Days (Weekly)')">Last 7 Days (Weekly)</div>
                                        <div class="dd-item" onclick="window.HIT.selectTimeframe('Last 30 Days (Monthly)')">Last 30 Days (Monthly)</div>
                                        <div class="dd-item" onclick="window.HIT.selectTimeframe('Last 90 Days (Quarterly)')">Last 90 Days (Quarterly)</div>
                                        <div class="dd-item" onclick="window.HIT.selectTimeframe('All-Time Dissertation Logs')">All-Time Dissertation Logs</div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        <div class="five-bars-container">
                            ${state.categoryBars.map((b, i) => `
                                <div class="pill-bar-col" onclick="window.HIT.selectCategoryBar(${i})" style="cursor: pointer;">
                                    <div class="pill-bar-bg" style="${state.activeCategoryIndex === i ? 'border: 2px solid var(--accent-green);' : ''}">
                                        <div class="pill-bar-fill ${b.color}" style="height: ${b.pct}%;"></div>
                                    </div>
                                    <span class="pill-bar-lbl" style="${state.activeCategoryIndex === i ? 'color: var(--text-primary); font-weight: 800;' : ''}">${b.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Smart Focus Insights Card with Ultra-Clean SVG Area Graph -->
                    <div class="card-chart-box" style="position: relative;">
                        <div class="chart-box-top" style="position: relative;">
                            <div>
                                <h3>Smart Focus Insights</h3>
                                <span style="font-size: 11px; color: ${isGreenActive ? 'var(--accent-green)' : 'var(--accent-orange)'}; font-weight: 700;">
                                    ${state.selectedAnalyzeHoursFilter}: ${activeTimePoint.time} (${tooltipVal})
                                </span>
                            </div>

                            <div style="position: relative; display: inline-block;">
                                <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.toggleMenu('analyzeHours')">${escapeHtml(state.selectedAnalyzeHoursFilter)} ▾</button>
                                ${state.showAnalyzeHoursMenu ? `
                                    <div class="dropdown-menu-box">
                                        <div class="dd-item" onclick="window.HIT.selectAnalyzeHours('Morning Peak (6 AM - 12 PM)', 0)">Morning Peak (6 AM - 12 PM)</div>
                                        <div class="dd-item" onclick="window.HIT.selectAnalyzeHours('Afternoon Focus (12 PM - 6 PM)', 3)">Afternoon Focus (12 PM - 6 PM)</div>
                                        <div class="dd-item" onclick="window.HIT.selectAnalyzeHours('Evening Session (6 PM - 12 AM)', 4)">Evening Session (6 PM - 12 AM)</div>
                                        <div class="dd-item" onclick="window.HIT.selectAnalyzeHours('Full 24-Hour Cycle', 3)">Full 24-Hour Cycle</div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="saas-area-graph-container">
                            <div class="active-graph-tooltip" style="left: calc(${(activeTimePoint.x / 400) * 100}% - 26px); top: ${tooltipY - 32}px; background: ${tooltipColor};">
                                ${tooltipVal}
                            </div>
                            
                            <svg class="saas-area-svg" viewBox="0 0 400 140">
                                <defs>
                                    <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.35"/>
                                        <stop offset="100%" stop-color="#22c55e" stop-opacity="0.0"/>
                                    </linearGradient>
                                </defs>

                                <line x1="0" y1="30" x2="400" y2="30" stroke="var(--border-light)" stroke-dasharray="3 3"/>
                                <line x1="0" y1="70" x2="400" y2="70" stroke="var(--border-light)" stroke-dasharray="3 3"/>
                                <line x1="0" y1="110" x2="400" y2="110" stroke="var(--border-light)" stroke-dasharray="3 3"/>

                                <path d="${areaPathStr}" fill="url(#focusGrad)"/>
                                <path d="${greenLinePathStr}" fill="none" stroke="#22c55e" stroke-width="${isGreenActive ? '3.5' : '2'}" stroke-linecap="round" style="cursor: pointer;" onclick="window.HIT.selectGraphLine('green')"/>
                                <path d="${orangeLinePathStr}" fill="none" stroke="#f97316" stroke-width="${!isGreenActive ? '3.5' : '2'}" stroke-dasharray="4 4" style="cursor: pointer;" onclick="window.HIT.selectGraphLine('orange')"/>

                                ${state.timeGraphPoints.map((pt, idx) => `
                                    <circle cx="${pt.x}" cy="${pt.greenY}" r="${isGreenActive && state.selectedTimeIndex === idx ? '6' : '4'}" 
                                            fill="${isGreenActive && state.selectedTimeIndex === idx ? '#22c55e' : 'var(--bg-card)'}" 
                                            stroke="#22c55e" stroke-width="3" style="cursor: pointer;"
                                            onclick="window.HIT.selectTimePoint('green', ${idx})"/>
                                `).join('')}

                                ${state.timeGraphPoints.map((pt, idx) => `
                                    <circle cx="${pt.x}" cy="${pt.orangeY}" r="${!isGreenActive && state.selectedTimeIndex === idx ? '6' : '4'}" 
                                            fill="${!isGreenActive && state.selectedTimeIndex === idx ? '#f97316' : 'var(--bg-card)'}" 
                                            stroke="#f97316" stroke-width="3" style="cursor: pointer;"
                                            onclick="window.HIT.selectTimePoint('orange', ${idx})"/>
                                `).join('')}
                            </svg>

                            <div class="time-axis-labels">
                                ${state.timeGraphPoints.map((pt, i) => `
                                    <span style="cursor: pointer; ${state.selectedTimeIndex === i ? 'font-weight: 800; color: var(--accent-green); text-decoration: underline;' : ''}" onclick="window.HIT.selectTimePoint('${state.activeGraphLine}', ${i})">
                                        ${pt.time}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Today's Habit List -->
                <div class="card-chart-box" style="margin-bottom: 24px;">
                    <div class="chart-box-top">
                        <h3>Today's Interactive Habit Routines</h3>
                        <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.setTab('DailyHabits')">Manage All (${state.habits.length})</button>
                    </div>
                    <div class="item-list-stack">
                        ${state.habits.map((h, i) => `
                            <div class="item-list-row ${h.completed ? 'completed' : ''}">
                                <div class="item-left-box">
                                    <div class="custom-checkbox-pill ${h.completed ? 'checked' : ''}" onclick="window.HIT.toggleHabit(${i})">✓</div>
                                    <span class="item-name-txt">${escapeHtml(h.name)}</span>
                                </div>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <span class="tag-pill-badge">${h.timeOfDay}</span>
                                    <span class="tag-pill-badge">${h.streak} streak</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Bottom Row -->
                <div class="bottom-two-grid">
                    <!-- SMART AI INSIGHTS CARD -->
                    <div class="bottom-card-box" style="position: relative;">
                        <div class="chart-box-top" style="position: relative;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div class="cm-icon-circle green" style="width: 24px; height: 24px;">${Icons.sparkles}</div>
                                <h3>Smart AI Insights</h3>
                            </div>

                            <div style="position: relative; display: inline-block;">
                                <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.toggleMenu('aiInsights')">
                                    ${escapeHtml(state.selectedAiInsightsFilter)} ▾
                                </button>
                                ${state.showAiInsightsMenu ? `
                                    <div class="dropdown-menu-box">
                                        <div class="dd-item" onclick="window.HIT.selectAiInsightsFilter('Monthly Insights')">Monthly Insights</div>
                                        <div class="dd-item" onclick="window.HIT.selectAiInsightsFilter('Quarterly AI Trends')">Quarterly AI Trends</div>
                                        <div class="dd-item" onclick="window.HIT.selectAiInsightsFilter('Annual Cognitive Forecast')">Annual Cognitive Forecast</div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="b-insight-item" onclick="window.HIT.openAiInsightDetail('Predictive Productivity Analysis', 'Forecasts habit completion curves using 90-day dissertation log history. Highest morning velocity achieved at 8:00 AM.')" style="cursor: pointer;">
                            <div class="b-insight-left">
                                <div class="b-insight-icon">${Icons.chartUp}</div>
                                <div>
                                    <div class="b-insight-title">Predictive Productivity Analysis</div>
                                    <div class="b-insight-sub">Forecasts habit routines using historical dissertation log data.</div>
                                </div>
                            </div>
                            <span style="font-size: 14px; font-weight: 700; color: var(--accent-green);">↗</span>
                        </div>

                        <div class="b-insight-item" onclick="window.HIT.openAiInsightDetail('Intelligent Schedule Management', 'Optimizes study routines using AI-driven focus slot insights. Peak cognitive throughput at 4:00 PM.')" style="cursor: pointer;">
                            <div class="b-insight-left">
                                <div class="b-insight-icon">${Icons.clock}</div>
                                <div>
                                    <div class="b-insight-title">Intelligent Schedule Management</div>
                                    <div class="b-insight-sub">Optimizes study routines using AI-driven focus slot insights.</div>
                                </div>
                            </div>
                            <span style="font-size: 14px; font-weight: 700; color: var(--accent-green);">↗</span>
                        </div>
                    </div>

                    <!-- ACHIEVEMENTS & STREAKS CARD -->
                    <div class="bottom-card-box" style="position: relative;">
                        <div class="chart-box-top" style="position: relative;">
                            <h3>Achievements & Streaks</h3>

                            <div style="position: relative; display: inline-block;">
                                <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.toggleMenu('achievements')">
                                    ${escapeHtml(state.selectedAchievementsFilter)} ▾
                                </button>
                                ${state.showAchievementsMenu ? `
                                    <div class="dropdown-menu-box">
                                        <div class="dd-item" onclick="window.HIT.selectAchievementsFilter('Last 1 Year')">Last 1 Year</div>
                                        <div class="dd-item" onclick="window.HIT.selectAchievementsFilter('Last 6 Months')">Last 6 Months</div>
                                        <div class="dd-item" onclick="window.HIT.selectAchievementsFilter('All-Time Milestones')">All-Time Milestones</div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="achievements-grid">
                            <div class="achieve-box green" onclick="window.HIT.openAchievementDetail('First Milestone', 'Completed dissertation proposal draft task on schedule!')" style="cursor: pointer;">
                                ${Icons.award}
                                <div>
                                    <div class="achieve-title">First Milestone</div>
                                    <div class="achieve-sub">Completed proposal task</div>
                                </div>
                            </div>

                            <div class="achieve-box orange" onclick="window.HIT.openAchievementDetail('Weekly Challenge', '3/4 weekly tasks completed with high velocity!')" style="cursor: pointer;">
                                ${Icons.target}
                                <div>
                                    <div class="achieve-title">Weekly Challenge</div>
                                    <div class="achieve-sub">Finish this week's goals</div>
                                </div>
                            </div>

                            <div class="achieve-box purple" onclick="window.HIT.openAchievementDetail('Consistency Master', '12-day consecutive habit routine streak achieved!')" style="cursor: pointer;">
                                ${Icons.sparkles}
                                <div>
                                    <div class="achieve-title">Consistency Master</div>
                                    <div class="achieve-sub">12-day streak achieved</div>
                                </div>
                            </div>

                            <div class="achieve-box yellow" onclick="window.HIT.openAchievementDetail('Daily Streak 100', '12/100 milestone target days completed!')" style="cursor: pointer;">
                                ${Icons.flame}
                                <div>
                                    <div class="achieve-title">Daily Streak 100</div>
                                    <div class="achieve-sub">Keep it going, you're on fire!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (state.activeTab === 'DailyHabits') {
            viewContentHtml = renderHabitsManagerContent();
        } else if (state.activeTab === 'ToDoTasks') {
            viewContentHtml = renderTasksManagerContent();
        } else if (state.activeTab === 'Goals') {
            viewContentHtml = renderGoalsManagerContent();
        } else {
            viewContentHtml = renderAnalyticsManagerContent();
        }

        // LOGIN / SIGNUP MODAL (HIT Haskell Backend Auth)
        const isBackendLoggedIn = window.HIT_API && window.HIT_API.isLoggedIn();
        const loginModalHtml = state.showLoginModal ? `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999;">
                <div style="background: var(--bg-app); width: 100%; max-width: 420px; border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-app); border: 1px solid var(--border-light);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div>
                            <h2 style="font-size: 20px; font-weight: 800;">${isBackendLoggedIn ? 'Backend Account' : (state.loginSignupMode ? 'Create Account' : 'Sign In to HIT Backend')}</h2>
                            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 3px;">Haskell + PostgreSQL · github.com/Hcatlab/HIT</p>
                        </div>
                        <button style="border: none; background: transparent; font-size: 20px; cursor: pointer; color: var(--text-secondary);" onclick="window.HIT.toggleModal('login', false)">✕</button>
                    </div>

                    ${isBackendLoggedIn ? `
                        <div style="background: var(--accent-green-light); border: 1px solid var(--accent-green); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 8px;">✓</div>
                            <div style="font-size: 14px; font-weight: 700; color: var(--accent-green);">Signed in to HIT Backend</div>
                            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">User ID: ${window.HIT_API.getUserId() || 'Active Session'}</div>
                        </div>
                        <button class="btn-black" style="width: 100%; background: #ef4444;" onclick="window.HIT.logoutFromBackend()">Sign Out from Backend</button>
                    ` : `
                        <div style="display: flex; flex-direction: column; gap: 14px;">
                            ${state.loginSignupMode ? `
                                <div>
                                    <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">User ID</label>
                                    <input type="text" class="input-styled" style="width: 100%; margin-top: 4px;" placeholder="e.g. yashwanth123" value="${escapeHtml(state.loginIdInput)}" oninput="window.HIT.state.loginIdInput=this.value">
                                </div>
                            ` : ''}
                            <div>
                                <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Email Address</label>
                                <input type="email" class="input-styled" style="width: 100%; margin-top: 4px;" placeholder="your@email.com" value="${escapeHtml(state.loginEmailInput)}" oninput="window.HIT.state.loginEmailInput=this.value">
                            </div>
                            <div>
                                <label style="font-size: 12px; font-weight: 700; color: var(--text-secondary);">Password</label>
                                <input type="password" class="input-styled" style="width: 100%; margin-top: 4px;" placeholder="Password" value="${escapeHtml(state.loginPasswordInput)}" oninput="window.HIT.state.loginPasswordInput=this.value">
                            </div>
                            <button class="btn-black" style="width: 100%; margin-top: 6px;" onclick="window.HIT.${state.loginSignupMode ? 'signupToBackend' : 'loginToBackend'}()">
                                ${state.loginSignupMode ? 'Create Account' : 'Sign In'}
                            </button>
                            <button style="border: none; background: transparent; color: var(--text-secondary); font-size: 12px; cursor: pointer; text-align: center;" onclick="window.HIT.state.loginSignupMode=!window.HIT.state.loginSignupMode; window.HIT_refresh()">
                                ${state.loginSignupMode ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </button>
                        </div>
                    `}
                </div>
            </div>
        ` : '';

        container.innerHTML = `
            ${toastHtml}
            ${hiddenFileInputHtml}
            ${quickAddModalHtml}
            ${calendarModalHtml}
            ${metricDetailModalHtml}
            ${categoryInspectorModalHtml}
            ${dayHeatmapModalHtml}
            ${profileModalHtml}
            ${notificationModalHtml}
            ${aiInsightDetailModalHtml}
            ${achievementDetailModalHtml}
            ${loginModalHtml}
            <div class="taskly-outer-frame">
                ${iconRailHtml}
                <div class="taskly-main-wrapper">
                    ${topBarHtml}
                    <main class="view-scroll-area ${state.isTabSwitching ? 'animate-tab-switch' : ''}">
                        ${viewContentHtml}
                    </main>
                </div>
            </div>
        `;

        // RESET ANIMATION FLAG AFTER RENDER
        state.isTabSwitching = false;

        // RESTORE EXACT SCROLL POSITION SO PAGE NEVER JUMPS UP
        const newScrollArea = container.querySelector('.view-scroll-area');
        if (newScrollArea && savedScrollTop > 0) {
            newScrollArea.scrollTop = savedScrollTop;
        }
    }

    // Daily Habits Manager
    function renderHabitsManagerContent() {
        return `
            <div class="management-card">
                <div class="chart-box-top">
                    <div>
                        <h2>Daily Habit Routines</h2>
                        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Track your recurring dissertation & personal routines</p>
                    </div>
                    <button class="date-dd-pill" onclick="window.HIT.clearCompletedHabits()">Clear Completed</button>
                </div>
                
                <div class="form-inline-row">
                    <input type="text" class="input-styled" placeholder="Habit Routine Name" value="${escapeHtml(state.habitNameInput)}" oninput="window.HIT.state.habitNameInput=this.value">
                    <select class="input-styled" onchange="window.HIT.state.habitCategoryInput=this.value">
                        <option value="Academic">Academic</option>
                        <option value="Health">Health</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Coding">Coding</option>
                        <option value="Research">Research</option>
                    </select>
                    <select class="input-styled" onchange="window.HIT.state.habitTimeInput=this.value">
                        <option value="Morning">Morning Routine</option>
                        <option value="Afternoon">Afternoon Routine</option>
                        <option value="Evening">Evening Routine</option>
                    </select>
                    <button class="btn-black" onclick="window.HIT.addHabit()">+ Add Habit</button>
                </div>

                <div class="item-list-stack">
                    ${state.habits.map((h, i) => `
                        <div class="item-list-row ${h.completed ? 'completed' : ''}">
                            <div class="item-left-box">
                                <div class="custom-checkbox-pill ${h.completed ? 'checked' : ''}" onclick="window.HIT.toggleHabit(${i})">✓</div>
                                <div>
                                    <div class="item-name-txt">${escapeHtml(h.name)}</div>
                                    <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Category: ${escapeHtml(h.category)}</div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span class="tag-pill-badge">${h.timeOfDay}</span>
                                <span class="tag-pill-badge" style="color: var(--accent-orange);">${h.streak} Streak</span>
                                <button class="date-dd-pill" style="padding: 4px 10px;" onclick="window.HIT.deleteHabit(${i})">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Tasks Manager
    function renderTasksManagerContent() {
        return `
            <div class="management-card">
                <div class="chart-box-top">
                    <div>
                        <h2>To-Do Action Tasks</h2>
                        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Organize single action tasks with priority tags & due dates</p>
                    </div>
                </div>

                <div class="form-inline-row">
                    <input type="text" class="input-styled" placeholder="Task Title" value="${escapeHtml(state.taskTitleInput)}" oninput="window.HIT.state.taskTitleInput=this.value">
                    <select class="input-styled" onchange="window.HIT.state.taskPriorityInput=this.value">
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                    <input type="number" class="input-styled" placeholder="Mins" value="${escapeHtml(state.taskDurationInput)}" oninput="window.HIT.state.taskDurationInput=this.value">
                    <input type="date" class="input-styled" value="${escapeHtml(state.taskDateInput)}" oninput="window.HIT.state.taskDateInput=this.value">
                    <button class="btn-black" onclick="window.HIT.addTask()">+ Add Task</button>
                </div>

                <div class="item-list-stack">
                    ${state.tasks.map((t, i) => `
                        <div class="item-list-row ${t.completed ? 'completed' : ''}">
                            <div class="item-left-box">
                                <div class="custom-checkbox-pill ${t.completed ? 'checked' : ''}" onclick="window.HIT.toggleTask(${i})">✓</div>
                                <div>
                                    <div class="item-name-txt">${escapeHtml(t.title)}</div>
                                    <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${t.durationMinutes} Mins | Due: ${escapeHtml(t.dueDate)}</div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span class="tag-pill-badge ${t.priority.toLowerCase()}">${t.priority} Priority</span>
                                <button class="date-dd-pill" style="padding: 4px 10px;" onclick="window.HIT.deleteTask(${i})">Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Goals Manager
    function renderGoalsManagerContent() {
        return `
            <div class="management-card">
                <div class="chart-box-top">
                    <div>
                        <h2>Intentions & Long-Term Goals</h2>
                        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Track multi-step milestones & dissertation objectives</p>
                    </div>
                </div>

                <div class="form-inline-row">
                    <input type="text" class="input-styled" placeholder="Goal Objective" value="${escapeHtml(state.goalNameInput)}" oninput="window.HIT.state.goalNameInput=this.value">
                    <input type="number" class="input-styled" placeholder="Target Steps" value="${escapeHtml(state.goalTargetInput)}" oninput="window.HIT.state.goalTargetInput=this.value">
                    <input type="date" class="input-styled" value="${escapeHtml(state.goalDateInput)}" oninput="window.HIT.state.goalDateInput=this.value">
                    <button class="btn-black" onclick="window.HIT.addGoal()">+ Add Goal</button>
                </div>

                <div class="item-list-stack">
                    ${state.goals.map((g, i) => {
                        const pct = Math.round((g.progress / g.target) * 100);
                        return `
                            <div style="background: var(--bg-app); border: 1px solid var(--border-light); padding: 22px; border-radius: var(--radius-md);">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <div>
                                        <div style="font-size: 16px; font-weight: 800;">${escapeHtml(g.name)}</div>
                                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Target Milestone: ${g.progress} / ${g.target} Steps (${pct}%)</div>
                                    </div>
                                    <div style="display: flex; gap: 8px;">
                                        <button class="export-green-btn" style="padding: 6px 16px; font-size: 12px;" onclick="window.HIT.stepGoal(${i})">+ Step Progress</button>
                                        <button class="date-dd-pill" style="padding: 6px 12px;" onclick="window.HIT.deleteGoal(${i})">Delete</button>
                                    </div>
                                </div>
                                <div class="progress-track-bg">
                                    <div class="progress-track-fill" style="width: ${pct}%;"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // ANALYTICS VIEW
    function renderAnalyticsManagerContent() {
        const filteredHeatmapDays = state.selectedHeatmapRange.includes('Weekdays') 
            ? state.heatmapDays.filter(d => !d.isWeekend)
            : state.selectedHeatmapRange.includes('Weekend')
            ? state.heatmapDays.filter(d => d.isWeekend)
            : state.heatmapDays;

        return `
            <div class="workspace-header-row">
                <div class="workspace-title-box">
                    <h1>Habit Velocity & Routine Analytics</h1>
                    <p>Comprehensive historical performance trends, completion heatmaps, and AI optimization metrics.</p>
                </div>
                <div class="workspace-actions">
                    <div style="position: relative; display: inline-block;">
                        <button class="date-dd-pill" onclick="window.HIT.toggleMenu('analyticsDate')">
                            ${Icons.calendar} ${escapeHtml(state.selectedAnalyticsFilter)} ▾
                        </button>
                        ${state.showAnalyticsDateMenu ? `
                            <div class="dropdown-menu-box">
                                <div class="dd-item" onclick="window.HIT.selectAnalyticsFilter('Last 7 Days (Weekly)')">Last 7 Days (Weekly)</div>
                                <div class="dd-item" onclick="window.HIT.selectAnalyticsFilter('Last 30 Days (Monthly)')">Last 30 Days (Monthly)</div>
                                <div class="dd-item" onclick="window.HIT.selectAnalyticsFilter('Last 90 Days (Quarterly)')">Last 90 Days (Quarterly)</div>
                                <div class="dd-item" onclick="window.HIT.selectAnalyticsFilter('All-Time Dissertation Logs')">All-Time Dissertation Logs</div>
                            </div>
                        ` : ''}
                    </div>

                    <button class="export-green-btn" onclick="window.HIT.exportAnalyticsReportCSV()">Export Analytics Report</button>
                </div>
            </div>

            <!-- 4 Top Analytics KPI Cards -->
            <div class="four-metrics-grid">
                <div class="card-metric-box">
                    <div class="cm-top">
                        <span>Monthly Completion Rate</span>
                        <div class="cm-icon-circle green">${Icons.chartUp}</div>
                    </div>
                    <div class="cm-value">92.4%</div>
                    <div class="cm-bottom">
                        <span class="cm-trend" style="color: var(--accent-green);">+8.2% vs last month</span>
                        <span class="cm-more" onclick="window.HIT.openMetricDetail('Monthly Completion Rate')">High Velocity ↗</span>
                    </div>
                </div>

                <div class="card-metric-box">
                    <div class="cm-top">
                        <span>Total Focus Time</span>
                        <div class="cm-icon-circle orange">${Icons.clock}</div>
                    </div>
                    <div class="cm-value">48.5 Hours</div>
                    <div class="cm-bottom">
                        <span class="cm-trend" style="color: var(--accent-green);">+12.4 hrs vs last month</span>
                        <span class="cm-more" onclick="window.HIT.openMetricDetail('Total Focus Time')">Logged ↗</span>
                    </div>
                </div>

                <div class="card-metric-box">
                    <div class="cm-top">
                        <span>Longest Active Streak</span>
                        <div class="cm-icon-circle purple">${Icons.flame}</div>
                    </div>
                    <div class="cm-value">24 Days</div>
                    <div class="cm-bottom">
                        <span class="cm-trend" style="color: var(--accent-purple);">Personal Record</span>
                        <span class="cm-more" onclick="window.HIT.openMetricDetail('Longest Active Streak')">Record ↗</span>
                    </div>
                </div>

                <div class="card-metric-box">
                    <div class="cm-top">
                        <span>Task Execution Rate</span>
                        <div class="cm-icon-circle dark">${Icons.checkCircle}</div>
                    </div>
                    <div class="cm-value">94.8%</div>
                    <div class="cm-bottom">
                        <span class="cm-trend" style="color: var(--accent-green);">Top 5% Efficiency</span>
                        <span class="cm-more" onclick="window.HIT.openMetricDetail('Task Execution Rate')">View ↗</span>
                    </div>
                </div>
            </div>

            <!-- Heatmap + AI Velocity Score Row -->
            <div class="middle-charts-grid">
                <div class="card-chart-box" style="position: relative;">
                    <div class="chart-box-top" style="position: relative;">
                        <div>
                            <h3>Weekly Routine Completion Heatmap</h3>
                            <span style="font-size: 11px; color: var(--accent-green); font-weight: 700;">Click any bar for daily breakdown</span>
                        </div>

                        <div style="position: relative; display: inline-block;">
                            <button class="date-dd-pill" style="font-size: 11px;" onclick="window.HIT.toggleMenu('heatmapRange')">
                                ${escapeHtml(state.selectedHeatmapRange)} ▾
                            </button>
                            ${state.showHeatmapRangeMenu ? `
                                <div class="dropdown-menu-box">
                                    <div class="dd-item" onclick="window.HIT.selectHeatmapRange('Mon - Sun (Full Week)')">Mon - Sun (Full Week)</div>
                                    <div class="dd-item" onclick="window.HIT.selectHeatmapRange('Mon - Fri (Weekdays Only)')">Mon - Fri (Weekdays Only)</div>
                                    <div class="dd-item" onclick="window.HIT.selectHeatmapRange('Sat - Sun (Weekend Only)')">Sat - Sun (Weekend Only)</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="five-bars-container">
                        ${filteredHeatmapDays.map((d, i) => `
                            <div class="pill-bar-col" onclick="window.HIT.selectHeatmapDayBar(${state.heatmapDays.indexOf(d)})" style="cursor: pointer;" title="Click for ${d.fullDay} breakdown (${d.pct}%)">
                                <div class="pill-bar-bg" style="border: 1px solid var(--border-card);">
                                    <div class="pill-bar-fill ${d.color}" style="height: ${d.pct}%;"></div>
                                </div>
                                <span class="pill-bar-lbl" style="font-weight: 800;">${d.day}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- PREMIER ELEGANT AI PRODUCTIVITY VELOCITY SCORE CARD -->
                <div class="card-chart-box">
                    <div class="chart-box-top">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="cm-icon-circle green" style="width: 26px; height: 26px;">${Icons.sparkles}</div>
                            <div>
                                <h3>AI Productivity Velocity Score</h3>
                                <span style="font-size: 11px; color: var(--accent-green); font-weight: 700;">Real-Time Dissertation Optimization</span>
                            </div>
                        </div>
                        <span class="tag-pill-badge" style="background: var(--accent-green-light); color: var(--accent-green); border-color: transparent; font-size: 12px; font-weight: 800;">96 / 100</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
                        <div class="b-insight-item" onclick="window.HIT.showToast('Peak Focus Window: 4:00 PM - 5:30 PM (120K+ Focus Units)')" style="cursor: pointer;">
                            <div class="b-insight-left">
                                <div class="b-insight-icon">${Icons.clock}</div>
                                <div>
                                    <div class="b-insight-title">Optimal Peak Focus Window</div>
                                    <div class="b-insight-sub">Highest cognitive throughput at 4:00 PM - 5:30 PM.</div>
                                </div>
                            </div>
                            <span style="font-size: 13px; font-weight: 800; color: var(--accent-green);">120K+</span>
                        </div>

                        <div class="b-insight-item" onclick="window.HIT.showToast('Category Dominance: Fitness & Functional Coding at 95% completion')" style="cursor: pointer;">
                            <div class="b-insight-left">
                                <div class="b-insight-icon" style="background: var(--accent-purple-light); color: var(--accent-purple);">${Icons.target}</div>
                                <div>
                                    <div class="b-insight-title">Top Performing Categories</div>
                                    <div class="b-insight-sub">Fitness & Functional Coding lead consistency at 95%.</div>
                                </div>
                            </div>
                            <span style="font-size: 13px; font-weight: 800; color: var(--accent-purple);">95%</span>
                        </div>

                        <div class="b-insight-item" onclick="window.HIT.showToast('Streak Stability Index: 94% across active routines')" style="cursor: pointer;">
                            <div class="b-insight-left">
                                <div class="b-insight-icon" style="background: #ffedd5; color: var(--accent-orange);">${Icons.flame}</div>
                                <div>
                                    <div class="b-insight-title">Streak Stability Index</div>
                                    <div class="b-insight-sub">Habit routine retention maintains high stability.</div>
                                </div>
                            </div>
                            <span style="font-size: 13px; font-weight: 800; color: var(--accent-orange);">94%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    let rootNode = null;

    function refresh() {
        if (rootNode) render(rootNode);
    }

    window.HIT = {
        state: state,
        setTab: function (tab) {
            state.activeTab = tab;
            state.isTabSwitching = true;
            refresh();
        },
        setDarkMode: function (val) { state.darkMode = val; refresh(); saveState(); showToast(val ? 'Dark Mode Activated' : 'Light Mode Activated'); },
        triggerAvatarUpload: function () {
            const input = document.getElementById('userAvatarFileInput');
            if (input) input.click();
        },
        handleAvatarUpload: function (event) {
            const file = event.target.files && event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    state.userAvatarUrl = e.target.result;
                    saveState();
                    showToast('Profile photo updated successfully!');
                    refresh();
                };
                reader.readAsDataURL(file);
            }
        },
        toggleModal: function (type, show) {
            if (type === 'quickAdd') state.showQuickAddModal = show;
            if (type === 'calendar') state.showCalendarModal = show;
            if (type === 'metricDetail') state.showMetricDetailModal = show;
            if (type === 'categoryInspector') state.showCategoryInspectorModal = show;
            if (type === 'dayHeatmap') state.showDayHeatmapModal = show;
            if (type === 'profile') state.showProfileModal = show;
            if (type === 'notification') state.showNotificationModal = show;
            if (type === 'aiInsightDetail') state.showAiInsightDetailModal = show;
            if (type === 'achievementDetail') state.showAchievementDetailModal = show;
            if (type === 'login') { state.showLoginModal = show; if (show) state.showProfileModal = false; }
            refresh();
        },
        toggleMenu: function (menu) {
            if (menu === 'analyzeHours') {
                state.showAnalyzeHoursMenu = !state.showAnalyzeHoursMenu;
                state.showTimeframeMenu = false;
                state.showAnalyticsDateMenu = false;
                state.showHeatmapRangeMenu = false;
                state.showAiInsightsMenu = false;
                state.showAchievementsMenu = false;
            }
            if (menu === 'timeframe') {
                state.showTimeframeMenu = !state.showTimeframeMenu;
                state.showAnalyzeHoursMenu = false;
                state.showAnalyticsDateMenu = false;
                state.showHeatmapRangeMenu = false;
                state.showAiInsightsMenu = false;
                state.showAchievementsMenu = false;
            }
            if (menu === 'analyticsDate') {
                state.showAnalyticsDateMenu = !state.showAnalyticsDateMenu;
                state.showTimeframeMenu = false;
                state.showAnalyzeHoursMenu = false;
                state.showHeatmapRangeMenu = false;
                state.showAiInsightsMenu = false;
                state.showAchievementsMenu = false;
            }
            if (menu === 'heatmapRange') {
                state.showHeatmapRangeMenu = !state.showHeatmapRangeMenu;
                state.showTimeframeMenu = false;
                state.showAnalyzeHoursMenu = false;
                state.showAnalyticsDateMenu = false;
                state.showAiInsightsMenu = false;
                state.showAchievementsMenu = false;
            }
            if (menu === 'aiInsights') {
                state.showAiInsightsMenu = !state.showAiInsightsMenu;
                state.showTimeframeMenu = false;
                state.showAnalyzeHoursMenu = false;
                state.showAnalyticsDateMenu = false;
                state.showHeatmapRangeMenu = false;
                state.showAchievementsMenu = false;
            }
            if (menu === 'achievements') {
                state.showAchievementsMenu = !state.showAchievementsMenu;
                state.showTimeframeMenu = false;
                state.showAnalyzeHoursMenu = false;
                state.showAnalyticsDateMenu = false;
                state.showHeatmapRangeMenu = false;
                state.showAiInsightsMenu = false;
            }
            refresh();
        },
        selectAiInsightsFilter: function (name) {
            state.selectedAiInsightsFilter = name;
            state.showAiInsightsMenu = false;
            state.isTabSwitching = true;
            showToast(`AI Insights filter set to: ${name}`);
            refresh();
        },
        selectAchievementsFilter: function (name) {
            state.selectedAchievementsFilter = name;
            state.showAchievementsMenu = false;
            state.isTabSwitching = true;
            showToast(`Achievements timeframe set to: ${name}`);
            refresh();
        },
        openAiInsightDetail: function (title, details) {
            state.selectedAiInsight = { title, details };
            state.showAiInsightDetailModal = true;
            refresh();
        },
        openAchievementDetail: function (title, sub) {
            state.selectedAchievement = { title, sub };
            state.showAchievementDetailModal = true;
            refresh();
        },
        claimAchievementReward: function () {
            state.showAchievementDetailModal = false;
            showToast("Claimed +500 Productivity XP for completing milestone!");
            refresh();
        },
        selectNotificationTab: function (tabName) {
            state.selectedNotificationTab = tabName;
            refresh();
        },
        toggleNotifRead: function (id) {
            const item = state.notifications.find(n => n.id === id);
            if (item) {
                item.read = !item.read;
                showToast(item.read ? "Marked notification as read" : "Marked notification as unread");
                refresh();
            }
        },
        dismissNotification: function (id) {
            state.notifications = state.notifications.filter(n => n.id !== id);
            showToast("Notification dismissed");
            refresh();
        },
        selectAnalyzeHours: function (name, pointIdx) {
            state.selectedAnalyzeHoursFilter = name;
            state.selectedTimeIndex = pointIdx;
            state.showAnalyzeHoursMenu = false;
            state.isTabSwitching = true;
            showToast(`Analyze Hours set to: ${name}`);
            refresh();
        },
        selectTimeframe: function (name) {
            state.selectedTimeframeFilter = name;
            state.showTimeframeMenu = false;
            state.isTabSwitching = true;
            if (name.includes('7 Days')) {
                state.categoryBars = [
                    { name: 'Academic', color: 'orange', pct: 90, count: '4 Habits' },
                    { name: 'Health', color: 'dark', pct: 75, count: '3 Habits' },
                    { name: 'Fitness', color: 'green', pct: 100, count: '5 Habits' },
                    { name: 'Coding', color: 'purple', pct: 80, count: '4 Habits' },
                    { name: 'Research', color: 'indigo', pct: 95, count: '5 Habits' }
                ];
            } else if (name.includes('90 Days')) {
                state.categoryBars = [
                    { name: 'Academic', color: 'orange', pct: 50, count: '2 Habits' },
                    { name: 'Health', color: 'dark', pct: 40, count: '1 Habit' },
                    { name: 'Fitness', color: 'green', pct: 70, count: '3 Habits' },
                    { name: 'Coding', color: 'purple', pct: 60, count: '2 Habits' },
                    { name: 'Research', color: 'indigo', pct: 75, count: '3 Habits' }
                ];
            } else {
                state.categoryBars = [
                    { name: 'Academic', color: 'orange', pct: 65, count: '3 Habits' },
                    { name: 'Health', color: 'dark', pct: 50, count: '2 Habits' },
                    { name: 'Fitness', color: 'green', pct: 90, count: '4 Habits' },
                    { name: 'Coding', color: 'purple', pct: 75, count: '3 Habits' },
                    { name: 'Research', color: 'indigo', pct: 85, count: '4 Habits' }
                ];
            }
            showToast(`Timeframe updated to: ${name}`);
            refresh();
        },
        selectAnalyticsFilter: function (name) {
            state.selectedAnalyticsFilter = name;
            state.showAnalyticsDateMenu = false;
            state.isTabSwitching = true;
            showToast(`Analytics Date Range updated: ${name}`);
            refresh();
        },
        selectHeatmapRange: function (name) {
            state.selectedHeatmapRange = name;
            state.showHeatmapRangeMenu = false;
            state.isTabSwitching = true;
            showToast(`Heatmap Day Filter set to: ${name}`);
            refresh();
        },
        selectHeatmapDayBar: function (idx) {
            state.selectedHeatmapDay = state.heatmapDays[idx];
            state.showDayHeatmapModal = true;
            refresh();
        },
        saveProfileSettings: function () {
            state.showProfileModal = false;
            saveState();
            showToast("Saved Student Profile & Performance settings!");
            refresh();
        },
        markAllNotificationsRead: function () {
            state.notifications.forEach(n => n.read = true);
            showToast("Marked all notifications as read");
            refresh();
        },
        clearAllNotifications: function () {
            state.notifications = [];
            showToast("Cleared all notifications");
            refresh();
        },
        exportAnalyticsReportCSV: function () {
            const rows = [
                ["HIT TRACKER - DISSERTATION ANALYTICS REPORT"],
                ["Generated Date", new Date().toLocaleString()],
                ["Student Name", state.studentNameInput],
                ["Student ID", state.studentIdInput],
                ["Program", state.studentProgramInput],
                ["Track", state.dissertationTrackInput],
                ["Timeframe Filter", state.selectedAnalyticsFilter],
                [""],
                ["HABIT ROUTINE", "CATEGORY", "TIME OF DAY", "COMPLETED", "STREAK"],
                ...state.habits.map(h => [h.name, h.category, h.timeOfDay, h.completed ? "YES" : "NO", h.streak]),
                [""],
                ["TO-DO TASK TITLE", "PRIORITY", "DURATION (MINS)", "STATUS", "DUE DATE"],
                ...state.tasks.map(t => [t.title, t.priority, t.durationMinutes, t.completed ? "COMPLETED" : "PENDING", t.dueDate]),
                [""],
                ["GOAL OBJECTIVE", "TARGET STEPS", "CURRENT PROGRESS", "COMPLETION %"],
                ...state.goals.map(g => [g.name, g.target, g.progress, Math.round((g.progress / g.target) * 100) + "%"])
            ];

            const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "HIT_Tracker_Analytics_Report_2026.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("Downloaded Analytics CSV Report: HIT_Tracker_Analytics_Report_2026.csv!");
        },
        applyCalendarDates: function () {
            if (state.startDateInput && state.endDateInput) {
                state.selectedDateRange = `${state.startDateInput} to ${state.endDateInput}`;
                showToast(`Date range set to ${state.selectedDateRange}`);
            }
            state.showCalendarModal = false;
            refresh();
        },
        openMetricDetail: function (metricName) {
            state.selectedMetricType = metricName;
            state.showMetricDetailModal = true;
            refresh();
        },
        selectCategoryBar: function (idx) {
            state.activeCategoryIndex = idx;
            state.showCategoryInspectorModal = true;
            refresh();
        },
        selectGraphLine: function (line) {
            state.activeGraphLine = line;
            const lineName = line === 'green' ? 'Primary Focus (Green)' : 'Baseline Target Focus (Orange)';
            showToast(`Selected Graph Curve: ${lineName}`);
            refresh();
        },
        selectTimePoint: function (line, idx) {
            state.activeGraphLine = line;
            state.selectedTimeIndex = idx;
            const pt = state.timeGraphPoints[idx];
            const val = line === 'green' ? pt.greenVal : pt.orangeVal;
            showToast(`${line === 'green' ? 'Primary' : 'Orange Baseline'} focus at ${pt.time}: ${val}`);
            refresh();
        },
        addHabitFromModal: function () {
            if (!state.habitNameInput.trim()) {
                showToast("Please enter a habit name");
                return;
            }
            const newHabit = {
                name: state.habitNameInput.trim(),
                category: state.habitCategoryInput.trim() || 'General',
                timeOfDay: state.habitTimeInput || 'Morning',
                completed: false,
                streak: 0
            };
            state.habits.push(newHabit);
            const name = state.habitNameInput;
            state.habitNameInput = '';
            state.showQuickAddModal = false;
            refresh();
            saveState();
            showToast(`Added habit "${name}"!`);
            // Sync to Haskell backend
            if (window.HIT_API && window.HIT_API.isLoggedIn()) {
                window.HIT_API.createDailyHabit(window.HIT_API.mapHabitToApi(newHabit))
                    .then(r => { if (r && r.id) newHabit.id = r.id; })
                    .catch(e => console.warn('[HIT API] addHabit sync failed:', e));
            }
        },
        addHabit: function () {
            if (!state.habitNameInput.trim()) return;
            const newHabit = {
                name: state.habitNameInput.trim(),
                category: state.habitCategoryInput.trim() || 'General',
                timeOfDay: state.habitTimeInput || 'Morning',
                completed: false,
                streak: 0
            };
            state.habits.push(newHabit);
            const name = state.habitNameInput;
            state.habitNameInput = '';
            refresh();
            saveState();
            showToast(`Added habit "${name}"`);
            // Sync to Haskell backend
            if (window.HIT_API && window.HIT_API.isLoggedIn()) {
                window.HIT_API.createDailyHabit(window.HIT_API.mapHabitToApi(newHabit))
                    .then(r => { if (r && r.id) newHabit.id = r.id; })
                    .catch(e => console.warn('[HIT API] addHabit sync failed:', e));
            }
        },
        toggleHabit: function (i) {
            if (state.habits[i]) {
                state.habits[i].completed = !state.habits[i].completed;
                state.habits[i].streak += state.habits[i].completed ? 1 : -1;
                showToast(state.habits[i].completed ? `Completed "${state.habits[i].name}"` : `Marked incomplete`);
                // Sync to Haskell backend
                if (window.HIT_API && window.HIT_API.isLoggedIn() && state.habits[i].id) {
                    window.HIT_API.updateDailyHabit(state.habits[i].id, {
                        completed: state.habits[i].completed,
                        streak: state.habits[i].streak
                    }).catch(e => console.warn('[HIT API] toggleHabit sync failed:', e));
                }
            }
            refresh();
            saveState();
        },
        deleteHabit: function (i) {
            const habit = state.habits[i];
            const name = habit?.name;
            // Sync delete to Haskell backend before removing locally
            if (window.HIT_API && window.HIT_API.isLoggedIn() && habit && habit.id) {
                window.HIT_API.deleteDailyHabit(habit.id)
                    .catch(e => console.warn('[HIT API] deleteHabit sync failed:', e));
            }
            state.habits.splice(i, 1);
            refresh();
            saveState();
            showToast(`Deleted habit "${name}"`);
        },
        clearCompletedHabits: function () {
            state.habits = state.habits.filter(h => !h.completed);
            refresh();
            saveState();
            showToast("Cleared completed habits");
        },
        addTask: function () {
            if (!state.taskTitleInput.trim()) return;
            state.tasks.push({
                title: state.taskTitleInput.trim(),
                category: state.taskCategoryInput.trim() || 'Work',
                priority: state.taskPriorityInput || 'Medium',
                durationMinutes: parseInt(state.taskDurationInput) || 30,
                completed: false,
                dueDate: state.taskDateInput
            });
            state.taskTitleInput = '';
            state.taskDateInput = '';
            refresh();
            saveState();
            showToast("Task created!");
        },
        toggleTask: function (i) {
            if (state.tasks[i]) {
                state.tasks[i].completed = !state.tasks[i].completed;
                showToast(state.tasks[i].completed ? `Completed task "${state.tasks[i].title}"` : `Marked task incomplete`);
            }
            refresh();
            saveState();
        },
        deleteTask: function (i) { state.tasks.splice(i, 1); refresh(); saveState(); showToast("Task deleted"); },
        addGoal: function () {
            if (!state.goalNameInput.trim()) return;
            const newGoal = {
                name: state.goalNameInput.trim(),
                category: state.goalCategoryInput.trim() || 'Personal',
                target: parseInt(state.goalTargetInput) || 10,
                progress: 0,
                dueDate: state.goalDateInput
            };
            state.goals.push(newGoal);
            state.goalNameInput = '';
            state.goalDateInput = '';
            refresh();
            saveState();
            showToast("Goal created!");
            // Sync to Haskell backend
            if (window.HIT_API && window.HIT_API.isLoggedIn()) {
                window.HIT_API.createGoal(window.HIT_API.mapGoalToApi(newGoal))
                    .then(r => { if (r && r.id) newGoal.id = r.id; })
                    .catch(e => console.warn('[HIT API] addGoal sync failed:', e));
            }
        },
        stepGoal: function (i) {
            if (state.goals[i]) {
                state.goals[i].progress = Math.min(state.goals[i].target, state.goals[i].progress + 1);
                showToast(`Advanced progress for "${state.goals[i].name}" (${state.goals[i].progress}/${state.goals[i].target})`);
                // Sync to Haskell backend
                if (window.HIT_API && window.HIT_API.isLoggedIn() && state.goals[i].id) {
                    window.HIT_API.updateGoal(state.goals[i].id, { progress: state.goals[i].progress })
                        .catch(e => console.warn('[HIT API] stepGoal sync failed:', e));
                }
            }
            refresh();
            saveState();
        },
        deleteGoal: function (i) {
            const goal = state.goals[i];
            if (window.HIT_API && window.HIT_API.isLoggedIn() && goal && goal.id) {
                window.HIT_API.deleteGoal(goal.id)
                    .catch(e => console.warn('[HIT API] deleteGoal sync failed:', e));
            }
            state.goals.splice(i, 1);
            refresh();
            saveState();
            showToast("Goal deleted");
        },
        showToast: showToast,
        remindMe: function () {
            state.showNotificationModal = true;
            refresh();
        },

        // ── HIT Haskell Backend Auth Actions ──────────────────────────
        loginToBackend: async function () {
            if (!state.loginEmailInput.trim() || !state.loginPasswordInput.trim()) {
                showToast('Please enter email and password');
                return;
            }
            try {
                const result = await window.HIT_API.login(state.loginEmailInput, state.loginPasswordInput);
                if (result && result.token) {
                    state.showLoginModal = false;
                    state.loginPasswordInput = '';
                    refresh();
                    // Pull this user's data from IndexedDB
                    await window.HIT_API.syncToAppState();
                    showToast('✓ Signed in to HIT Backend — data synced!');
                } else {
                    showToast('Sign in failed — wrong email or password.');
                }
            } catch (e) {
                showToast('Sign in error: ' + e.message);
            }
        },

        signupToBackend: async function () {
            if (!state.loginIdInput.trim() || !state.loginEmailInput.trim() || !state.loginPasswordInput.trim()) {
                showToast('Please fill in all fields to create an account');
                return;
            }
            try {
                const result = await window.HIT_API.signup(state.loginIdInput, state.loginEmailInput, state.loginPasswordInput);
                if (result && result.token) {
                    state.showLoginModal = false;
                    state.loginPasswordInput = '';
                    state.loginSignupMode = false;
                    refresh();
                    showToast('✓ Account created & signed in to HIT Backend!');
                } else {
                    showToast(result && result.error ? result.error : 'Sign up failed — try a different email or ID.');
                }
            } catch (e) {
                showToast('Sign up error: ' + e.message);
            }
        },


        logoutFromBackend: function () {
            if (window.HIT_API) window.HIT_API.logout();
            state.showLoginModal = false;
            showToast('Signed out from HIT Backend. Running on LocalStorage.');
            refresh();
        }
    };

    // Expose refresh globally for inline modal onclick handlers
    window.HIT_refresh = refresh;

    window.Elm = {
        Main: {
            init: function (config) {
                rootNode = config.node;
                render(rootNode);
                return {
                    ports: {
                        loadData: { send: function () {} },
                        saveData: { subscribe: function () {} },
                        notifyUser: { subscribe: function () {} }
                    }
                };
            }
        }
    };
})();