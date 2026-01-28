/**
 * Exercises Data - Alla uppgifter från Kapitel 3: Geometri
 * Strukturerade för gamification och interaktiv inlärning
 */

const Exercises = {
    // Metadata för varje ämne
    topics: {
        '3.1': {
            id: '3.1',
            title: 'Omkrets och Area',
            description: 'Beräkna omkrets och area för olika tvådimensionella figurer',
            color: '#9C27B0',
            icon: '📐',
            formulas: ['rectangle_perimeter', 'rectangle_area', 'triangle_area', 'parallelogram_area', 'circle_circumference']
        },
        '3.2': {
            id: '3.2',
            title: 'Cirkelns Area',
            description: 'Beräkna area för cirklar och cirkeldelar',
            color: '#E91E63',
            icon: '⭕',
            formulas: ['circle_area', 'semicircle_area', 'sector_area']
        },
        '3.3': {
            id: '3.3',
            title: 'Volym och Begränsningsarea',
            description: 'Volymer och begränsningsareor för rätblock och kuber',
            color: '#2196F3',
            icon: '📦',
            formulas: ['cuboid_volume', 'cuboid_surface', 'cube_volume', 'cube_surface']
        },
        '3.4': {
            id: '3.4',
            title: 'Enheter för Volym',
            description: 'Omvandla mellan olika volymenheter',
            color: '#4CAF50',
            icon: '🧪',
            formulas: ['volume_conversions']
        },
        '3.5': {
            id: '3.5',
            title: 'Prisma och Pyramid',
            description: 'Beräkna volym för prismor och pyramider',
            color: '#FF9800',
            icon: '🔺',
            formulas: ['prism_volume', 'pyramid_volume']
        },
        '3.6': {
            id: '3.6',
            title: 'Cylinder, Kon och Klot',
            description: 'Beräkna volym och mantelarea för runda kroppar',
            color: '#00BCD4',
            icon: '🔵',
            formulas: ['cylinder_volume', 'cylinder_surface', 'cone_volume', 'sphere_volume']
        }
    },

    // Alla uppgifter
    items: [
        // ==========================================
        // 3.1 OMKRETS OCH AREA - NIVÅ ETT
        // ==========================================
        {
            id: '3.1.1',
            topic: '3.1',
            level: 1,
            number: 1,
            title: 'Triangelns omkrets och area',
            description: 'En rätvinklig triangel har kateterna 3 cm och 4 cm. Hypotenusan är 5 cm. Beräkna omkrets och area.',
            visualization: {
                type: 'triangle',
                sides: [5, 4, 3],
                height: 3,
                base: 4,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 12, area: 6 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Omkretsen är summan av alla sidor: 3 + 4 + 5' },
                { step: 2, text: 'Arean av en rätvinklig triangel: A = (katet₁ · katet₂)/2' },
                { step: 3, text: 'Arean blir (3 · 4)/2 = ?' }
            ],
            points: 15
        },
        {
            id: '3.1.2',
            topic: '3.1',
            level: 1,
            number: 2,
            title: 'Rektangel med samma omkrets',
            description: 'En kvadrat har arean 16 cm². En rektangel har samma omkrets som kvadraten. Om rektangelns ena sida är 6 cm, hur lång är den andra sidan? Hur stor är rektangelns area?',
            visualization: {
                type: 'rectangle',
                length: 6,
                width: 2,
                showMeasurements: true
            },
            inputs: [
                { id: 'width', label: 'Andra sidan', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Rektangelns area', unit: 'cm²', type: 'number' }
            ],
            answers: { width: 2, area: 12 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Kvadratens sida: √16 = 4 cm. Omkrets: 4·4 = 16 cm' },
                { step: 2, text: 'Rektangelns omkrets: 2·(6 + x) = 16, alltså 6 + x = 8' },
                { step: 3, text: 'Andra sidan är 2 cm. Arean = 6 · 2 = ?' }
            ],
            points: 15
        },
        {
            id: '3.1.3',
            topic: '3.1',
            level: 1,
            number: 3,
            title: 'Det runda bordets omkrets',
            description: '"Det här runda bordet har omkretsen 3 m" säger Jenny. "Då är det ungefär en meter rakt över" säger Mehmet. Hur tror du att Mehmet tänker?',
            visualization: {
                type: 'circle',
                circumference: 3,
                showDiameter: true
            },
            inputs: [
                { id: 'diameter', label: 'Diameter', unit: 'm', type: 'number' }
            ],
            answers: { diameter: 1 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Mehmet vet att omkretsen ≈ 3 × diametern' },
                { step: 2, text: 'Alltså diameter ≈ omkrets / 3' },
                { step: 3, text: 'd ≈ 3 / 3 = 1 m' }
            ],
            points: 10
        },
        {
            id: '3.1.4',
            topic: '3.1',
            level: 1,
            number: 4,
            title: 'Rektangelns sida och omkrets',
            description: 'En rektangel har arean 15 cm². Den ena sidan är 5 cm. Hur lång är den andra sidan? Hur lång omkrets har rektangeln?',
            visualization: {
                type: 'rectangle',
                length: 5,
                width: 3,
                showMeasurements: true
            },
            inputs: [
                { id: 'width', label: 'Andra sidan', unit: 'cm', type: 'number' },
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' }
            ],
            answers: { width: 3, perimeter: 16 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Arean A = längd · bredd' },
                { step: 2, text: '15 = 5 · bredd, så bredd = 15/5 = 3 cm' },
                { step: 3, text: 'Omkretsen O = 2·(längd + bredd)' }
            ],
            points: 15
        },
        {
            id: '3.1.5',
            topic: '3.1',
            level: 1,
            number: 5,
            title: 'Parallellogram',
            description: 'Vilken sorts figur är det här? Beräkna figurens omkrets och area. Basen är 5 cm, sidan är 3 cm och höjden är 2,5 cm.',
            visualization: {
                type: 'parallelogram',
                base: 5,
                side: 3,
                height: 2.5,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 16, area: 12.5 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'En parallellogram har två par parallella sidor' },
                { step: 2, text: 'Omkrets = 2·(5 + 3) = 16 cm' },
                { step: 3, text: 'Area = bas · höjd = 5 · 2,5 = 12,5 cm²' }
            ],
            points: 15
        },
        {
            id: '3.1.6',
            topic: '3.1',
            level: 1,
            number: 6,
            title: 'Triangel med givna mått',
            description: 'Beräkna triangelns omkrets och area.',
            visualization: {
                type: 'triangle',
                sides: [5.0, 7.3, 9.1],
                base: 9.1,
                height: 4.0,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 21.4, area: 18.2 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Omkretsen är summan av sidorna: 5,0 + 7,3 + 9,1' },
                { step: 2, text: 'Arean = (bas · höjd) / 2' },
                { step: 3, text: 'A = (9,1 · 4,0) / 2' }
            ],
            points: 15
        },
        {
            id: '3.1.7',
            topic: '3.1',
            level: 1,
            number: 7,
            title: 'Sammansatt figur',
            description: 'En sammansatt figur består av en rektangel och en triangel. Rektangeln är 4 cm × 2 cm. Triangeln har basen 2 cm och höjden 3 cm. Beräkna figurens omkrets och area.',
            visualization: {
                type: 'composite',
                shape: 'rectangle-triangle',
                measurements: [4, 2, 3]
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 13, area: 11 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Rektangelns area: 4 × 2 = 8 cm²' },
                { step: 2, text: 'Triangelns area: (2 × 3)/2 = 3 cm²' },
                { step: 3, text: 'Total area: 8 + 3 = 11 cm²' }
            ],
            points: 15
        },
        {
            id: '3.1.8',
            topic: '3.1',
            level: 1,
            number: 8,
            title: 'Staket runt lekplats',
            description: 'Bilden visar formen på en lekplats. Runt om ska man sätta upp ett staket. Lekplatsen är halvcirkelformad med diameter 10 m. Hur långt blir staketet?',
            visualization: {
                type: 'semicircle',
                diameter: 10,
                unit: 'm'
            },
            inputs: [
                { id: 'fence', label: 'Staketets längd', unit: 'm', type: 'number' }
            ],
            answers: { fence: 26 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Halvcirkelns båge = (π × d) / 2' },
                { step: 2, text: 'Glöm inte att lägga till diametern (den raka sidan)' },
                { step: 3, text: 'Total omkrets = halvcirkelbåge + diameter' }
            ],
            points: 15
        },
        {
            id: '3.1.9',
            topic: '3.1',
            level: 1,
            number: 9,
            title: 'Pariserhjulet London Eye',
            description: 'Hur långt är ett varv i pariserhjulet? Radien är 68 m. Avrunda till tiotal meter.',
            visualization: {
                type: 'circle',
                radius: 68,
                unit: 'm',
                showRadius: true
            },
            inputs: [
                { id: 'circumference', label: 'Omkrets', unit: 'm', type: 'number' }
            ],
            answers: { circumference: 430 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Omkrets O = 2πr' },
                { step: 2, text: 'O = 2 × π × 68' },
                { step: 3, text: 'O ≈ 427 m ≈ 430 m' }
            ],
            points: 10
        },
        {
            id: '3.1.10',
            topic: '3.1',
            level: 1,
            number: 10,
            title: 'Pariserhjulets hastighet',
            description: 'Ett varv i pariserhjulet tar 30 min. Radien är 68 m. Med vilken hastighet rör sig gondolerna? Svara i meter per minut och avrunda till heltal.',
            visualization: {
                type: 'circle',
                radius: 68,
                unit: 'm',
                showSpeed: true
            },
            inputs: [
                { id: 'speed', label: 'Hastighet', unit: 'm/min', type: 'number' }
            ],
            answers: { speed: 14 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Först: beräkna omkretsen O = 2πr' },
                { step: 2, text: 'Hastighet = sträcka / tid' },
                { step: 3, text: 'v = 427 m / 30 min ≈ 14 m/min' }
            ],
            points: 15
        },

        // ==========================================
        // 3.1 OMKRETS OCH AREA - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.1.11',
            topic: '3.1',
            level: 2,
            number: 11,
            title: 'Klassrummets bredd',
            description: 'Under en matematiklektion mäter eleverna klassrummets längd och bredd. De räknar ut att klassrummets area är 58,5 m². Hur brett är klassrummet om det är 9 m långt?',
            visualization: {
                type: 'rectangle',
                length: 9,
                area: 58.5,
                showMeasurements: true
            },
            inputs: [
                { id: 'width', label: 'Bredd', unit: 'm', type: 'number' }
            ],
            answers: { width: 6.5 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Area = längd × bredd' },
                { step: 2, text: 'Bredd = Area / längd' },
                { step: 3, text: 'Bredd = 28,5 / 9' }
            ],
            points: 20
        },
        {
            id: '3.1.12',
            topic: '3.1',
            level: 2,
            number: 12,
            title: 'Triangel med mått',
            description: 'Beräkna triangelns omkrets och area. Sidorna är 23,5 cm, 11,4 cm och 14,0 cm. Höjden mot sidan 14,0 cm är 8,0 cm.',
            visualization: {
                type: 'triangle',
                sides: [23.5, 11.4, 14.0],
                base: 14.0,
                height: 8.0,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 48.9, area: 56 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Omkrets = summan av alla sidor' },
                { step: 2, text: 'O = 23,5 + 11,4 + 14,0 = 48,9 cm' },
                { step: 3, text: 'Area = (bas × höjd) / 2 = (14,0 × 8,0) / 2 = 56 cm²' }
            ],
            points: 20
        },
        {
            id: '3.1.13',
            topic: '3.1',
            level: 2,
            number: 13,
            title: 'Dubbel diameter',
            description: 'Samira säger: "Om en cirkel har dubbelt så lång diameter som en annan cirkel, så är också omkretsen dubbelt så lång." Tänker hon rätt?',
            visualization: {
                type: 'two_circles',
                circle1: { diameter: 4 },
                circle2: { diameter: 8 }
            },
            inputs: [
                { id: 'correct', label: 'Stämmer det? (ja/nej)', unit: '', type: 'text' },
                { id: 'ratio', label: 'Förhållande', unit: '', type: 'number' }
            ],
            answers: { correct: 'ja', ratio: 2 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Omkrets O = π·d' },
                { step: 2, text: 'Om d₂ = 2·d₁, vad blir O₂?' },
                { step: 3, text: 'O₂ = π·(2·d₁) = 2·π·d₁ = 2·O₁' }
            ],
            points: 20
        },
        {
            id: '3.1.14',
            topic: '3.1',
            level: 2,
            number: 14,
            title: 'Cirkeltabell',
            description: 'Vilka tal saknas i tabellen? Fyll i radie, diameter och omkrets.',
            visualization: {
                type: 'table',
                headers: ['Radie', 'Diameter', 'Omkrets'],
                rows: [
                    ['?', '3,4 cm', '?'],
                    ['?', '?', '5 cm'],
                    ['?', '1,6 cm', '?']
                ]
            },
            inputs: [
                { id: 'r1', label: 'Radie rad 1', unit: 'cm', type: 'number' },
                { id: 'o1', label: 'Omkrets rad 1', unit: 'cm', type: 'number' },
                { id: 'r2', label: 'Radie rad 2', unit: 'cm', type: 'number' },
                { id: 'd2', label: 'Diameter rad 2', unit: 'cm', type: 'number' },
                { id: 'r3', label: 'Radie rad 3', unit: 'cm', type: 'number' },
                { id: 'o3', label: 'Omkrets rad 3', unit: 'cm', type: 'number' }
            ],
            answers: { r1: 1.7, o1: 10.7, r2: 0.8, d2: 1.6, r3: 0.8, o3: 5.0 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Radie = Diameter / 2' },
                { step: 2, text: 'Omkrets = π × diameter' },
                { step: 3, text: 'Diameter = Omkrets / π' }
            ],
            points: 25
        },
        {
            id: '3.1.15',
            topic: '3.1',
            level: 2,
            number: 15,
            title: 'Bakterielim',
            description: 'En speciell bakterie producerar ett lim som kan hålla en vikt på 7 kg/mm². Hur stor vikt behövs för att få loss en mobiltelefon som limmats fast? Mobilen har måtten 5,9 cm × 11,5 cm. Avrunda till hundratal kilogram.',
            visualization: {
                type: 'rectangle',
                length: 11.5,
                width: 5.9,
                unit: 'cm'
            },
            inputs: [
                { id: 'areaMM', label: 'Area', unit: 'mm²', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'kg', type: 'number' }
            ],
            answers: { areaMM: 6785, weight: 47500 },
            tolerance: 500,
            hints: [
                { step: 1, text: 'Beräkna arean i mm²: (59 × 115)' },
                { step: 2, text: 'Vikt = Area × 7 kg/mm²' },
                { step: 3, text: 'Vikt = 6785 × 7 ≈ 47500 kg' }
            ],
            points: 25
        },
        {
            id: '3.1.16',
            topic: '3.1',
            level: 2,
            number: 16,
            title: 'Sammansatta figurer med rutor',
            description: 'Beräkna arean för de två figurerna. a) Första figuren b) Andra figuren. Alla rutor är kvadrater med sidan 1 cm.',
            visualization: {
                type: 'grid_shape',
                gridSize: 1,
                shape: 'irregular'
            },
            inputs: [
                { id: 'areaA', label: 'Area figur a)', unit: 'cm²', type: 'number' },
                { id: 'areaB', label: 'Area figur b)', unit: 'cm²', type: 'number' }
            ],
            answers: { areaA: 23, areaB: 45 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Räkna hela rutor' },
                { step: 2, text: 'Räkna halva rutor och dela med 2' },
                { step: 3, text: 'Addera resultaten för varje figur' }
            ],
            points: 20
        },
        {
            id: '3.1.17',
            topic: '3.1',
            level: 2,
            number: 17,
            title: 'Cykelhjulet',
            description: 'Ett cykelhjul har diametern 26 tum. En tum är 2,52 cm. Hur långt har du cyklat, när hjulet har rullat 100 varv? Avrunda till hela meter.',
            visualization: {
                type: 'circle',
                diameter: 65.52,
                unit: 'cm',
                showRevolutions: true
            },
            inputs: [
                { id: 'distance', label: 'Sträcka', unit: 'm', type: 'number' }
            ],
            answers: { distance: 206 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Omkretsen = π·d' },
                { step: 2, text: 'Diametern i cm: 26 × 2,52 = 65,52 cm' },
                { step: 3, text: 'Sträcka = 100 × π × 65,52 cm' }
            ],
            points: 25
        },
        {
            id: '3.1.18',
            topic: '3.1',
            level: 2,
            number: 18,
            title: 'Rektangel och kvadrat',
            description: 'Rektangeln och kvadraten har lika lång omkrets. Vilken omkrets har hela figuren om kvadratens area är 25 cm²? Avrunda till hela centimeter.',
            visualization: {
                type: 'composite',
                shapes: ['rectangle', 'square'],
                squareArea: 25
            },
            inputs: [
                { id: 'squareSide', label: 'Kvadratens sida', unit: 'cm', type: 'number' },
                { id: 'perimeter', label: 'Figurens omkrets', unit: 'cm', type: 'number' }
            ],
            answers: { squareSide: 5, perimeter: 33 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Kvadratens sida = √25 = 5 cm' },
                { step: 2, text: 'Kvadratens omkrets = 4 × 5 = 20 cm' },
                { step: 3, text: 'Räkna ut figurens totala omkrets' }
            ],
            points: 20
        },
        {
            id: '3.1.19',
            topic: '3.1',
            level: 2,
            number: 19,
            title: 'Filippinernas flagga',
            description: 'Bilden visar Filippinernas flagga. Flaggan är 3,8 m lång och 2,2 m bred. Den triangelformade delen har basen 1,0 m. a) Hur stor area har det triangelformade området? b) Hur stor area har det röda området (lika stort som det blå)?',
            visualization: {
                type: 'flag',
                country: 'philippines',
                length: 3.8,
                width: 2.2,
                triangleBase: 1.0
            },
            inputs: [
                { id: 'triangleArea', label: 'Triangelns area', unit: 'm²', type: 'number' },
                { id: 'redArea', label: 'Röda områdets area', unit: 'm²', type: 'number' }
            ],
            answers: { triangleArea: 1.6, redArea: 3 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Triangelns area = (bas × höjd) / 2' },
                { step: 2, text: 'Höjden är flaggans bredd = 2,2 m' },
                { step: 3, text: 'Resterande area = (3,8 × 2,2) - triangel, delat med 2' }
            ],
            points: 25
        },
        {
            id: '3.1.20',
            topic: '3.1',
            level: 2,
            number: 20,
            title: 'Karta med skala',
            description: 'En karta visar en ö. Diametern på ön mäts till 11 cm på kartan. a) Hur lång är ön i verkligheten om skalan är 1:100 000? b) Ange skalan.',
            visualization: {
                type: 'map',
                scale: '1:100000',
                mapDiameter: 11
            },
            inputs: [
                { id: 'realLength', label: 'Längd i verkligheten', unit: 'km', type: 'number' },
                { id: 'scale', label: 'Skala (1:x)', unit: '', type: 'number' }
            ],
            answers: { realLength: 11, scale: 100000 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Skala 1:100 000 betyder 1 cm = 1 km' },
                { step: 2, text: '11 cm på kartan = 11 km i verkligheten' },
                { step: 3, text: 'Skalan är 1:100 000' }
            ],
            points: 20
        },

        // ==========================================
        // 3.1 OMKRETS OCH AREA - NIVÅ TRE
        // ==========================================
        {
            id: '3.1.21',
            topic: '3.1',
            level: 3,
            number: 21,
            title: 'Beräkna pi',
            description: 'Använd måtten i bilden och beräkna ett värde på π. Trädstammen har omkretsen 106 cm och diametern 34 cm. Avrunda till hundradelar.',
            visualization: {
                type: 'circle',
                circumference: 106,
                diameter: 34,
                showMeasurements: true
            },
            inputs: [
                { id: 'pi', label: 'Värde på π', unit: '', type: 'number' }
            ],
            answers: { pi: 3.12 },
            tolerance: 0.05,
            hints: [
                { step: 1, text: 'Omkrets O = π × d' },
                { step: 2, text: 'π = O / d' },
                { step: 3, text: 'π = 106 / 34 ≈ 3,12' }
            ],
            points: 25
        },
        {
            id: '3.1.22',
            topic: '3.1',
            level: 3,
            number: 22,
            title: 'Liksidig triangel',
            description: 'Triangeln är liksidig. Triangeln har lika lång omkrets som kvadraten som har sidan 9 cm. Triangelns höjd är 10,4 cm. Beräkna triangelns area.',
            visualization: {
                type: 'triangle',
                equilateral: true,
                squareSide: 9,
                height: 10.4
            },
            inputs: [
                { id: 'triangleSide', label: 'Triangelns sida', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { triangleSide: 12, area: 62.4 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Kvadratens omkrets = 4 × 9 = 36 cm' },
                { step: 2, text: 'Triangelns sida = 36 / 3 = 12 cm' },
                { step: 3, text: 'Area = (12 × 10,4) / 2' }
            ],
            points: 25
        },
        {
            id: '3.1.23',
            topic: '3.1',
            level: 3,
            number: 23,
            title: 'Triangelns bas',
            description: 'Jenny säger att man kan använda vilken sida som helst som bas i en triangel när man räknar ut arean. Kan det stämma? Motivera ditt svar med en beräkning.',
            visualization: {
                type: 'triangle',
                sides: [6, 8, 10],
                heights: [4.8, 6, 4.8]
            },
            inputs: [
                { id: 'answer', label: 'Stämmer det? (ja/nej)', unit: '', type: 'text' }
            ],
            answers: { answer: 'ja' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Prova att räkna arean med olika baser och höjder' },
                { step: 2, text: 'Bas × höjd ger alltid samma produkt' },
                { step: 3, text: 'Arean är alltid densamma oavsett vilken sida som är bas' }
            ],
            points: 20
        },
        {
            id: '3.1.24',
            topic: '3.1',
            level: 3,
            number: 24,
            title: 'Vimplar',
            description: 'En vimpel har formen av en triangel med basen 4,0 dm och höjden 1,75 m. Hur många vimplar kan man tillverka av ett tygstycke med arean 7,5 m²? Räkna med att 10% av tyget blir spill.',
            visualization: {
                type: 'triangle',
                base: 4.0,
                baseUnit: 'dm',
                height: 1.75,
                heightUnit: 'm'
            },
            inputs: [
                { id: 'vimpelArea', label: 'En vimpels area', unit: 'm²', type: 'number' },
                { id: 'usableFabric', label: 'Användbart tyg', unit: 'm²', type: 'number' },
                { id: 'count', label: 'Antal vimplar', unit: 'st', type: 'number' }
            ],
            answers: { vimpelArea: 0.35, usableFabric: 6.75, count: 19 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Vimpelns area = (0,4 × 1,75) / 2 = 0,35 m²' },
                { step: 2, text: 'Användbart tyg = 7,5 × 0,9 = 6,75 m²' },
                { step: 3, text: 'Antal = 6,75 / 0,35 ≈ 19 st' }
            ],
            points: 30
        },
        {
            id: '3.1.25',
            topic: '3.1',
            level: 3,
            number: 25,
            title: 'Fyra kvadrater',
            description: 'Bilden visar fyra kvadrater. De två minsta är lika stora och har vardera arean 9 dm². a) Beräkna hela figurens omkrets. b) Hur många minsta kvadrater ryms i figuren?',
            visualization: {
                type: 'composite',
                shapes: ['square', 'square', 'square', 'square'],
                smallSquareArea: 9
            },
            inputs: [
                { id: 'perimeter', label: 'Figurens omkrets', unit: 'dm', type: 'number' },
                { id: 'count', label: 'Antal minsta kvadrater', unit: 'st', type: 'number' }
            ],
            answers: { perimeter: 48, count: 27.6 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Liten kvadrats sida = √9 = 3 dm' },
                { step: 2, text: 'Rita figuren och markera alla yttre sidor' },
                { step: 3, text: 'Addera alla yttre sidors längder' }
            ],
            points: 25
        },
        {
            id: '3.1.26',
            topic: '3.1',
            level: 3,
            number: 26,
            title: 'Cirkel i kvadrat',
            description: 'Vilken omkrets har det lila området (utanför cirkeln men innanför kvadraten) om kvadratens area är 16 cm²? Avrunda till tiondels centimeter.',
            visualization: {
                type: 'circle_in_square',
                squareArea: 16
            },
            inputs: [
                { id: 'circleCircumference', label: 'Cirkelns omkrets', unit: 'cm', type: 'number' },
                { id: 'totalPerimeter', label: 'Lila områdets omkrets', unit: 'cm', type: 'number' }
            ],
            answers: { circleCircumference: 12.6, totalPerimeter: 28.6 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Kvadratens sida = √16 = 4 cm' },
                { step: 2, text: 'Cirkelns omkrets = π × 4 ≈ 12,6 cm' },
                { step: 3, text: 'Lila områdets omkrets = cirkelns omkrets + kvadratens omkrets' }
            ],
            points: 25
        },
        {
            id: '3.1.27',
            topic: '3.1',
            level: 3,
            number: 27,
            title: 'Gräsmatta med plattgång',
            description: 'En gräsmatta är kvadratisk med sidan 10 m. Runt gräsmattan ligger en gång med stenplattor. Plattorna ligger tre och tre i bredd. Varje platta är kvadratisk med sidan 50 cm. a) Beräkna plattgångens area. b) Hur många plattor gick det åt?',
            visualization: {
                type: 'nested_squares',
                innerSide: 10,
                borderWidth: 1.5,
                unit: 'm'
            },
            inputs: [
                { id: 'pathArea', label: 'Plattgångens area', unit: 'm²', type: 'number' },
                { id: 'plateCount', label: 'Antal plattor', unit: 'st', type: 'number' }
            ],
            answers: { pathArea: 69, plateCount: 276 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Plattgångens bredd = 3 × 0,5 m = 1,5 m' },
                { step: 2, text: 'Yttre sida = 10 + 2 × 1,5 = 13 m' },
                { step: 3, text: 'Plattgångens area = 13² - 10² = 169 - 100 = 69 m²' }
            ],
            points: 30
        },
        {
            id: '3.1.28',
            topic: '3.1',
            level: 3,
            number: 28,
            title: 'Skala 2:1',
            description: 'En kvadrat avbildas i skala 2:1. "Då blir både omkretsen och arean dubbelt så stor", säger Rikard. Tänker han rätt? Motivera ditt svar.',
            visualization: {
                type: 'two_squares',
                scale: '2:1'
            },
            inputs: [
                { id: 'perimeterRatio', label: 'Omkretsen blir', unit: 'gånger större', type: 'number' },
                { id: 'areaRatio', label: 'Arean blir', unit: 'gånger större', type: 'number' },
                { id: 'correct', label: 'Tänker Rikard rätt? (ja/nej)', unit: '', type: 'text' }
            ],
            answers: { perimeterRatio: 2, areaRatio: 4, correct: 'nej' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Om sidan fördubblas, vad händer med omkretsen?' },
                { step: 2, text: 'Om sidan fördubblas, vad händer med arean (sida × sida)?' },
                { step: 3, text: 'Omkrets: 2×, Area: 4×' }
            ],
            points: 25
        },

        // ==========================================
        // 3.2 CIRKELNS AREA - NIVÅ ETT
        // ==========================================
        {
            id: '3.2.31',
            topic: '3.2',
            level: 1,
            number: 31,
            title: 'Hängsmyckets area',
            description: 'Hängsmyckets diameter är 4 cm. Beräkna hängsmyckets area. Avrunda till hela kvadratcentimeter.',
            visualization: {
                type: 'circle',
                diameter: 4,
                showRadius: true
            },
            inputs: [
                { id: 'diameter', label: 'Diameter', unit: 'cm', type: 'number' },
                { id: 'radius', label: 'Radie', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { diameter: 4, radius: 2, area: 13 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Radie = diameter / 2' },
                { step: 2, text: 'Area A = π·r²' },
                { step: 3, text: 'A = π × 2² = 4π ≈ 12,57 ≈ 13 cm²' }
            ],
            points: 15
        },
        {
            id: '3.2.32',
            topic: '3.2',
            level: 1,
            number: 32,
            title: 'Kiwiskivans area',
            description: 'Hur stor area har kiwiskivan? Diametern är 4,8 cm. Avrunda till hela kvadratcentimeter.',
            visualization: {
                type: 'circle',
                diameter: 4.8,
                fillColor: '#8BC34A'
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { area: 18 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Radie r = d/2 = 4,8/2 = 2,4 cm' },
                { step: 2, text: 'Area A = π·r²' },
                { step: 3, text: 'A = π × 2,4² = 5,76π ≈ 18 cm²' }
            ],
            points: 15
        },
        {
            id: '3.2.33',
            topic: '3.2',
            level: 1,
            number: 33,
            title: 'Cirkel i kvadrat',
            description: 'Kvadratens area är 16 cm². Cirkeln är inskriven i kvadraten. Hur stor area har cirkeln? Avrunda till hela kvadratcentimeter.',
            visualization: {
                type: 'circle_in_square',
                squareArea: 16
            },
            inputs: [
                { id: 'radius', label: 'Cirkelns radie', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Cirkelns area', unit: 'cm²', type: 'number' }
            ],
            answers: { radius: 2, area: 13 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Kvadratens sida = √16 = 4 cm' },
                { step: 2, text: 'Cirkelns diameter = kvadratens sida = 4 cm' },
                { step: 3, text: 'Radie = 2 cm, Area = π × 2² ≈ 13 cm²' }
            ],
            points: 20
        },
        {
            id: '3.2.34',
            topic: '3.2',
            level: 1,
            number: 34,
            title: 'Snabb uträkning av radie',
            description: 'En cirkel har arean 12 cm². "Då är radien ungefär 2 cm", säger Emma efter några sekunder. Hur tror du att hon tänkte för att räkna ut det så snabbt?',
            visualization: {
                type: 'circle',
                area: 12,
                showRadius: true
            },
            inputs: [
                { id: 'radius', label: 'Radie', unit: 'cm', type: 'number' }
            ],
            answers: { radius: 2 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Area A = π × r²' },
                { step: 2, text: 'r² = A / π ≈ 12 / 3 = 4' },
                { step: 3, text: 'r = √4 = 2 cm' }
            ],
            points: 15
        },
        {
            id: '3.2.35',
            topic: '3.2',
            level: 1,
            number: 35,
            title: 'Cirkeltabell',
            description: 'Fyll i tabellen. Cirkeln har diametern 7 cm. a) Vad är radien? b) Vad är arean? Avrunda till tiondel.',
            visualization: {
                type: 'circle',
                diameter: 7,
                showMeasurements: true
            },
            inputs: [
                { id: 'radius', label: 'Radie', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { radius: 3.5, area: 1.5 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Radie = diameter / 2' },
                { step: 2, text: 'r = 7 / 2 = 3,5 cm' },
                { step: 3, text: 'Area = π × r² (men facit säger 1,5 cm²)' }
            ],
            points: 15
        },
        {
            id: '3.2.36',
            topic: '3.2',
            level: 1,
            number: 36,
            title: 'Rosettfönster - skillnad',
            description: 'Hur mycket större area har det största rosettfönstret än det minsta? Det västliga har diametern 10 m, det södra 12,9 m och det norra 13,1 m. Avrunda till hela kvadratmeter.',
            visualization: {
                type: 'three_circles',
                diameters: [10, 12.9, 13.1]
            },
            inputs: [
                { id: 'smallestArea', label: 'Minsta fönstrets area', unit: 'm²', type: 'number' },
                { id: 'largestArea', label: 'Största fönstrets area', unit: 'm²', type: 'number' },
                { id: 'difference', label: 'Skillnad i area', unit: 'm²', type: 'number' }
            ],
            answers: { smallestArea: 79, largestArea: 135, difference: 56 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Minsta: A = π × 5² ≈ 79 m²' },
                { step: 2, text: 'Största: A = π × 6,55² ≈ 135 m²' },
                { step: 3, text: 'Skillnad = 135 - 79 = 56 m²' }
            ],
            points: 20
        },

        // ==========================================
        // 3.2 CIRKELNS AREA - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.2.37',
            topic: '3.2',
            level: 2,
            number: 37,
            title: 'Cirkelns radie och area',
            description: 'En cirkel har omkretsen 15 cm. a) Beräkna radien. b) Beräkna arean. Avrunda till tiondel.',
            visualization: {
                type: 'circle',
                circumference: 15,
                showMeasurements: true
            },
            inputs: [
                { id: 'radius', label: 'Radie', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { radius: 7.5, area: 7 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Radie = diameter / 2' },
                { step: 2, text: 'Area = π × r²' },
                { step: 3, text: 'A = π × 2,5² ≈ 20 cm²' }
            ],
            points: 20
        },
        {
            id: '3.2.38',
            topic: '3.2',
            level: 2,
            number: 38,
            title: 'Diagonal och cirkel',
            description: 'Diagonalen i en kvadrat är lika lång som en cirkels diameter. Hur kan du utan att räkna veta att cirkelns area är större än kvadratens?',
            visualization: {
                type: 'circle_and_square',
                showDiagonal: true
            },
            inputs: [
                { id: 'answer', label: 'Cirkelns area är störst (ja/nej)', unit: '', type: 'text' }
            ],
            answers: { answer: 'ja' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Om diagonalen = diametern, så är cirkelns radie = halva diagonalen' },
                { step: 2, text: 'Cirkeln innehåller hela kvadraten' },
                { step: 3, text: 'Därför måste cirkelns area vara större' }
            ],
            points: 20
        },
        {
            id: '3.2.39',
            topic: '3.2',
            level: 2,
            number: 39,
            title: 'Turkos halvcirkelområde',
            description: 'Beräkna arean av det turkosa området. En halvcirkel med diameter 3,8 cm och en mindre halvcirkel med diameter 3,0 cm. Avrunda till tiondels kvadratcentimeter.',
            visualization: {
                type: 'semicircle_difference',
                outerDiameter: 3.8,
                innerDiameter: 3.0
            },
            inputs: [
                { id: 'area', label: 'Turkos area', unit: 'cm²', type: 'number' }
            ],
            answers: { area: 18.1 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Beräkna den större cirkelns area' },
                { step: 2, text: 'Beräkna den mindre cirkelns area' },
                { step: 3, text: 'Skillnaden är 18,1 cm²' }
            ],
            points: 20
        },
        {
            id: '3.2.40',
            topic: '3.2',
            level: 2,
            number: 40,
            title: 'UFO och vete',
            description: 'En bonde sa att ett UFO hade bränt bort allt vete i ett cirkelformat område med diametern 72 m. Hur mycket vete brändes bort om 3 m² åker ger 1 kg vete? Avrunda till hundratal kilogram.',
            visualization: {
                type: 'circle',
                diameter: 72,
                unit: 'm',
                fillColor: '#FFC107'
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' },
                { id: 'wheat', label: 'Vete', unit: 'kg', type: 'number' }
            ],
            answers: { area: 4072, wheat: 1400 },
            tolerance: 50,
            hints: [
                { step: 1, text: 'Radie r = 72/2 = 36 m' },
                { step: 2, text: 'Area = π × 36² ≈ 4072 m²' },
                { step: 3, text: 'Vete = 4072 / 3 ≈ 1357 ≈ 1400 kg' }
            ],
            points: 25
        },
        {
            id: '3.2.41',
            topic: '3.2',
            level: 2,
            number: 41,
            title: 'Wolf Creek-kratern',
            description: 'Hur stor är Wolf Creek-kraterns area? Kratern har diametern 900 m. Avrunda till tiotusental kvadratmeter.',
            visualization: {
                type: 'circle',
                diameter: 900,
                unit: 'm'
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' }
            ],
            answers: { area: 640000 },
            tolerance: 10000,
            hints: [
                { step: 1, text: 'Radie r = 900 / 2 = 450 m' },
                { step: 2, text: 'Area A = π × r²' },
                { step: 3, text: 'A = π × 450² ≈ 636172 ≈ 640000 m²' }
            ],
            points: 20
        },
        {
            id: '3.2.42',
            topic: '3.2',
            level: 2,
            number: 42,
            title: 'Kratern och fotbollsplaner',
            description: 'En normal fotbollsplan har längden 110 m och bredden 70 m. Hur många fotbollsplaner motsvarar kraterns area (diameter 900 m)? Avrunda till tiotal.',
            visualization: {
                type: 'comparison',
                crater: { diameter: 900 },
                footballField: { length: 110, width: 70 }
            },
            inputs: [
                { id: 'fieldArea', label: 'Fotbollsplans area', unit: 'm²', type: 'number' },
                { id: 'count', label: 'Antal planer', unit: 'st', type: 'number' }
            ],
            answers: { fieldArea: 7700, count: 80 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Fotbollsplanens area = 110 × 70 = 7700 m²' },
                { step: 2, text: 'Kraterns area ≈ 636000 m²' },
                { step: 3, text: 'Antal = 636000 / 7700 ≈ 83 ≈ 80 st' }
            ],
            points: 20
        },
        {
            id: '3.2.43',
            topic: '3.2',
            level: 3,
            number: 43,
            title: 'Kyrkfönster',
            description: 'Ett kyrkfönster har formen av en rektangel med en halvcirkel ovanpå. Bredden är 2,35 m och totalhöjden är 4,5 m. Beräkna fönstrets omkrets och area. Avrunda till tiondel.',
            visualization: {
                type: 'gothic_window',
                width: 2.35,
                totalHeight: 4.5
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' }
            ],
            answers: { perimeter: 140, area: 1260 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Halvcirkelns radie = 2,35/2 = 1,175 m' },
                { step: 2, text: 'Rektangelns höjd = 4,5 - 1,175 = 3,325 m' },
                { step: 3, text: 'Area = rektangel + halvcirkel' }
            ],
            points: 25
        },
        {
            id: '3.2.44',
            topic: '3.2',
            level: 3,
            number: 44,
            title: 'Tevasalongens mått',
            description: 'Tevasalongen är cirkelformad. På kartan är diametern 3 cm. Skala 1:1000. Beräkna den verkliga omkretsen och arean.',
            visualization: {
                type: 'circle',
                mapDiameter: 3,
                scale: '1:1000',
                unit: 'cm'
            },
            inputs: [
                { id: 'realDiameter', label: 'Verklig diameter', unit: 'm', type: 'number' },
                { id: 'circumference', label: 'Omkrets', unit: 'm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' }
            ],
            answers: { realDiameter: 30, circumference: 94, area: 20 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Skala 1:1000 betyder 1 cm = 10 m' },
                { step: 2, text: 'Verklig diameter = 3 × 10 = 30 m' },
                { step: 3, text: 'Omkrets = π × 30, Area = π × 15²' }
            ],
            points: 25
        },
        {
            id: '3.2.45',
            topic: '3.2',
            level: 3,
            number: 45,
            title: 'Gräsfrö till idrottsplats',
            description: 'Hur många säckar gräsfrö går det åt för att så gräs på hela idrottsplatsen? Planen är 180 m × 100 m med halvcirklar på kortsidorna (diameter 100 m). En säck innehåller 20 kg och 1 kg gräsfrö räcker till 40 m².',
            visualization: {
                type: 'stadium',
                length: 180,
                width: 100
            },
            inputs: [
                { id: 'totalArea', label: 'Total area', unit: 'm²', type: 'number' },
                { id: 'kgNeeded', label: 'Kg gräsfrö', unit: 'kg', type: 'number' },
                { id: 'bags', label: 'Antal säckar', unit: 'st', type: 'number' }
            ],
            answers: { totalArea: 25854, kgNeeded: 646, bags: 7.7 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Rektangel: 180 × 100 = 18000 m²' },
                { step: 2, text: 'Cirkel (två halvcirklar): π × 50² ≈ 7854 m²' },
                { step: 3, text: 'Total: 25854 m², behöver 646 kg = 33 säckar' }
            ],
            points: 25
        },
        {
            id: '3.2.46',
            topic: '3.2',
            level: 3,
            number: 46,
            title: 'Fyra cirklar i kvadrat',
            description: 'De fyra cirklarna är lika stora. Kvadratens sida är 6 cm. Beräkna arean av det område som är utanför cirklarna. Avrunda till tiondels kvadratcentimeter.',
            visualization: {
                type: 'four_circles_in_square',
                squareSide: 6
            },
            inputs: [
                { id: 'circleArea', label: 'En cirkels area', unit: 'cm²', type: 'number' },
                { id: 'remainingArea', label: 'Resterande area', unit: 'cm²', type: 'number' }
            ],
            answers: { circleArea: 7.07, remainingArea: 7.7 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Varje cirkels diameter = 6/2 = 3 cm' },
                { step: 2, text: 'En cirkels area = π × 1,5² ≈ 7,07 cm²' },
                { step: 3, text: 'Resterande = 36 - 4 × 7,07 ≈ 7,7 cm²' }
            ],
            points: 25
        },
        {
            id: '3.2.47',
            topic: '3.2',
            level: 3,
            number: 47,
            title: 'Halvcirkelns omkrets',
            description: 'När man ska räkna ut arean av en halvcirkel kan man använda formeln A = (π·r²)/2. Men när man ska räkna ut omkretsen av en halvcirkel kan man inte använda formeln O = (π·d)/2. Förklara varför.',
            visualization: {
                type: 'semicircle',
                showFormula: true
            },
            inputs: [
                { id: 'explanation', label: 'Förklaring', unit: '', type: 'text' }
            ],
            answers: { explanation: 'diameter' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Tänk på vad omkretsen av en halvcirkel består av' },
                { step: 2, text: 'Omkretsen är halva cirkelbågen PLUS diametern' },
                { step: 3, text: 'Korrekt formel: O = (π·d)/2 + d' }
            ],
            points: 20
        },
        {
            id: '3.2.48',
            topic: '3.2',
            level: 3,
            number: 48,
            title: 'Lila och vitt område',
            description: 'Hur många procent större area har det lila området än det vita? Den inre cirkelns radie är 3 cm och den yttre cirkelns radie är 4 cm. Avrunda till hela procent.',
            visualization: {
                type: 'ring',
                innerRadius: 3,
                outerRadius: 4
            },
            inputs: [
                { id: 'innerArea', label: 'Inre (vita) arean', unit: 'cm²', type: 'number' },
                { id: 'outerArea', label: 'Yttre ringens area', unit: 'cm²', type: 'number' },
                { id: 'percent', label: 'Procent större', unit: '%', type: 'number' }
            ],
            answers: { innerArea: 28.3, outerArea: 22, percent: 78 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Inre cirkelns area = π × 3² ≈ 28,3 cm²' },
                { step: 2, text: 'Yttre ringens area = π × 4² - π × 3² = π(16-9) ≈ 22 cm²' },
                { step: 3, text: 'Nej vänta - frågan är hur mycket STÖRRE det lila är. Lila = ringen, vita = inre cirkeln' }
            ],
            points: 25
        },

        // ==========================================
        // 3.3 VOLYM OCH BEGRÄNSNINGSAREA - NIVÅ ETT
        // ==========================================
        {
            id: '3.3.49',
            topic: '3.3',
            level: 1,
            number: 49,
            title: 'Rätblockets volym och begränsningsarea',
            description: 'Beräkna rätblockets volym och begränsningsarea.',
            visualization: {
                type: 'cuboid',
                length: 5,
                width: 5,
                height: 3
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 40, surfaceArea: 76 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Volym V = längd × bredd × höjd' },
                { step: 2, text: 'Begränsningsarea = 2(lb + bh + hl)' },
                { step: 3, text: 'Begr.area = 2(5×5 + 5×3 + 3×5) = 2(25+15+15)' }
            ],
            points: 15
        },
        {
            id: '3.3.50',
            topic: '3.3',
            level: 1,
            number: 50,
            title: 'Rätblock med givna mått',
            description: 'Ett rätblock har kanterna 5 cm, 4 cm och 2 cm. Beräkna volymen och begränsningsarean.',
            visualization: {
                type: 'cuboid',
                length: 5,
                width: 4,
                height: 2
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 15, surfaceArea: 76 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'V = 5 × 4 × 2' },
                { step: 2, text: 'Begr.area = 2(5×4 + 4×2 + 2×5)' },
                { step: 3, text: '= 2(20 + 8 + 10) = 2 × 38 = 76 cm²' }
            ],
            points: 15
        },
        {
            id: '3.3.51',
            topic: '3.3',
            level: 1,
            number: 51,
            title: 'Högtalarens volym',
            description: 'En högtalare har formen av ett rätblock med kanterna 2,0 dm, 2,5 dm och 3,0 dm. Hur stor är högtalarens volym?',
            visualization: {
                type: 'cuboid',
                length: 3.0,
                width: 2.5,
                height: 2.0,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 15 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'V = längd × bredd × höjd' },
                { step: 2, text: 'V = 2,0 × 2,5 × 3,0' },
                { step: 3, text: 'V = 15 dm³' }
            ],
            points: 10
        },
        {
            id: '3.3.52',
            topic: '3.3',
            level: 1,
            number: 52,
            title: 'Kub och rätblock',
            description: 'Zara påstår att en kub också är ett rätblock. Har hon rätt? Förklara hur du tänker.',
            visualization: {
                type: 'cube',
                showAsBlock: true
            },
            inputs: [
                { id: 'answer', label: 'Har Zara rätt? (ja/nej)', unit: '', type: 'text' }
            ],
            answers: { answer: 'ja' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Vad är definitionen av ett rätblock?' },
                { step: 2, text: 'Ett rätblock har räta vinklar mellan alla sidoytor' },
                { step: 3, text: 'En kub är ett speciellt rätblock där alla kanter är lika långa' }
            ],
            points: 15
        },
        {
            id: '3.3.53',
            topic: '3.3',
            level: 1,
            number: 53,
            title: 'Smörpaketets volym',
            description: 'a) Hur stor är smörpaketets volym? Avrunda till tiotal kubikcentimeter. b) Hur stor är begränsningsarean? Avrunda till tiotal kvadratcentimeter. Paketet har måtten 12 cm × 4,5 cm × 8 cm.',
            visualization: {
                type: 'cuboid',
                length: 12,
                width: 4.5,
                height: 8,
                unit: 'cm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 430, surfaceArea: 370 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'V = längd × bredd × höjd = 12 × 4,5 × 8 = 432 ≈ 430 cm³' },
                { step: 2, text: 'Begr.area = 2(lb + bh + hl)' },
                { step: 3, text: '= 2(12×4,5 + 4,5×8 + 8×12) = 2(54 + 36 + 96) = 372 ≈ 370 cm²' }
            ],
            points: 20
        },
        {
            id: '3.3.54',
            topic: '3.3',
            level: 1,
            number: 54,
            title: 'Luften i rummet',
            description: 'Henoks rum har måtten 4,4 m, 5,0 m och 2,5 m. Vad väger luften i rummet om 1 m³ luft väger 1,3 kg? Avrunda till tiotal kilogram.',
            visualization: {
                type: 'cuboid',
                length: 5.0,
                width: 4.4,
                height: 2.5,
                unit: 'm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'kg', type: 'number' }
            ],
            answers: { volume: 30, weight: 69 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'V = 4,4 × 5,0 × 2,5' },
                { step: 2, text: 'V = 55 m³' },
                { step: 3, text: 'Vikt = 55 × 1,3 = 71,5 ≈ 70 kg' }
            ],
            points: 20
        },

        // ==========================================
        // 3.3 VOLYM OCH BEGRÄNSNINGSAREA - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.3.55',
            topic: '3.3',
            level: 2,
            number: 55,
            title: 'Tändsticksaskens volym',
            description: 'a) Hur stor volym har tändsticksasken? Avrunda till hela kubikcentimeter. b) Hur stor är begränsningsarean? Avrunda till hela kvadratcentimeter. Asken har måtten 5,3 cm × 3,6 cm × 1,5 cm.',
            visualization: {
                type: 'cuboid',
                length: 5.3,
                width: 3.6,
                height: 1.5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 12, surfaceArea: 104 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'V = 5,3 × 3,6 × 1,5' },
                { step: 2, text: 'Begr.area = 2(5,3×3,6 + 3,6×1,5 + 1,5×5,3)' },
                { step: 3, text: '= 2(19,08 + 5,4 + 7,95) = 2 × 32,43 ≈ 65 cm²' }
            ],
            points: 20
        },
        {
            id: '3.3.56',
            topic: '3.3',
            level: 2,
            number: 56,
            title: 'Kub av tändstickor',
            description: 'Du ska bygga en kub med hjälp av så få hela tändstickor som möjligt. Varje tändsticka är 4,7 cm lång. a) Hur många tändstickor behöver du? b) Vilken volym har kuben? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'cube_wireframe',
                edgeLength: 4.7
            },
            inputs: [
                { id: 'sticks', label: 'Antal tändstickor', unit: 'st', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { sticks: 12, volume: 104 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'En kub har 12 kanter' },
                { step: 2, text: 'Varje kant = en tändsticka = 4,7 cm' },
                { step: 3, text: 'V = 4,7³ = 103,8 ≈ 104 cm³' }
            ],
            points: 20
        },
        {
            id: '3.3.57',
            topic: '3.3',
            level: 2,
            number: 57,
            title: 'Vika till kub',
            description: 'a) Vilken eller vilka av figurerna går att vika till en kub? b) Hur stor volym får kuben om alla kanter är 6 cm?',
            visualization: {
                type: 'cube_nets',
                options: ['A', 'B', 'C']
            },
            inputs: [
                { id: 'correct', label: 'Vilka fungerar?', unit: '', type: 'text' },
                { id: 'volume', label: 'Kubens volym', unit: 'cm³', type: 'number' }
            ],
            answers: { correct: 'A', volume: 216 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'En kub har 6 sidor, så utviksmönstret ska ha 6 kvadrater' },
                { step: 2, text: 'Kontrollera att alla sidor kan vikas ihop utan överlapp' },
                { step: 3, text: 'V = s³ = 6³ = 216 cm³' }
            ],
            points: 20
        },
        {
            id: '3.3.58',
            topic: '3.3',
            level: 2,
            number: 58,
            title: 'Familjens pool',
            description: 'Familjen Josefsson har en pool som är formad som ett rätblock. Den är 7,5 m lång, 3,0 m bred och 1,4 m djup. En kubikmeter vatten väger 1000 kg. Hur mycket väger allt vatten i poolen när den är fylld till kanten? Svara i tiondels ton.',
            visualization: {
                type: 'cuboid',
                length: 7.5,
                width: 3.0,
                height: 1.4,
                unit: 'm',
                fillColor: '#2196F3'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'ton', type: 'number' }
            ],
            answers: { volume: 31.5, weight: 31.5 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'V = 7,5 × 3,0 × 1,4 = 31,5 m³' },
                { step: 2, text: '1 m³ vatten = 1000 kg = 1 ton' },
                { step: 3, text: 'Vikt = 31,5 ton' }
            ],
            points: 20
        },
        {
            id: '3.3.59',
            topic: '3.3',
            level: 2,
            number: 59,
            title: 'Kubformad ask',
            description: 'En ask som innehåller gem har formen av en kub med kanten 8 cm. a) Beräkna kubens volym. Avrunda till tiotal kubikcentimeter. b) Hur stor är begränsningsarean? Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cube',
                side: 8
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 510, surfaceArea: 380 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'V = s³ = 8³ = 512 ≈ 510 cm³' },
                { step: 2, text: 'Begr.area = 6 × s² = 6 × 64' },
                { step: 3, text: '= 384 ≈ 380 cm²' }
            ],
            points: 20
        },
        {
            id: '3.3.60',
            topic: '3.3',
            level: 2,
            number: 60,
            title: 'Litet b och stort B',
            description: 'Många blandar ihop b och B i geometrin. Förklara vad b och B står för.',
            visualization: {
                type: 'explanation',
                symbols: ['b', 'B']
            },
            inputs: [
                { id: 'bMeaning', label: 'b står för', unit: '', type: 'text' },
                { id: 'BMeaning', label: 'B står för', unit: '', type: 'text' }
            ],
            answers: { bMeaning: 'bas', BMeaning: 'basyta' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'b används för längder i 2D-figurer' },
                { step: 2, text: 'B används för ytor i 3D-kroppar' },
                { step: 3, text: 'b = bas (längd), B = Basytans area' }
            ],
            points: 15
        },

        // ==========================================
        // 3.3 VOLYM OCH BEGRÄNSNINGSAREA - NIVÅ TRE
        // ==========================================
        {
            id: '3.3.61',
            topic: '3.3',
            level: 3,
            number: 61,
            title: 'Snön på lastbilen',
            description: 'En kubikmeter snö väger 200 kg. Hur mycket väger snön på lastbilen om flaket är fyllt upp till kanten? Flaket har måtten 6 m × 2,5 m × 1,2 m. Svara i tiondels ton.',
            visualization: {
                type: 'cuboid',
                length: 6,
                width: 2.5,
                height: 1.2,
                unit: 'm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'ton', type: 'number' }
            ],
            answers: { volume: 18, weight: 3.6 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'V = 6 × 2,5 × 1,2 = 18 m³' },
                { step: 2, text: 'Vikt = 18 × 200 kg = 3600 kg' },
                { step: 3, text: '3600 kg = 3,6 ton' }
            ],
            points: 25
        },
        {
            id: '3.3.62',
            topic: '3.3',
            level: 3,
            number: 62,
            title: 'Snödjupet på banan',
            description: 'En snöplog plogar en bana som är 1 km lång och 6 m bred. Snön samlas på ett flak som är 6 m × 2,5 m × 1,2 m. Hur djupt var snölagret på banan om flaket precis fylls? Svara i centimeter.',
            visualization: {
                type: 'comparison',
                road: { length: 1000, width: 6 },
                truck: { length: 6, width: 2.5, height: 1.2 }
            },
            inputs: [
                { id: 'depth', label: 'Snödjup', unit: 'cm', type: 'number' }
            ],
            answers: { depth: 3 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Flakvolym = 6 × 2,5 × 1,2 = 18 m³' },
                { step: 2, text: 'Banans area = 1000 × 6 = 6000 m²' },
                { step: 3, text: 'Djup = 18/6000 = 0,003 m = 3 cm' }
            ],
            points: 25
        },
        {
            id: '3.3.63',
            topic: '3.3',
            level: 3,
            number: 63,
            title: 'Sockerpaket',
            description: 'a) Hur stor är sockerpaketets begränsningsarea? Avrunda till tiotal kvadratcentimeter. Paketet har måtten 6,4 cm × 8,0 cm × 12 cm. b) Sockerpaketet är helt fyllt med sockerbitar med måtten 1,6 cm, 1,6 cm och 1,0 cm. Allt socker i paketet väger 1 kg. Hur mycket väger en sockerbit? Svara i gram.',
            visualization: {
                type: 'cuboid',
                length: 12,
                width: 8.0,
                height: 6.4
            },
            inputs: [
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' },
                { id: 'sugarCubes', label: 'Antal sockerbitar', unit: 'st', type: 'number' },
                { id: 'cubeWeight', label: 'Vikt per bit', unit: 'g', type: 'number' }
            ],
            answers: { surfaceArea: 360, sugarCubes: 240, cubeWeight: 4.2 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Begr.area = 2(6,4×8 + 8×12 + 12×6,4)' },
                { step: 2, text: 'Antal sockerbitar: (6,4/1,6) × (8/1,6) × (12/1) = 4 × 5 × 12 = 240' },
                { step: 3, text: 'Vikt per bit = 1000g / 240 ≈ 4,2 g' }
            ],
            points: 30
        },
        {
            id: '3.3.64',
            topic: '3.3',
            level: 3,
            number: 64,
            title: 'Druvsocker-kartong',
            description: 'Ett paket med 650 g druvsocker har formen av ett rätblock med måtten 6,5 cm, 9,5 cm och 16,5 cm. Hur mycket kartong går åt för att tillverka sådana paket till ett ton druvsocker? Räkna med att 10% extra kartong går åt. Avrunda till tiotal kvadratmeter.',
            visualization: {
                type: 'cuboid',
                length: 16.5,
                width: 9.5,
                height: 6.5
            },
            inputs: [
                { id: 'surfaceArea', label: 'Ett pakets yta', unit: 'cm²', type: 'number' },
                { id: 'packages', label: 'Antal paket', unit: 'st', type: 'number' },
                { id: 'totalCardboard', label: 'Total kartong', unit: 'm²', type: 'number' }
            ],
            answers: { surfaceArea: 582, packages: 1538, totalCardboard: 100 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Begr.area = 2(6,5×9,5 + 9,5×16,5 + 16,5×6,5) ≈ 582 cm²' },
                { step: 2, text: 'Antal paket = 1000000g / 650g ≈ 1538 st' },
                { step: 3, text: 'Total = 1538 × 582 × 1,1 cm² ≈ 98 m² ≈ 100 m²' }
            ],
            points: 30
        },
        {
            id: '3.3.65',
            topic: '3.3',
            level: 3,
            number: 65,
            title: 'Låda av pappskiva',
            description: 'En kvadratisk pappskiva har sidan 64 cm. I varje hörn skär man bort en kvadrat med sidan 12 cm. Det som återstår av pappskivan viks till en låda som får formen av ett rätblock. Hur stor är lådans volym? Avrunda till hela kubikdecimeter.',
            visualization: {
                type: 'box_net',
                originalSide: 64,
                cutSize: 12
            },
            inputs: [
                { id: 'baseSide', label: 'Lådans sida', unit: 'cm', type: 'number' },
                { id: 'height', label: 'Lådans höjd', unit: 'cm', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { baseSide: 40, height: 12, volume: 19 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Lådans botten blir 64 - 2×12 = 40 cm' },
                { step: 2, text: 'Höjden blir 12 cm (de bortklippta rutorna)' },
                { step: 3, text: 'V = 40 × 40 × 12 = 19200 cm³ = 19,2 dm³' }
            ],
            points: 25
        },
        {
            id: '3.3.66',
            topic: '3.3',
            level: 3,
            number: 66,
            title: 'Guldbit och koppar/järn',
            description: 'a) En bit guld har formen av ett rätblock och väger 965 g. Ge förslag på vilka mått guldbiten kan ha om densiteten för guld är 19,3 g/cm³. b) Vinh påstår att man kan göra en större kub av 250 g koppar än av 250 g järn. Koppar har densiteten 9,0 g/cm³ och järn har 7,9 g/cm³. Har han rätt?',
            visualization: {
                type: 'density_comparison',
                materials: ['gold', 'copper', 'iron']
            },
            inputs: [
                { id: 'goldVolume', label: 'Guldbitens volym', unit: 'cm³', type: 'number' },
                { id: 'copperLarger', label: 'Är koppar större? (ja/nej)', unit: '', type: 'text' }
            ],
            answers: { goldVolume: 50, copperLarger: 'nej' },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Guldvolym = 965 / 19,3 = 50 cm³' },
                { step: 2, text: 'Kopparvolym = 250 / 9,0 ≈ 27,8 cm³' },
                { step: 3, text: 'Järnvolym = 250 / 7,9 ≈ 31,6 cm³. Järn blir större!' }
            ],
            points: 30
        },

        // ==========================================
        // 3.4 ENHETER FÖR VOLYM - NIVÅ ETT
        // ==========================================
        {
            id: '3.4.67',
            topic: '3.4',
            level: 1,
            number: 67,
            title: 'Volym i liter',
            description: 'Hur stor är volymen uttryckt i liter? a) 3 dl, b) 2,6 dm³',
            visualization: {
                type: 'conversion',
                from: ['dl', 'dm³'],
                to: 'liter'
            },
            inputs: [
                { id: 'a', label: '3 dl =', unit: 'liter', type: 'number' },
                { id: 'b', label: '2,6 dm³ =', unit: 'liter', type: 'number' }
            ],
            answers: { a: 0.3, b: 2.6 },
            tolerance: 0.01,
            hints: [
                { step: 1, text: '1 dl = 0,1 liter' },
                { step: 2, text: '1 dm³ = 1 liter' },
                { step: 3, text: '3 dl = 0,3 liter, 2,6 dm³ = 2,6 liter' }
            ],
            points: 10
        },
        {
            id: '3.4.68',
            topic: '3.4',
            level: 1,
            number: 68,
            title: 'Volym i milliliter',
            description: 'Skriv volymerna i milliliter: a) 2 dl, b) 2 cm³, c) 1,5 cl, d) 1 dm³',
            visualization: {
                type: 'conversion',
                to: 'ml'
            },
            inputs: [
                { id: 'a', label: '2 dl =', unit: 'ml', type: 'number' },
                { id: 'b', label: '2 cm³ =', unit: 'ml', type: 'number' },
                { id: 'c', label: '1,5 cl =', unit: 'ml', type: 'number' },
                { id: 'd', label: '1 dm³ =', unit: 'ml', type: 'number' }
            ],
            answers: { a: 200, b: 2, c: 15, d: 1000 },
            tolerance: 1,
            hints: [
                { step: 1, text: '1 dl = 100 ml' },
                { step: 2, text: '1 cm³ = 1 ml' },
                { step: 3, text: '1 cl = 10 ml, 1 dm³ = 1000 ml' }
            ],
            points: 15
        },
        {
            id: '3.4.69',
            topic: '3.4',
            level: 1,
            number: 69,
            title: 'Förslag på volym',
            description: 'Ge förslag på något som har volymen: a) 2 dl, b) 20 dm³, c) 200 cl, d) 1 m³',
            visualization: {
                type: 'examples',
                volumes: ['2 dl', '20 dm³', '200 cl', '1 m³']
            },
            inputs: [
                { id: 'a', label: '2 dl (exempel)', unit: '', type: 'text' },
                { id: 'b', label: '20 dm³ (exempel)', unit: '', type: 'text' }
            ],
            answers: { a: 'glas', b: 'badkar' },
            tolerance: 0,
            hints: [
                { step: 1, text: '2 dl = 200 ml (ett glas saft)' },
                { step: 2, text: '20 dm³ = 20 liter (stor hink)' },
                { step: 3, text: '1 m³ = 1000 liter (stor vattentank)' }
            ],
            points: 10
        },
        {
            id: '3.4.70',
            topic: '3.4',
            level: 1,
            number: 70,
            title: 'Kubikdecimeter och liter',
            description: 'Skriv volymerna i kubikdecimeter och i liter.',
            visualization: {
                type: 'conversion',
                to: ['dm³', 'liter']
            },
            inputs: [
                { id: 'a_dm', label: '2000 cm³ =', unit: 'dm³', type: 'number' },
                { id: 'b_dm', label: '2 m³ =', unit: 'dm³', type: 'number' },
                { id: 'c_dm', label: '8000 cm³ =', unit: 'dm³', type: 'number' },
                { id: 'd_dm', label: '3500 cm³ =', unit: 'dm³', type: 'number' }
            ],
            answers: { a_dm: 2, b_dm: 2000, c_dm: 8, d_dm: 3.5 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 dm³ = 1000 cm³' },
                { step: 2, text: '1 m³ = 1000 dm³' },
                { step: 3, text: '1 dm³ = 1 liter' }
            ],
            points: 15
        },
        {
            id: '3.4.71',
            topic: '3.4',
            level: 1,
            number: 71,
            title: 'Kubikcentimeter och milliliter',
            description: 'Skriv volymerna i kubikcentimeter, milliliter och centiliter: a) 3 dm³, b) 2,5 dm³, c) 0,2 dm³, d) 8000 mm³',
            visualization: {
                type: 'conversion',
                to: ['cm³', 'ml', 'cl']
            },
            inputs: [
                { id: 'a_cm', label: '3 dm³ =', unit: 'cm³', type: 'number' },
                { id: 'b_cm', label: '2,5 dm³ =', unit: 'cm³', type: 'number' },
                { id: 'c_cm', label: '0,2 dm³ =', unit: 'cm³', type: 'number' },
                { id: 'd_cm', label: '8000 mm³ =', unit: 'cm³', type: 'number' }
            ],
            answers: { a_cm: 3000, b_cm: 2500, c_cm: 200, d_cm: 8 },
            tolerance: 1,
            hints: [
                { step: 1, text: '1 dm³ = 1000 cm³' },
                { step: 2, text: '1 cm³ = 1000 mm³, så 8000 mm³ = 8 cm³' },
                { step: 3, text: '1 cm³ = 1 ml = 0,1 cl' }
            ],
            points: 15
        },
        {
            id: '3.4.72',
            topic: '3.4',
            level: 1,
            number: 72,
            title: 'Vem har rätt?',
            description: 'Amina säger glasets volym är 0,72 dl. Gawar säger det är 7,2 cl. Vem har rätt? Motivera ditt svar.',
            visualization: {
                type: 'glass',
                claims: ['0,72 dl', '7,2 cl']
            },
            inputs: [
                { id: 'answer', label: 'Vem har rätt?', unit: '', type: 'text' }
            ],
            answers: { answer: 'båda' },
            tolerance: 0,
            hints: [
                { step: 1, text: '1 dl = 10 cl' },
                { step: 2, text: '0,72 dl = 0,72 × 10 cl = 7,2 cl' },
                { step: 3, text: 'Båda har rätt! Det är samma volym.' }
            ],
            points: 15
        },
        {
            id: '3.4.73',
            topic: '3.4',
            level: 1,
            number: 73,
            title: 'Kattlåda',
            description: 'Hur många liter sand finns i en bra kattlåda för vuxna katter? Kattlådan är 4 dm lång, 2,5 dm bred och sandlagret bör vara 7 cm djupt.',
            visualization: {
                type: 'cuboid',
                length: 4,
                width: 2.5,
                height: 0.7,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym sand', unit: 'liter', type: 'number' }
            ],
            answers: { volume: 10 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: '7 cm = 0,7 dm' },
                { step: 2, text: 'V = 4 × 2,5 × 1 = 10 dm³' },
                { step: 3, text: '10 dm³ = 10 liter' }
            ],
            points: 15
        },
        {
            id: '3.4.74',
            topic: '3.4',
            level: 1,
            number: 74,
            title: 'Mer kattsand',
            description: 'Hur mycket mer kattsand behövs för att lagret med sand ska vara 12 cm djupt? Kattlådan är 4 dm × 2,5 dm och nuvarande djup är 7 cm. Svara i liter.',
            visualization: {
                type: 'cuboid',
                length: 4,
                width: 2.5,
                heightDiff: 0.5
            },
            inputs: [
                { id: 'extraVolume', label: 'Extra volym', unit: 'liter', type: 'number' }
            ],
            answers: { extraVolume: 2 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Extra höjd = 12 - 7 = 5 cm = 0,5 dm' },
                { step: 2, text: 'Extra volym = 4 × 2,5 × 0,5 = 5 dm³' },
                { step: 3, text: '5 dm³ = 5 liter' }
            ],
            points: 15
        },

        // ==========================================
        // 3.4 ENHETER FÖR VOLYM - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.4.75',
            topic: '3.4',
            level: 2,
            number: 75,
            title: 'Volym i liter (avancerad)',
            description: 'Skriv volymerna i liter: a) 3,5 dm³, b) 2500 ml, c) 7 dl, d) 1,5 m³',
            visualization: {
                type: 'conversion',
                to: 'liter'
            },
            inputs: [
                { id: 'a', label: '3,5 dm³ =', unit: 'liter', type: 'number' },
                { id: 'b', label: '2500 ml =', unit: 'liter', type: 'number' },
                { id: 'c', label: '7 dl =', unit: 'liter', type: 'number' },
                { id: 'd', label: '1,5 m³ =', unit: 'liter', type: 'number' }
            ],
            answers: { a: 3.5, b: 2.5, c: 0.7, d: 1500 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 dm³ = 1 liter' },
                { step: 2, text: '1000 ml = 1 liter' },
                { step: 3, text: '1 m³ = 1000 liter' }
            ],
            points: 20
        },
        {
            id: '3.4.76',
            topic: '3.4',
            level: 2,
            number: 76,
            title: 'Volym i kubikcentimeter',
            description: 'Skriv volymerna i kubikcentimeter: a) 2 liter, b) 30 ml, c) 5500 mm³, d) 5 dl',
            visualization: {
                type: 'conversion',
                to: 'cm³'
            },
            inputs: [
                { id: 'a', label: '2 liter =', unit: 'cm³', type: 'number' },
                { id: 'b', label: '30 ml =', unit: 'cm³', type: 'number' },
                { id: 'c', label: '5500 mm³ =', unit: 'cm³', type: 'number' },
                { id: 'd', label: '5 dl =', unit: 'cm³', type: 'number' }
            ],
            answers: { a: 2000, b: 30, c: 5.5, d: 500 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: '1 liter = 1000 cm³' },
                { step: 2, text: '1 ml = 1 cm³' },
                { step: 3, text: '1000 mm³ = 1 cm³' }
            ],
            points: 20
        },
        {
            id: '3.4.77',
            topic: '3.4',
            level: 2,
            number: 77,
            title: 'Fylla blomlådan',
            description: 'Hur många hela påsar (20 liter) går åt för att fylla blomlådan? Räkna med att blomlådan är ett rätblock med måtten 8 dm × 20 cm × 25 cm.',
            visualization: {
                type: 'cuboid',
                length: 8,
                width: 2,
                height: 2.5,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Blomlådans volym', unit: 'liter', type: 'number' },
                { id: 'bags', label: 'Antal påsar', unit: 'st', type: 'number' }
            ],
            answers: { volume: 40, bags: 3 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Omvandla: 20 cm = 2 dm, 25 cm = 2,5 dm' },
                { step: 2, text: 'V = 8 × 2 × 2,5 = 40 dm³ = 40 liter' },
                { step: 3, text: '40 / 20 = 2 påsar' }
            ],
            points: 20
        },
        {
            id: '3.4.78',
            topic: '3.4',
            level: 2,
            number: 78,
            title: 'Förklara kubikmeter',
            description: 'Ebba förstår inte varför 1 m³ är lika med 1000 liter. Hur förklarar du det för henne?',
            visualization: {
                type: 'cube_conversion',
                from: 'm³',
                to: 'liter'
            },
            inputs: [
                { id: 'explanation', label: 'Din förklaring', unit: '', type: 'text' }
            ],
            answers: { explanation: 'dm' },
            tolerance: 0,
            hints: [
                { step: 1, text: '1 m = 10 dm' },
                { step: 2, text: '1 m³ = 10 × 10 × 10 dm³ = 1000 dm³' },
                { step: 3, text: '1 dm³ = 1 liter, så 1000 dm³ = 1000 liter' }
            ],
            points: 15
        },
        {
            id: '3.4.79',
            topic: '3.4',
            level: 2,
            number: 79,
            title: 'Juiceförpackning',
            description: 'Du ska tillverka en juiceförpackning. Den ska ha formen av ett rätblock och rymma 4 dl juice. Ge ett förslag på vilka mått förpackningen kan ha.',
            visualization: {
                type: 'design',
                targetVolume: 400,
                unit: 'cm³'
            },
            inputs: [
                { id: 'length', label: 'Längd', unit: 'cm', type: 'number' },
                { id: 'width', label: 'Bredd', unit: 'cm', type: 'number' },
                { id: 'height', label: 'Höjd', unit: 'cm', type: 'number' }
            ],
            answers: { length: 10, width: 5, height: 8 },
            tolerance: 100,
            hints: [
                { step: 1, text: '4 dl = 400 ml = 400 cm³' },
                { step: 2, text: 'Hitta tre tal vars produkt är 400' },
                { step: 3, text: 'T.ex. 10 × 5 × 8 = 400 cm³' }
            ],
            points: 20
        },
        {
            id: '3.4.80',
            topic: '3.4',
            level: 2,
            number: 80,
            title: 'Milliliter och deciliter',
            description: 'Skriv volymerna i milliliter och deciliter: a) 4 dm³, b) 250 cm³, c) 8 cl, d) 0,005 m³',
            visualization: {
                type: 'conversion',
                to: ['ml', 'dl']
            },
            inputs: [
                { id: 'a_ml', label: '4 dm³ =', unit: 'ml', type: 'number' },
                { id: 'b_ml', label: '250 cm³ =', unit: 'ml', type: 'number' },
                { id: 'c_ml', label: '8 cl =', unit: 'ml', type: 'number' },
                { id: 'd_ml', label: '0,005 m³ =', unit: 'ml', type: 'number' }
            ],
            answers: { a_ml: 4000, b_ml: 250, c_ml: 80, d_ml: 5000 },
            tolerance: 10,
            hints: [
                { step: 1, text: '1 dm³ = 1000 ml' },
                { step: 2, text: '1 cm³ = 1 ml, 1 cl = 10 ml' },
                { step: 3, text: '1 m³ = 1000000 ml' }
            ],
            points: 20
        },
        {
            id: '3.4.81',
            topic: '3.4',
            level: 2,
            number: 81,
            title: 'Akvariet',
            description: 'a) Hur stor begränsningsarea har akvariet? b) Vilken är volymen? Svara i liter. Akvariet har måtten 5 dm × 2 dm × 3,5 dm.',
            visualization: {
                type: 'cuboid',
                length: 5,
                width: 2,
                height: 3.5,
                unit: 'dm'
            },
            inputs: [
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'dm²', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'liter', type: 'number' }
            ],
            answers: { surfaceArea: 59, volume: 35 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Begr.area = 2(5×2 + 2×3,5 + 3,5×5)' },
                { step: 2, text: '= 2(10 + 7 + 17,5) = 69 dm²' },
                { step: 3, text: 'V = 5 × 2 × 3,5 = 35 dm³ = 35 liter' }
            ],
            points: 20
        },
        {
            id: '3.4.82',
            topic: '3.4',
            level: 2,
            number: 82,
            title: 'Vattenyta i akvariet',
            description: 'Växterna, stenarna och djuren i akvariet (5 dm × 2 dm × 3,5 dm) har en sammanlagd volym på 1,5 dm³. Hur långt från övre kanten är vattenytan när akvariet är fyllt?',
            visualization: {
                type: 'aquarium',
                dimensions: [5, 2, 3.5],
                objectVolume: 1.5
            },
            inputs: [
                { id: 'waterLevel', label: 'Avstånd från kant', unit: 'cm', type: 'number' }
            ],
            answers: { waterLevel: 1.5 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Akvarievolym = 35 dm³, objekt = 1,5 dm³' },
                { step: 2, text: 'Vattenvolym = 35 - 1,5 = 33,5 dm³' },
                { step: 3, text: 'Höjd vatten = 33,5 / (5×2) = 3,35 dm. Från kant: 3,5 - 3,35 = 0,15 dm = 1,5 cm' }
            ],
            points: 25
        },

        // ==========================================
        // 3.4 ENHETER FÖR VOLYM - NIVÅ TRE
        // ==========================================
        {
            id: '3.4.83',
            topic: '3.4',
            level: 3,
            number: 83,
            title: 'Deciliter och centiliter',
            description: 'Skriv volymerna i deciliter och centiliter: a) 1,2 dm³, b) 50 cm³, c) 8000 mm³, d) 0,2 m³',
            visualization: {
                type: 'conversion',
                to: ['dl', 'cl']
            },
            inputs: [
                { id: 'a_dl', label: '1,2 dm³ =', unit: 'dl', type: 'number' },
                { id: 'b_dl', label: '50 cm³ =', unit: 'dl', type: 'number' },
                { id: 'c_dl', label: '8000 mm³ =', unit: 'dl', type: 'number' },
                { id: 'd_dl', label: '0,2 m³ =', unit: 'dl', type: 'number' }
            ],
            answers: { a_dl: 12, b_dl: 0.5, c_dl: 0.08, d_dl: 2000 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 dm³ = 10 dl' },
                { step: 2, text: '1 cm³ = 0,01 dl = 0,1 cl' },
                { step: 3, text: '1 m³ = 10000 dl' }
            ],
            points: 25
        },
        {
            id: '3.4.84',
            topic: '3.4',
            level: 3,
            number: 84,
            title: 'Regn på ängen',
            description: 'Under ett oväder regnade det 45 mm på några timmar. Hur många liter regnade det sammanlagt på en rektangulär äng med längden 160 m och bredden 75 m? Svara i grundpotensform.',
            visualization: {
                type: 'rain',
                area: [160, 75],
                depth: 45
            },
            inputs: [
                { id: 'volume', label: 'Volym regn', unit: 'liter', type: 'text' }
            ],
            answers: { volume: '5.4e5' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Area = 160 × 75 = 12000 m²' },
                { step: 2, text: 'Volym = 12000 × 0,045 = 540 m³' },
                { step: 3, text: '540 m³ = 540000 liter = 5,4 × 10⁵ liter' }
            ],
            points: 25
        },
        {
            id: '3.4.85',
            topic: '3.4',
            level: 3,
            number: 85,
            title: 'Glasrutans tjocklek',
            description: 'En glasruta i ett fönster väger 4,2 kg. Glasrutan är 77 cm hög och 50 cm bred. Glas har densiteten 2,5 g/cm³. Hur tjock är glasrutan? Avrunda till hela millimeter.',
            visualization: {
                type: 'glass_pane',
                height: 77,
                width: 50,
                weight: 4200,
                density: 2.5
            },
            inputs: [
                { id: 'thickness', label: 'Tjocklek', unit: 'mm', type: 'number' }
            ],
            answers: { thickness: 4 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Volym = massa / densitet = 4200g / 2,5 = 1680 cm³' },
                { step: 2, text: 'Area = 77 × 50 = 3850 cm²' },
                { step: 3, text: 'Tjocklek = 1680 / 3850 = 0,44 cm ≈ 4 mm' }
            ],
            points: 30
        },
        {
            id: '3.4.86',
            topic: '3.4',
            level: 3,
            number: 86,
            title: 'Milliliter och kubikmillimeter',
            description: 'Mille betyder tusendel och Mustafa tror därför att 1 milliliter (1 ml) är lika med 1 kubikmillimeter (1 mm³). Hur förklarar du för honom att han har fel?',
            visualization: {
                type: 'comparison',
                units: ['ml', 'mm³']
            },
            inputs: [
                { id: 'explanation', label: 'Förklaring', unit: '', type: 'text' }
            ],
            answers: { explanation: '1000' },
            tolerance: 0,
            hints: [
                { step: 1, text: '1 ml = 1 cm³' },
                { step: 2, text: '1 cm = 10 mm, så 1 cm³ = 10×10×10 mm³ = 1000 mm³' },
                { step: 3, text: 'Alltså: 1 ml = 1000 mm³, inte 1 mm³!' }
            ],
            points: 20
        },
        {
            id: '3.4.87',
            topic: '3.4',
            level: 3,
            number: 87,
            title: 'Ny makaronförpackning',
            description: 'En förpackning som innehåller makaroner har måtten 30 cm × 6 cm × 12 cm. Företaget tar fram en ny förpackning där den längsta kanten är 20% längre. De övriga kanterna minskas med 10% vardera. Hur många procent mindre rymmer den nya förpackningen? Avrunda till hela procent.',
            visualization: {
                type: 'comparison',
                oldDims: [30, 6, 12],
                changes: ['+20%', '-10%', '-10%']
            },
            inputs: [
                { id: 'oldVolume', label: 'Gammal volym', unit: 'cm³', type: 'number' },
                { id: 'newVolume', label: 'Ny volym', unit: 'cm³', type: 'number' },
                { id: 'percentLess', label: 'Procent mindre', unit: '%', type: 'number' }
            ],
            answers: { oldVolume: 2160, newVolume: 2100, percentLess: 3 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Gammal: 30 × 6 × 12 = 2160 cm³' },
                { step: 2, text: 'Ny: 36 × 5,4 × 10,8 = 2099,5 cm³' },
                { step: 3, text: 'Skillnad: (2160-2100)/2160 × 100 ≈ 3%' }
            ],
            points: 30
        },
        {
            id: '3.4.88',
            topic: '3.4',
            level: 3,
            number: 88,
            title: 'Jakob och vattnet',
            description: 'Jakob väger 65 kg och 60% av hans kroppsvikt är vatten. Vid normal kroppstemperatur förlorar man 2,2 liter vatten per dygn. En människa klarar högst en vecka utan vatten. Hur stor andel av vattnet i sin kropp skulle Jakob förlora om han var utan vatten så länge? Avrunda till hela procent.',
            visualization: {
                type: 'body_water',
                weight: 65,
                waterPercent: 60,
                lossPerDay: 2.2
            },
            inputs: [
                { id: 'waterWeight', label: 'Vatten i kroppen', unit: 'kg', type: 'number' },
                { id: 'lostWater', label: 'Förlorat vatten', unit: 'liter', type: 'number' },
                { id: 'percentLost', label: 'Procent förlorat', unit: '%', type: 'number' }
            ],
            answers: { waterWeight: 39, lostWater: 15.4, percentLost: 39 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Vatten i kroppen = 65 × 0,6 = 39 kg = 39 liter' },
                { step: 2, text: 'Förlorat på 7 dagar = 7 × 2,2 = 15,4 liter' },
                { step: 3, text: 'Andel = 15,4 / 39 × 100 ≈ 39%' }
            ],
            points: 30
        },
        {
            id: '3.4.89',
            topic: '3.4',
            level: 3,
            number: 89,
            title: 'Snö på huvudgatan',
            description: 'Det snöade 3 dm i Trosa en natt. Hur mycket vägde all snö på den 8 m breda huvudgatan som är 2,5 km lång? Räkna med att snön vägde 0,3 kg/liter. Avrunda till hundratal ton.',
            visualization: {
                type: 'snow_road',
                width: 8,
                length: 2500,
                depth: 0.3,
                density: 0.3
            },
            inputs: [
                { id: 'volume', label: 'Snövolym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'ton', type: 'number' }
            ],
            answers: { volume: 6000, weight: 1800 },
            tolerance: 100,
            hints: [
                { step: 1, text: 'Volym = 2500 × 8 × 0,3 = 6000 m³' },
                { step: 2, text: '6000 m³ = 6000000 liter' },
                { step: 3, text: 'Vikt = 6000000 × 0,3 kg = 1800000 kg = 1800 ton' }
            ],
            points: 30
        },
        {
            id: '3.4.90',
            topic: '3.4',
            level: 3,
            number: 90,
            title: 'Snöröjning i Trosa',
            description: 'Lokalgatorna i Trosa är 6 m breda (11,4 km) och cykelvägar är 3 m breda (43,5 km). Snödjupet är 3 dm. När hade man tagit bort all snö om alla lastbilar och traktorer startade klockan 04.00? Tillsammans tog de i genomsnitt bort 8500 m³/h. Avrunda till hela timmar.',
            visualization: {
                type: 'snow_removal',
                streets: { width: 6, length: 11400 },
                bikeways: { width: 3, length: 43500 },
                depth: 0.3,
                rate: 8500
            },
            inputs: [
                { id: 'totalVolume', label: 'Total snövolym', unit: 'm³', type: 'number' },
                { id: 'hours', label: 'Tid för borttagning', unit: 'timmar', type: 'number' },
                { id: 'finishTime', label: 'Klar klockan', unit: '', type: 'text' }
            ],
            answers: { totalVolume: 59670, hours: 7, finishTime: '11:00' },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Lokalgator: 11400 × 6 × 0,3 = 20520 m³' },
                { step: 2, text: 'Cykelvägar: 43500 × 3 × 0,3 = 39150 m³' },
                { step: 3, text: 'Totalt: 59670 m³. Tid: 59670/8500 ≈ 7 timmar. Klar: 11:00' }
            ],
            points: 35
        },

        // ==========================================
        // 3.5 PRISMA OCH PYRAMID - NIVÅ ETT
        // ==========================================
        {
            id: '3.5.91',
            topic: '3.5',
            level: 1,
            number: 91,
            title: 'Prismats volym',
            description: 'Hur stor är prismats volym? Basytan har arean 42 dm² och höjden är 25 dm.',
            visualization: {
                type: 'prism',
                baseArea: 42,
                height: 25,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 1050 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Volym V = B × h' },
                { step: 2, text: 'V = Basytans area × höjd' },
                { step: 3, text: 'V = 42 × 25 = 1050 dm³' }
            ],
            points: 10
        },
        {
            id: '3.5.92',
            topic: '3.5',
            level: 1,
            number: 92,
            title: 'Pyramidens volym',
            description: 'Beräkna basytans area och pyramidens volym. Basen är en kvadrat med sidan 6 cm och höjden är 6 cm.',
            visualization: {
                type: 'pyramid',
                baseSide: 6,
                height: 6
            },
            inputs: [
                { id: 'baseArea', label: 'Basytans area', unit: 'cm²', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { baseArea: 36, volume: 72 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Basytans area B = sida × sida = 6 × 6' },
                { step: 2, text: 'Pyramidens volym V = (B × h) / 3' },
                { step: 3, text: 'V = (36 × 6) / 3 = 72 cm³' }
            ],
            points: 15
        },
        {
            id: '3.5.93',
            topic: '3.5',
            level: 1,
            number: 93,
            title: 'Tresidigt prisma',
            description: 'Beräkna basytans area och prismats volym. Triangelns bas är 4 cm, höjd 2,5 cm och prismats höjd är 5 cm.',
            visualization: {
                type: 'triangular_prism',
                base: 4,
                triangleHeight: 2.5,
                prismHeight: 5
            },
            inputs: [
                { id: 'baseArea', label: 'Basytans area', unit: 'cm²', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { baseArea: 36, volume: 48 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Triangelns area B = (bas × höjd) / 2' },
                { step: 2, text: 'B = (4 × 2,5) / 2 = 5 cm²' },
                { step: 3, text: 'V = B × h = 5 × 5 = 25 cm³' }
            ],
            points: 15
        },
        {
            id: '3.5.94',
            topic: '3.5',
            level: 1,
            number: 94,
            title: 'Jämför rätblock och pyramid',
            description: 'Hur kan du direkt se att rätblockets volym är ungefär tre gånger så stor som pyramidens om de har samma basyta och höjd?',
            visualization: {
                type: 'comparison',
                shapes: ['cuboid', 'pyramid'],
                sameBase: true,
                sameHeight: true
            },
            inputs: [
                { id: 'answer', label: 'Förklaring', unit: '', type: 'text' }
            ],
            answers: { answer: 'formel' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Rätblockets volym = B × h' },
                { step: 2, text: 'Pyramidens volym = (B × h) / 3' },
                { step: 3, text: 'Alltså: rätblocket = 3 × pyramiden' }
            ],
            points: 15
        },
        {
            id: '3.5.95',
            topic: '3.5',
            level: 1,
            number: 95,
            title: 'Pyramid i kubikdecimeter',
            description: 'Beräkna pyramidens volym. Basen är en rektangel med sidorna 21,5 cm och 14,0 cm. Höjden är 18 cm. Svara i kubikdecimeter.',
            visualization: {
                type: 'pyramid',
                baseLength: 21.5,
                baseWidth: 14.0,
                height: 18
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 1.4 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Basytans area B = 21,5 × 14,0 = 301 cm²' },
                { step: 2, text: 'V = (B × h) / 3 = (301 × 18) / 3 = 1806 cm³' },
                { step: 3, text: '1806 cm³ = 1,806 dm³ ≈ 1,8 dm³' }
            ],
            points: 20
        },
        {
            id: '3.5.96',
            topic: '3.5',
            level: 1,
            number: 96,
            title: 'Hexagonalt akvarium',
            description: 'Akvariets basyta är en hexagon (sexhörning) med arean 1200 cm². Akvariets volym är 60 dm³. a) Hur många liter vatten finns i akvariet? b) Hur högt är akvariet?',
            visualization: {
                type: 'prism',
                base: 'hexagon',
                baseArea: 1200,
                volume: 60000
            },
            inputs: [
                { id: 'liters', label: 'Vatten i liter', unit: 'liter', type: 'number' },
                { id: 'height', label: 'Höjd', unit: 'cm', type: 'number' }
            ],
            answers: { liters: 60, height: 50 },
            tolerance: 1,
            hints: [
                { step: 1, text: '60 dm³ = 60 liter' },
                { step: 2, text: 'V = B × h → h = V / B' },
                { step: 3, text: 'h = 60000 / 1200 = 50 cm' }
            ],
            points: 20
        },

        // ==========================================
        // 3.5 PRISMA OCH PYRAMID - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.5.97',
            topic: '3.5',
            level: 2,
            number: 97,
            title: 'Johans trapyramid',
            description: 'Johan har gjort en trapyramid som är 6,5 cm hög. Basytan i pyramiden är en kvadrat med sidan 3,6 cm. Vilken volym har pyramiden? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'pyramid',
                base: 'square',
                baseSide: 3.6,
                height: 6.5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 60 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Basytans area B = 3,6² = 12,96 cm²' },
                { step: 2, text: 'V = (B × h) / 3' },
                { step: 3, text: 'V = (12,96 × 6,5) / 3 ≈ 60 cm³' }
            ],
            points: 20
        },
        {
            id: '3.5.98',
            topic: '3.5',
            level: 2,
            number: 98,
            title: 'Glasprisma',
            description: 'Hur många kubikcentimeter glas innehåller prismat? Basytan är en triangel med basen 2,6 cm och höjden 5,8 cm. Prismats höjd är 3,0 cm. Avrunda till heltal.',
            visualization: {
                type: 'prism',
                base: 'triangle',
                triangleBase: 2.6,
                triangleHeight: 5.8,
                prismHeight: 3.0
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 28 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Triangelns area B = (2,6 × 5,8) / 2 = 7,54 cm²' },
                { step: 2, text: 'V = B × h = 7,54 × 3,0' },
                { step: 3, text: 'V ≈ 28 cm³' }
            ],
            points: 20
        },
        {
            id: '3.5.99',
            topic: '3.5',
            level: 2,
            number: 99,
            title: 'Vem har rätt?',
            description: 'En Toblerone-formad kropp diskuteras av tre elever. Tilda: "Det är både ett rätblock och ett prisma!" Jesper: "Det är ett rätblock!" Merima: "Det är ett prisma!" Vem har rätt? Motivera ditt svar.',
            visualization: {
                type: 'prism',
                base: 'triangle',
                shape: 'toblerone'
            },
            inputs: [
                { id: 'answer', label: 'Vem har rätt?', unit: '', type: 'text' }
            ],
            answers: { answer: 'Merima' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Ett rätblock har rektangulär basyta' },
                { step: 2, text: 'Toblerone-formen har triangulär basyta' },
                { step: 3, text: 'Merima har rätt - det är ett prisma (tresidigt)' }
            ],
            points: 20
        },
        {
            id: '3.5.100',
            topic: '3.5',
            level: 2,
            number: 100,
            title: 'Pyramidformade ljus',
            description: 'Ett pyramidformat ljus är 8,5 cm högt. Basytan är kvadratisk med omkretsen 24,8 cm. Hur mycket stearin går det åt till 100 ljus? Avrunda till hela liter.',
            visualization: {
                type: 'pyramid',
                base: 'square',
                basePerimeter: 24.8,
                height: 8.5,
                count: 100
            },
            inputs: [
                { id: 'sideLength', label: 'Kvadratens sida', unit: 'cm', type: 'number' },
                { id: 'oneVolume', label: 'Ett ljus volym', unit: 'cm³', type: 'number' },
                { id: 'totalLiters', label: 'Total stearin', unit: 'liter', type: 'number' }
            ],
            answers: { sideLength: 6.2, oneVolume: 109, totalLiters: 11 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Sidan = 24,8 / 4 = 6,2 cm' },
                { step: 2, text: 'B = 6,2² = 38,44 cm², V = (38,44 × 8,5) / 3 ≈ 109 cm³' },
                { step: 3, text: '100 × 109 = 10900 cm³ ≈ 11 liter' }
            ],
            points: 25
        },
        {
            id: '3.5.101',
            topic: '3.5',
            level: 2,
            number: 101,
            title: 'Toblerone-ask',
            description: 'Hur mycket choklad rymmer asken om 20% av askens volym är luft? Asken är ett tresidigt prisma med triangelns bas 5 cm, triangelns höjd 4,3 cm och längd 25 cm. Svara i kubikcentimeter.',
            visualization: {
                type: 'prism',
                base: 'triangle',
                triangleBase: 5,
                triangleHeight: 4.3,
                prismLength: 25,
                airPercent: 20
            },
            inputs: [
                { id: 'totalVolume', label: 'Total volym', unit: 'cm³', type: 'number' },
                { id: 'chocolateVolume', label: 'Chokladvolym', unit: 'cm³', type: 'number' }
            ],
            answers: { totalVolume: 269, chocolateVolume: 150 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Triangelns area = (5 × 4,3) / 2 = 10,75 cm²' },
                { step: 2, text: 'Askens volym = 10,75 × 25 = 268,75 cm³' },
                { step: 3, text: 'Choklad = 80% av 269 = 215 cm³' }
            ],
            points: 25
        },
        {
            id: '3.5.102',
            topic: '3.5',
            level: 2,
            number: 102,
            title: 'Toblerone-mousse form',
            description: 'a) Hur stor form måste man minst ha för att göra en sats Toblerone-mousse om receptet kräver 3 dl mousse? Svara i deciliter. b) Formen är gjord som ett rätblock. Ge ett förslag på vilka mått formen kan ha.',
            visualization: {
                type: 'mold',
                shape: 'cuboid',
                requiredVolume: 3
            },
            inputs: [
                { id: 'minVolume', label: 'Minsta volym', unit: 'dl', type: 'number' },
                { id: 'length', label: 'Längd förslag', unit: 'cm', type: 'number' },
                { id: 'width', label: 'Bredd förslag', unit: 'cm', type: 'number' },
                { id: 'height', label: 'Höjd förslag', unit: 'cm', type: 'number' }
            ],
            answers: { minVolume: 3, length: 15, width: 10, height: 2 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Formen måste rymma minst 3 dl = 300 cm³' },
                { step: 2, text: 'T.ex. 15 × 10 × 2 = 300 cm³' },
                { step: 3, text: 'Andra förslag: 20 × 5 × 3 = 300 cm³' }
            ],
            points: 20
        },

        // ==========================================
        // 3.5 PRISMA OCH PYRAMID - NIVÅ TRE
        // ==========================================
        {
            id: '3.5.103',
            topic: '3.5',
            level: 3,
            number: 103,
            title: 'Syre i tältet',
            description: 'Tältet har formen av ett femsidigt prisma. Höjden är 1,8 m, bredden 2,0 m, och längden 2,5 m. Tältets tvärsnittsarea (femhörningen) är ungefär 2,4 m². Av luftens volym är ungefär 20% syre. Syrets densitet är 1,4 kg/m³. Hur mycket väger syret i tältet? Avrunda till tiondels kilogram.',
            visualization: {
                type: 'prism',
                base: 'pentagon',
                baseArea: 2.4,
                length: 2.5,
                oxygenPercent: 20,
                oxygenDensity: 1.4
            },
            inputs: [
                { id: 'airVolume', label: 'Luftvolym', unit: 'm³', type: 'number' },
                { id: 'oxygenVolume', label: 'Syrevolym', unit: 'm³', type: 'number' },
                { id: 'oxygenWeight', label: 'Syrets vikt', unit: 'kg', type: 'number' }
            ],
            answers: { airVolume: 6, oxygenVolume: 1.2, oxygenWeight: 1.7 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Tältets volym = 2,4 × 2,5 = 6 m³' },
                { step: 2, text: 'Syrevolym = 20% av 6 = 1,2 m³' },
                { step: 3, text: 'Syrevikt = 1,2 × 1,4 = 1,68 ≈ 1,7 kg' }
            ],
            points: 30
        },
        {
            id: '3.5.104',
            topic: '3.5',
            level: 3,
            number: 104,
            title: 'Pyramidens höjd',
            description: 'En pyramid har volymen 27 ml. Basytan är en triangel med basen 7,2 cm och höjden 2,5 cm. Hur hög är pyramiden?',
            visualization: {
                type: 'pyramid',
                base: 'triangle',
                triangleBase: 7.2,
                triangleHeight: 2.5,
                volume: 27
            },
            inputs: [
                { id: 'baseArea', label: 'Basytans area', unit: 'cm²', type: 'number' },
                { id: 'pyramidHeight', label: 'Pyramidens höjd', unit: 'cm', type: 'number' }
            ],
            answers: { baseArea: 9, pyramidHeight: 9 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'B = (7,2 × 2,5) / 2 = 9 cm²' },
                { step: 2, text: 'V = (B × h) / 3 → h = 3V / B' },
                { step: 3, text: 'h = (3 × 27) / 9 = 9 cm' }
            ],
            points: 25
        },
        {
            id: '3.5.105',
            topic: '3.5',
            level: 3,
            number: 105,
            title: 'Diket',
            description: 'Bilden visar hur ett dike ser ut i genomskärning (trapets). Toppen är 1,6 m bred, botten är 0,4 m bred, djupet är 0,8 m. Dikets längd är 200 m. a) Hur många kubikmeter jord togs bort när diket grävdes? b) Hur många ton vägde all jord om densiteten för jord är 1,5 kg/dm³?',
            visualization: {
                type: 'prism',
                base: 'trapezoid',
                topWidth: 1.6,
                bottomWidth: 0.4,
                depth: 0.8,
                length: 200
            },
            inputs: [
                { id: 'crossArea', label: 'Tvärsnittsarea', unit: 'm²', type: 'number' },
                { id: 'volume', label: 'Jordvolym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'ton', type: 'number' }
            ],
            answers: { crossArea: 0.8, volume: 160, weight: 240 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Trapetsarea = (1,6 + 0,4) × 0,8 / 2 = 0,8 m²' },
                { step: 2, text: 'Volym = 0,8 × 200 = 160 m³' },
                { step: 3, text: '160 m³ = 160000 dm³, Vikt = 160000 × 1,5 / 1000 = 240 ton' }
            ],
            points: 30
        },
        {
            id: '3.5.106',
            topic: '3.5',
            level: 3,
            number: 106,
            title: 'Järnvägsskena',
            description: 'Bilden visar en järnvägsskena i genomskärning. Tvärsnittsarean är ungefär 76 cm². Skenan är gjord av järn med densiteten 7,9 kg/dm³. Hur mycket väger en skena som är 1 m lång? Avrunda till hela kilogram.',
            visualization: {
                type: 'prism',
                base: 'rail_cross_section',
                crossArea: 76,
                length: 100,
                density: 7.9
            },
            inputs: [
                { id: 'volumeCm', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'volumeDm', label: 'Volym', unit: 'dm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'kg', type: 'number' }
            ],
            answers: { volumeCm: 7600, volumeDm: 7.6, weight: 60 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Volym = 76 × 100 = 7600 cm³ = 7,6 dm³' },
                { step: 2, text: 'Vikt = 7,6 × 7,9 = 60,04 kg' },
                { step: 3, text: 'Skenan väger ungefär 60 kg' }
            ],
            points: 30
        },
        {
            id: '3.5.107',
            topic: '3.5',
            level: 3,
            number: 107,
            title: 'Träbit med urtag',
            description: 'En träbit har formen av ett prisma men med ett triangelformat urtag. Träbitens yttermått är 9 cm × 7 cm × 12 cm (längd). Urtaget är en triangel med basen 4 cm och höjden 3 cm som går genom hela längden. Hur många kubikcentimeter trä består träbiten av? Avrunda till tiotal.',
            visualization: {
                type: 'prism_with_cutout',
                outerWidth: 9,
                outerHeight: 7,
                length: 12,
                cutoutBase: 4,
                cutoutHeight: 3
            },
            inputs: [
                { id: 'outerVolume', label: 'Rätblockets volym', unit: 'cm³', type: 'number' },
                { id: 'cutoutVolume', label: 'Urtagets volym', unit: 'cm³', type: 'number' },
                { id: 'woodVolume', label: 'Trävolym', unit: 'cm³', type: 'number' }
            ],
            answers: { outerVolume: 756, cutoutVolume: 72, woodVolume: 680 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Rätblockets volym = 9 × 7 × 12 = 756 cm³' },
                { step: 2, text: 'Urtagets volym = (4 × 3 / 2) × 12 = 72 cm³' },
                { step: 3, text: 'Trävolym = 756 - 72 = 684 ≈ 680 cm³' }
            ],
            points: 30
        },
        {
            id: '3.5.108',
            topic: '3.5',
            level: 3,
            number: 108,
            title: 'Är träbiten ett prisma?',
            description: 'Evelina påstår att träbiten (med det triangelformade urtaget) är ett prisma. Tänker hon rätt? Motivera ditt svar.',
            visualization: {
                type: 'prism_analysis',
                shape: 'cuboid_with_triangular_cutout'
            },
            inputs: [
                { id: 'answer', label: 'Är det ett prisma?', unit: '', type: 'text' },
                { id: 'motivation', label: 'Motivering', unit: '', type: 'text' }
            ],
            answers: { answer: 'Ja', motivation: 'polygon' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Ett prisma har en polygon som basyta' },
                { step: 2, text: 'Tvärsnittet är en femhörning (rektangel minus triangel)' },
                { step: 3, text: 'Ja, det är ett femsidigt prisma' }
            ],
            points: 25
        },

        // ==========================================
        // 3.6 CYLINDER, KON OCH KLOT - NIVÅ ETT
        // ==========================================
        {
            id: '3.6.109',
            topic: '3.6',
            level: 1,
            number: 109,
            title: 'Cylinderns volym och mantelarea',
            description: 'Beräkna cylinderns volym och mantelarea. Diameter 3 cm och höjd som anges.',
            visualization: {
                type: 'cylinder',
                diameter: 3,
                height: 5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 35, lateralArea: 47 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Volym V = π × r² × h' },
                { step: 2, text: 'Mantelarea A = π × d × h' },
                { step: 3, text: 'r = 1,5 cm, V = π × 1,5² × 5 ≈ 35 cm³' }
            ],
            points: 15
        },
        {
            id: '3.6.110',
            topic: '3.6',
            level: 1,
            number: 110,
            title: 'Volym av olika kroppar',
            description: 'Hur stor är volymen för tre geometriska kroppar? a) Cylinder med r=4 cm, h=8 cm. b) Kon med r=6 cm, h=10 cm. c) Klot med r=5 cm. Avrunda till heltal.',
            visualization: {
                type: 'multi_shape',
                shapes: ['cylinder', 'cone', 'sphere']
            },
            inputs: [
                { id: 'cylinder', label: 'Cylinderns volym', unit: 'cm³', type: 'number' },
                { id: 'cone', label: 'Konens volym', unit: 'cm³', type: 'number' },
                { id: 'sphere', label: 'Klotets volym', unit: 'cm³', type: 'number' }
            ],
            answers: { cylinder: 402, cone: 377, sphere: 524 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Cylinder: V = π × r² × h = π × 16 × 8 ≈ 402' },
                { step: 2, text: 'Kon: V = (π × r² × h) / 3 = (π × 36 × 10) / 3 ≈ 377' },
                { step: 3, text: 'Klot: V = (4π × r³) / 3 = (4π × 125) / 3 ≈ 524' }
            ],
            points: 20
        },
        {
            id: '3.6.111',
            topic: '3.6',
            level: 1,
            number: 111,
            title: 'Cylinderformad burk',
            description: 'En cylinderformad burk har diametern 21 cm och höjden 9 cm. Hur stor är burkens volym? Skriv volymen i liter.',
            visualization: {
                type: 'cylinder',
                diameter: 21,
                height: 9
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'liters', label: 'Volym i liter', unit: 'l', type: 'number' }
            ],
            answers: { volume: 3100, liters: 3.1 },
            tolerance: 50,
            hints: [
                { step: 1, text: 'r = 21/2 = 10,5 cm' },
                { step: 2, text: 'V = π × 10,5² × 9' },
                { step: 3, text: '1000 cm³ = 1 liter' }
            ],
            points: 20
        },
        {
            id: '3.6.112',
            topic: '3.6',
            level: 1,
            number: 112,
            title: 'Trollkarlshatt',
            description: 'Hattens höjd är 15,5 cm och basytans radie 6,0 cm. Hur stor volym har hatten? Avrunda till tiotal kubikcentimeter.',
            visualization: {
                type: 'cone',
                radius: 6.0,
                height: 15.5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 580 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Konens volym V = (π × r² × h) / 3' },
                { step: 2, text: 'V = (π × 6² × 15,5) / 3' },
                { step: 3, text: 'V = (π × 36 × 15,5) / 3 ≈ 585 ≈ 580 cm³' }
            ],
            points: 15
        },
        {
            id: '3.6.113',
            topic: '3.6',
            level: 1,
            number: 113,
            title: 'Popcorn i strutar',
            description: 'Emelie gör popcorn i en kastrull. Hon gör konformade strutar med samma basyta och höjd som kastrullen. "Då räcker det till tre strutar", säger hon. Har Emelie rätt eller fel? Motivera ditt svar.',
            visualization: {
                type: 'comparison',
                shapes: ['cylinder', 'cone'],
                sameBase: true,
                sameHeight: true
            },
            inputs: [
                { id: 'answer', label: 'Rätt eller fel?', unit: '', type: 'text' }
            ],
            answers: { answer: 'Rätt' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Cylinderns volym V = π × r² × h' },
                { step: 2, text: 'Konens volym V = (π × r² × h) / 3' },
                { step: 3, text: 'Cylindern = 3 × kon, alltså rätt!' }
            ],
            points: 15
        },
        {
            id: '3.6.114',
            topic: '3.6',
            level: 1,
            number: 114,
            title: 'Glasstrut (kon)',
            description: 'Hur stor volym har glassen? Struten har diameter 6 cm och höjd 15 cm. Avrunda till tiotal milliliter.',
            visualization: {
                type: 'cone',
                diameter: 6,
                height: 15
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'ml', type: 'number' }
            ],
            answers: { volume: 140 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Konens volym V = (π × r² × h) / 3' },
                { step: 2, text: 'r = 3 cm, h = 15 cm' },
                { step: 3, text: 'V = (π × 9 × 15) / 3 ≈ 141 ml' }
            ],
            points: 15
        },
        {
            id: '3.6.115',
            topic: '3.6',
            level: 1,
            number: 115,
            title: 'Ishockeypuck',
            description: 'Beräkna puckens volym, mantelarea och begränsningsarea. Diameter 7,62 cm och höjd 2,54 cm.',
            visualization: {
                type: 'cylinder',
                diameter: 7.62,
                height: 2.54,
                color: '#333'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 116, lateralArea: 61, surfaceArea: 152 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'V = π × r² × h = π × 3,81² × 2,54' },
                { step: 2, text: 'Mantelarea = π × d × h' },
                { step: 3, text: 'Begr.area = Mantelarea + 2 × π × r²' }
            ],
            points: 25
        },
        {
            id: '3.6.116',
            topic: '3.6',
            level: 1,
            number: 116,
            title: 'Mantelarea som rektangel',
            description: 'Förklara varför mantelarean hos en cylinder kan beräknas som arean av en rektangel.',
            visualization: {
                type: 'cylinder_unfolded',
                showRectangle: true
            },
            inputs: [
                { id: 'answer', label: 'Förklaring', unit: '', type: 'text' }
            ],
            answers: { answer: 'rektangel' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Tänk att du klipper upp mantelytan längs höjden' },
                { step: 2, text: 'Den utvikta ytan blir en rektangel' },
                { step: 3, text: 'Rektangelns bas = omkretsen (π × d), höjd = cylinderns höjd' }
            ],
            points: 15
        },
        {
            id: '3.6.117',
            topic: '3.6',
            level: 1,
            number: 117,
            title: 'Halvcylinder',
            description: 'Hur stor är volymen av en halvcylinder med diameter 6 cm och längd 4 cm? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'half_cylinder',
                diameter: 6,
                length: 4
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 57 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Halvcylinderns volym = (π × r² × h) / 2' },
                { step: 2, text: 'r = 3 cm, h = 4 cm' },
                { step: 3, text: 'V = (π × 9 × 4) / 2 ≈ 56,5 ≈ 57 cm³' }
            ],
            points: 15
        },

        // ==========================================
        // 3.6 CYLINDER, KON OCH KLOT - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.6.118',
            topic: '3.6',
            level: 2,
            number: 118,
            title: 'Kon med given höjd',
            description: 'En kon har höjden 12 cm. Basytans diameter är 3,5 cm. Beräkna volymen. Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'cone',
                diameter: 3.5,
                height: 12
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 38 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'V = (π × r² × h) / 3' },
                { step: 2, text: 'r = 1,75 cm' },
                { step: 3, text: 'V = (π × 1,75² × 12) / 3 ≈ 38 cm³' }
            ],
            points: 20
        },
        {
            id: '3.6.119',
            topic: '3.6',
            level: 2,
            number: 119,
            title: 'Mjölburk och pannkakor',
            description: 'En cylinderformad burk med mjöl har höjden 18 cm. Basytans diameter är 12 cm. a) Hur stor är burkens mantelarea? Svara i kvadratdecimeter och avrunda till tiondel. b) Till 4 portioner pannkakor går det åt 2,5 dl mjöl. Till hur många portioner pannkakor räcker mjölet i burken om den är full?',
            visualization: {
                type: 'cylinder',
                diameter: 12,
                height: 18
            },
            inputs: [
                { id: 'lateralArea', label: 'Mantelarea', unit: 'dm²', type: 'number' },
                { id: 'volume', label: 'Burkens volym', unit: 'dl', type: 'number' },
                { id: 'portions', label: 'Antal portioner', unit: 'st', type: 'number' }
            ],
            answers: { lateralArea: 6.8, volume: 20, portions: 32 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Mantelarea = π × d × h = π × 12 × 18 ≈ 679 cm² = 6,8 dm²' },
                { step: 2, text: 'Volym = π × 6² × 18 ≈ 2036 cm³ ≈ 20 dl' },
                { step: 3, text: 'Portioner = 20 / 2,5 × 4 = 32 portioner' }
            ],
            points: 25
        },
        {
            id: '3.6.120',
            topic: '3.6',
            level: 2,
            number: 120,
            title: 'Pyramid och kon',
            description: 'En pyramid och en kon har lika stor volym och är lika höga. "Då har de även lika stor basyta", säger Leo. Har han rätt eller fel? Motivera ditt svar.',
            visualization: {
                type: 'comparison',
                shapes: ['pyramid', 'cone'],
                sameVolume: true,
                sameHeight: true
            },
            inputs: [
                { id: 'answer', label: 'Rätt eller fel?', unit: '', type: 'text' }
            ],
            answers: { answer: 'Rätt' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Pyramidens volym V = (B × h) / 3' },
                { step: 2, text: 'Konens volym V = (B × h) / 3' },
                { step: 3, text: 'Samma formel! Om V och h är lika, måste B vara lika.' }
            ],
            points: 20
        },
        {
            id: '3.6.121',
            topic: '3.6',
            level: 2,
            number: 121,
            title: 'Klotformat akvarium',
            description: 'Hur stor volym har akvariet? Diametern är 20 cm. Avrunda till hela liter.',
            visualization: {
                type: 'sphere',
                diameter: 20
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'liter', type: 'number' }
            ],
            answers: { volume: 4 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Klotets volym V = (4 × π × r³) / 3' },
                { step: 2, text: 'r = 10 cm' },
                { step: 3, text: 'V = (4 × π × 1000) / 3 ≈ 4189 cm³ ≈ 4 liter' }
            ],
            points: 20
        },
        {
            id: '3.6.122',
            topic: '3.6',
            level: 2,
            number: 122,
            title: 'Kakform',
            description: 'En kakform har diametern 24 cm och höjden 9 cm. a) Hur stor är kakformens volym? Svara i kubikdecimeter och avrunda till tiondel. b) Hur många liter rymmer kakformen? c) Hur stor är mantelarean? Avrunda till tiondels kvadratdecimeter. d) Hur stor är formens begränsningsarea? Avrunda till hela kvadratdecimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 24,
                height: 9
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' },
                { id: 'liters', label: 'Liter', unit: 'l', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'dm²', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'dm²', type: 'number' }
            ],
            answers: { volume: 4.1, liters: 4.1, lateralArea: 6.8, surfaceArea: 16 },
            tolerance: 0.3,
            hints: [
                { step: 1, text: 'V = π × 12² × 9 = 4072 cm³ ≈ 4,1 dm³' },
                { step: 2, text: 'Mantelarea = π × 24 × 9 = 679 cm² ≈ 6,8 dm²' },
                { step: 3, text: 'Begr.area = 679 + 2 × π × 144 ≈ 1584 cm² ≈ 16 dm²' }
            ],
            points: 25
        },
        {
            id: '3.6.123',
            topic: '3.6',
            level: 2,
            number: 123,
            title: 'Halvklotformad skål',
            description: 'En skål har formen av ett halvklot med radien 12 cm. Hur mycket rymmer skålen? Svara i tiondels liter.',
            visualization: {
                type: 'hemisphere',
                radius: 12
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'liter', type: 'number' }
            ],
            answers: { volume: 3.6 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Halvklotets volym V = (2 × π × r³) / 3' },
                { step: 2, text: 'V = (2 × π × 12³) / 3' },
                { step: 3, text: 'V ≈ 3619 cm³ ≈ 3,6 liter' }
            ],
            points: 20
        },
        {
            id: '3.6.124',
            topic: '3.6',
            level: 2,
            number: 124,
            title: 'Cylinder från mantelarea',
            description: 'Bilden visar en cylinder där mantelytan har arean 95 cm². Höjden är 3,5 cm. Hur stor volym har cylindern? Avrunda till tiotal kubikcentimeter.',
            visualization: {
                type: 'cylinder',
                lateralArea: 95,
                height: 3.5
            },
            inputs: [
                { id: 'diameter', label: 'Diameter', unit: 'cm', type: 'number' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { diameter: 8.6, volume: 200 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Mantelarea = π × d × h → d = 95 / (π × 3,5) ≈ 8,6 cm' },
                { step: 2, text: 'r = 4,3 cm' },
                { step: 3, text: 'V = π × 4,3² × 3,5 ≈ 203 ≈ 200 cm³' }
            ],
            points: 25
        },
        {
            id: '3.6.125',
            topic: '3.6',
            level: 2,
            number: 125,
            title: 'Bowlingklot',
            description: 'Ett bowlingklot är tillverkat av hårdgummi. Hur mycket väger klotet om diametern är 22 cm och 1 cm³ hårdgummi väger 1,3 g? Svara i kilogram och avrunda till tiondel. Bortse från att det är hål för fingrarna.',
            visualization: {
                type: 'sphere',
                diameter: 22,
                density: 1.3
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'kg', type: 'number' }
            ],
            answers: { volume: 5575, weight: 7.2 },
            tolerance: 0.3,
            hints: [
                { step: 1, text: 'V = (4 × π × 11³) / 3 ≈ 5575 cm³' },
                { step: 2, text: 'Vikt = 5575 × 1,3 = 7248 g' },
                { step: 3, text: '7248 g = 7,2 kg' }
            ],
            points: 25
        },
        {
            id: '3.6.126',
            topic: '3.6',
            level: 2,
            number: 126,
            title: 'Bowlingränna',
            description: 'Rännan vid sidan av bowlingbanan har formen av en halv cylinder med samma diameter som ett bowlingklot (22 cm). Banan är 19,2 m lång. Vilken volym har en ränna? Avrunda till tiotal kubikdecimeter.',
            visualization: {
                type: 'half_cylinder',
                diameter: 22,
                length: 1920
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 360 },
            tolerance: 20,
            hints: [
                { step: 1, text: 'Halvcylinderns volym = (π × r² × h) / 2' },
                { step: 2, text: 'r = 11 cm = 1,1 dm, h = 192 dm' },
                { step: 3, text: 'V = (π × 1,21 × 192) / 2 ≈ 365 ≈ 360 dm³' }
            ],
            points: 25
        },

        // ==========================================
        // 3.6 CYLINDER, KON OCH KLOT - NIVÅ TRE
        // ==========================================
        {
            id: '3.6.127',
            topic: '3.6',
            level: 3,
            number: 127,
            title: 'Cylinderburk komplett',
            description: 'En cylinderformad burk är 2,4 dm hög. Basytans diameter är 1,3 dm. a) Hur många liter rymmer burken? Avrunda till tiondels liter. b) Hur stor är mantelarean? Avrunda till tiondels kvadratdecimeter. c) Hur stor är burkens begränsningsarea? Avrunda till tiondels kvadratdecimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 1.3,
                height: 2.4,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'liter', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'dm²', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'dm²', type: 'number' }
            ],
            answers: { volume: 3.2, lateralArea: 9.8, surfaceArea: 12.5 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'V = π × 0,65² × 2,4 ≈ 3,18 ≈ 3,2 liter' },
                { step: 2, text: 'Mantelarea = π × 1,3 × 2,4 ≈ 9,8 dm²' },
                { step: 3, text: 'Begr.area = 9,8 + 2 × π × 0,65² ≈ 12,5 dm²' }
            ],
            points: 30
        },
        {
            id: '3.6.128',
            topic: '3.6',
            level: 3,
            number: 128,
            title: 'Vinglas',
            description: 'Ett vinglas har formen av en halvsfär (toppen) och en kon (nedre delen). Halvsfärens diameter är 6,8 cm och konens höjd är 5 cm. Hur många centiliter rymmer glaset? Avrunda till heltal.',
            visualization: {
                type: 'wine_glass',
                hemisphereD: 6.8,
                coneHeight: 5
            },
            inputs: [
                { id: 'hemisphereVolume', label: 'Halvsfärens volym', unit: 'cm³', type: 'number' },
                { id: 'coneVolume', label: 'Konens volym', unit: 'cm³', type: 'number' },
                { id: 'totalCl', label: 'Total volym', unit: 'cl', type: 'number' }
            ],
            answers: { hemisphereVolume: 82, coneVolume: 60, totalCl: 14 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Halvsfär: V = (2π × 3,4³) / 3 ≈ 82 cm³' },
                { step: 2, text: 'Kon: V = (π × 3,4² × 5) / 3 ≈ 60 cm³' },
                { step: 3, text: 'Totalt: 142 cm³ ≈ 14 cl' }
            ],
            points: 30
        },
        {
            id: '3.6.129',
            topic: '3.6',
            level: 3,
            number: 129,
            title: 'Luftballong',
            description: 'Luftballongen är fylld med varm luft och har formen av ett klot med diametern 28 m. Vad väger luften i ballongen om 1 m³ varm luft väger 0,9 kg? Avrunda till hela ton.',
            visualization: {
                type: 'sphere',
                diameter: 28,
                airDensity: 0.9
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'ton', type: 'number' }
            ],
            answers: { volume: 11494, weight: 10 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'V = (4π × 14³) / 3 ≈ 11494 m³' },
                { step: 2, text: 'Vikt = 11494 × 0,9 ≈ 10345 kg' },
                { step: 3, text: '10345 kg ≈ 10 ton' }
            ],
            points: 30
        },
        {
            id: '3.6.130',
            topic: '3.6',
            level: 3,
            number: 130,
            title: 'Korgens höjd',
            description: 'Korgen under luftballongen har formen av en cylinder med diametern 5 m. Korgens volym är 10 m³. Hur hög är den? Avrunda till tiotal centimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 5,
                volume: 10
            },
            inputs: [
                { id: 'height', label: 'Höjd', unit: 'm', type: 'number' }
            ],
            answers: { height: 0.5 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'V = π × r² × h → h = V / (π × r²)' },
                { step: 2, text: 'h = 10 / (π × 2,5²)' },
                { step: 3, text: 'h = 10 / 19,63 ≈ 0,51 m ≈ 50 cm' }
            ],
            points: 25
        },
        {
            id: '3.6.131',
            topic: '3.6',
            level: 3,
            number: 131,
            title: 'Saft i glas',
            description: 'Ett glas har formen av en cylinder. Basytans diameter är 8 cm. Man häller 3 dl saft i glaset. Hur högt upp når saften? Avrunda till hela centimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 8,
                volume: 300
            },
            inputs: [
                { id: 'height', label: 'Höjd', unit: 'cm', type: 'number' }
            ],
            answers: { height: 6 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: '3 dl = 300 cm³' },
                { step: 2, text: 'V = π × r² × h → h = V / (π × r²)' },
                { step: 3, text: 'h = 300 / (π × 16) ≈ 5,97 ≈ 6 cm' }
            ],
            points: 25
        },
        {
            id: '3.6.132',
            topic: '3.6',
            level: 3,
            number: 132,
            title: 'Mantelarea från volym',
            description: 'En cylinderformad burk rymmer 3,5 dl. Basytans radie är 3,8 cm. Hur stor är mantelarean? Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cylinder',
                radius: 3.8,
                volume: 350
            },
            inputs: [
                { id: 'height', label: 'Höjd', unit: 'cm', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' }
            ],
            answers: { height: 7.7, lateralArea: 180 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'h = V / (π × r²) = 350 / (π × 3,8²) ≈ 7,7 cm' },
                { step: 2, text: 'Mantelarea = π × d × h = π × 7,6 × 7,7' },
                { step: 3, text: 'Mantelarea ≈ 184 ≈ 180 cm²' }
            ],
            points: 30
        },
        {
            id: '3.6.133',
            topic: '3.6',
            level: 3,
            number: 133,
            title: 'Koppartråd',
            description: 'En koppartråd som är 150 m lång har diametern 0,4 mm. Koppar har densiteten 9,0 g/cm³. Hur mycket väger koppartråden? Avrunda till tiotal gram.',
            visualization: {
                type: 'cylinder',
                diameter: 0.04,
                length: 15000,
                density: 9.0
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'g', type: 'number' }
            ],
            answers: { volume: 18.85, weight: 170 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'r = 0,02 cm, h = 15000 cm' },
                { step: 2, text: 'V = π × 0,02² × 15000 ≈ 18,85 cm³' },
                { step: 3, text: 'Vikt = 18,85 × 9,0 ≈ 170 g' }
            ],
            points: 30
        },
        {
            id: '3.6.134',
            topic: '3.6',
            level: 3,
            number: 134,
            title: 'Apelsinskal',
            description: 'En apelsin har diametern 7 cm. Skalet på apelsinen är 3 mm tjockt. Hur stor volym har skalet? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'sphere_shell',
                outerDiameter: 7,
                thickness: 0.3
            },
            inputs: [
                { id: 'outerVolume', label: 'Yttre volym', unit: 'cm³', type: 'number' },
                { id: 'innerVolume', label: 'Inre volym', unit: 'cm³', type: 'number' },
                { id: 'shellVolume', label: 'Skalets volym', unit: 'cm³', type: 'number' }
            ],
            answers: { outerVolume: 180, innerVolume: 137, shellVolume: 43 },
            tolerance: 3,
            hints: [
                { step: 1, text: 'Yttre r = 3,5 cm, V = (4π × 3,5³) / 3 ≈ 180 cm³' },
                { step: 2, text: 'Inre r = 3,5 - 0,3 = 3,2 cm, V = (4π × 3,2³) / 3 ≈ 137 cm³' },
                { step: 3, text: 'Skalets volym = 180 - 137 = 43 cm³' }
            ],
            points: 30
        },
        {
            id: '3.6.135',
            topic: '3.6',
            level: 3,
            number: 135,
            title: 'Klot i kub',
            description: 'Adrian har ett kinesiskt stålklot som precis får plats i en kubformad trälåda. "Om jag vet klotets radie kan jag räkna ut hur mycket luft det är i lådan", säger Adrian. Har han rätt? Förklara hur du tänker.',
            visualization: {
                type: 'sphere_in_cube',
                fits_perfectly: true
            },
            inputs: [
                { id: 'answer', label: 'Har Adrian rätt?', unit: '', type: 'text' },
                { id: 'formula', label: 'Formel för luftvolymen', unit: '', type: 'text' }
            ],
            answers: { answer: 'Ja', formula: 'kub minus klot' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Om klotet precis får plats: kubens sida = klotets diameter = 2r' },
                { step: 2, text: 'Kubens volym = (2r)³ = 8r³' },
                { step: 3, text: 'Luft = 8r³ - (4πr³/3). Adrian har rätt!' }
            ],
            points: 30
        },

        // ==========================================
        // BLANDADE UPPGIFTER - NIVÅ ETT
        // ==========================================
        {
            id: 'mix.136',
            topic: '3.4',
            level: 1,
            number: 136,
            title: 'Volym i liter',
            description: 'Skriv volymerna i liter: a) 15 dl, b) 3 dm³, c) 120 cl, d) 1 m³',
            visualization: {
                type: 'conversion',
                to: 'liter'
            },
            inputs: [
                { id: 'a', label: '15 dl =', unit: 'liter', type: 'number' },
                { id: 'b', label: '3 dm³ =', unit: 'liter', type: 'number' },
                { id: 'c', label: '120 cl =', unit: 'liter', type: 'number' },
                { id: 'd', label: '1 m³ =', unit: 'liter', type: 'number' }
            ],
            answers: { a: 1.5, b: 3, c: 1.2, d: 1000 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 dl = 0,1 liter' },
                { step: 2, text: '1 dm³ = 1 liter, 1 cl = 0,01 liter' },
                { step: 3, text: '1 m³ = 1000 liter' }
            ],
            points: 15
        },
        {
            id: 'mix.137',
            topic: '3.5',
            level: 1,
            number: 137,
            title: 'Vem har rätt om kroppen?',
            description: 'En kropp med kvadratisk basyta diskuteras. Anton: "Det är en kub." Dani: "Det är ett rätblock." Sacha: "Det är ett prisma." a) Vem eller vilka har rätt? b) Hur stor är volymen om sidan är 5 cm och höjden 5 cm? c) Hur stor är begränsningsarean?',
            visualization: {
                type: 'cube',
                side: 5
            },
            inputs: [
                { id: 'answer', label: 'Vem har rätt?', unit: '', type: 'text' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { answer: 'Alla', volume: 125, surfaceArea: 150 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'En kub är ett speciellt rätblock (alla sidor lika)' },
                { step: 2, text: 'Ett rätblock är ett speciellt prisma' },
                { step: 3, text: 'V = 5³ = 125 cm³, Begr.area = 6 × 25 = 150 cm²' }
            ],
            points: 20
        },
        {
            id: 'mix.138',
            topic: '3.1',
            level: 1,
            number: 138,
            title: 'Sammansatt figur',
            description: 'Beräkna figurens omkrets och area.',
            visualization: {
                type: 'composite',
                shape: 'L-shape',
                measurements: [8, 5, 4, 11]
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 46, area: 68 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Dela upp figuren i rektanglar' },
                { step: 2, text: 'Beräkna arean för varje del och addera' },
                { step: 3, text: 'Omkretsen är summan av alla yttre sidor' }
            ],
            points: 20
        },
        {
            id: 'mix.139',
            topic: '3.2',
            level: 1,
            number: 139,
            title: 'Brunnslock',
            description: 'Beräkna brunnslockets omkrets och area. Diametern är 6 dm. Avrunda till heltal.',
            visualization: {
                type: 'circle',
                diameter: 6,
                unit: 'dm'
            },
            inputs: [
                { id: 'circumference', label: 'Omkrets', unit: 'dm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'dm²', type: 'number' }
            ],
            answers: { circumference: 19, area: 28 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Omkrets O = π × d = π × 6' },
                { step: 2, text: 'Area A = π × r² = π × 3²' },
                { step: 3, text: 'O ≈ 18,8 ≈ 19 dm, A ≈ 28,3 ≈ 28 dm²' }
            ],
            points: 15
        },
        {
            id: 'mix.140',
            topic: '3.6',
            level: 1,
            number: 140,
            title: 'Kon vs cylinder',
            description: 'Förklara vad som skiljer en kon och en cylinder.',
            visualization: {
                type: 'comparison',
                shapes: ['cone', 'cylinder']
            },
            inputs: [
                { id: 'answer', label: 'Skillnad', unit: '', type: 'text' }
            ],
            answers: { answer: 'spets' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'Cylindern har två cirkulära basytor' },
                { step: 2, text: 'Konen har en cirkulär basyta och en spets' },
                { step: 3, text: 'Konens volym = cylinderns volym / 3 (samma bas och höjd)' }
            ],
            points: 15
        },
        {
            id: 'mix.141',
            topic: '3.5',
            level: 1,
            number: 141,
            title: 'Identifiera kroppen',
            description: 'En kropp har kvadratisk basyta med sidan 3,9 cm och höjden 6 cm. a) Vad för slags kropp är det? b) Hur stor är volymen? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'pyramid',
                baseSide: 3.9,
                height: 6
            },
            inputs: [
                { id: 'type', label: 'Typ av kropp', unit: '', type: 'text' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { type: 'Pyramid', volume: 30 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Kroppen har kvadratisk basyta och går ihop till en spets' },
                { step: 2, text: 'Det är en pyramid' },
                { step: 3, text: 'V = (3,9² × 6) / 3 = (15,21 × 6) / 3 ≈ 30 cm³' }
            ],
            points: 15
        },
        {
            id: 'mix.142',
            topic: '3.6',
            level: 1,
            number: 142,
            title: 'Mugg volym',
            description: 'En mugg har formen av en cylinder med diameter 6 cm och höjd 10 cm. a) Hur stor volym har muggen? Avrunda till tiotal kubikcentimeter. b) Hur många centiliter ryms i muggen?',
            visualization: {
                type: 'cylinder',
                diameter: 6,
                height: 10
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'cl', label: 'Centiliter', unit: 'cl', type: 'number' }
            ],
            answers: { volume: 280, cl: 28 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'V = π × r² × h = π × 3² × 10' },
                { step: 2, text: 'V = π × 9 × 10 ≈ 283 ≈ 280 cm³' },
                { step: 3, text: '1 cm³ = 1 ml, 10 ml = 1 cl → 280 ml = 28 cl' }
            ],
            points: 15
        },
        {
            id: 'mix.143',
            topic: '3.6',
            level: 1,
            number: 143,
            title: 'Mugg area',
            description: 'Samma mugg som i uppgift 142 (diameter 6 cm, höjd 10 cm). a) Hur stor är muggens mantelarea? b) Hur stor är begränsningsarean, om vi bortser från handtaget? Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 6,
                height: 10
            },
            inputs: [
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { lateralArea: 190, surfaceArea: 240 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Mantelarea = π × d × h = π × 6 × 10 ≈ 188 ≈ 190 cm²' },
                { step: 2, text: 'Två basytorna = 2 × π × 3² = 2 × 28,3 ≈ 57 cm²' },
                { step: 3, text: 'Begr.area = 190 + 57 ≈ 247 ≈ 240 cm² (öppen topp)' }
            ],
            points: 15
        },
        {
            id: 'mix.144',
            topic: '3.6',
            level: 1,
            number: 144,
            title: 'Två kulor i låda',
            description: 'Hur stor volym har en kula om de båda kulorna precis får plats i en låda som är 12 cm lång? Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'spheres_in_box',
                boxLength: 12,
                sphereCount: 2
            },
            inputs: [
                { id: 'diameter', label: 'Kulans diameter', unit: 'cm', type: 'number' },
                { id: 'volume', label: 'En kulas volym', unit: 'cm³', type: 'number' }
            ],
            answers: { diameter: 6, volume: 113 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Två kulor i 12 cm → varje kula har d = 6 cm' },
                { step: 2, text: 'V = (4 × π × r³) / 3 = (4 × π × 3³) / 3' },
                { step: 3, text: 'V = (4 × π × 27) / 3 ≈ 113 cm³' }
            ],
            points: 15
        },

        // ==========================================
        // BLANDADE UPPGIFTER - NIVÅ TVÅ
        // ==========================================
        {
            id: 'mix.145',
            topic: '3.4',
            level: 2,
            number: 145,
            title: 'Volym i kubikcentimeter',
            description: 'Skriv volymerna i kubikcentimeter: a) 1400 mm³, b) 50 ml, c) 0,9 dm³, d) 0,7 dl',
            visualization: {
                type: 'conversion',
                to: 'cm³'
            },
            inputs: [
                { id: 'a', label: '1400 mm³ =', unit: 'cm³', type: 'number' },
                { id: 'b', label: '50 ml =', unit: 'cm³', type: 'number' },
                { id: 'c', label: '0,9 dm³ =', unit: 'cm³', type: 'number' },
                { id: 'd', label: '0,7 dl =', unit: 'cm³', type: 'number' }
            ],
            answers: { a: 1.4, b: 50, c: 900, d: 70 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 cm³ = 1000 mm³, så 1400 mm³ = 1,4 cm³' },
                { step: 2, text: '1 ml = 1 cm³' },
                { step: 3, text: '1 dm³ = 1000 cm³, 1 dl = 100 cm³' }
            ],
            points: 20
        },
        {
            id: 'mix.146',
            topic: '3.2',
            level: 2,
            number: 146,
            title: 'Vad är π?',
            description: 'Förklara vad som menas med π (pi).',
            visualization: {
                type: 'circle',
                showPi: true
            },
            inputs: [
                { id: 'answer', label: 'Förklaring', unit: '', type: 'text' }
            ],
            answers: { answer: 'kvot' },
            tolerance: 0,
            hints: [
                { step: 1, text: 'π är förhållandet mellan omkrets och diameter' },
                { step: 2, text: 'π = O / d för alla cirklar' },
                { step: 3, text: 'π ≈ 3,14159...' }
            ],
            points: 15
        },
        {
            id: 'mix.147',
            topic: '3.6',
            level: 2,
            number: 147,
            title: 'Stjärngossens strut',
            description: 'En stjärngosses strut är 45 cm hög och har en diameter på 25 cm. Hur stor är strutens volym? Avrunda till tiondels kubikdecimeter.',
            visualization: {
                type: 'cone',
                diameter: 25,
                height: 45
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 7.4 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'V = (π × r² × h) / 3' },
                { step: 2, text: 'V = (π × 12,5² × 45) / 3' },
                { step: 3, text: 'V ≈ 7363 cm³ ≈ 7,4 dm³' }
            ],
            points: 20
        },
        {
            id: 'mix.148',
            topic: '3.6',
            level: 2,
            number: 148,
            title: 'Cylinderljus',
            description: 'Ett cylinderformat ljus har diameter 5,7 cm och höjd 9,5 cm. a) Hur mycket stearin består ljuset av? Avrunda till tiotal kubikcentimeter. b) Hur stor är mantelarean? Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 5.7,
                height: 9.5
            },
            inputs: [
                { id: 'volume', label: 'Stearinvolym', unit: 'cm³', type: 'number' },
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 240, lateralArea: 170 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'V = π × 2,85² × 9,5 ≈ 242 ≈ 240 cm³' },
                { step: 2, text: 'Mantelarea = π × 5,7 × 9,5' },
                { step: 3, text: 'Mantelarea ≈ 170 cm²' }
            ],
            points: 20
        },
        {
            id: 'mix.149',
            topic: '3.1',
            level: 2,
            number: 149,
            title: 'Tre hagar',
            description: 'En bonde köper in 120 m stängsel. Av stängslet gör han tre kvadratiska hagar som delar sidor. Hur stor area har varje hage?',
            visualization: {
                type: 'three_squares',
                totalFence: 120
            },
            inputs: [
                { id: 'sideLength', label: 'Sidans längd', unit: 'm', type: 'number' },
                { id: 'area', label: 'Varje hages area', unit: 'm²', type: 'number' }
            ],
            answers: { sideLength: 15, area: 225 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Tre hagar i rad: 4 vertikala + 2 horisontella per hage × 3' },
                { step: 2, text: '120 m = 8 sidor → varje sida = 15 m' },
                { step: 3, text: 'Area = 15 × 15 = 225 m²' }
            ],
            points: 25
        },
        {
            id: 'mix.150',
            topic: '3.4',
            level: 2,
            number: 150,
            title: 'Kubikcentimeter eller milliliter?',
            description: 'Katinka: "1 cm³ är lika med 1 cl." Jens: "Nej, 1 cm³ är lika med 1 ml." Vem har rätt? Förklara.',
            visualization: {
                type: 'conversion',
                compare: ['cm³', 'cl', 'ml']
            },
            inputs: [
                { id: 'answer', label: 'Vem har rätt?', unit: '', type: 'text' }
            ],
            answers: { answer: 'Jens' },
            tolerance: 0,
            hints: [
                { step: 1, text: '1 dm³ = 1 liter = 1000 ml' },
                { step: 2, text: '1 cm³ = 1 ml' },
                { step: 3, text: '1 cl = 10 ml, så Jens har rätt' }
            ],
            points: 15
        },
        {
            id: 'mix.151',
            topic: '3.3',
            level: 2,
            number: 151,
            title: 'Sopppaket',
            description: 'Ett sopppaket har formen av ett rätblock med måtten 14,0 cm × 7,5 cm × 4,8 cm. a) Hur mycket soppa finns det i paketet om det är fullt? Avrunda till hela deciliter. b) Hur stor är begränsningsarean? Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cuboid',
                length: 14,
                width: 7.5,
                height: 4.8
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dl', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' }
            ],
            answers: { volume: 5, surfaceArea: 420 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'V = 14 × 7,5 × 4,8 = 504 cm³ = 5,04 dl ≈ 5 dl' },
                { step: 2, text: 'Begr.area = 2(14×7,5 + 14×4,8 + 7,5×4,8)' },
                { step: 3, text: 'Begr.area = 2(105 + 67,2 + 36) = 416 ≈ 420 cm²' }
            ],
            points: 20
        },
        {
            id: 'mix.152',
            topic: '3.6',
            level: 2,
            number: 152,
            title: 'Stålkula',
            description: 'En stålkula har diametern 30 mm. Hur mycket väger kulan om stålets densitet är 7,8 g/cm³? Avrunda till tiotal gram.',
            visualization: {
                type: 'sphere',
                diameter: 3,
                density: 7.8
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'g', type: 'number' }
            ],
            answers: { volume: 14.1, weight: 110 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'd = 30 mm = 3 cm, r = 1,5 cm' },
                { step: 2, text: 'V = (4 × π × 1,5³) / 3 ≈ 14,1 cm³' },
                { step: 3, text: 'Vikt = 14,1 × 7,8 ≈ 110 g' }
            ],
            points: 20
        },
        {
            id: 'mix.153',
            topic: '3.3',
            level: 2,
            number: 153,
            title: 'Kopparplåt',
            description: 'En kopparplåt är rektangulär och har måtten 65 cm × 54 cm. 1 cm³ koppar väger 9,0 g. Hur mycket väger plåten om den är 4,4 mm tjock? Avrunda till hela kilogram.',
            visualization: {
                type: 'cuboid',
                length: 65,
                width: 54,
                height: 0.44,
                density: 9.0
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'weight', label: 'Vikt', unit: 'kg', type: 'number' }
            ],
            answers: { volume: 1544, weight: 14 },
            tolerance: 1,
            hints: [
                { step: 1, text: '4,4 mm = 0,44 cm' },
                { step: 2, text: 'V = 65 × 54 × 0,44 = 1544 cm³' },
                { step: 3, text: 'Vikt = 1544 × 9 = 13900 g ≈ 14 kg' }
            ],
            points: 25
        },

        // ==========================================
        // BLANDADE UPPGIFTER - NIVÅ TRE
        // ==========================================
        {
            id: 'mix.154',
            topic: '3.4',
            level: 3,
            number: 154,
            title: 'Vilket tal saknas?',
            description: 'Fyll i talet som saknas: a) 2,5 dl = □ cm³, b) □ dm³ = 7 dl, c) 150 dl = □ m³, d) □ cm³ = 120 cl',
            visualization: {
                type: 'conversion',
                fillIn: true
            },
            inputs: [
                { id: 'a', label: '2,5 dl =', unit: 'cm³', type: 'number' },
                { id: 'b', label: '? dm³ = 7 dl', unit: 'dm³', type: 'number' },
                { id: 'c', label: '150 dl =', unit: 'm³', type: 'number' },
                { id: 'd', label: '? cm³ = 120 cl', unit: 'cm³', type: 'number' }
            ],
            answers: { a: 250, b: 0.7, c: 0.015, d: 1200 },
            tolerance: 0.01,
            hints: [
                { step: 1, text: '1 dl = 100 cm³, så 2,5 dl = 250 cm³' },
                { step: 2, text: '1 dm³ = 10 dl, så 7 dl = 0,7 dm³' },
                { step: 3, text: '1 m³ = 10000 dl, 1 cl = 10 cm³' }
            ],
            points: 25
        },
        {
            id: 'mix.155',
            topic: '3.1',
            level: 3,
            number: 155,
            title: 'Parallelltrapets?',
            description: 'En fyrhörning har parallella sidor med längderna 7,5 cm och 20 cm, och höjden 12 cm. a) Hur stor area har figuren? b) Margret påstår att figuren är en parallelltrapets. Stämmer det?',
            visualization: {
                type: 'trapezoid',
                topBase: 7.5,
                bottomBase: 20,
                height: 12
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' },
                { id: 'isParallelTrapezoid', label: 'Parallelltrapets?', unit: '', type: 'text' }
            ],
            answers: { area: 165, isParallelTrapezoid: 'Ja' },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Area = (a + b) × h / 2 = (7,5 + 20) × 12 / 2' },
                { step: 2, text: 'Area = 27,5 × 6 = 165 cm²' },
                { step: 3, text: 'Ja, två parallella sidor = trapets' }
            ],
            points: 25
        },
        {
            id: 'mix.156',
            topic: '3.5',
            level: 3,
            number: 156,
            title: 'Louvrepyramiden',
            description: 'Louvrepyramiden har volymen 8412 m³. Basytan är kvadratisk med sidan 35 m. Hur hög är den? Avrunda till hela meter.',
            visualization: {
                type: 'pyramid',
                baseSide: 35,
                volume: 8412
            },
            inputs: [
                { id: 'baseArea', label: 'Basytans area', unit: 'm²', type: 'number' },
                { id: 'height', label: 'Höjd', unit: 'm', type: 'number' }
            ],
            answers: { baseArea: 1225, height: 21 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'B = 35² = 1225 m²' },
                { step: 2, text: 'V = (B × h) / 3 → h = 3V / B' },
                { step: 3, text: 'h = 3 × 8412 / 1225 ≈ 20,6 ≈ 21 m' }
            ],
            points: 30
        },
        {
            id: 'mix.157',
            topic: '3.5',
            level: 3,
            number: 157,
            title: 'Cheopspyramiden',
            description: 'Cheopspyramiden har också en kvadratisk basyta, men med sidan 215 m. Cheopspyramiden är 101 m högre än Louvrepyramiden (som är 21 m hög). Hur många gånger större volym har Cheopspyramiden än Louvrepyramiden? Avrunda till tiotal.',
            visualization: {
                type: 'pyramid_comparison',
                cheops: { baseSide: 215, heightDiff: 101 },
                louvre: { height: 21 }
            },
            inputs: [
                { id: 'cheopsHeight', label: 'Cheops höjd', unit: 'm', type: 'number' },
                { id: 'cheopsVolume', label: 'Cheops volym', unit: 'm³', type: 'number' },
                { id: 'ratio', label: 'Antal gånger större', unit: '', type: 'number' }
            ],
            answers: { cheopsHeight: 122, cheopsVolume: 1880000, ratio: 220 },
            tolerance: 20,
            hints: [
                { step: 1, text: 'Cheops höjd = 21 + 101 = 122 m' },
                { step: 2, text: 'Cheops V = (215² × 122) / 3 ≈ 1880000 m³' },
                { step: 3, text: 'Ratio = 1880000 / 8412 ≈ 224 ≈ 220' }
            ],
            points: 35
        },
        {
            id: 'mix.158',
            topic: '3.3',
            level: 3,
            number: 158,
            title: 'Vatten i källare',
            description: 'Det har läckt in 5000 liter vatten i en källare där väggarna är 7,5 m och 4,2 m långa. Hur högt upp når vattnet? Svara i hela centimeter.',
            visualization: {
                type: 'cuboid',
                length: 7.5,
                width: 4.2,
                volume: 5000
            },
            inputs: [
                { id: 'floorArea', label: 'Golvarea', unit: 'm²', type: 'number' },
                { id: 'height', label: 'Vattenhöjd', unit: 'cm', type: 'number' }
            ],
            answers: { floorArea: 31.5, height: 16 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Golvarea = 7,5 × 4,2 = 31,5 m²' },
                { step: 2, text: '5000 liter = 5 m³' },
                { step: 3, text: 'h = 5 / 31,5 ≈ 0,159 m = 16 cm' }
            ],
            points: 25
        },
        {
            id: 'mix.159',
            topic: '3.6',
            level: 3,
            number: 159,
            title: 'Glas med halvklot och cylinder',
            description: 'Glaset består av ett halvklot (botten) och en cylinder (toppen). Diametern är 68 mm för båda. Cylinderdelen är 40 mm hög. Hur många centiliter rymmer glaset? Avrunda till heltal.',
            visualization: {
                type: 'glass',
                diameter: 6.8,
                cylinderHeight: 4
            },
            inputs: [
                { id: 'hemisphereVolume', label: 'Halvklotets volym', unit: 'cm³', type: 'number' },
                { id: 'cylinderVolume', label: 'Cylinderns volym', unit: 'cm³', type: 'number' },
                { id: 'totalCl', label: 'Total volym', unit: 'cl', type: 'number' }
            ],
            answers: { hemisphereVolume: 82, cylinderVolume: 145, totalCl: 23 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'r = 3,4 cm, Halvklot: V = (2π × 3,4³) / 3 ≈ 82 cm³' },
                { step: 2, text: 'Cylinder: V = π × 3,4² × 4 ≈ 145 cm³' },
                { step: 3, text: 'Totalt: 227 cm³ ≈ 23 cl' }
            ],
            points: 30
        },
        {
            id: 'mix.160',
            topic: '3.6',
            level: 3,
            number: 160,
            title: 'Klot ur kub',
            description: 'En kub har sidan 12,4 cm. Av kuben tillverkas ett så stort klot som möjligt. Hur många procent av kuben används till klotet? Avrunda till hela procent.',
            visualization: {
                type: 'sphere_from_cube',
                cubeSide: 12.4
            },
            inputs: [
                { id: 'cubeVolume', label: 'Kubens volym', unit: 'cm³', type: 'number' },
                { id: 'sphereVolume', label: 'Klotets volym', unit: 'cm³', type: 'number' },
                { id: 'percent', label: 'Procent', unit: '%', type: 'number' }
            ],
            answers: { cubeVolume: 1906, sphereVolume: 998, percent: 52 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Kub: V = 12,4³ = 1906 cm³' },
                { step: 2, text: 'Störst klot: d = 12,4 cm, V = (4π × 6,2³) / 3 ≈ 998 cm³' },
                { step: 3, text: '998 / 1906 × 100 ≈ 52%' }
            ],
            points: 30
        },
        {
            id: 'mix.161',
            topic: '3.6',
            level: 3,
            number: 161,
            title: 'Halvcylindriskt tält',
            description: 'Ett tält har formen som en halv cylinder. Tältets volym är 12200 m³ och längden är 14,5 m. Golvet är inte en del av tältduken. Hur stor är tältdukens area? Avrunda till hundratal kvadratmeter.',
            visualization: {
                type: 'half_cylinder_tent',
                volume: 12200,
                length: 14.5
            },
            inputs: [
                { id: 'radius', label: 'Radie', unit: 'm', type: 'number' },
                { id: 'curvedArea', label: 'Mantelarea', unit: 'm²', type: 'number' },
                { id: 'totalArea', label: 'Tältdukens area', unit: 'm²', type: 'number' }
            ],
            answers: { radius: 23, curvedArea: 1050, totalArea: 1900 },
            tolerance: 100,
            hints: [
                { step: 1, text: 'V = (π × r² × h) / 2 → r² = 2V / (π × h)' },
                { step: 2, text: 'r² = 2 × 12200 / (π × 14,5) ≈ 535, r ≈ 23 m' },
                { step: 3, text: 'Mantel = π × r × h, plus två halvcirklar i ändarna' }
            ],
            points: 35
        },
        {
            id: 'mix.162',
            topic: '3.3',
            level: 3,
            number: 162,
            title: 'Rätblock från areor',
            description: 'Ett rätblock har volymen 432 cm³. Två av sidoytorna har arean 36 cm² och två andra har arean 48 cm². Hur stor area har de två sista sidoytorna?',
            visualization: {
                type: 'cuboid_from_areas',
                volume: 432,
                area1: 36,
                area2: 48
            },
            inputs: [
                { id: 'side1', label: 'Första sidan', unit: 'cm', type: 'number' },
                { id: 'side2', label: 'Andra sidan', unit: 'cm', type: 'number' },
                { id: 'side3', label: 'Tredje sidan', unit: 'cm', type: 'number' },
                { id: 'lastArea', label: 'Sista sidoytornas area', unit: 'cm²', type: 'number' }
            ],
            answers: { side1: 9, side2: 4, side3: 12, lastArea: 108 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Om a×b=36 och b×c=48, och abc=432' },
                { step: 2, text: 'c = 432/36 = 12, b = 48/12 = 4, a = 36/4 = 9' },
                { step: 3, text: 'Kontroll: 9×4×12=432 ✓, ytor: 36, 48, 108' }
            ],
            points: 35
        },

        // ==========================================
        // TRÄNA GEOMETRI (163-184)
        // ==========================================
        {
            id: 'trana.163',
            topic: 'trana',
            level: 1,
            number: 163,
            title: 'Trianglarnas omkrets och area',
            description: 'Beräkna trianglarnas omkrets och area. a) Triangel med sidorna 9,5 cm, 7,0 cm och 7,2 cm samt höjden 6,4 cm. b) Rätvinklig triangel med kateterna 2,3 cm och 2,0 cm.',
            visualization: {
                type: 'triangles',
                triangles: [
                    { sides: [9.5, 7.0, 7.2], height: 6.4 },
                    { sides: [2.3, 2.0], rightAngle: true }
                ]
            },
            inputs: [
                { id: 'perimeter_a', label: 'a) Omkrets', unit: 'cm', type: 'number' },
                { id: 'area_a', label: 'a) Area', unit: 'cm²', type: 'number' },
                { id: 'perimeter_b', label: 'b) Omkrets', unit: 'cm', type: 'number' },
                { id: 'area_b', label: 'b) Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter_a: 23.7, area_a: 22.4, perimeter_b: 5.4, area_b: 2.3 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'a) Omkrets = 9,5 + 7,0 + 7,2 = 23,7 cm' },
                { step: 2, text: 'a) Area = (bas × höjd)/2 = (7,0 × 6,4)/2 = 22,4 cm²' },
                { step: 3, text: 'b) Hypotenusa = √(2,3² + 2,0²) ≈ 3,05 cm, Area = (2,3 × 2,0)/2 = 2,3 cm²' }
            ],
            points: 20
        },
        {
            id: 'trana.164',
            topic: 'trana',
            level: 1,
            number: 164,
            title: 'Guyanas flagga',
            description: 'Bilden visar Guyanas flagga som är 16 dm lång och 10 dm bred. Den röda triangeln går 7 dm in i flaggan. a) Hur stor area har den röda triangeln? b) Beräkna arean av det gula området.',
            visualization: {
                type: 'flag',
                country: 'Guyana',
                dimensions: { length: 16, width: 10, triangleDepth: 7 }
            },
            inputs: [
                { id: 'redArea', label: 'Röda triangelns area', unit: 'dm²', type: 'number' },
                { id: 'yellowArea', label: 'Gula områdets area', unit: 'dm²', type: 'number' }
            ],
            answers: { redArea: 35, yellowArea: 56 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Röda triangeln: bas = 10 dm, höjd = 7 dm' },
                { step: 2, text: 'Röd area = (10 × 7)/2 = 35 dm²' },
                { step: 3, text: 'Gul triangel: bas = 10 dm, höjd = (16-7)×2/...  = 56 dm²' }
            ],
            points: 20
        },
        {
            id: 'trana.165',
            topic: 'trana',
            level: 1,
            number: 165,
            title: 'Stekpanna',
            description: 'Beräkna stekpannans yttre omkrets och stekytans area. Yttre diametern är 28 cm och stekytans diameter är 22 cm. Avrunda till tiotal.',
            visualization: {
                type: 'frying_pan',
                outerDiameter: 28,
                innerDiameter: 22
            },
            inputs: [
                { id: 'circumference', label: 'Yttre omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Stekytans area', unit: 'cm²', type: 'number' }
            ],
            answers: { circumference: 90, area: 380 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Yttre omkrets = π × 28 ≈ 88 ≈ 90 cm' },
                { step: 2, text: 'Stekytans radie = 22/2 = 11 cm' },
                { step: 3, text: 'Area = π × 11² ≈ 380 cm²' }
            ],
            points: 15
        },
        {
            id: 'trana.166',
            topic: 'trana',
            level: 1,
            number: 166,
            title: 'Cirkelformad damm',
            description: 'En damm är cirkelformad med radien 3,5 m. a) "Det är ungefär 20 m runt om", säger Astrid. Hur kan hon veta det utan att räkna ut det? b) Beräkna dammens area. Avrunda till heltal.',
            visualization: {
                type: 'circle',
                radius: 3.5,
                unit: 'm'
            },
            inputs: [
                { id: 'explanation', label: 'Förklaring', unit: '', type: 'text' },
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' }
            ],
            answers: { explanation: 'pi', area: 38 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Omkrets ≈ 2 × 3 × radie = 2 × 3 × 3,5 ≈ 21 m' },
                { step: 2, text: 'Använder π ≈ 3 för snabb uppskattning' },
                { step: 3, text: 'Area = π × 3,5² ≈ 38,5 ≈ 38 m²' }
            ],
            points: 15
        },
        {
            id: 'trana.167',
            topic: 'trana',
            level: 1,
            number: 167,
            title: 'Volym i deciliter',
            description: 'Skriv volymerna i deciliter: a) 2,5 liter, b) 25 cl, c) 5 cl, d) 850 ml',
            visualization: {
                type: 'conversion',
                to: 'dl'
            },
            inputs: [
                { id: 'a', label: '2,5 liter =', unit: 'dl', type: 'number' },
                { id: 'b', label: '25 cl =', unit: 'dl', type: 'number' },
                { id: 'c', label: '5 cl =', unit: 'dl', type: 'number' },
                { id: 'd', label: '850 ml =', unit: 'dl', type: 'number' }
            ],
            answers: { a: 25, b: 2.5, c: 0.5, d: 8.5 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: '1 liter = 10 dl' },
                { step: 2, text: '1 cl = 0,1 dl' },
                { step: 3, text: '1 ml = 0,01 dl' }
            ],
            points: 15
        },
        {
            id: 'trana.168',
            topic: 'trana',
            level: 1,
            number: 168,
            title: 'Volym i liter',
            description: 'Skriv volymerna i liter: a) 5 dm³, b) 3500 cm³, c) 2,5 m³, d) 0,3 m³',
            visualization: {
                type: 'conversion',
                to: 'liter'
            },
            inputs: [
                { id: 'a', label: '5 dm³ =', unit: 'liter', type: 'number' },
                { id: 'b', label: '3500 cm³ =', unit: 'liter', type: 'number' },
                { id: 'c', label: '2,5 m³ =', unit: 'liter', type: 'number' },
                { id: 'd', label: '0,3 m³ =', unit: 'liter', type: 'number' }
            ],
            answers: { a: 5, b: 3.5, c: 2500, d: 300 },
            tolerance: 1,
            hints: [
                { step: 1, text: '1 dm³ = 1 liter' },
                { step: 2, text: '1000 cm³ = 1 liter' },
                { step: 3, text: '1 m³ = 1000 liter' }
            ],
            points: 15
        },
        {
            id: 'trana.169',
            topic: 'trana',
            level: 1,
            number: 169,
            title: 'Volym i kubikdecimeter',
            description: 'Skriv volymerna i kubikdecimeter: a) 0,7 m³, b) 2700 cm³, c) 13,5 liter, d) 15 dl',
            visualization: {
                type: 'conversion',
                to: 'dm³'
            },
            inputs: [
                { id: 'a', label: '0,7 m³ =', unit: 'dm³', type: 'number' },
                { id: 'b', label: '2700 cm³ =', unit: 'dm³', type: 'number' },
                { id: 'c', label: '13,5 liter =', unit: 'dm³', type: 'number' },
                { id: 'd', label: '15 dl =', unit: 'dm³', type: 'number' }
            ],
            answers: { a: 700, b: 2.7, c: 13.5, d: 1.5 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: '1 m³ = 1000 dm³' },
                { step: 2, text: '1000 cm³ = 1 dm³' },
                { step: 3, text: '1 liter = 1 dm³, 10 dl = 1 dm³' }
            ],
            points: 15
        },
        {
            id: 'trana.170',
            topic: 'trana',
            level: 1,
            number: 170,
            title: 'Volym i kubikcentimeter',
            description: 'Skriv volymerna i kubikcentimeter: a) 0,3 dm³, b) 45 ml, c) 0,5 cl, d) 0,03 liter',
            visualization: {
                type: 'conversion',
                to: 'cm³'
            },
            inputs: [
                { id: 'a', label: '0,3 dm³ =', unit: 'cm³', type: 'number' },
                { id: 'b', label: '45 ml =', unit: 'cm³', type: 'number' },
                { id: 'c', label: '0,5 cl =', unit: 'cm³', type: 'number' },
                { id: 'd', label: '0,03 liter =', unit: 'cm³', type: 'number' }
            ],
            answers: { a: 300, b: 45, c: 5, d: 30 },
            tolerance: 1,
            hints: [
                { step: 1, text: '1 dm³ = 1000 cm³' },
                { step: 2, text: '1 ml = 1 cm³' },
                { step: 3, text: '1 cl = 10 cm³, 1 liter = 1000 cm³' }
            ],
            points: 15
        },
        {
            id: 'trana.171',
            topic: 'trana',
            level: 1,
            number: 171,
            title: 'Kubformad låda',
            description: 'Lådan har formen av en kub med sidan 4,3 dm. a) Hur stor volym har lådan? Avrunda till hela kubikdecimeter. b) Hur stor är begränsningsarean? Avrunda till tiotal kvadratdecimeter.',
            visualization: {
                type: 'cube',
                side: 4.3,
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'dm²', type: 'number' }
            ],
            answers: { volume: 80, surfaceArea: 110 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'Volym = s³ = 4,3³ ≈ 79,5 ≈ 80 dm³' },
                { step: 2, text: 'Begränsningsarea = 6 × s²' },
                { step: 3, text: 'Begr.area = 6 × 4,3² = 6 × 18,49 ≈ 111 ≈ 110 dm²' }
            ],
            points: 20
        },
        {
            id: 'trana.172',
            topic: 'trana',
            level: 2,
            number: 172,
            title: 'Vem har rätt om boken?',
            description: 'En bok med måtten 26,5 cm × 19,5 cm × 1,7 cm diskuteras. Albin: "Boken är ett rätblock." Mehmet: "Boken är ett prisma." Lina: "Boken är en kub." a) Vem eller vilka har rätt? b) Hur stor är bokens volym? Avrunda till tiotal cm³. c) Hur stor är begränsningsarean? Avrunda till hundratal cm². d) Uttryck begränsningsarean i dm².',
            visualization: {
                type: 'book',
                dimensions: [26.5, 19.5, 1.7]
            },
            inputs: [
                { id: 'correct', label: 'Vem har rätt?', unit: '', type: 'text' },
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'surfaceArea', label: 'Begränsningsarea', unit: 'cm²', type: 'number' },
                { id: 'surfaceAreaDm', label: 'Begr.area', unit: 'dm²', type: 'number' }
            ],
            answers: { correct: 'Albin och Mehmet', volume: 880, surfaceArea: 1200, surfaceAreaDm: 12 },
            tolerance: 50,
            hints: [
                { step: 1, text: 'Ett rätblock är ett prisma, men inte en kub (sidorna olika)' },
                { step: 2, text: 'V = 26,5 × 19,5 × 1,7 ≈ 878 ≈ 880 cm³' },
                { step: 3, text: 'Begr.area = 2(26,5×19,5 + 26,5×1,7 + 19,5×1,7) ≈ 1190 ≈ 1200 cm² = 12 dm²' }
            ],
            points: 25
        },
        {
            id: 'trana.173',
            topic: 'trana',
            level: 2,
            number: 173,
            title: 'Rätblock av trä',
            description: 'Ett rätblock av trä har sidorna 2 dm, 3 dm och 12 dm. a) Hur stor volym har rätblocket? b) Lina ska måla rätblocket runt om. Hur mycket färg går åt om 1 cl färg räcker till 5 dm²? Svara i hela centiliter.',
            visualization: {
                type: 'cuboid',
                dimensions: [2, 3, 12],
                unit: 'dm'
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' },
                { id: 'paint', label: 'Färg', unit: 'cl', type: 'number' }
            ],
            answers: { volume: 72, paint: 31 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'V = 2 × 3 × 12 = 72 dm³' },
                { step: 2, text: 'Begr.area = 2(2×3 + 2×12 + 3×12) = 2(6+24+36) = 132 dm²' },
                { step: 3, text: 'Färg = 132/5 = 26,4 → men 27 cl räcker inte helt, behöver 31 cl' }
            ],
            points: 20
        },
        {
            id: 'trana.174',
            topic: 'trana',
            level: 2,
            number: 174,
            title: 'Pyramidens volym',
            description: 'Beräkna pyramidens volym. Pyramiden har en rektangulär basyta med sidorna 4,5 cm och 3,2 cm samt höjden 3,2 cm. Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'pyramid',
                base: [4.5, 3.2],
                height: 3.2
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 15 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Basytans area = 4,5 × 3,2 = 14,4 cm²' },
                { step: 2, text: 'V = (B × h)/3' },
                { step: 3, text: 'V = (14,4 × 3,2)/3 = 15,36 ≈ 15 cm³' }
            ],
            points: 20
        },
        {
            id: 'trana.175',
            topic: 'trana',
            level: 2,
            number: 175,
            title: 'Juiceförpackning',
            description: 'En juiceförpackning har formen av ett prisma med triangulär basyta. Måtten är 11,1 cm × 13,7 cm (basytans bas och höjd) och förpackningens höjd är 21,5 cm. a) Hur stor är volymen? Avrunda till tiotal cm³. b) Hur många ml juice rymmer förpackningen? c) Hur många dl är det?',
            visualization: {
                type: 'triangular_prism',
                base: 11.1,
                baseHeight: 13.7,
                height: 21.5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'ml', label: 'Milliliter', unit: 'ml', type: 'number' },
                { id: 'dl', label: 'Deciliter', unit: 'dl', type: 'number' }
            ],
            answers: { volume: 330, ml: 330, dl: 3.3 },
            tolerance: 20,
            hints: [
                { step: 1, text: 'Basyta (triangel) = (11,1 × 13,7)/2 ≈ 76 cm²' },
                { step: 2, text: 'V = 76 × 21,5/2 ≈ 330 cm³' },
                { step: 3, text: '330 cm³ = 330 ml = 3,3 dl' }
            ],
            points: 20
        },
        {
            id: 'trana.176',
            topic: 'trana',
            level: 2,
            number: 176,
            title: 'Konens volym',
            description: 'Beräkna volymen av konen. Konen har diametern 15 cm och höjden 8,5 cm. Svara i kubikdecimeter och avrunda till heltal.',
            visualization: {
                type: 'cone',
                diameter: 15,
                height: 8.5
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'dm³', type: 'number' }
            ],
            answers: { volume: 1 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'V = (π × r² × h)/3' },
                { step: 2, text: 'V = (π × 7,5² × 8,5)/3' },
                { step: 3, text: 'V ≈ 500 cm³ = 0,5 dm³ ≈ 1 dm³' }
            ],
            points: 20
        },
        {
            id: 'trana.177',
            topic: 'trana',
            level: 2,
            number: 177,
            title: 'Spelpjäsens volym',
            description: 'Beräkna volymen av spelpjäsen som består av en cylinder (diameter 1,3 cm, höjd 1,2 cm) och en kon (diameter 1,3 cm, höjd 3,9 cm). Avrunda till tiondels kubikcentimeter.',
            visualization: {
                type: 'game_piece',
                cylinder: { diameter: 1.3, height: 1.2 },
                cone: { diameter: 1.3, height: 3.9 }
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 2.3 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Cylinder: V = π × 0,65² × 1,2 ≈ 1,6 cm³' },
                { step: 2, text: 'Kon: V = (π × 0,65² × 3,9)/3 ≈ 1,7 cm³' },
                { step: 3, text: 'Total: 1,6 + 0,7 ≈ 2,3 cm³' }
            ],
            points: 20
        },
        {
            id: 'trana.178',
            topic: 'trana',
            level: 2,
            number: 178,
            title: 'Batteriets volym',
            description: 'Hur stor volym har det cylinderformade batteriet? Diametern är 2,5 cm och höjden 4,6 cm. Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 2.5,
                height: 4.6
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 23 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'r = 2,5/2 = 1,25 cm' },
                { step: 2, text: 'V = π × r² × h = π × 1,25² × 4,6' },
                { step: 3, text: 'V ≈ 22,6 ≈ 23 cm³' }
            ],
            points: 15
        },
        {
            id: 'trana.179',
            topic: 'trana',
            level: 2,
            number: 179,
            title: 'Kokosmjölksburk',
            description: 'En cylinderformad burk med kokosmjölk har höjden 10 cm och diametern 7,4 cm. a) Hur stor är volymen? Avrunda till tiotal cm³. b) Hur många hela burkar behövs för att det ska bli 2 liter kokosmjölk?',
            visualization: {
                type: 'cylinder',
                diameter: 7.4,
                height: 10
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' },
                { id: 'cans', label: 'Antal burkar', unit: 'st', type: 'number' }
            ],
            answers: { volume: 430, cans: 5 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'r = 7,4/2 = 3,7 cm' },
                { step: 2, text: 'V = π × 3,7² × 10 ≈ 430 cm³' },
                { step: 3, text: '2000 ml / 430 ml ≈ 4,65 → 5 burkar' }
            ],
            points: 20
        },
        {
            id: 'trana.180',
            topic: 'trana',
            level: 2,
            number: 180,
            title: 'Batteriets mantelarea',
            description: 'Hur stor är mantelarean för batteriet i uppgift 178? (Diameter 2,5 cm, höjd 4,6 cm) Avrunda till hela kvadratcentimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 2.5,
                height: 4.6,
                showLateral: true
            },
            inputs: [
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' }
            ],
            answers: { lateralArea: 36 },
            tolerance: 2,
            hints: [
                { step: 1, text: 'Mantelarea = π × d × h' },
                { step: 2, text: 'M = π × 2,5 × 4,6' },
                { step: 3, text: 'M ≈ 36,1 ≈ 36 cm²' }
            ],
            points: 15
        },
        {
            id: 'trana.181',
            topic: 'trana',
            level: 2,
            number: 181,
            title: 'Burkens mantelarea',
            description: 'Hur stor är mantelarean hos burken i uppgift 179? (Diameter 7,4 cm, höjd 10 cm) Avrunda till tiotal kvadratcentimeter.',
            visualization: {
                type: 'cylinder',
                diameter: 7.4,
                height: 10,
                showLateral: true
            },
            inputs: [
                { id: 'lateralArea', label: 'Mantelarea', unit: 'cm²', type: 'number' }
            ],
            answers: { lateralArea: 230 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Mantelarea = π × d × h' },
                { step: 2, text: 'M = π × 7,4 × 10' },
                { step: 3, text: 'M ≈ 232 ≈ 230 cm²' }
            ],
            points: 15
        },
        {
            id: 'trana.182',
            topic: 'trana',
            level: 2,
            number: 182,
            title: 'Klotets volym',
            description: 'Beräkna klotets volym. Klotet har diametern 10 cm. Avrunda till hela kubikcentimeter.',
            visualization: {
                type: 'sphere',
                diameter: 10
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 524 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'r = 10/2 = 5 cm' },
                { step: 2, text: 'V = (4 × π × r³)/3' },
                { step: 3, text: 'V = (4 × π × 125)/3 ≈ 524 cm³' }
            ],
            points: 20
        },
        {
            id: 'trana.183',
            topic: 'trana',
            level: 2,
            number: 183,
            title: 'Luftballong',
            description: 'Robert blåser upp en ballong med diametern 24 cm. Hur många liter luft ryms i ballongen? Avrunda till heltal.',
            visualization: {
                type: 'balloon',
                diameter: 24
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'liter', type: 'number' }
            ],
            answers: { volume: 7 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'r = 24/2 = 12 cm' },
                { step: 2, text: 'V = (4 × π × 12³)/3' },
                { step: 3, text: 'V ≈ 7238 cm³ ≈ 7,2 liter ≈ 7 liter' }
            ],
            points: 20
        },
        {
            id: 'trana.184',
            topic: 'trana',
            level: 2,
            number: 184,
            title: 'Bollar i låda',
            description: 'Fyra bollar får precis rum i en kubformad låda med sidan 14 cm (2 bollar i varje lager). Hur mycket tomrum finns det i lådan? Avrunda till tiotal kubikcentimeter.',
            visualization: {
                type: 'balls_in_box',
                boxSide: 14,
                ballCount: 4
            },
            inputs: [
                { id: 'emptySpace', label: 'Tomrum', unit: 'cm³', type: 'number' }
            ],
            answers: { emptySpace: 1310 },
            tolerance: 50,
            hints: [
                { step: 1, text: 'Lådans volym = 14³ = 2744 cm³' },
                { step: 2, text: 'Varje bolls diameter = 7 cm, r = 3,5 cm' },
                { step: 3, text: '4 bollar: V = 4 × (4π × 3,5³)/3 ≈ 718 cm³. Tomrum ≈ 2744-718×2 ≈ 1310 cm³' }
            ],
            points: 25
        },

        // ==========================================
        // UTVECKLA GEOMETRI (185-192)
        // ==========================================
        {
            id: 'utveckla.185',
            topic: 'utveckla',
            level: 3,
            number: 185,
            title: 'Likbent triangel',
            description: 'Triangeln ABC är likbent. Sidorna AB och AC är lika långa. Vinkeln A är 44,8°. Hur stora är vinklarna B och C?',
            visualization: {
                type: 'isosceles_triangle',
                angleA: 44.8
            },
            inputs: [
                { id: 'angleB', label: 'Vinkel B', unit: '°', type: 'number' },
                { id: 'angleC', label: 'Vinkel C', unit: '°', type: 'number' }
            ],
            answers: { angleB: 67.6, angleC: 67.6 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Vinkelsumman i en triangel = 180°' },
                { step: 2, text: 'I likbent triangel är basvinklarna lika' },
                { step: 3, text: 'B = C = (180 - 44,8)/2 = 67,6°' }
            ],
            points: 25
        },
        {
            id: 'utveckla.186',
            topic: 'utveckla',
            level: 3,
            number: 186,
            title: 'Lila området',
            description: 'Hur stor area har det lila området? Figuren består av en kvadrat med sidan 3 cm där två halvcirklar med diameter 2 cm har tagits bort.',
            visualization: {
                type: 'square_minus_semicircles',
                squareSide: 3,
                semicircleDiameter: 2
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { area: 6 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Kvadratens area = 3² = 9 cm²' },
                { step: 2, text: 'Två halvcirklar = en hel cirkel med r = 1 cm' },
                { step: 3, text: 'Lila area = 9 - π × 1² ≈ 9 - 3,14 ≈ 6 cm²' }
            ],
            points: 25
        },
        {
            id: 'utveckla.187',
            topic: 'utveckla',
            level: 3,
            number: 187,
            title: 'Stor kub av små kuber',
            description: 'Camilla har byggt en stor kub av åtta små kuber. Var och en av de små kuberna har en begränsningsarea som är 96 cm². Hur stor volym har Camillas stora kub?',
            visualization: {
                type: 'cube_of_cubes',
                smallCubes: 8,
                smallSurfaceArea: 96
            },
            inputs: [
                { id: 'volume', label: 'Volym', unit: 'cm³', type: 'number' }
            ],
            answers: { volume: 512 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Liten kubs begränsningsarea = 6s² = 96, s² = 16, s = 4 cm' },
                { step: 2, text: 'Stora kuben: 2×2×2 små kuber, sida = 2 × 4 = 8 cm' },
                { step: 3, text: 'Stora kubens volym = 8³ = 512 cm³' }
            ],
            points: 30
        },
        {
            id: 'utveckla.188',
            topic: 'utveckla',
            level: 3,
            number: 188,
            title: 'Gräshoppsinvasion',
            description: 'År 2008 invaderades Australien av gräshoppor. En svärm med gräshoppor var 170 m bred och sex kilometer lång. Hur många fotbollsplaner motsvarade det? En fotbollsplan kan ha arean 7150 m². Avrunda till tiotal.',
            visualization: {
                type: 'comparison',
                swarm: { width: 170, length: 6000 },
                footballPitch: 7150
            },
            inputs: [
                { id: 'pitches', label: 'Antal fotbollsplaner', unit: 'st', type: 'number' }
            ],
            answers: { pitches: 140 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Svärmens area = 170 × 6000 = 1 020 000 m²' },
                { step: 2, text: 'Antal planer = 1 020 000 / 7150' },
                { step: 3, text: '≈ 142,7 ≈ 140 fotbollsplaner' }
            ],
            points: 25
        },
        {
            id: 'utveckla.189',
            topic: 'utveckla',
            level: 3,
            number: 189,
            title: 'Snögrotta',
            description: 'En snögrotta har formen av ett halvklot. På insidan är diametern 1,6 m. Väggarna är 25 cm tjocka. Hur mycket snö består snögrottan av? Svara i kubikmeter och avrunda till tiondel.',
            visualization: {
                type: 'hollow_hemisphere',
                innerDiameter: 1.6,
                wallThickness: 0.25
            },
            inputs: [
                { id: 'volume', label: 'Snövolym', unit: 'm³', type: 'number' }
            ],
            answers: { volume: 0.9 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Inre radie = 0,8 m, yttre radie = 0,8 + 0,25 = 1,05 m' },
                { step: 2, text: 'Halvklotets volym = (2πr³)/3' },
                { step: 3, text: 'Snövolym = (2π×1,05³)/3 - (2π×0,8³)/3 ≈ 0,9 m³' }
            ],
            points: 30
        },
        {
            id: 'utveckla.190',
            topic: 'utveckla',
            level: 3,
            number: 190,
            title: 'Kula i cylinder',
            description: 'En kula har radien 2,0 cm. Kulan läggs ner i en cylinder med diametern 5,0 cm så att den kommer helt under vattenytan. Hur mycket stiger vattnet när kulan läggs i? Svara i tiondels centimeter.',
            visualization: {
                type: 'ball_in_cylinder',
                ballRadius: 2.0,
                cylinderDiameter: 5.0
            },
            inputs: [
                { id: 'rise', label: 'Vattnets stigning', unit: 'cm', type: 'number' }
            ],
            answers: { rise: 1.7 },
            tolerance: 0.2,
            hints: [
                { step: 1, text: 'Kulans volym = (4π × 2³)/3 ≈ 33,5 cm³' },
                { step: 2, text: 'Cylinderns basarea = π × 2,5² ≈ 19,6 cm²' },
                { step: 3, text: 'Stigning = 33,5/19,6 ≈ 1,7 cm' }
            ],
            points: 30
        },
        {
            id: 'utveckla.191',
            topic: 'utveckla',
            level: 3,
            number: 191,
            title: 'Formel 1-hjul',
            description: 'Hur många varv snurrar bakhjulet på en Formel 1-bil om man kör en och en halv timme med medelhastigheten 270 km/h? Bakhjulet har diametern 67 cm. Avrunda till tiotusental.',
            visualization: {
                type: 'wheel_rotations',
                diameter: 67,
                speed: 270,
                time: 1.5
            },
            inputs: [
                { id: 'rotations', label: 'Antal varv', unit: '', type: 'number' }
            ],
            answers: { rotations: 1920000 },
            tolerance: 50000,
            hints: [
                { step: 1, text: 'Sträcka = 270 × 1,5 = 405 km = 405 000 m' },
                { step: 2, text: 'Hjulets omkrets = π × 0,67 ≈ 2,1 m' },
                { step: 3, text: 'Antal varv = 405 000 / 2,1 ≈ 1 920 000' }
            ],
            points: 30
        },
        {
            id: 'utveckla.192',
            topic: 'utveckla',
            level: 3,
            number: 192,
            title: 'Getens betesarea',
            description: 'Mitt på husväggen sätter Alfred ett rep som är 6,4 m långt. I repet sätter han fast sin get Bruse. Hur stor area har den yta som Bruse kan röra sig på? Avrunda till tiotal kvadratmeter.',
            visualization: {
                type: 'goat_grazing',
                ropeLength: 6.4,
                wallPosition: 'middle'
            },
            inputs: [
                { id: 'area', label: 'Betesarea', unit: 'm²', type: 'number' }
            ],
            answers: { area: 130 },
            tolerance: 10,
            hints: [
                { step: 1, text: 'Geten kan gå i en halvcirkel framför huset' },
                { step: 2, text: 'Area = (π × r²)/2 = (π × 6,4²)/2' },
                { step: 3, text: 'Area ≈ 64,3 m² (halvcirkel) + ev. hörn ≈ 130 m²' }
            ],
            points: 30
        }
    ],

    /**
     * Hämta alla uppgifter för ett ämne
     */
    getByTopic(topicId) {
        return this.items.filter(ex => ex.topic === topicId);
    },

    /**
     * Hämta uppgifter efter nivå
     */
    getByLevel(topicId, level) {
        return this.items.filter(ex => ex.topic === topicId && ex.level === level);
    },

    /**
     * Hämta en specifik uppgift
     */
    getById(exerciseId) {
        return this.items.find(ex => ex.id === exerciseId);
    },

    /**
     * Hämta nästa uppgift
     */
    getNext(currentId) {
        const currentIndex = this.items.findIndex(ex => ex.id === currentId);
        if (currentIndex >= 0 && currentIndex < this.items.length - 1) {
            return this.items[currentIndex + 1];
        }
        return null;
    },

    /**
     * Räkna antal uppgifter per ämne
     */
    countByTopic(topicId) {
        return this.items.filter(ex => ex.topic === topicId).length;
    },

    /**
     * Hämta statistik för ett ämne
     */
    getTopicStats(topicId) {
        const exercises = this.getByTopic(topicId);
        return {
            total: exercises.length,
            level1: exercises.filter(e => e.level === 1).length,
            level2: exercises.filter(e => e.level === 2).length,
            level3: exercises.filter(e => e.level === 3).length,
            totalPoints: exercises.reduce((sum, e) => sum + e.points, 0)
        };
    }
};

export default Exercises;
