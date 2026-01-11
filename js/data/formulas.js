/**
 * Formulas - Alla geometriska formler
 */

const Formulas = {
    // 2D Formler
    '2d': {
        rectangle: {
            id: 'rectangle',
            name: 'Rektangel',
            icon: '▭',
            formulas: [
                { name: 'Area', formula: 'A = b · h', variables: { b: 'bas/längd', h: 'höjd/bredd' } },
                { name: 'Omkrets', formula: 'O = 2(b + h)', variables: { b: 'bas/längd', h: 'höjd/bredd' } }
            ]
        },
        square: {
            id: 'square',
            name: 'Kvadrat',
            icon: '□',
            formulas: [
                { name: 'Area', formula: 'A = s²', variables: { s: 'sida' } },
                { name: 'Omkrets', formula: 'O = 4s', variables: { s: 'sida' } },
                { name: 'Diagonal', formula: 'd = s√2', variables: { s: 'sida' } }
            ]
        },
        triangle: {
            id: 'triangle',
            name: 'Triangel',
            icon: '△',
            formulas: [
                { name: 'Area', formula: 'A = (b · h) / 2', variables: { b: 'bas', h: 'höjd' } },
                { name: 'Omkrets', formula: 'O = a + b + c', variables: { a: 'sida a', b: 'sida b', c: 'sida c' } }
            ]
        },
        parallelogram: {
            id: 'parallelogram',
            name: 'Parallellogram',
            icon: '▱',
            formulas: [
                { name: 'Area', formula: 'A = b · h', variables: { b: 'bas', h: 'höjd' } },
                { name: 'Omkrets', formula: 'O = 2(a + b)', variables: { a: 'sida a', b: 'sida b' } }
            ]
        },
        trapezoid: {
            id: 'trapezoid',
            name: 'Trapets',
            icon: '⏢',
            formulas: [
                { name: 'Area', formula: 'A = h(a + b) / 2', variables: { a: 'parallell sida a', b: 'parallell sida b', h: 'höjd' } }
            ]
        },
        rhombus: {
            id: 'rhombus',
            name: 'Romb',
            icon: '◇',
            formulas: [
                { name: 'Area (med höjd)', formula: 'A = b · h', variables: { b: 'bas', h: 'höjd' } },
                { name: 'Area (med diagonaler)', formula: 'A = (d₁ · d₂) / 2', variables: { d1: 'diagonal 1', d2: 'diagonal 2' } }
            ]
        },
        circle: {
            id: 'circle',
            name: 'Cirkel',
            icon: '○',
            formulas: [
                { name: 'Area', formula: 'A = π · r²', variables: { r: 'radie', π: '≈ 3,14' } },
                { name: 'Omkrets', formula: 'O = 2πr = πd', variables: { r: 'radie', d: 'diameter' } },
                { name: 'Diameter', formula: 'd = 2r', variables: { r: 'radie' } }
            ]
        },
        semicircle: {
            id: 'semicircle',
            name: 'Halvcirkel',
            icon: '◗',
            formulas: [
                { name: 'Area', formula: 'A = (π · r²) / 2', variables: { r: 'radie' } },
                { name: 'Omkrets', formula: 'O = πr + 2r', variables: { r: 'radie' } }
            ]
        },
        sector: {
            id: 'sector',
            name: 'Cirkelsektor',
            icon: '◔',
            formulas: [
                { name: 'Area', formula: 'A = (v/360) · π · r²', variables: { v: 'vinkel i grader', r: 'radie' } },
                { name: 'Båglängd', formula: 'b = (v/360) · 2πr', variables: { v: 'vinkel i grader', r: 'radie' } }
            ]
        }
    },

    // 3D Formler
    '3d': {
        cuboid: {
            id: 'cuboid',
            name: 'Rätblock',
            icon: '📦',
            formulas: [
                { name: 'Volym', formula: 'V = l · b · h', variables: { l: 'längd', b: 'bredd', h: 'höjd' } },
                { name: 'Begränsningsarea', formula: 'A = 2(lb + bh + hl)', variables: { l: 'längd', b: 'bredd', h: 'höjd' } }
            ]
        },
        cube: {
            id: 'cube',
            name: 'Kub',
            icon: '🎲',
            formulas: [
                { name: 'Volym', formula: 'V = s³', variables: { s: 'sida' } },
                { name: 'Begränsningsarea', formula: 'A = 6s²', variables: { s: 'sida' } },
                { name: 'Rymddiagonal', formula: 'd = s√3', variables: { s: 'sida' } }
            ]
        },
        prism: {
            id: 'prism',
            name: 'Prisma',
            icon: '🔺',
            formulas: [
                { name: 'Volym', formula: 'V = B · h', variables: { B: 'basytans area', h: 'höjd' } },
                { name: 'Begränsningsarea', formula: 'A = 2B + O_b · h', variables: { B: 'basytans area', O_b: 'basytans omkrets', h: 'höjd' } }
            ]
        },
        pyramid: {
            id: 'pyramid',
            name: 'Pyramid',
            icon: '🔺',
            formulas: [
                { name: 'Volym', formula: 'V = (B · h) / 3', variables: { B: 'basytans area', h: 'höjd' } }
            ]
        },
        cylinder: {
            id: 'cylinder',
            name: 'Cylinder',
            icon: '🥫',
            formulas: [
                { name: 'Volym', formula: 'V = π · r² · h', variables: { r: 'radie', h: 'höjd' } },
                { name: 'Mantelarea', formula: 'A_m = 2πrh = πdh', variables: { r: 'radie', d: 'diameter', h: 'höjd' } },
                { name: 'Begränsningsarea', formula: 'A = 2πrh + 2πr²', variables: { r: 'radie', h: 'höjd' } }
            ]
        },
        cone: {
            id: 'cone',
            name: 'Kon',
            icon: '🍦',
            formulas: [
                { name: 'Volym', formula: 'V = (π · r² · h) / 3', variables: { r: 'radie', h: 'höjd' } },
                { name: 'Mantelarea', formula: 'A_m = π · r · s', variables: { r: 'radie', s: 'sidhöjd' } },
                { name: 'Sidhöjd', formula: 's = √(r² + h²)', variables: { r: 'radie', h: 'höjd' } }
            ]
        },
        sphere: {
            id: 'sphere',
            name: 'Klot',
            icon: '🔵',
            formulas: [
                { name: 'Volym', formula: 'V = (4πr³) / 3', variables: { r: 'radie' } },
                { name: 'Yta', formula: 'A = 4πr²', variables: { r: 'radie' } }
            ]
        },
        hemisphere: {
            id: 'hemisphere',
            name: 'Halvklot',
            icon: '🌓',
            formulas: [
                { name: 'Volym', formula: 'V = (2πr³) / 3', variables: { r: 'radie' } },
                { name: 'Total yta', formula: 'A = 3πr²', variables: { r: 'radie' } }
            ]
        }
    },

    // Enhetsomvandlingar
    'units': {
        length: {
            id: 'length',
            name: 'Längd',
            icon: '📏',
            conversions: [
                '1 km = 1000 m',
                '1 m = 10 dm = 100 cm = 1000 mm',
                '1 dm = 10 cm = 100 mm',
                '1 cm = 10 mm'
            ]
        },
        area: {
            id: 'area',
            name: 'Area',
            icon: '⬛',
            conversions: [
                '1 km² = 1 000 000 m²',
                '1 ha = 10 000 m²',
                '1 a = 100 m²',
                '1 m² = 100 dm² = 10 000 cm²',
                '1 dm² = 100 cm²',
                '1 cm² = 100 mm²'
            ]
        },
        volume: {
            id: 'volume',
            name: 'Volym',
            icon: '🧪',
            conversions: [
                '1 m³ = 1000 dm³ = 1000 liter',
                '1 dm³ = 1 liter = 1000 cm³ = 1000 ml',
                '1 liter = 10 dl = 100 cl = 1000 ml',
                '1 dl = 10 cl = 100 ml',
                '1 cm³ = 1 ml',
                '1 cl = 10 ml'
            ]
        }
    },

    /**
     * Hämta formler för ett ämne
     */
    getForTopic(topicId) {
        const topicFormulas = {
            '3.1': ['rectangle', 'square', 'triangle', 'parallelogram', 'trapezoid', 'circle'],
            '3.2': ['circle', 'semicircle', 'sector'],
            '3.3': ['cuboid', 'cube'],
            '3.4': ['length', 'area', 'volume'],
            '3.5': ['prism', 'pyramid'],
            '3.6': ['cylinder', 'cone', 'sphere', 'hemisphere']
        };

        const formulaIds = topicFormulas[topicId] || [];
        const result = [];

        formulaIds.forEach(id => {
            if (this['2d'][id]) result.push({ ...this['2d'][id], dimension: '2d' });
            if (this['3d'][id]) result.push({ ...this['3d'][id], dimension: '3d' });
            if (this['units'][id]) result.push({ ...this['units'][id], dimension: 'units' });
        });

        return result;
    },

    /**
     * Hämta alla 2D-formler
     */
    getAll2D() {
        return Object.values(this['2d']);
    },

    /**
     * Hämta alla 3D-formler
     */
    getAll3D() {
        return Object.values(this['3d']);
    },

    /**
     * Hämta alla enhetsomvandlingar
     */
    getAllUnits() {
        return Object.values(this['units']);
    },

    /**
     * Sök efter formel
     */
    search(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        // Sök i 2D
        Object.values(this['2d']).forEach(shape => {
            if (shape.name.toLowerCase().includes(lowerQuery)) {
                results.push({ ...shape, dimension: '2d' });
            }
        });

        // Sök i 3D
        Object.values(this['3d']).forEach(shape => {
            if (shape.name.toLowerCase().includes(lowerQuery)) {
                results.push({ ...shape, dimension: '3d' });
            }
        });

        return results;
    }
};

export default Formulas;
