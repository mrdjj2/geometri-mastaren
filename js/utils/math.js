/**
 * Math utilities - Beräkningar för geometri
 */

const MathUtils = {
    // Konstanter
    PI: Math.PI,

    /**
     * Avrunda till givet antal decimaler
     */
    round(value, decimals = 2) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    },

    /**
     * Kontrollera om två värden är lika (med tolerans)
     */
    isEqual(a, b, tolerance = 0.01) {
        return Math.abs(a - b) <= tolerance;
    },

    /**
     * Formatera nummer för visning
     */
    formatNumber(value, decimals = 2) {
        if (Number.isInteger(value)) {
            return value.toString();
        }
        return this.round(value, decimals).toString().replace('.', ',');
    },

    // ==========================================
    // 2D FORMLER
    // ==========================================

    /**
     * Rektangel
     */
    rectangle: {
        area(length, width) {
            return length * width;
        },
        perimeter(length, width) {
            return 2 * (length + width);
        },
        diagonal(length, width) {
            return Math.sqrt(length * length + width * width);
        }
    },

    /**
     * Kvadrat
     */
    square: {
        area(side) {
            return side * side;
        },
        perimeter(side) {
            return 4 * side;
        },
        diagonal(side) {
            return side * Math.sqrt(2);
        },
        sideFromArea(area) {
            return Math.sqrt(area);
        }
    },

    /**
     * Triangel
     */
    triangle: {
        area(base, height) {
            return (base * height) / 2;
        },
        perimeter(a, b, c) {
            return a + b + c;
        },
        // Herons formel
        areaFromSides(a, b, c) {
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        },
        // Liksidig triangel
        equilateralArea(side) {
            return (Math.sqrt(3) / 4) * side * side;
        },
        equilateralHeight(side) {
            return (Math.sqrt(3) / 2) * side;
        }
    },

    /**
     * Cirkel
     */
    circle: {
        area(radius) {
            return Math.PI * radius * radius;
        },
        circumference(radius) {
            return 2 * Math.PI * radius;
        },
        areaFromDiameter(diameter) {
            const radius = diameter / 2;
            return Math.PI * radius * radius;
        },
        radiusFromArea(area) {
            return Math.sqrt(area / Math.PI);
        },
        radiusFromCircumference(circumference) {
            return circumference / (2 * Math.PI);
        },
        // Sektor
        sectorArea(radius, angleDegrees) {
            return (angleDegrees / 360) * Math.PI * radius * radius;
        },
        arcLength(radius, angleDegrees) {
            return (angleDegrees / 360) * 2 * Math.PI * radius;
        }
    },

    /**
     * Parallellogram
     */
    parallelogram: {
        area(base, height) {
            return base * height;
        },
        perimeter(a, b) {
            return 2 * (a + b);
        }
    },

    /**
     * Trapets
     */
    trapezoid: {
        area(base1, base2, height) {
            return ((base1 + base2) * height) / 2;
        }
    },

    /**
     * Romb
     */
    rhombus: {
        area(diagonal1, diagonal2) {
            return (diagonal1 * diagonal2) / 2;
        },
        perimeter(side) {
            return 4 * side;
        }
    },

    // ==========================================
    // 3D FORMLER
    // ==========================================

    /**
     * Rätblock
     */
    cuboid: {
        volume(length, width, height) {
            return length * width * height;
        },
        surfaceArea(length, width, height) {
            return 2 * (length * width + width * height + height * length);
        }
    },

    /**
     * Kub
     */
    cube: {
        volume(side) {
            return Math.pow(side, 3);
        },
        surfaceArea(side) {
            return 6 * side * side;
        },
        sideFromVolume(volume) {
            return Math.cbrt(volume);
        },
        diagonal(side) {
            return side * Math.sqrt(3);
        }
    },

    /**
     * Prisma (generellt)
     */
    prism: {
        volume(baseArea, height) {
            return baseArea * height;
        },
        surfaceArea(baseArea, basePerimeter, height) {
            return 2 * baseArea + basePerimeter * height;
        }
    },

    /**
     * Triangelprisma
     */
    triangularPrism: {
        volume(baseWidth, baseHeight, prismHeight) {
            const baseArea = (baseWidth * baseHeight) / 2;
            return baseArea * prismHeight;
        }
    },

    /**
     * Pyramid (generell)
     */
    pyramid: {
        volume(baseArea, height) {
            return (baseArea * height) / 3;
        }
    },

    /**
     * Fyrkantig pyramid
     */
    squarePyramid: {
        volume(baseSide, height) {
            return (baseSide * baseSide * height) / 3;
        },
        slantHeight(baseSide, height) {
            return Math.sqrt(height * height + (baseSide / 2) * (baseSide / 2));
        },
        surfaceArea(baseSide, slantHeight) {
            const baseArea = baseSide * baseSide;
            const lateralArea = 2 * baseSide * slantHeight;
            return baseArea + lateralArea;
        }
    },

    /**
     * Cylinder
     */
    cylinder: {
        volume(radius, height) {
            return Math.PI * radius * radius * height;
        },
        surfaceArea(radius, height) {
            return 2 * Math.PI * radius * (radius + height);
        },
        lateralArea(radius, height) {
            return 2 * Math.PI * radius * height;
        }
    },

    /**
     * Kon
     */
    cone: {
        volume(radius, height) {
            return (Math.PI * radius * radius * height) / 3;
        },
        slantHeight(radius, height) {
            return Math.sqrt(radius * radius + height * height);
        },
        surfaceArea(radius, slantHeight) {
            return Math.PI * radius * (radius + slantHeight);
        },
        lateralArea(radius, slantHeight) {
            return Math.PI * radius * slantHeight;
        }
    },

    /**
     * Klot (sfär)
     */
    sphere: {
        volume(radius) {
            return (4 / 3) * Math.PI * Math.pow(radius, 3);
        },
        surfaceArea(radius) {
            return 4 * Math.PI * radius * radius;
        },
        radiusFromVolume(volume) {
            return Math.cbrt((3 * volume) / (4 * Math.PI));
        }
    },

    /**
     * Halvklot
     */
    hemisphere: {
        volume(radius) {
            return (2 / 3) * Math.PI * Math.pow(radius, 3);
        },
        surfaceArea(radius) {
            return 3 * Math.PI * radius * radius;
        }
    },

    // ==========================================
    // ENHETSOMVANDLING
    // ==========================================

    units: {
        // Längd (till meter)
        lengthToMeters: {
            'mm': 0.001,
            'cm': 0.01,
            'dm': 0.1,
            'm': 1,
            'km': 1000
        },

        // Area (till m²)
        areaToSquareMeters: {
            'mm²': 0.000001,
            'cm²': 0.0001,
            'dm²': 0.01,
            'm²': 1,
            'a': 100,
            'ha': 10000,
            'km²': 1000000
        },

        // Volym (till liter)
        volumeToLiters: {
            'ml': 0.001,
            'cl': 0.01,
            'dl': 0.1,
            'l': 1,
            'cm³': 0.001,
            'dm³': 1,
            'm³': 1000
        },

        /**
         * Konvertera längd
         */
        convertLength(value, fromUnit, toUnit) {
            const meters = value * this.lengthToMeters[fromUnit];
            return meters / this.lengthToMeters[toUnit];
        },

        /**
         * Konvertera area
         */
        convertArea(value, fromUnit, toUnit) {
            const sqMeters = value * this.areaToSquareMeters[fromUnit];
            return sqMeters / this.areaToSquareMeters[toUnit];
        },

        /**
         * Konvertera volym
         */
        convertVolume(value, fromUnit, toUnit) {
            const liters = value * this.volumeToLiters[fromUnit];
            return liters / this.volumeToLiters[toUnit];
        }
    },

    // ==========================================
    // HJÄLPFUNKTIONER
    // ==========================================

    /**
     * Pythagoras sats
     */
    pythagoras: {
        hypotenuse(a, b) {
            return Math.sqrt(a * a + b * b);
        },
        leg(hypotenuse, otherLeg) {
            return Math.sqrt(hypotenuse * hypotenuse - otherLeg * otherLeg);
        }
    },

    /**
     * Grader till radianer
     */
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    },

    /**
     * Radianer till grader
     */
    radiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * Slumptal inom intervall
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Slumpmässigt flyttal inom intervall
     */
    randomFloat(min, max, decimals = 2) {
        const value = Math.random() * (max - min) + min;
        return this.round(value, decimals);
    }
};

export default MathUtils;
