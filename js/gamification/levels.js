/**
 * Levels System - Nivåhantering
 */

import Storage from '../utils/storage.js';

const Levels = {
    // Nivådefinitioner
    definitions: [
        { level: 1, name: 'Nybörjare', xpRequired: 0, icon: '🌱' },
        { level: 2, name: 'Lärling', xpRequired: 100, icon: '📚' },
        { level: 3, name: 'Praktikant', xpRequired: 250, icon: '✏️' },
        { level: 4, name: 'Studerande', xpRequired: 450, icon: '📐' },
        { level: 5, name: 'Kunnig', xpRequired: 700, icon: '🎓' },
        { level: 6, name: 'Erfaren', xpRequired: 1000, icon: '⭐' },
        { level: 7, name: 'Expert', xpRequired: 1400, icon: '🌟' },
        { level: 8, name: 'Specialist', xpRequired: 1900, icon: '💫' },
        { level: 9, name: 'Mästare', xpRequired: 2500, icon: '🏆' },
        { level: 10, name: 'Geometri-Geni', xpRequired: 3200, icon: '👑' }
    ],

    /**
     * Hämta nivåinfo för en given nivå
     */
    getInfo(level) {
        const def = this.definitions.find(d => d.level === level);
        return def || this.definitions[0];
    },

    /**
     * Hämta aktuell användarens nivåinfo
     */
    getCurrentLevel() {
        const profile = Storage.getProfile();
        return this.getInfo(profile.level);
    },

    /**
     * Hämta nästa nivås info
     */
    getNextLevel() {
        const profile = Storage.getProfile();
        if (profile.level >= 10) return null;
        return this.getInfo(profile.level + 1);
    },

    /**
     * Beräkna XP som behövs för nästa nivå
     */
    getXPForNextLevel(currentLevel) {
        const nextDef = this.definitions.find(d => d.level === currentLevel + 1);
        const currentDef = this.definitions.find(d => d.level === currentLevel);

        if (!nextDef) return 0; // Max nivå

        return nextDef.xpRequired - currentDef.xpRequired;
    },

    /**
     * Beräkna progress mot nästa nivå (0-100%)
     */
    getProgress() {
        const profile = Storage.getProfile();
        const currentDef = this.getInfo(profile.level);
        const nextDef = this.getNextLevel();

        if (!nextDef) return 100; // Max nivå

        const xpInCurrentLevel = profile.xp;
        const xpNeeded = nextDef.xpRequired - currentDef.xpRequired;

        return Math.min(Math.round((xpInCurrentLevel / xpNeeded) * 100), 100);
    },

    /**
     * Hämta alla nivåer med status
     */
    getAllWithStatus() {
        const profile = Storage.getProfile();
        const totalXP = profile.totalPoints;

        return this.definitions.map(def => ({
            ...def,
            unlocked: profile.level >= def.level,
            current: profile.level === def.level
        }));
    },

    /**
     * Hämta level up-meddelande
     */
    getLevelUpMessage(newLevel) {
        const levelInfo = this.getInfo(newLevel);
        const messages = [
            `Grattis! Du är nu ${levelInfo.name}!`,
            `Fantastiskt! Nivå ${newLevel} uppnådd!`,
            `Bra jobbat! Du har blivit ${levelInfo.name}!`,
            `Wow! Du når nya höjder som ${levelInfo.name}!`
        ];
        return {
            title: `Nivå ${newLevel}!`,
            message: messages[Math.floor(Math.random() * messages.length)],
            icon: levelInfo.icon,
            name: levelInfo.name
        };
    },

    /**
     * Hämta färg för en nivå
     */
    getLevelColor(level) {
        const colors = {
            1: '#9E9E9E',  // Grå
            2: '#8BC34A',  // Ljusgrön
            3: '#4CAF50',  // Grön
            4: '#03A9F4',  // Ljusblå
            5: '#2196F3',  // Blå
            6: '#9C27B0',  // Lila
            7: '#E91E63',  // Rosa
            8: '#FF5722',  // Djup orange
            9: '#FF9800',  // Orange
            10: '#FFC107' // Guld
        };
        return colors[level] || colors[1];
    },

    /**
     * Rendrera XP-bar HTML
     */
    renderXPBar() {
        const profile = Storage.getProfile();
        const progress = this.getProgress();
        const currentLevel = this.getCurrentLevel();
        const nextLevel = this.getNextLevel();

        const xpText = nextLevel
            ? `${profile.xp} / ${this.getXPForNextLevel(profile.level)} XP`
            : 'MAX NIVÅ!';

        return `
            <div class="xp-bar-container">
                <div class="xp-bar-info">
                    <span class="level-badge" style="background: ${this.getLevelColor(profile.level)}">
                        ${currentLevel.icon} Nivå ${profile.level}
                    </span>
                    <span class="xp-text">${xpText}</span>
                </div>
                <div class="xp-bar">
                    <div class="xp-bar-fill" style="width: ${progress}%; background: ${this.getLevelColor(profile.level)}"></div>
                </div>
                ${nextLevel ? `<div class="next-level">Nästa: ${nextLevel.icon} ${nextLevel.name}</div>` : ''}
            </div>
        `;
    }
};

export default Levels;
