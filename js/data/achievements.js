/**
 * Achievements - Alla achievements/medaljer
 */

const Achievements = {
    items: [
        // Första stegen
        {
            id: 'first_exercise',
            name: 'Första steget',
            description: 'Lös din första uppgift',
            icon: '🎯',
            points: 10,
            category: 'milestone',
            condition: (stats) => stats.completedExercises >= 1
        },
        {
            id: 'first_perfect',
            name: 'Perfekt!',
            description: 'Lös en uppgift rätt på första försöket',
            icon: '⭐',
            points: 15,
            category: 'skill',
            condition: (stats) => stats.perfectAnswers >= 1
        },
        {
            id: 'no_hints',
            name: 'Självständig',
            description: 'Lös 5 uppgifter utan att använda ledtrådar',
            icon: '🧠',
            points: 25,
            category: 'skill',
            condition: (stats) => stats.noHintExercises >= 5
        },

        // Ämnesmilstolpar
        {
            id: 'topic_3_1_start',
            name: 'Omkrets & Area påbörjad',
            description: 'Lös din första uppgift i 3.1',
            icon: '📐',
            points: 10,
            category: 'topic',
            topic: '3.1',
            condition: (stats) => stats.topicProgress['3.1'] >= 1
        },
        {
            id: 'topic_3_1_complete',
            name: 'Omkrets & Area mästare',
            description: 'Slutför alla uppgifter i 3.1',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.1',
            condition: (stats) => stats.topicComplete['3.1']
        },
        {
            id: 'topic_3_2_start',
            name: 'Cirkelns area påbörjad',
            description: 'Lös din första uppgift i 3.2',
            icon: '⭕',
            points: 10,
            category: 'topic',
            topic: '3.2',
            condition: (stats) => stats.topicProgress['3.2'] >= 1
        },
        {
            id: 'topic_3_2_complete',
            name: 'Cirkelns area mästare',
            description: 'Slutför alla uppgifter i 3.2',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.2',
            condition: (stats) => stats.topicComplete['3.2']
        },
        {
            id: 'topic_3_3_start',
            name: 'Volym påbörjad',
            description: 'Lös din första uppgift i 3.3',
            icon: '📦',
            points: 10,
            category: 'topic',
            topic: '3.3',
            condition: (stats) => stats.topicProgress['3.3'] >= 1
        },
        {
            id: 'topic_3_3_complete',
            name: 'Volym mästare',
            description: 'Slutför alla uppgifter i 3.3',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.3',
            condition: (stats) => stats.topicComplete['3.3']
        },
        {
            id: 'topic_3_4_start',
            name: 'Enheter påbörjad',
            description: 'Lös din första uppgift i 3.4',
            icon: '🧪',
            points: 10,
            category: 'topic',
            topic: '3.4',
            condition: (stats) => stats.topicProgress['3.4'] >= 1
        },
        {
            id: 'topic_3_4_complete',
            name: 'Enheter mästare',
            description: 'Slutför alla uppgifter i 3.4',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.4',
            condition: (stats) => stats.topicComplete['3.4']
        },
        {
            id: 'topic_3_5_start',
            name: 'Prisma & Pyramid påbörjad',
            description: 'Lös din första uppgift i 3.5',
            icon: '🔺',
            points: 10,
            category: 'topic',
            topic: '3.5',
            condition: (stats) => stats.topicProgress['3.5'] >= 1
        },
        {
            id: 'topic_3_5_complete',
            name: 'Prisma & Pyramid mästare',
            description: 'Slutför alla uppgifter i 3.5',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.5',
            condition: (stats) => stats.topicComplete['3.5']
        },
        {
            id: 'topic_3_6_start',
            name: 'Cylinder, kon & klot påbörjad',
            description: 'Lös din första uppgift i 3.6',
            icon: '🔵',
            points: 10,
            category: 'topic',
            topic: '3.6',
            condition: (stats) => stats.topicProgress['3.6'] >= 1
        },
        {
            id: 'topic_3_6_complete',
            name: 'Cylinder, kon & klot mästare',
            description: 'Slutför alla uppgifter i 3.6',
            icon: '🏆',
            points: 50,
            category: 'topic',
            topic: '3.6',
            condition: (stats) => stats.topicComplete['3.6']
        },

        // Kvantitetsmilstolpar
        {
            id: 'exercises_10',
            name: 'På gång!',
            description: 'Lös 10 uppgifter totalt',
            icon: '🔟',
            points: 20,
            category: 'quantity',
            condition: (stats) => stats.completedExercises >= 10
        },
        {
            id: 'exercises_25',
            name: 'Kvartvägs',
            description: 'Lös 25 uppgifter totalt',
            icon: '🌟',
            points: 35,
            category: 'quantity',
            condition: (stats) => stats.completedExercises >= 25
        },
        {
            id: 'exercises_50',
            name: 'Halvvägs',
            description: 'Lös 50 uppgifter totalt',
            icon: '🌙',
            points: 50,
            category: 'quantity',
            condition: (stats) => stats.completedExercises >= 50
        },
        {
            id: 'exercises_100',
            name: 'Centurion',
            description: 'Lös 100 uppgifter totalt',
            icon: '💯',
            points: 100,
            category: 'quantity',
            condition: (stats) => stats.completedExercises >= 100
        },

        // Streak-achievements
        {
            id: 'streak_3',
            name: '3 dagar i rad',
            description: 'Öva tre dagar i rad',
            icon: '🔥',
            points: 20,
            category: 'streak',
            condition: (stats) => stats.streak >= 3
        },
        {
            id: 'streak_7',
            name: 'Veckostreak',
            description: 'Öva sju dagar i rad',
            icon: '🔥🔥',
            points: 50,
            category: 'streak',
            condition: (stats) => stats.streak >= 7
        },
        {
            id: 'streak_14',
            name: 'Tvåveckorsstreak',
            description: 'Öva fjorton dagar i rad',
            icon: '🔥🔥🔥',
            points: 100,
            category: 'streak',
            condition: (stats) => stats.streak >= 14
        },
        {
            id: 'streak_30',
            name: 'Månadsstreak',
            description: 'Öva trettio dagar i rad',
            icon: '🏅',
            points: 200,
            category: 'streak',
            condition: (stats) => stats.streak >= 30
        },

        // Nivå-achievements
        {
            id: 'level_2',
            name: 'Nybörjare II',
            description: 'Nå nivå 2',
            icon: '⬆️',
            points: 15,
            category: 'level',
            condition: (stats) => stats.level >= 2
        },
        {
            id: 'level_5',
            name: 'Medel',
            description: 'Nå nivå 5',
            icon: '🌟',
            points: 50,
            category: 'level',
            condition: (stats) => stats.level >= 5
        },
        {
            id: 'level_10',
            name: 'Matte-Mästare',
            description: 'Nå nivå 10',
            icon: '👑',
            points: 200,
            category: 'level',
            condition: (stats) => stats.level >= 10
        },

        // Speciala achievements
        {
            id: 'speed_demon',
            name: 'Snabb som blixten',
            description: 'Lös 5 uppgifter på under 2 minuter vardera',
            icon: '⚡',
            points: 40,
            category: 'special',
            condition: (stats) => stats.fastExercises >= 5
        },
        {
            id: 'all_topics',
            name: 'Allround',
            description: 'Lös minst en uppgift i varje ämne',
            icon: '🎨',
            points: 50,
            category: 'special',
            condition: (stats) => {
                const topics = ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];
                return topics.every(t => stats.topicProgress[t] >= 1);
            }
        },
        {
            id: 'perfectionist',
            name: 'Perfektionist',
            description: 'Lös 10 uppgifter perfekt (rätt på första försöket utan ledtråd)',
            icon: '💎',
            points: 75,
            category: 'special',
            condition: (stats) => stats.perfectNoHint >= 10
        },
        {
            id: 'geometry_master',
            name: 'Geometrimästare',
            description: 'Slutför alla uppgifter i alla ämnen',
            icon: '🏆👑',
            points: 500,
            category: 'special',
            condition: (stats) => {
                const topics = ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];
                return topics.every(t => stats.topicComplete[t]);
            }
        }
    ],

    /**
     * Hämta achievement efter ID
     */
    getById(id) {
        return this.items.find(a => a.id === id);
    },

    /**
     * Hämta alla achievements i en kategori
     */
    getByCategory(category) {
        return this.items.filter(a => a.category === category);
    },

    /**
     * Kontrollera vilka nya achievements som har låsts upp
     */
    checkNewAchievements(stats, unlockedIds = []) {
        const newAchievements = [];

        this.items.forEach(achievement => {
            if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
                newAchievements.push(achievement);
            }
        });

        return newAchievements;
    },

    /**
     * Beräkna total poäng från upplåsta achievements
     */
    getTotalPoints(unlockedIds) {
        return this.items
            .filter(a => unlockedIds.includes(a.id))
            .reduce((sum, a) => sum + a.points, 0);
    },

    /**
     * Hämta progress för achievements
     */
    getProgress(unlockedIds) {
        return {
            unlocked: unlockedIds.length,
            total: this.items.length,
            percentage: Math.round((unlockedIds.length / this.items.length) * 100)
        };
    },

    /**
     * Gruppera achievements efter kategori
     */
    getGroupedByCategory() {
        const groups = {};

        this.items.forEach(achievement => {
            if (!groups[achievement.category]) {
                groups[achievement.category] = [];
            }
            groups[achievement.category].push(achievement);
        });

        return groups;
    },

    /**
     * Kategorinamn på svenska
     */
    categoryNames: {
        milestone: 'Milstolpar',
        skill: 'Färdigheter',
        topic: 'Ämnen',
        quantity: 'Kvantitet',
        streak: 'Streak',
        level: 'Nivåer',
        special: 'Speciella'
    }
};

export default Achievements;
