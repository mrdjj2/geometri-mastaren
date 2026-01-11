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
            description: 'Mät triangelns sidor i hela centimeter. Beräkna omkrets och area.',
            visualization: {
                type: 'triangle',
                sides: [5, 4, 3],
                height: 3.2,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 12, area: 6 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Omkretsen är summan av alla sidor: a + b + c' },
                { step: 2, text: 'Arean av en triangel beräknas med formeln A = (b·h)/2' },
                { step: 3, text: 'Om sidorna är 5, 4 och 3 cm, vad blir omkretsen?' }
            ],
            points: 15
        },
        {
            id: '3.1.2',
            topic: '3.1',
            level: 1,
            number: 2,
            title: 'Kvadrat med given area',
            description: 'En kvadrat har arean 16 cm². Rita en rektangel med samma omkrets som kvadraten. Hur stor area har din rektangel?',
            visualization: {
                type: 'square',
                side: 4,
                showArea: true
            },
            inputs: [
                { id: 'side', label: 'Kvadratens sida', unit: 'cm', type: 'number' },
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' }
            ],
            answers: { side: 4, perimeter: 16 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Om arean är 16 cm², vad är sidan? Tänk: s² = 16' },
                { step: 2, text: 'Sidan är √16 = 4 cm' },
                { step: 3, text: 'Omkretsen av en kvadrat är 4·s' }
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
            answers: { diameter: 0.95 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Omkretsen O = π·d, så d = O/π' },
                { step: 2, text: 'π ≈ 3,14, alltså d ≈ 3/3,14' },
                { step: 3, text: 'Mehmet använder att π ≈ 3, så d ≈ O/3 = 1 m' }
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
            description: 'Vilken sorts figur är det här? Beräkna figurens omkrets och area.',
            visualization: {
                type: 'parallelogram',
                base: 5,
                side: 2.5,
                height: 2,
                showMeasurements: true
            },
            inputs: [
                { id: 'perimeter', label: 'Omkrets', unit: 'cm', type: 'number' },
                { id: 'area', label: 'Area', unit: 'cm²', type: 'number' }
            ],
            answers: { perimeter: 15, area: 10 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'En parallellogram har två par parallella sidor' },
                { step: 2, text: 'Omkrets = 2·(bas + sida)' },
                { step: 3, text: 'Area = bas · höjd' }
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

        // ==========================================
        // 3.1 OMKRETS OCH AREA - NIVÅ TVÅ
        // ==========================================
        {
            id: '3.1.11',
            topic: '3.1',
            level: 2,
            number: 11,
            title: 'Klassrummets bredd',
            description: 'Under en matematiklektion mäter eleverna klassrummets längd och bredd. De räknar ut att klassrummets area är 28,5 m². Hur brett är klassrummet om det är 9 m långt?',
            visualization: {
                type: 'rectangle',
                length: 9,
                area: 28.5,
                showMeasurements: true
            },
            inputs: [
                { id: 'width', label: 'Bredd', unit: 'm', type: 'number' }
            ],
            answers: { width: 3.17 },
            tolerance: 0.05,
            hints: [
                { step: 1, text: 'Area = längd × bredd' },
                { step: 2, text: 'Bredd = Area / längd' },
                { step: 3, text: 'Bredd = 28,5 / 9' }
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

        // ==========================================
        // 3.2 CIRKELNS AREA - NIVÅ ETT
        // ==========================================
        {
            id: '3.2.31',
            topic: '3.2',
            level: 1,
            number: 31,
            title: 'Hängsmyckets area',
            description: 'Mät hängsmyckets diameter. Beräkna hängsmyckets area. Avrunda till hela kvadratcentimeter.',
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
            id: '3.2.35',
            topic: '3.2',
            level: 1,
            number: 35,
            title: 'Notre Dame rosettfönster',
            description: 'Hur stor area har det västliga rosettfönstret i Notre Dame? Diametern är 10 m. Avrunda till hela kvadratmeter.',
            visualization: {
                type: 'circle',
                diameter: 10,
                unit: 'm',
                fillColor: '#E91E63'
            },
            inputs: [
                { id: 'area', label: 'Area', unit: 'm²', type: 'number' }
            ],
            answers: { area: 79 },
            tolerance: 1,
            hints: [
                { step: 1, text: 'Radie r = d/2 = 10/2 = 5 m' },
                { step: 2, text: 'Area A = π·r²' },
                { step: 3, text: 'A = π × 5² = 25π ≈ 78,5 ≈ 79 m²' }
            ],
            points: 15
        },

        // ==========================================
        // 3.2 CIRKELNS AREA - NIVÅ TVÅ
        // ==========================================
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
            id: '3.2.46',
            topic: '3.2',
            level: 2,
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
            answers: { volume: 75, surfaceArea: 110 },
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
            answers: { volume: 40, surfaceArea: 76 },
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
            answers: { volume: 55, weight: 70 },
            tolerance: 5,
            hints: [
                { step: 1, text: 'V = 4,4 × 5,0 × 2,5' },
                { step: 2, text: 'V = 55 m³' },
                { step: 3, text: 'Vikt = 55 × 1,3 = 71,5 ≈ 70 kg' }
            ],
            points: 20
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
            answers: { baseArea: 5, volume: 25 },
            tolerance: 0.5,
            hints: [
                { step: 1, text: 'Triangelns area B = (bas × höjd) / 2' },
                { step: 2, text: 'B = (4 × 2,5) / 2 = 5 cm²' },
                { step: 3, text: 'V = B × h = 5 × 5 = 25 cm³' }
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
            answers: { volume: 1.8 },
            tolerance: 0.1,
            hints: [
                { step: 1, text: 'Basytans area B = 21,5 × 14,0 = 301 cm²' },
                { step: 2, text: 'V = (B × h) / 3 = (301 × 18) / 3 = 1806 cm³' },
                { step: 3, text: '1806 cm³ = 1,806 dm³ ≈ 1,8 dm³' }
            ],
            points: 20
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
            id: 'mix.138',
            topic: '3.1',
            level: 1,
            number: 7,
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
