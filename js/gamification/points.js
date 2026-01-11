/**
 * Points System - Poäng och XP-hantering
 */

import Storage from '../utils/storage.js';
import Achievements from '../data/achievements.js';

const Points = {
    // Poängkonstanter
    BASE_POINTS: 10,
    FIRST_ATTEMPT_BONUS: 5,
    NO_HINT_BONUS: 5,
    SPEED_BONUS: 3,         // Under 60 sekunder
    STREAK_MULTIPLIER: 0.1, // +10% per streak-dag (max 100%)

    /**
     * Beräkna poäng för en löst uppgift
     */
    calculate(exercisePoints, options = {}) {
        const {
            attempts = 1,
            usedHint = false,
            timeSeconds = null,
            streak = 0
        } = options;

        let points = exercisePoints || this.BASE_POINTS;

        // Bonus för första försöket
        if (attempts === 1) {
            points += this.FIRST_ATTEMPT_BONUS;
        }

        // Bonus för ingen ledtråd
        if (!usedHint) {
            points += this.NO_HINT_BONUS;
        }

        // Snabbhetsbonus (under 60 sekunder)
        if (timeSeconds !== null && timeSeconds < 60) {
            points += this.SPEED_BONUS;
        }

        // Streak-multiplikator (max 100% bonus)
        const streakBonus = Math.min(streak * this.STREAK_MULTIPLIER, 1.0);
        points = Math.round(points * (1 + streakBonus));

        return points;
    },

    /**
     * Lägg till poäng till användarens profil
     */
    award(exerciseId, exercisePoints, options = {}) {
        const points = this.calculate(exercisePoints, options);
        const profile = Storage.getProfile();
        const streak = Storage.updateStreak();

        // Spara uppgiftens resultat
        Storage.markExerciseComplete(exerciseId, points, options.attempts || 1, options.usedHint || false);

        // Lägg till XP och kolla level up
        const result = Storage.addXP(points);

        // Uppdatera statistik för achievements
        const stats = this.getStats();

        // Kontrollera nya achievements
        const unlockedAchievements = Achievements.checkNewAchievements(
            stats,
            profile.achievements
        );

        // Spara nya achievements
        unlockedAchievements.forEach(achievement => {
            Storage.addAchievement(achievement.id);
            // Lägg till achievement-poäng
            Storage.addXP(achievement.points);
        });

        return {
            points,
            totalPoints: result.totalPoints,
            newXP: result.newXP,
            newLevel: result.newLevel,
            leveledUp: result.leveledUp,
            streak,
            newAchievements: unlockedAchievements
        };
    },

    /**
     * Hämta användarstatistik
     */
    getStats() {
        const profile = Storage.getProfile();
        const exerciseDetails = Storage.get('exerciseDetails', {});

        // Räkna statistik
        let perfectAnswers = 0;
        let noHintExercises = 0;
        let perfectNoHint = 0;
        let fastExercises = 0;

        Object.values(exerciseDetails).forEach(ex => {
            if (ex.attempts === 1) perfectAnswers++;
            if (!ex.usedHint) noHintExercises++;
            if (ex.attempts === 1 && !ex.usedHint) perfectNoHint++;
            if (ex.timeSeconds && ex.timeSeconds < 120) fastExercises++;
        });

        // Ämnes-progress
        const topicProgress = {};
        const topicComplete = {};
        const topics = ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];

        topics.forEach(topic => {
            const progress = Storage.getTopicProgress(topic);
            topicProgress[topic] = progress.completed || 0;
            topicComplete[topic] = progress.completed >= progress.total && progress.total > 0;
        });

        return {
            completedExercises: profile.completedExercises.length,
            perfectAnswers,
            noHintExercises,
            perfectNoHint,
            fastExercises,
            streak: profile.streak,
            level: profile.level,
            topicProgress,
            topicComplete
        };
    },

    /**
     * Formatera poäng för visning
     */
    format(points) {
        if (points >= 1000) {
            return (points / 1000).toFixed(1) + 'k';
        }
        return points.toString();
    },

    /**
     * Beräkna poäng-breakdown för visning
     */
    getBreakdown(exercisePoints, options = {}) {
        const breakdown = [];
        const {
            attempts = 1,
            usedHint = false,
            timeSeconds = null,
            streak = 0
        } = options;

        breakdown.push({
            label: 'Grundpoäng',
            points: exercisePoints || this.BASE_POINTS
        });

        if (attempts === 1) {
            breakdown.push({
                label: 'Bonus: Första försöket',
                points: this.FIRST_ATTEMPT_BONUS
            });
        }

        if (!usedHint) {
            breakdown.push({
                label: 'Bonus: Utan ledtråd',
                points: this.NO_HINT_BONUS
            });
        }

        if (timeSeconds !== null && timeSeconds < 60) {
            breakdown.push({
                label: 'Bonus: Snabbhet',
                points: this.SPEED_BONUS
            });
        }

        if (streak > 0) {
            const streakBonus = Math.min(streak * this.STREAK_MULTIPLIER * 100, 100);
            breakdown.push({
                label: `Streak-bonus (${streak} dagar)`,
                multiplier: `+${streakBonus.toFixed(0)}%`
            });
        }

        return breakdown;
    }
};

export default Points;
