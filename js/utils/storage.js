/**
 * Storage - LocalStorage wrapper för persistent data
 * Stöd för flera användarprofiler
 */

const Storage = {
    PREFIX: 'geometri_',
    currentProfileId: null,

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
     * Hämta profilspecifik data
     */
    getForProfile(key, defaultValue = null) {
        const profileId = this.getCurrentProfileId();
        return this.get(`profile_${profileId}_${key}`, defaultValue);
    },

    /**
     * Spara profilspecifik data
     */
    setForProfile(key, value) {
        const profileId = this.getCurrentProfileId();
        return this.set(`profile_${profileId}_${key}`, value);
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
     * Rensa all app-data för aktuell profil
     */
    clear() {
        try {
            const profileId = this.getCurrentProfileId();
            const keys = Object.keys(localStorage).filter(k =>
                k.startsWith(this.PREFIX + `profile_${profileId}_`)
            );
            keys.forEach(k => localStorage.removeItem(k));
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },

    // ==========================================
    // PROFILHANTERING - Stöd för flera användare
    // ==========================================

    /**
     * Hämta alla profiler
     */
    getAllProfiles() {
        return this.get('profiles', []);
    },

    /**
     * Hämta aktuell profil-ID
     */
    getCurrentProfileId() {
        if (this.currentProfileId) {
            return this.currentProfileId;
        }
        const id = this.get('currentProfileId', null);
        this.currentProfileId = id;
        return id;
    },

    /**
     * Sätt aktuell profil
     */
    setCurrentProfile(profileId) {
        this.currentProfileId = profileId;
        this.set('currentProfileId', profileId);
    },

    /**
     * Skapa ny profil
     */
    createProfile(name, avatar = '👤') {
        const profiles = this.getAllProfiles();
        const newProfile = {
            id: 'profile_' + Date.now(),
            name: name,
            avatar: avatar,
            createdAt: new Date().toISOString()
        };
        profiles.push(newProfile);
        this.set('profiles', profiles);

        // Initiera profildata
        this.setCurrentProfile(newProfile.id);
        this.saveProfile(this.getDefaultProfileData(name, avatar));

        return newProfile;
    },

    /**
     * Ta bort en profil
     */
    deleteProfile(profileId) {
        let profiles = this.getAllProfiles();
        profiles = profiles.filter(p => p.id !== profileId);
        this.set('profiles', profiles);

        // Rensa profildata
        const keys = Object.keys(localStorage).filter(k =>
            k.includes(`profile_${profileId}_`)
        );
        keys.forEach(k => localStorage.removeItem(k));

        // Om det var aktuell profil, byt till första tillgängliga
        if (this.getCurrentProfileId() === profileId) {
            if (profiles.length > 0) {
                this.setCurrentProfile(profiles[0].id);
            } else {
                this.setCurrentProfile(null);
            }
        }

        return true;
    },

    /**
     * Hämta profilinfo (namn, avatar) för en profil
     */
    getProfileInfo(profileId) {
        const profiles = this.getAllProfiles();
        return profiles.find(p => p.id === profileId) || null;
    },

    /**
     * Standard profildata
     */
    getDefaultProfileData(name = '', avatar = '👤') {
        return {
            name: name,
            avatar: avatar,
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
    },

    /**
     * Hämta eller skapa användarprofil (profilspecifik)
     */
    getProfile() {
        const profileId = this.getCurrentProfileId();
        if (!profileId) {
            return this.getDefaultProfileData();
        }
        return this.getForProfile('data', this.getDefaultProfileData());
    },

    /**
     * Spara användarprofil (profilspecifik)
     */
    saveProfile(profile) {
        return this.setForProfile('data', profile);
    },

    /**
     * Hämta progress för ett ämne (profilspecifik)
     */
    getTopicProgress(topicId) {
        const progress = this.getForProfile('topicProgress', {});
        return progress[topicId] || { completed: 0, total: 0, exercises: {} };
    },

    /**
     * Spara progress för ett ämne (profilspecifik)
     */
    saveTopicProgress(topicId, data) {
        const progress = this.getForProfile('topicProgress', {});
        progress[topicId] = data;
        return this.setForProfile('topicProgress', progress);
    },

    /**
     * Markera en uppgift som slutförd (profilspecifik)
     */
    markExerciseComplete(exerciseId, points, attempts, usedHint) {
        const profile = this.getProfile();

        if (!profile.completedExercises.includes(exerciseId)) {
            profile.completedExercises.push(exerciseId);
        }

        // Spara detaljer om uppgiften (profilspecifik)
        const exerciseData = this.getForProfile('exerciseDetails', {});
        exerciseData[exerciseId] = {
            completedAt: new Date().toISOString(),
            points,
            attempts,
            usedHint,
            firstTrySuccess: attempts === 1
        };
        this.setForProfile('exerciseDetails', exerciseData);

        this.saveProfile(profile);
        return true;
    },

    /**
     * Hämta detaljerad uppgiftsdata (profilspecifik)
     */
    getExerciseDetails() {
        return this.getForProfile('exerciseDetails', {});
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
    },

    // ==========================================
    // PROVBEREDSKAP - Hur redo är eleven för prov?
    // ==========================================

    /**
     * Beräkna provberedskap för hela kapitlet
     * Returnerar objekt med total score och per-ämne breakdown
     */
    calculateTestReadiness(totalExercises) {
        const profile = this.getProfile();
        const exerciseDetails = this.getExerciseDetails();

        // Antal klarade uppgifter
        const completedCount = profile.completedExercises.length;

        // Beräkna accuracy (rätt på första försöket)
        let firstTryCount = 0;
        let totalAttempts = 0;

        Object.values(exerciseDetails).forEach(detail => {
            if (detail.firstTrySuccess || detail.attempts === 1) {
                firstTryCount++;
            }
            totalAttempts++;
        });

        const accuracy = totalAttempts > 0 ? (firstTryCount / totalAttempts) : 0;

        // Beräkna täckning (hur väl spritt över ämnen)
        const topicCoverage = this.calculateTopicCoverage(profile.completedExercises);

        // Total beredskap (viktad beräkning)
        // 50% baserat på antal klarade
        // 30% baserat på accuracy
        // 20% baserat på spridning över ämnen
        const completionScore = totalExercises > 0 ? (completedCount / totalExercises) : 0;
        const coverageScore = topicCoverage.coverageScore;

        const totalReadiness = Math.round(
            (completionScore * 0.50 + accuracy * 0.30 + coverageScore * 0.20) * 100
        );

        // Bestäm nivå och meddelande
        let level, message, color;
        if (totalReadiness >= 90) {
            level = 'excellent';
            message = 'Utmärkt! Du är mycket väl förberedd för provet!';
            color = '#4CAF50';
        } else if (totalReadiness >= 70) {
            level = 'good';
            message = 'Bra! Du har god kunskap, fortsätt öva på svagare områden.';
            color = '#8BC34A';
        } else if (totalReadiness >= 50) {
            level = 'moderate';
            message = 'På god väg! Fokusera på de ämnen du inte övat så mycket på.';
            color = '#FFC107';
        } else if (totalReadiness >= 25) {
            level = 'developing';
            message = 'Du har börjat bra! Fortsätt öva för att bli mer förberedd.';
            color = '#FF9800';
        } else {
            level = 'beginning';
            message = 'Börja med att göra fler uppgifter för att bygga upp kunskap.';
            color = '#F44336';
        }

        return {
            totalReadiness,
            level,
            message,
            color,
            stats: {
                completedCount,
                totalExercises,
                completionPercent: Math.round(completionScore * 100),
                accuracy: Math.round(accuracy * 100),
                firstTryCount,
                totalAttempts
            },
            topicBreakdown: topicCoverage.breakdown
        };
    },

    /**
     * Beräkna täckning per ämne
     */
    calculateTopicCoverage(completedExercises) {
        const topics = {
            '3.1': { name: 'Omkrets och Area', completed: 0, total: 10 },
            '3.2': { name: 'Cirkelns Area', completed: 0, total: 7 },
            '3.3': { name: 'Volym och Begränsningsarea', completed: 0, total: 4 },
            '3.4': { name: 'Enheter för Volym', completed: 0, total: 4 },
            '3.5': { name: 'Prisma och Pyramid', completed: 0, total: 4 },
            '3.6': { name: 'Cylinder, Kon och Klot', completed: 0, total: 6 }
        };

        // Räkna klarade per ämne
        completedExercises.forEach(exId => {
            const topicId = exId.split('.').slice(0, 2).join('.');
            if (topics[topicId]) {
                topics[topicId].completed++;
            }
        });

        // Beräkna coverage score (hur jämnt fördelat)
        let totalCoverage = 0;
        const breakdown = [];

        Object.entries(topics).forEach(([id, topic]) => {
            const percent = topic.total > 0 ? (topic.completed / topic.total) : 0;
            totalCoverage += percent;
            breakdown.push({
                id,
                name: topic.name,
                completed: topic.completed,
                total: topic.total,
                percent: Math.round(percent * 100)
            });
        });

        const coverageScore = totalCoverage / Object.keys(topics).length;

        return { coverageScore, breakdown };
    }
};

export default Storage;
