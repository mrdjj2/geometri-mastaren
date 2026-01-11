/**
 * Storage - LocalStorage wrapper för persistent data
 */

const Storage = {
    PREFIX: 'geometri_',

    /**
     * Hämta data från localStorage
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.PREFIX + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    /**
     * Spara data till localStorage
     */
    set(key, value) {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    /**
     * Ta bort data från localStorage
     */
    remove(key) {
        try {
            localStorage.removeItem(this.PREFIX + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    /**
     * Rensa all app-data
     */
    clear() {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith(this.PREFIX));
            keys.forEach(k => localStorage.removeItem(k));
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },

    /**
     * Hämta eller skapa användarprofil
     */
    getProfile() {
        const defaultProfile = {
            name: '',
            level: 1,
            xp: 0,
            totalPoints: 0,
            streak: 0,
            lastActivityDate: null,
            completedExercises: [],
            achievements: [],
            settings: {
                soundEnabled: true,
                darkMode: false,
                showHints: true
            },
            createdAt: new Date().toISOString()
        };

        return this.get('profile', defaultProfile);
    },

    /**
     * Spara användarprofil
     */
    saveProfile(profile) {
        return this.set('profile', profile);
    },

    /**
     * Hämta progress för ett ämne
     */
    getTopicProgress(topicId) {
        const progress = this.get('topicProgress', {});
        return progress[topicId] || { completed: 0, total: 0, exercises: {} };
    },

    /**
     * Spara progress för ett ämne
     */
    saveTopicProgress(topicId, data) {
        const progress = this.get('topicProgress', {});
        progress[topicId] = data;
        return this.set('topicProgress', progress);
    },

    /**
     * Markera en uppgift som slutförd
     */
    markExerciseComplete(exerciseId, points, attempts, usedHint) {
        const profile = this.getProfile();

        if (!profile.completedExercises.includes(exerciseId)) {
            profile.completedExercises.push(exerciseId);
        }

        // Spara detaljer om uppgiften
        const exerciseData = this.get('exerciseDetails', {});
        exerciseData[exerciseId] = {
            completedAt: new Date().toISOString(),
            points,
            attempts,
            usedHint
        };
        this.set('exerciseDetails', exerciseData);

        this.saveProfile(profile);
        return true;
    },

    /**
     * Kontrollera om en uppgift är slutförd
     */
    isExerciseComplete(exerciseId) {
        const profile = this.getProfile();
        return profile.completedExercises.includes(exerciseId);
    },

    /**
     * Uppdatera streak
     */
    updateStreak() {
        const profile = this.getProfile();
        const today = new Date().toDateString();
        const lastActivity = profile.lastActivityDate ? new Date(profile.lastActivityDate).toDateString() : null;

        if (lastActivity === today) {
            // Redan aktiv idag
            return profile.streak;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActivity === yesterday.toDateString()) {
            // Fortsatt streak
            profile.streak += 1;
        } else if (lastActivity !== today) {
            // Bruten streak
            profile.streak = 1;
        }

        profile.lastActivityDate = new Date().toISOString();
        this.saveProfile(profile);

        return profile.streak;
    },

    /**
     * Lägg till XP och hantera level up
     */
    addXP(amount) {
        const profile = this.getProfile();
        profile.xp += amount;
        profile.totalPoints += amount;

        // Kontrollera level up
        let leveledUp = false;
        let xpForNextLevel = this.getXPForLevel(profile.level + 1);

        while (profile.xp >= xpForNextLevel && profile.level < 10) {
            profile.xp -= xpForNextLevel;
            profile.level += 1;
            leveledUp = true;
            // Recalculate XP needed for the NEW next level
            xpForNextLevel = this.getXPForLevel(profile.level + 1);
        }

        this.saveProfile(profile);

        return {
            newXP: profile.xp,
            newLevel: profile.level,
            totalPoints: profile.totalPoints,
            leveledUp
        };
    },

    /**
     * Beräkna XP som krävs för en viss nivå
     */
    getXPForLevel(level) {
        // Progressiv XP-kurva
        return Math.floor(100 * Math.pow(1.5, level - 1));
    },

    /**
     * Lägg till achievement
     */
    addAchievement(achievementId) {
        const profile = this.getProfile();

        if (!profile.achievements.includes(achievementId)) {
            profile.achievements.push(achievementId);
            this.saveProfile(profile);
            return true;
        }

        return false;
    },

    /**
     * Kontrollera om achievement är upplåst
     */
    hasAchievement(achievementId) {
        const profile = this.getProfile();
        return profile.achievements.includes(achievementId);
    },

    /**
     * Exportera all data (för backup)
     */
    exportData() {
        const data = {};
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.PREFIX));

        keys.forEach(k => {
            const cleanKey = k.replace(this.PREFIX, '');
            data[cleanKey] = this.get(cleanKey);
        });

        return JSON.stringify(data, null, 2);
    },

    /**
     * Importera data (från backup)
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            Object.keys(data).forEach(key => {
                this.set(key, data[key]);
            });
            return true;
        } catch (e) {
            console.error('Import error:', e);
            return false;
        }
    }
};

export default Storage;
