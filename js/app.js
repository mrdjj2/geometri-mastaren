/**
 * Geometri-Spel - Huvudapplikation
 * Pedagogiskt spel för att lära geometri (åk 7-9)
 */

import Storage from './utils/storage.js';
import MathUtils from './utils/math.js';
import Exercises from './data/exercises.js';
import Formulas from './data/formulas.js';
import Achievements from './data/achievements.js';
import Points from './gamification/points.js';
import Levels from './gamification/levels.js';
import Shapes2D from './visualizations/shapes2d.js';
import Shapes3D from './visualizations/shapes3d.js';

/**
 * Huvudapplikation
 */
const App = {
    // Aktuell vy och tillstånd
    currentView: 'dashboard',
    currentTopic: null,
    currentExercise: null,
    exerciseStartTime: null,
    hintStep: 0,
    usedHint: false,
    attempts: 0,

    // Vald avatar för ny profil
    selectedAvatar: '👤',

    /**
     * Initiera applikationen
     */
    init() {
        console.log('🎮 Geometri-Spel startar...');

        // Sätt upp navigation
        this.setupNavigation();

        // Sätt upp avatar-väljare
        this.setupAvatarSelection();

        // Kolla profiler
        const profiles = Storage.getAllProfiles();
        const currentProfileId = Storage.getCurrentProfileId();

        if (profiles.length === 0) {
            // Inga profiler - visa välkomstmodal för att skapa första
            this.showWelcomeModal();
        } else if (!currentProfileId || !profiles.find(p => p.id === currentProfileId)) {
            // Ingen aktiv profil vald - visa profilväljare
            this.showProfileSelector();
        } else {
            // Profil finns - fortsätt som vanligt
            Storage.updateStreak();
            this.navigate('dashboard');
            this.updateHeader();
        }

        // Dölj laddningsskärmen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        console.log('✅ Applikation initierad');
    },

    /**
     * Visa välkomstmodal för nya användare
     */
    showWelcomeModal() {
        const modal = document.getElementById('welcome-modal');
        if (modal) {
            modal.classList.add('active');

            // Enter-tangent startar resan
            const nameInput = document.getElementById('welcome-name-input');
            if (nameInput) {
                nameInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.startJourney();
                    }
                });
            }
        }
    },

    /**
     * Sätt upp avatar-väljare för modaler
     */
    setupAvatarSelection() {
        // Välkomst-modal avatarer
        document.querySelectorAll('#welcome-modal .avatar-choice').forEach(choice => {
            choice.addEventListener('click', () => {
                document.querySelectorAll('#welcome-modal .avatar-choice').forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
                this.selectedAvatar = choice.dataset.avatar;
            });
        });

        // Skapa profil-modal avatarer
        document.querySelectorAll('#create-profile-modal .avatar-choice').forEach(choice => {
            choice.addEventListener('click', () => {
                document.querySelectorAll('#create-profile-modal .avatar-choice').forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
                this.selectedAvatar = choice.dataset.avatar;
            });
        });
    },

    /**
     * Visa profilväljare
     */
    showProfileSelector() {
        const modal = document.getElementById('profile-modal');
        if (!modal) return;

        this.renderProfilesList();
        modal.classList.add('active');
    },

    /**
     * Rendera profillistan
     */
    renderProfilesList() {
        const container = document.getElementById('profiles-list');
        if (!container) return;

        const profiles = Storage.getAllProfiles();
        const currentProfileId = Storage.getCurrentProfileId();

        if (profiles.length === 0) {
            container.innerHTML = '<p class="no-profiles">Inga profiler ännu. Skapa din första!</p>';
            return;
        }

        container.innerHTML = profiles.map(profile => `
            <div class="profile-item ${profile.id === currentProfileId ? 'active' : ''}"
                 data-profile-id="${profile.id}">
                <div class="profile-avatar">${profile.avatar || '👤'}</div>
                <div class="profile-info">
                    <span class="profile-name">${profile.name}</span>
                </div>
                <button class="btn-delete-profile" data-profile-id="${profile.id}" title="Ta bort profil">
                    🗑️
                </button>
            </div>
        `).join('');

        // Lägg till klickhändelser för att välja profil
        container.querySelectorAll('.profile-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Ignorera om man klickar på delete-knappen
                if (e.target.classList.contains('btn-delete-profile')) return;
                const profileId = item.dataset.profileId;
                this.selectProfile(profileId);
            });
        });

        // Lägg till klickhändelser för att ta bort profil
        container.querySelectorAll('.btn-delete-profile').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const profileId = btn.dataset.profileId;
                this.confirmDeleteProfile(profileId);
            });
        });
    },

    /**
     * Visa modal för att skapa ny profil
     */
    showCreateProfile() {
        this.selectedAvatar = '👤'; // Återställ vald avatar

        // Återställ avatar-val i modalen
        document.querySelectorAll('#create-profile-modal .avatar-choice').forEach(c => {
            c.classList.remove('selected');
            if (c.dataset.avatar === '👤') c.classList.add('selected');
        });

        // Töm namn-fältet
        const nameInput = document.getElementById('new-profile-name');
        if (nameInput) nameInput.value = '';

        this.closeModal('profile-modal');
        this.openModal('create-profile-modal');
    },

    /**
     * Skapa ny profil
     */
    createNewProfile() {
        const nameInput = document.getElementById('new-profile-name');
        const name = nameInput?.value.trim();

        if (!name) {
            this.showToast('Ange ett namn för profilen', 'error');
            return;
        }

        // Skapa profilen med vald avatar
        const newProfile = Storage.createProfile(name, this.selectedAvatar);

        this.closeModal('create-profile-modal');
        this.showToast(`Välkommen, ${name}! 🎉`, 'success');

        // Uppdatera och visa dashboard
        Storage.updateStreak();
        this.updateHeader();
        this.navigate('dashboard');
    },

    /**
     * Välj en profil
     */
    selectProfile(profileId) {
        Storage.setCurrentProfile(profileId);
        Storage.updateStreak();

        this.closeModal('profile-modal');
        this.updateHeader();
        this.navigate('dashboard');

        const profile = Storage.getProfile();
        this.showToast(`Välkommen tillbaka, ${profile.name}!`, 'success');
    },

    /**
     * Bekräfta borttagning av profil
     */
    confirmDeleteProfile(profileId) {
        const profileInfo = Storage.getProfileInfo(profileId);
        if (!profileInfo) return;

        if (confirm(`Vill du verkligen ta bort profilen "${profileInfo.name}"? All progress kommer att raderas!`)) {
            this.deleteProfile(profileId);
        }
    },

    /**
     * Ta bort en profil
     */
    deleteProfile(profileId) {
        Storage.deleteProfile(profileId);

        const profiles = Storage.getAllProfiles();
        if (profiles.length === 0) {
            // Inga profiler kvar - visa välkomstmodal
            this.closeModal('profile-modal');
            this.showWelcomeModal();
        } else {
            // Uppdatera profillistan
            this.renderProfilesList();
        }

        this.showToast('Profilen har tagits bort', 'info');
    },

    /**
     * Byt profil (från header eller inställningar)
     */
    switchProfile() {
        this.showProfileSelector();
    },

    /**
     * Sätt upp navigation
     */
    setupNavigation() {
        // Sidebar-länkar
        document.querySelectorAll('.nav-item[data-page]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigate(page);
            });
        });

        // Meny-knapp
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Stäng modaler
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Klicka utanför modal för att stänga
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Level tabs i topic-detail
        document.querySelectorAll('.level-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Filtrera uppgifter efter nivå
                const level = parseInt(tab.dataset.level);
                this.filterExercisesByLevel(level);
            });
        });
    },

    /**
     * Filtrera uppgifter efter nivå
     */
    filterExercisesByLevel(level) {
        const exerciseList = document.getElementById('exercises-list');
        if (!exerciseList || !this.currentTopic) return;

        const exercises = Exercises.getByTopic(this.currentTopic)
            .filter(e => e.level === level);
        const profile = Storage.getProfile();
        const topic = Exercises.topics[this.currentTopic];

        if (exercises.length === 0) {
            exerciseList.innerHTML = '<p class="no-exercises">Inga uppgifter på denna nivå ännu.</p>';
            return;
        }

        exerciseList.innerHTML = exercises.map(ex => {
            const isCompleted = profile.completedExercises.includes(ex.id);
            return `
                <div class="exercise-card ${isCompleted ? 'completed' : ''}"
                     data-exercise="${ex.id}"
                     style="--topic-color: ${topic.color}">
                    <div class="exercise-number">${ex.number}</div>
                    <div class="exercise-info">
                        <h4>${ex.title}</h4>
                        <span class="exercise-points">${ex.points} poäng</span>
                    </div>
                    <div class="exercise-status">
                        ${isCompleted ? '✅' : '▶️'}
                    </div>
                </div>
            `;
        }).join('');

        // Lägg till klickhändelser
        exerciseList.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', () => {
                const exerciseId = card.dataset.exercise;
                this.navigate('exercise', { exercise: exerciseId });
            });
        });
    },

    /**
     * Navigera till en vy
     */
    navigate(view, params = {}) {
        // Dölj alla vyer
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
        });

        // Uppdatera aktiv meny i sidebar
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === view) {
                item.classList.add('active');
            }
        });

        // Mappa view-namn till HTML element-ID (view-dashboard, view-topics, etc.)
        const viewMap = {
            'dashboard': 'view-dashboard',
            'topics': 'view-topics',
            'topic': 'view-topic-detail',
            'topic-detail': 'view-topic-detail',
            'exercise': 'view-exercise',
            'achievements': 'view-achievements',
            'formulas': 'view-formulas',
            'settings': 'view-settings'
        };

        // Visa vald vy
        const viewId = viewMap[view] || `view-${view}`;
        const viewElement = document.getElementById(viewId);
        if (viewElement) {
            viewElement.classList.add('active');
        }

        // Stäng sidebar på mobil
        this.closeSidebar();

        this.currentView = view;

        // Rendera vyns innehåll
        switch (view) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'topics':
                this.renderTopics();
                break;
            case 'topic':
            case 'topic-detail':
                this.currentTopic = params.topic;
                this.renderTopicDetail(params.topic);
                break;
            case 'exercise':
                this.currentExercise = params.exercise;
                this.renderExercise(params.exercise);
                break;
            case 'achievements':
                this.renderAchievements();
                break;
            case 'formulas':
                this.renderFormulas();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    },

    /**
     * Öppna/stäng sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (overlay) {
            overlay.classList.toggle('active');
        }
    },

    /**
     * Stäng sidebar
     */
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
    },

    /**
     * Uppdatera header med användarinfo
     */
    updateHeader() {
        const profile = Storage.getProfile();

        // Streak
        const streakEl = document.getElementById('streak-count');
        if (streakEl) {
            streakEl.textContent = profile.streak;
        }

        // Poäng
        const pointsEl = document.getElementById('points-count');
        if (pointsEl) {
            pointsEl.textContent = Points.format(profile.totalPoints);
        }

        // Nivå
        const levelEl = document.getElementById('level-display');
        if (levelEl) {
            const levelInfo = Levels.getInfo(profile.level);
            levelEl.innerHTML = `${levelInfo.icon} Nivå ${profile.level}`;
        }

        // XP-bar
        const xpBarContainer = document.getElementById('xp-bar-container');
        if (xpBarContainer) {
            xpBarContainer.innerHTML = Levels.renderXPBar();
        }
    },

    /**
     * Rendera Dashboard
     */
    renderDashboard() {
        // Uppdatera statistik
        const profile = Storage.getProfile();
        const stats = Points.getStats();

        // Uppdatera välkomstnamn
        const welcomeName = document.getElementById('welcome-name');
        if (welcomeName) {
            welcomeName.textContent = profile.name || 'Elev';
        }

        // Uppdatera statistik-kort
        const statCompleted = document.getElementById('stat-completed');
        if (statCompleted) statCompleted.textContent = stats.completedExercises;

        const statAccuracy = document.getElementById('stat-accuracy');
        if (statAccuracy) {
            const accuracy = stats.completedExercises > 0
                ? Math.round((stats.perfectAnswers / stats.completedExercises) * 100)
                : 0;
            statAccuracy.textContent = accuracy + '%';
        }

        const statStreak = document.getElementById('stat-streak');
        if (statStreak) statStreak.textContent = profile.streak + ' dagar';

        // Rendera ämneskort
        const topicsGrid = document.getElementById('topics-grid');
        if (topicsGrid) {
            topicsGrid.innerHTML = this.renderTopicCards();

            topicsGrid.querySelectorAll('.topic-card').forEach(card => {
                card.addEventListener('click', () => {
                    const topic = card.dataset.topic;
                    this.navigate('topic', { topic });
                });
            });
        }

        // Rendera senaste achievements
        const recentAchievements = document.getElementById('recent-achievements');
        if (recentAchievements) {
            const recent = profile.achievements.slice(-3).reverse();
            if (recent.length > 0) {
                recentAchievements.innerHTML = recent.map(id => {
                    const ach = Achievements.getById(id);
                    if (!ach) return '';
                    return `
                        <div class="achievement-mini">
                            <span class="achievement-icon">${ach.icon}</span>
                            <span class="achievement-name">${ach.name}</span>
                        </div>
                    `;
                }).join('');
            } else {
                recentAchievements.innerHTML = '<p class="no-achievements">Lös uppgifter för att låsa upp achievements!</p>';
            }
        }

        // Uppdatera provberedskap
        this.updateTestReadiness();
    },

    /**
     * Uppdatera provberedskapsvisning
     */
    updateTestReadiness() {
        // Räkna totalt antal uppgifter
        const totalExercises = Object.values(Exercises.topics).reduce((sum, topic) => {
            return sum + Exercises.getByTopic(topic.id).length;
        }, 0);

        const readiness = Storage.calculateTestReadiness(totalExercises);

        // Uppdatera procent-text
        const percentEl = document.getElementById('readiness-percent');
        if (percentEl) {
            percentEl.textContent = readiness.totalReadiness + '%';
        }

        // Uppdatera gauge-cirkel
        const gaugeFill = document.getElementById('gauge-fill');
        if (gaugeFill) {
            // SVG cirkel animation (stroke-dashoffset)
            const circumference = 2 * Math.PI * 45; // r=45
            const offset = circumference - (readiness.totalReadiness / 100) * circumference;
            gaugeFill.style.strokeDasharray = circumference;
            gaugeFill.style.strokeDashoffset = offset;

            // Färg baserad på nivå
            gaugeFill.style.stroke = readiness.color;
        }

        // Uppdatera meddelande
        const messageEl = document.getElementById('readiness-message');
        if (messageEl) {
            messageEl.textContent = readiness.message;
        }

        // Uppdatera statistik
        const statsContainer = document.getElementById('readiness-stats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="readiness-stat">
                    <span class="stat-value">${readiness.stats.completedCount}/${readiness.stats.totalExercises}</span>
                    <span class="stat-label">uppgifter</span>
                </div>
                <div class="readiness-stat">
                    <span class="stat-value">${readiness.stats.accuracy}%</span>
                    <span class="stat-label">rätt första gången</span>
                </div>
            `;
        }
    },

    /**
     * Visa detaljerad provberedskapsinfo
     */
    showReadinessDetails() {
        const totalExercises = Object.values(Exercises.topics).reduce((sum, topic) => {
            return sum + Exercises.getByTopic(topic.id).length;
        }, 0);

        const readiness = Storage.calculateTestReadiness(totalExercises);

        // Skapa modal-innehåll
        const modal = document.getElementById('formula-modal');
        const content = modal?.querySelector('.modal-body') || modal;

        if (!content) return;

        content.innerHTML = `
            <h3>📊 Detaljerad Provberedskap</h3>
            <div class="readiness-detail-header">
                <div class="readiness-overall">
                    <span class="big-percent" style="color: ${readiness.color}">${readiness.totalReadiness}%</span>
                    <span class="readiness-level">${readiness.message}</span>
                </div>
            </div>

            <div class="readiness-breakdown">
                <h4>📚 Per ämne</h4>
                <div class="topic-readiness-list">
                    ${readiness.topicBreakdown.map(topic => `
                        <div class="topic-readiness-item">
                            <div class="topic-readiness-info">
                                <span class="topic-name">${topic.name}</span>
                                <span class="topic-progress">${topic.completed}/${topic.total}</span>
                            </div>
                            <div class="topic-readiness-bar">
                                <div class="topic-bar-fill" style="width: ${topic.percent}%; background: ${this.getColorForPercent(topic.percent)}"></div>
                            </div>
                            <span class="topic-percent">${topic.percent}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="readiness-tips">
                <h4>💡 Tips</h4>
                ${this.getReadinessTips(readiness)}
            </div>

            <button class="btn btn-primary" onclick="app.closeModal('formula-modal')">Stäng</button>
        `;

        modal.classList.add('active');
    },

    /**
     * Hämta färg baserat på procent
     */
    getColorForPercent(percent) {
        if (percent >= 80) return '#4CAF50';
        if (percent >= 60) return '#8BC34A';
        if (percent >= 40) return '#FFC107';
        if (percent >= 20) return '#FF9800';
        return '#F44336';
    },

    /**
     * Generera tips baserat på provberedskap
     */
    getReadinessTips(readiness) {
        const tips = [];

        // Hitta svagaste ämnen
        const weakTopics = readiness.topicBreakdown
            .filter(t => t.percent < 50)
            .sort((a, b) => a.percent - b.percent);

        if (weakTopics.length > 0) {
            tips.push(`<p>🎯 Fokusera på: <strong>${weakTopics.slice(0, 2).map(t => t.name).join(' och ')}</strong></p>`);
        }

        if (readiness.stats.accuracy < 70) {
            tips.push('<p>📝 Ta tid på dig och dubbelkolla svaren för bättre träffsäkerhet.</p>');
        }

        if (readiness.stats.completedCount < 10) {
            tips.push('<p>🚀 Fortsätt öva! Ju fler uppgifter du gör, desto mer förberedd blir du.</p>');
        }

        if (readiness.totalReadiness >= 80) {
            tips.push('<p>🌟 Bra jobbat! Du är på god väg att bemästra geometri!</p>');
        }

        if (tips.length === 0) {
            tips.push('<p>👍 Fortsätt öva jämnt över alla ämnen för bästa resultat!</p>');
        }

        return tips.join('');
    },

    /**
     * Rendera Dashboard (gammal version - behålls för referens)
     */
    renderDashboardOld() {
        const container = document.getElementById('dashboard-content');
        if (!container) return;

        const profile = Storage.getProfile();
        const levelInfo = Levels.getCurrentLevel();
        const progress = Levels.getProgress();

        // Statistik
        const stats = Points.getStats();

        container.innerHTML = `
            <div class="dashboard-header">
                <div class="welcome-section">
                    <h2>Välkommen tillbaka, ${profile.name || 'Matematiker'}!</h2>
                    <p>Fortsätt träna geometri och samla poäng!</p>
                </div>
                <div class="level-card">
                    <div class="level-icon">${levelInfo.icon}</div>
                    <div class="level-info">
                        <span class="level-name">${levelInfo.name}</span>
                        <span class="level-number">Nivå ${profile.level}</span>
                    </div>
                    <div class="xp-progress">
                        <div class="xp-bar">
                            <div class="xp-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="xp-text">${profile.xp} XP</span>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${profile.streak}</div>
                    <div class="stat-label">Dagar i rad</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${stats.completedExercises}</div>
                    <div class="stat-label">Uppgifter lösta</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${stats.perfectAnswers}</div>
                    <div class="stat-label">Perfekta svar</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${profile.achievements.length}</div>
                    <div class="stat-label">Achievements</div>
                </div>
            </div>

            <h3>Välj ämne att träna</h3>
            <div class="topics-grid">
                ${this.renderTopicCards()}
            </div>

            ${this.renderRecentAchievements()}
        `;

        // Lägg till händelsehanterare
        container.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.dataset.topic;
                this.navigate('topic', { topic });
            });
        });
    },

    /**
     * Rendera ämneskort
     */
    renderTopicCards() {
        const topics = Exercises.topics;
        const profile = Storage.getProfile();

        return Object.values(topics).map(topic => {
            const exercises = Exercises.getByTopic(topic.id);
            const completed = exercises.filter(e =>
                profile.completedExercises.includes(e.id)
            ).length;
            const total = exercises.length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            return `
                <div class="topic-card" data-topic="${topic.id}" style="--topic-color: ${topic.color}">
                    <div class="topic-icon">${topic.icon}</div>
                    <div class="topic-info">
                        <h4>${topic.id} ${topic.title}</h4>
                        <p>${topic.description}</p>
                    </div>
                    <div class="topic-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%; background: ${topic.color}"></div>
                        </div>
                        <span class="progress-text">${completed}/${total} uppgifter</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Rendera senaste achievements
     */
    renderRecentAchievements() {
        const profile = Storage.getProfile();
        const recent = profile.achievements.slice(-3).reverse();

        if (recent.length === 0) return '';

        const achievementHtml = recent.map(id => {
            const ach = Achievements.getById(id);
            if (!ach) return '';
            return `
                <div class="achievement-mini">
                    <span class="achievement-icon">${ach.icon}</span>
                    <span class="achievement-name">${ach.name}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="recent-achievements">
                <h3>Senaste Achievements</h3>
                <div class="achievements-list-mini">
                    ${achievementHtml}
                </div>
            </div>
        `;
    },

    /**
     * Rendera ämnen-lista
     */
    renderTopics() {
        const container = document.getElementById('topics-list');
        if (!container) return;

        container.innerHTML = this.renderTopicCards();

        container.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.dataset.topic;
                this.navigate('topic', { topic });
            });
        });
    },

    /**
     * Rendera ämnesdetaljer
     */
    renderTopicDetail(topicId) {
        const topic = Exercises.topics[topicId];
        if (!topic) return;

        const exercises = Exercises.getByTopic(topicId);
        const profile = Storage.getProfile();

        // Uppdatera rubrik
        const titleEl = document.getElementById('topic-title');
        if (titleEl) {
            titleEl.innerHTML = `${topic.icon} ${topic.id} ${topic.title}`;
        }

        // Uppdatera progress
        const completed = exercises.filter(e => profile.completedExercises.includes(e.id)).length;
        const total = exercises.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        const progressFill = document.getElementById('topic-progress-fill');
        if (progressFill) {
            progressFill.style.width = percentage + '%';
            progressFill.style.background = topic.color;
        }

        const progressText = document.getElementById('topic-progress-text');
        if (progressText) {
            progressText.textContent = `${completed} av ${total} uppgifter klara`;
        }

        // Rendera uppgifter för nivå 1 som standard
        this.filterExercisesByLevel(1);
    },

    /**
     * Rendera uppgifter för en nivå
     */
    renderExerciseLevel(levelName, exercises, profile, color) {
        if (exercises.length === 0) return '';

        const exerciseCards = exercises.map(ex => {
            const isCompleted = profile.completedExercises.includes(ex.id);
            return `
                <div class="exercise-card ${isCompleted ? 'completed' : ''}"
                     data-exercise="${ex.id}"
                     style="--topic-color: ${color}">
                    <div class="exercise-number">${ex.number}</div>
                    <div class="exercise-info">
                        <h4>${ex.title}</h4>
                        <span class="exercise-points">${ex.points} poäng</span>
                    </div>
                    <div class="exercise-status">
                        ${isCompleted ? '✅' : '▶️'}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="exercise-level">
                <h3>${levelName}</h3>
                <div class="exercises-grid">
                    ${exerciseCards}
                </div>
            </div>
        `;
    },

    /**
     * Rendera uppgift
     */
    renderExercise(exerciseId) {
        const exercise = Exercises.getById(exerciseId);
        if (!exercise) return;

        const topic = Exercises.topics[exercise.topic];

        // Återställ tillstånd
        this.exerciseStartTime = Date.now();
        this.hintStep = 0;
        this.usedHint = false;
        this.attempts = 0;
        this.currentExercise = exerciseId;

        // Uppdatera uppgiftsinformation
        const numberEl = document.getElementById('exercise-number');
        if (numberEl) {
            numberEl.textContent = `${topic.icon} Uppgift ${exercise.number}`;
        }

        const pointsEl = document.getElementById('exercise-points');
        if (pointsEl) {
            pointsEl.textContent = `⭐ ${exercise.points} poäng`;
        }

        const titleEl = document.getElementById('exercise-title');
        if (titleEl) {
            titleEl.textContent = exercise.title;
        }

        const descEl = document.getElementById('exercise-description');
        if (descEl) {
            descEl.textContent = exercise.description;
        }

        // Rendera inmatningsfält
        const inputFields = document.getElementById('input-fields');
        if (inputFields) {
            inputFields.innerHTML = this.renderInputFields(exercise.inputs);
        }

        // Rendera visualisering
        const vizContainer = document.getElementById('visualization');
        if (vizContainer && exercise.visualization) {
            vizContainer.innerHTML = ''; // Rensa tidigare
            const is3D = ['cuboid', 'cube', 'prism', 'triangular_prism', 'pyramid',
                'cylinder', 'cone', 'sphere', 'hemisphere'].includes(exercise.visualization.type);

            if (is3D) {
                Shapes3D.render(vizContainer, exercise.visualization);
            } else {
                Shapes2D.render(vizContainer, exercise.visualization);
            }
        }

        // Uppdatera tillbaka-knappen
        const backBtn = document.getElementById('exercise-back-btn');
        if (backBtn) {
            backBtn.onclick = () => this.navigate('topic', { topic: exercise.topic });
        }
    },

    /**
     * Rendera inmatningsfält
     */
    renderInputFields(inputs) {
        return inputs.map(input => `
            <div class="input-group">
                <label for="input-${input.id}">${input.label}</label>
                <div class="input-with-unit">
                    <input type="${input.type || 'number'}"
                           id="input-${input.id}"
                           name="${input.id}"
                           step="any"
                           required>
                    ${input.unit ? `<span class="input-unit">${input.unit}</span>` : ''}
                </div>
            </div>
        `).join('');
    },

    /**
     * Visa ledtråd
     */
    showHint(exercise) {
        if (!exercise.hints || exercise.hints.length === 0) return;

        this.usedHint = true;

        const hintArea = document.getElementById('hint-area');
        if (!hintArea) return;

        if (this.hintStep < exercise.hints.length) {
            const hint = exercise.hints[this.hintStep];
            hintArea.innerHTML += `
                <div class="hint-item">
                    <span class="hint-step">Steg ${hint.step}:</span>
                    <span class="hint-text">${hint.text}</span>
                </div>
            `;
            this.hintStep++;
        }

        hintArea.style.display = 'block';

        // Uppdatera knappen
        const hintBtn = document.getElementById('hint-btn');
        if (this.hintStep >= exercise.hints.length) {
            hintBtn.disabled = true;
            hintBtn.textContent = '💡 Inga fler ledtrådar';
        } else {
            hintBtn.textContent = `💡 Nästa ledtråd (${this.hintStep}/${exercise.hints.length})`;
        }
    },

    /**
     * Kontrollera svar med given uppgift
     */
    checkAnswerWithExercise(exercise) {
        this.attempts++;
        let allCorrect = true;

        // Kontrollera varje svar genom att läsa input-fälten direkt
        for (const inputDef of exercise.inputs) {
            const key = inputDef.id;
            const expected = exercise.answers[key];
            const tolerance = exercise.tolerance || 0.1;

            const input = document.getElementById(`input-${key}`);
            if (!input) continue;

            const value = input.value;
            const userValue = parseFloat(value.replace(',', '.'));
            const isCorrect = MathUtils.isEqual(userValue, expected, tolerance);

            if (isCorrect) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                allCorrect = false;
            }
        }

        if (allCorrect) {
            this.handleCorrectAnswer(exercise);
        } else {
            this.handleIncorrectAnswer();
        }
    },

    /**
     * Hantera rätt svar
     */
    handleCorrectAnswer(exercise) {
        const timeSeconds = (Date.now() - this.exerciseStartTime) / 1000;

        // Beräkna och tilldela poäng
        const result = Points.award(exercise.id, exercise.points, {
            attempts: this.attempts,
            usedHint: this.usedHint,
            timeSeconds: timeSeconds,
            streak: Storage.getProfile().streak
        });

        // Uppdatera header
        this.updateHeader();

        // Visa resultat
        this.showResultModal(true, result, exercise);
    },

    /**
     * Hantera fel svar
     */
    handleIncorrectAnswer() {
        // Skaka formuläret
        const form = document.getElementById('answer-form');
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);

        // Visa feedback
        const feedbackMessages = [
            'Inte riktigt... Försök igen!',
            'Nästan! Kontrollera dina beräkningar.',
            'Fel svar. Kolla formeln igen.',
            'Fortsätt försöka! Du klarar det!'
        ];
        const message = feedbackMessages[Math.min(this.attempts - 1, feedbackMessages.length - 1)];

        // Visa tillfälligt meddelande
        this.showToast(message, 'error');
    },

    /**
     * Visa resultatmodal
     */
    showResultModal(correct, result, exercise) {
        const modal = document.getElementById('result-modal');
        if (!modal) return;

        const content = modal.querySelector('.modal-body') || modal;

        if (correct) {
            content.innerHTML = `
                <div class="result-success">
                    <div class="result-icon">🎉</div>
                    <h3>Rätt svar!</h3>

                    <div class="points-awarded">
                        <span class="points-label">Du fick:</span>
                        <span class="points-value">+${result.points} poäng</span>
                    </div>

                    <div class="result-details">
                        ${result.leveledUp ? `
                            <div class="level-up">
                                🎊 Grattis! Du nådde nivå ${result.newLevel}!
                            </div>
                        ` : ''}

                        ${result.newAchievements.length > 0 ? `
                            <div class="new-achievements">
                                <h4>Nya achievements!</h4>
                                ${result.newAchievements.map(a => `
                                    <div class="achievement-unlocked">
                                        ${a.icon} ${a.name}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <div class="result-actions">
                        <button class="btn btn-secondary" id="result-back-btn">
                            Tillbaka till ämnet
                        </button>
                        <button class="btn btn-primary" id="result-next-btn">
                            Nästa uppgift →
                        </button>
                    </div>
                </div>
            `;

            // Händelsehanterare
            modal.querySelector('#result-back-btn').addEventListener('click', () => {
                this.closeAllModals();
                this.navigate('topic', { topic: exercise.topic });
            });

            modal.querySelector('#result-next-btn').addEventListener('click', () => {
                this.closeAllModals();
                const nextExercise = Exercises.getNext(exercise.id);
                if (nextExercise) {
                    this.navigate('exercise', { exercise: nextExercise.id });
                } else {
                    this.navigate('topic', { topic: exercise.topic });
                }
            });
        }

        modal.classList.add('active');

        // Visa level up popup om relevant
        if (result.leveledUp) {
            setTimeout(() => this.showLevelUpPopup(result.newLevel), 500);
        }
    },

    /**
     * Visa level up popup
     */
    showLevelUpPopup(newLevel) {
        const levelInfo = Levels.getLevelUpMessage(newLevel);
        const popup = document.getElementById('level-up-popup');

        if (popup) {
            popup.innerHTML = `
                <div class="level-up-content">
                    <div class="level-up-icon">${levelInfo.icon}</div>
                    <h2>${levelInfo.title}</h2>
                    <p>${levelInfo.message}</p>
                    <span class="level-name">${levelInfo.name}</span>
                </div>
            `;
            popup.classList.add('active');

            setTimeout(() => {
                popup.classList.remove('active');
            }, 3000);
        }
    },

    /**
     * Visa formelmodal
     */
    showFormulaModal(topicId) {
        const modal = document.getElementById('formula-modal');
        if (!modal) return;

        const formulas = Formulas.getForTopic(topicId);
        const content = modal.querySelector('.modal-body') || modal;

        content.innerHTML = `
            <h3>📐 Formler för ${Exercises.topics[topicId]?.title || 'Geometri'}</h3>
            <div class="formulas-list">
                ${formulas.map(shape => `
                    <div class="formula-card">
                        <div class="formula-header">
                            <span class="formula-icon">${shape.icon}</span>
                            <span class="formula-name">${shape.name}</span>
                        </div>
                        <div class="formula-content">
                            ${shape.formulas ? shape.formulas.map(f => `
                                <div class="formula-item">
                                    <span class="formula-label">${f.name}:</span>
                                    <span class="formula-equation">${f.formula}</span>
                                </div>
                            `).join('') : ''}
                            ${shape.conversions ? shape.conversions.map(c => `
                                <div class="conversion-item">${c}</div>
                            `).join('') : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.add('active');
    },

    /**
     * Rendera achievements-sida
     */
    renderAchievements() {
        const container = document.getElementById('achievements-content');
        if (!container) return;

        const profile = Storage.getProfile();
        const grouped = Achievements.getGroupedByCategory();
        const progress = Achievements.getProgress(profile.achievements);

        container.innerHTML = `
            <div class="achievements-header">
                <h2>🏆 Achievements</h2>
                <div class="achievements-progress">
                    <span>${progress.unlocked} / ${progress.total}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                </div>
            </div>

            ${Object.entries(grouped).map(([category, achievements]) => `
                <div class="achievement-category">
                    <h3>${Achievements.categoryNames[category] || category}</h3>
                    <div class="achievements-grid">
                        ${achievements.map(ach => {
            const unlocked = profile.achievements.includes(ach.id);
            return `
                                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                                    <div class="achievement-icon">${ach.icon}</div>
                                    <div class="achievement-info">
                                        <h4>${ach.name}</h4>
                                        <p>${ach.description}</p>
                                        <span class="achievement-points">+${ach.points} poäng</span>
                                    </div>
                                    ${unlocked ? '<div class="achievement-check">✓</div>' : ''}
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    },

    /**
     * Rendera formelsida
     */
    renderFormulas() {
        const container = document.getElementById('formulas-content');
        if (!container) return;

        const formulas2D = Formulas.getAll2D();
        const formulas3D = Formulas.getAll3D();
        const units = Formulas.getAllUnits();

        container.innerHTML = `
            <h2>📐 Formelblad</h2>

            <div class="formula-section">
                <h3>2D Figurer</h3>
                <div class="formulas-grid">
                    ${formulas2D.map(shape => `
                        <div class="formula-card">
                            <div class="formula-header">
                                <span class="formula-icon">${shape.icon}</span>
                                <span class="formula-name">${shape.name}</span>
                            </div>
                            <div class="formula-content">
                                ${shape.formulas.map(f => `
                                    <div class="formula-item">
                                        <span class="formula-label">${f.name}:</span>
                                        <span class="formula-equation">${f.formula}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="formula-section">
                <h3>3D Kroppar</h3>
                <div class="formulas-grid">
                    ${formulas3D.map(shape => `
                        <div class="formula-card">
                            <div class="formula-header">
                                <span class="formula-icon">${shape.icon}</span>
                                <span class="formula-name">${shape.name}</span>
                            </div>
                            <div class="formula-content">
                                ${shape.formulas.map(f => `
                                    <div class="formula-item">
                                        <span class="formula-label">${f.name}:</span>
                                        <span class="formula-equation">${f.formula}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="formula-section">
                <h3>Enhetsomvandlingar</h3>
                <div class="formulas-grid">
                    ${units.map(unit => `
                        <div class="formula-card">
                            <div class="formula-header">
                                <span class="formula-icon">${unit.icon}</span>
                                <span class="formula-name">${unit.name}</span>
                            </div>
                            <div class="formula-content">
                                ${unit.conversions.map(c => `
                                    <div class="conversion-item">${c}</div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Rendera inställningar
     */
    renderSettings() {
        const container = document.getElementById('settings-content');
        if (!container) return;

        const profile = Storage.getProfile();

        container.innerHTML = `
            <h2>⚙️ Inställningar</h2>

            <div class="settings-section">
                <h3>Profil</h3>
                <div class="setting-item">
                    <label>Namn:</label>
                    <input type="text" id="setting-name" value="${profile.name || ''}">
                </div>
            </div>

            <div class="settings-section">
                <h3>Utseende</h3>
                <div class="setting-item">
                    <label>Mörkt läge:</label>
                    <input type="checkbox" id="setting-darkmode" ${profile.settings?.darkMode ? 'checked' : ''}>
                </div>
            </div>

            <div class="settings-section">
                <h3>Ljud</h3>
                <div class="setting-item">
                    <label>Ljudeffekter:</label>
                    <input type="checkbox" id="setting-sound" ${profile.settings?.soundEnabled !== false ? 'checked' : ''}>
                </div>
            </div>

            <div class="settings-section">
                <h3>Data</h3>
                <div class="settings-buttons">
                    <button class="btn btn-secondary" id="export-btn">📤 Exportera data</button>
                    <button class="btn btn-secondary" id="import-btn">📥 Importera data</button>
                    <button class="btn btn-danger" id="reset-btn">🗑️ Återställ all data</button>
                </div>
            </div>
        `;

        // Händelsehanterare
        container.querySelector('#setting-name').addEventListener('change', (e) => {
            profile.name = e.target.value;
            Storage.saveProfile(profile);
            this.updateHeader();
        });

        container.querySelector('#setting-darkmode').addEventListener('change', (e) => {
            profile.settings.darkMode = e.target.checked;
            Storage.saveProfile(profile);
            document.body.classList.toggle('dark-theme', e.target.checked);
        });

        container.querySelector('#setting-sound').addEventListener('change', (e) => {
            profile.settings.soundEnabled = e.target.checked;
            Storage.saveProfile(profile);
        });

        container.querySelector('#export-btn').addEventListener('click', () => {
            const data = Storage.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'geometri-spel-data.json';
            a.click();
        });

        container.querySelector('#reset-btn').addEventListener('click', () => {
            if (confirm('Är du säker? All din progress kommer att raderas!')) {
                Storage.clear();
                location.reload();
            }
        });
    },

    /**
     * Starta användarsession (från welcome modal)
     */
    startJourney() {
        const nameInput = document.getElementById('welcome-name-input');
        const name = nameInput?.value.trim() || 'Elev';

        // Skapa ny profil med vald avatar
        Storage.createProfile(name, this.selectedAvatar);

        this.closeModal('welcome-modal');
        this.updateHeader();
        this.navigate('dashboard');

        // Uppdatera välkomsttext
        const welcomeName = document.getElementById('welcome-name');
        if (welcomeName) {
            welcomeName.textContent = name;
        }

        this.showToast(`Välkommen, ${name}! 🎉`, 'success');
    },

    /**
     * Öppna modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },

    /**
     * Stäng specifik modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    },

    /**
     * Stäng alla modaler
     */
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    },

    /**
     * Visa ledtråd (anropas från HTML utan parameter)
     */
    showHint() {
        if (!this.currentExercise) return;
        const exercise = Exercises.getById(this.currentExercise);
        if (!exercise || !exercise.hints || exercise.hints.length === 0) return;

        this.usedHint = true;

        // Visa hint modal
        const modal = document.getElementById('hint-modal');
        const content = document.getElementById('hint-content');

        if (!modal || !content) return;

        const hint = exercise.hints[this.hintStep];
        if (hint) {
            content.innerHTML = `
                <div class="hint-step">
                    <h4>Steg ${hint.step}</h4>
                    <p>${hint.text}</p>
                </div>
            `;
        }

        // Uppdatera stegräknare
        const stepText = document.getElementById('hint-step');
        if (stepText) {
            stepText.textContent = `Steg ${this.hintStep + 1} av ${exercise.hints.length}`;
        }

        // Uppdatera knappar
        const prevBtn = document.getElementById('hint-prev');
        const nextBtn = document.getElementById('hint-next');

        if (prevBtn) prevBtn.disabled = this.hintStep === 0;
        if (nextBtn) {
            if (this.hintStep >= exercise.hints.length - 1) {
                nextBtn.textContent = 'Stäng';
            } else {
                nextBtn.textContent = 'Nästa →';
            }
        }

        modal.classList.add('active');
    },

    /**
     * Visa föregående ledtråd
     */
    prevHint() {
        if (this.hintStep > 0) {
            this.hintStep--;
            this.showHint();
        }
    },

    /**
     * Visa nästa ledtråd
     */
    nextHint() {
        if (!this.currentExercise) return;
        const exercise = Exercises.getById(this.currentExercise);

        if (this.hintStep < exercise.hints.length - 1) {
            this.hintStep++;
            this.showHint();
        } else {
            this.closeModal('hint-modal');
        }
    },

    /**
     * Visa formler (anropas från HTML utan parameter)
     */
    showFormulas() {
        if (!this.currentExercise) {
            this.navigate('formulas');
            return;
        }
        const exercise = Exercises.getById(this.currentExercise);
        if (exercise) {
            this.showFormulaModal(exercise.topic);
        }
    },

    /**
     * Kontrollera svar (anropas från HTML utan parameter)
     */
    checkAnswer() {
        if (!this.currentExercise) return;
        const exercise = Exercises.getById(this.currentExercise);
        if (exercise) {
            this.checkAnswerWithExercise(exercise);
        }
    },

    /**
     * Stäng level up popup
     */
    closeLevelUp() {
        const popup = document.getElementById('levelup-popup');
        if (popup) {
            popup.classList.remove('active');
        }
    },

    /**
     * Återställ all progress
     */
    resetProgress() {
        if (confirm('Är du säker? All din progress kommer att raderas permanent!')) {
            Storage.clear();
            location.reload();
        }
    },

    /**
     * Visa toast-meddelande
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Starta applikationen när DOM är redo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Starta applikationen när DOM är redo
// (flyttad hit för säkerhet)

// Exportera globalt för onclick-handlers i HTML
window.app = App;

export default App;
