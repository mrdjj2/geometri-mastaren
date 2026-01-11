/**
 * 2D Shapes Visualization - SVG-baserade geometriska figurer
 */

const Shapes2D = {
    // Standard SVG-inställningar
    defaults: {
        width: 300,
        height: 250,
        padding: 30,
        strokeWidth: 2,
        fontSize: 12
    },

    // Färger
    colors: {
        fill: '#E3F2FD',
        stroke: '#1976D2',
        highlight: '#FFC107',
        text: '#333',
        dimension: '#666',
        area: 'rgba(33, 150, 243, 0.3)'
    },

    /**
     * Skapa SVG-element
     */
    createSVG(width, height) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.classList.add('shape-svg');
        return svg;
    },

    /**
     * Rendera figur baserat på typ
     */
    render(container, config) {
        const type = config.type;
        const renderers = {
            'rectangle': this.renderRectangle,
            'square': this.renderSquare,
            'triangle': this.renderTriangle,
            'circle': this.renderCircle,
            'parallelogram': this.renderParallelogram,
            'trapezoid': this.renderTrapezoid,
            'semicircle': this.renderSemicircle,
            'circle_in_square': this.renderCircleInSquare,
            'four_circles_in_square': this.renderFourCirclesInSquare,
            'two_circles': this.renderTwoCircles,
            'composite': this.renderComposite,
            'conversion': this.renderConversion,
            'gothic_window': this.renderGothicWindow,
            'stadium': this.renderStadium,
            'ring': this.renderRing,
            'comparison': this.renderComparison,
            'half_cylinder': this.renderHalfCylinder,
            'glass': this.renderGlass,
            'three_circles': this.renderThreeCircles,
            'nested_squares': this.renderNestedSquares,
            'two_squares': this.renderTwoSquares,
            'three_squares': this.renderThreeSquares,
            'flag': this.renderFlag,
            'grid_shape': this.renderGridShape,
            'semicircle_difference': this.renderSemicircleDifference,
            'explanation': this.renderExplanation,
            'circle_and_square': this.renderCircleAndSquare
        };

        const renderer = renderers[type];
        if (renderer) {
            container.innerHTML = '';
            const svg = renderer.call(this, config);
            container.appendChild(svg);
        } else {
            container.innerHTML = `<div class="viz-placeholder">Visualisering för ${type}</div>`;
        }
    },

    /**
     * Rendera rektangel
     */
    renderRectangle(config) {
        const { width = 300, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const rectWidth = width - 2 * padding;
        const rectHeight = height - 2 * padding - 20;
        const x = padding;
        const y = padding;

        // Rektangel
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', rectWidth);
        rect.setAttribute('height', rectHeight);
        rect.setAttribute('fill', this.colors.fill);
        rect.setAttribute('stroke', this.colors.stroke);
        rect.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect);

        // Mått
        if (config.showMeasurements !== false) {
            // Längd (nedre)
            this.addDimension(svg, x, y + rectHeight + 15, x + rectWidth, y + rectHeight + 15,
                `${config.length || 'b'} ${config.unit || 'cm'}`);

            // Bredd (höger)
            this.addDimension(svg, x + rectWidth + 15, y, x + rectWidth + 15, y + rectHeight,
                `${config.width || 'h'} ${config.unit || 'cm'}`, true);
        }

        return svg;
    },

    /**
     * Rendera kvadrat
     */
    renderSquare(config) {
        const { width = 250, height = 250, padding = 40 } = this.defaults;
        const svg = this.createSVG(width, height);

        const side = Math.min(width, height) - 2 * padding;
        const x = (width - side) / 2;
        const y = (height - side) / 2 - 10;

        // Kvadrat
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', side);
        rect.setAttribute('height', side);
        rect.setAttribute('fill', config.showArea ? this.colors.area : this.colors.fill);
        rect.setAttribute('stroke', this.colors.stroke);
        rect.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect);

        // Sida-mått
        this.addDimension(svg, x, y + side + 15, x + side, y + side + 15,
            `${config.side || 's'} ${config.unit || 'cm'}`);

        // Area-text i mitten
        if (config.showArea) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x + side / 2);
            text.setAttribute('y', y + side / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '14');
            text.setAttribute('fill', this.colors.stroke);
            text.textContent = `A = ${config.side * config.side} cm²`;
            svg.appendChild(text);
        }

        return svg;
    },

    /**
     * Rendera triangel
     */
    renderTriangle(config) {
        const { width = 300, height = 250, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const base = width - 2 * padding;
        const h = height - 2 * padding - 30;

        // Triangelns punkter
        const x1 = padding;
        const y1 = padding + h;
        const x2 = padding + base;
        const y2 = padding + h;
        const x3 = padding + base * 0.4; // Toppen lite till vänster om mitten
        const y3 = padding;

        // Triangel
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
        polygon.setAttribute('fill', this.colors.fill);
        polygon.setAttribute('stroke', this.colors.stroke);
        polygon.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(polygon);

        // Höjd (streckad linje)
        const heightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        heightLine.setAttribute('x1', x3);
        heightLine.setAttribute('y1', y3);
        heightLine.setAttribute('x2', x3);
        heightLine.setAttribute('y2', y2);
        heightLine.setAttribute('stroke', this.colors.highlight);
        heightLine.setAttribute('stroke-width', 1.5);
        heightLine.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(heightLine);

        // Mått
        if (config.showMeasurements !== false) {
            // Bas
            this.addDimension(svg, x1, y1 + 15, x2, y1 + 15,
                `${config.base || 'b'} ${config.unit || 'cm'}`);

            // Höjd
            const heightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            heightText.setAttribute('x', x3 + 10);
            heightText.setAttribute('y', (y3 + y2) / 2);
            heightText.setAttribute('font-size', this.defaults.fontSize);
            heightText.setAttribute('fill', this.colors.highlight);
            heightText.textContent = `h = ${config.height || '?'} cm`;
            svg.appendChild(heightText);
        }

        return svg;
    },

    /**
     * Rendera cirkel
     */
    renderCircle(config) {
        const { width = 280, height = 280, padding = 40 } = this.defaults;
        const svg = this.createSVG(width, height);

        const radius = (Math.min(width, height) - 2 * padding) / 2 - 10;
        const cx = width / 2;
        const cy = height / 2 - 10;
        const unit = config.unit || 'cm';

        // Beräkna diameter och radie från config
        let displayDiameter = config.diameter;
        let displayRadius = config.radius;

        // Om circumference finns, beräkna diameter
        if (config.circumference && !displayDiameter) {
            displayDiameter = (config.circumference / Math.PI).toFixed(2);
        }

        // Beräkna radie från diameter om inte angiven
        if (displayDiameter && !displayRadius) {
            displayRadius = displayDiameter / 2;
        }

        // Cirkel
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', config.fillColor || this.colors.fill);
        circle.setAttribute('stroke', this.colors.stroke);
        circle.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(circle);

        // Mittenpunkt
        const centerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerDot.setAttribute('cx', cx);
        centerDot.setAttribute('cy', cy);
        centerDot.setAttribute('r', 3);
        centerDot.setAttribute('fill', this.colors.stroke);
        svg.appendChild(centerDot);

        // Visa diameter om showDiameter är true ELLER om diameter finns i config
        const shouldShowDiameter = config.showDiameter || (displayDiameter && !config.showRadius);

        if (shouldShowDiameter && displayDiameter) {
            // Diameter-linje
            const diamLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            diamLine.setAttribute('x1', cx - radius);
            diamLine.setAttribute('y1', cy);
            diamLine.setAttribute('x2', cx + radius);
            diamLine.setAttribute('y2', cy);
            diamLine.setAttribute('stroke', this.colors.highlight);
            diamLine.setAttribute('stroke-width', 2);
            svg.appendChild(diamLine);

            // Diameter-etikett
            this.addDimension(svg, cx - radius, cy + radius + 20, cx + radius, cy + radius + 20,
                `d = ${displayDiameter} ${unit}`);
        } else if (config.showRadius !== false) {
            // Radie-linje
            const radiusLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            radiusLine.setAttribute('x1', cx);
            radiusLine.setAttribute('y1', cy);
            radiusLine.setAttribute('x2', cx + radius);
            radiusLine.setAttribute('y2', cy);
            radiusLine.setAttribute('stroke', this.colors.highlight);
            radiusLine.setAttribute('stroke-width', 2);
            svg.appendChild(radiusLine);

            // Radie-etikett med värde
            const radiusText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            radiusText.setAttribute('x', cx + radius / 2);
            radiusText.setAttribute('y', cy - 8);
            radiusText.setAttribute('text-anchor', 'middle');
            radiusText.setAttribute('font-size', this.defaults.fontSize);
            radiusText.setAttribute('fill', this.colors.highlight);

            if (displayRadius) {
                radiusText.textContent = `r = ${displayRadius} ${unit}`;
            } else {
                radiusText.textContent = `r`;
            }
            svg.appendChild(radiusText);

            // Om vi har diameter, visa det också nedanför
            if (displayDiameter) {
                this.addDimension(svg, cx - radius, cy + radius + 20, cx + radius, cy + radius + 20,
                    `d = ${displayDiameter} ${unit}`);
            }
        }

        return svg;
    },

    /**
     * Rendera parallellogram
     */
    renderParallelogram(config) {
        const { width = 300, height = 220, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const baseWidth = width - 2 * padding - 50;
        const figHeight = height - 2 * padding - 50;
        const skew = 40;

        const x1 = padding + skew;
        const y1 = padding + figHeight;
        const x2 = padding + baseWidth + skew;
        const y2 = padding + figHeight;
        const x3 = padding + baseWidth;
        const y3 = padding;
        const x4 = padding;
        const y4 = padding;

        // Parallellogram
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
        polygon.setAttribute('fill', this.colors.fill);
        polygon.setAttribute('stroke', this.colors.stroke);
        polygon.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(polygon);

        // Höjd (streckad linje)
        const heightLineX = padding + baseWidth / 2 + skew / 2;
        const heightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        heightLine.setAttribute('x1', heightLineX);
        heightLine.setAttribute('y1', y3);
        heightLine.setAttribute('x2', heightLineX);
        heightLine.setAttribute('y2', y1);
        heightLine.setAttribute('stroke', this.colors.highlight);
        heightLine.setAttribute('stroke-width', 1.5);
        heightLine.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(heightLine);

        // Höjd-text
        if (config.height) {
            const heightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            heightText.setAttribute('x', heightLineX + 8);
            heightText.setAttribute('y', (y3 + y1) / 2);
            heightText.setAttribute('font-size', this.defaults.fontSize);
            heightText.setAttribute('fill', this.colors.highlight);
            heightText.textContent = `h = ${config.height} ${config.unit || 'cm'}`;
            svg.appendChild(heightText);
        }

        // Bas-mått (nedre)
        this.addDimension(svg, x1, y1 + 18, x2, y1 + 18,
            `${config.base || 'b'} ${config.unit || 'cm'}`);

        // Sida-mått (vänster sned sida)
        if (config.side) {
            const sideText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const sideMidX = (x4 + x1) / 2 - 25;
            const sideMidY = (y4 + y1) / 2;
            sideText.setAttribute('x', sideMidX);
            sideText.setAttribute('y', sideMidY);
            sideText.setAttribute('font-size', this.defaults.fontSize);
            sideText.setAttribute('fill', this.colors.dimension);
            sideText.textContent = `${config.side} ${config.unit || 'cm'}`;
            svg.appendChild(sideText);
        }

        return svg;
    },

    /**
     * Rendera cirkel i kvadrat
     */
    renderCircleInSquare(config) {
        const { width = 280, height = 280, padding = 40 } = this.defaults;
        const svg = this.createSVG(width, height);

        const squareSide = Math.sqrt(config.squareArea);
        const size = Math.min(width, height) - 2 * padding;
        const x = (width - size) / 2;
        const y = (height - size) / 2 - 10;

        // Kvadrat
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', size);
        rect.setAttribute('height', size);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', this.colors.dimension);
        rect.setAttribute('stroke-width', 1);
        svg.appendChild(rect);

        // Cirkel
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x + size / 2);
        circle.setAttribute('cy', y + size / 2);
        circle.setAttribute('r', size / 2);
        circle.setAttribute('fill', this.colors.fill);
        circle.setAttribute('stroke', this.colors.stroke);
        circle.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(circle);

        // Mått
        this.addDimension(svg, x, y + size + 15, x + size, y + size + 15,
            `${squareSide} cm`);

        return svg;
    },

    /**
     * Rendera halvicirkel
     */
    renderSemicircle(config) {
        const { width = 280, height = 180, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const radius = (width - 2 * padding) / 2 - 10;
        const cx = width / 2;
        const cy = height - padding - 20;

        // Halvicirkel path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy} Z`;
        path.setAttribute('d', d);
        path.setAttribute('fill', this.colors.fill);
        path.setAttribute('stroke', this.colors.stroke);
        path.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(path);

        // Diameter
        this.addDimension(svg, cx - radius, cy + 15, cx + radius, cy + 15,
            `d = ${config.diameter || '?'} ${config.unit || 'cm'}`);

        return svg;
    },

    /**
     * Rendera enhetsomvandling visualisering
     */
    renderConversion(config) {
        const svg = this.createSVG(300, 150);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', 150);
        text.setAttribute('y', 75);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '16');
        text.setAttribute('fill', this.colors.stroke);
        text.textContent = `Omvandla till ${config.to}`;
        svg.appendChild(text);

        return svg;
    },

    /**
     * Rendera två cirklar (för jämförelse)
     */
    renderTwoCircles(config) {
        const { width = 350, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const d1 = config.circle1?.diameter || 4;
        const d2 = config.circle2?.diameter || 8;
        const unit = config.unit || 'cm';

        // Skala så båda cirklarna får plats
        const maxD = Math.max(d1, d2);
        const availableWidth = (width - 3 * padding) / 2;
        const scale = Math.min(availableWidth / maxD, 40);

        const r1 = (d1 * scale) / 2;
        const r2 = (d2 * scale) / 2;

        // Cirkel 1 (mindre)
        const cx1 = padding + availableWidth / 2;
        const cy1 = height / 2;

        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', cx1);
        circle1.setAttribute('cy', cy1);
        circle1.setAttribute('r', r1);
        circle1.setAttribute('fill', this.colors.fill);
        circle1.setAttribute('stroke', this.colors.stroke);
        circle1.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(circle1);

        // Diameter-linje cirkel 1
        const dLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        dLine1.setAttribute('x1', cx1 - r1);
        dLine1.setAttribute('y1', cy1);
        dLine1.setAttribute('x2', cx1 + r1);
        dLine1.setAttribute('y2', cy1);
        dLine1.setAttribute('stroke', this.colors.highlight);
        dLine1.setAttribute('stroke-width', 2);
        svg.appendChild(dLine1);

        // Mått cirkel 1
        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text1.setAttribute('x', cx1);
        text1.setAttribute('y', cy1 + r1 + 20);
        text1.setAttribute('text-anchor', 'middle');
        text1.setAttribute('font-size', this.defaults.fontSize);
        text1.setAttribute('fill', this.colors.dimension);
        text1.textContent = `d = ${d1} ${unit}`;
        svg.appendChild(text1);

        // Cirkel 2 (större)
        const cx2 = width - padding - availableWidth / 2;
        const cy2 = height / 2;

        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.setAttribute('cx', cx2);
        circle2.setAttribute('cy', cy2);
        circle2.setAttribute('r', r2);
        circle2.setAttribute('fill', this.colors.fill);
        circle2.setAttribute('stroke', this.colors.stroke);
        circle2.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(circle2);

        // Diameter-linje cirkel 2
        const dLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        dLine2.setAttribute('x1', cx2 - r2);
        dLine2.setAttribute('y1', cy2);
        dLine2.setAttribute('x2', cx2 + r2);
        dLine2.setAttribute('y2', cy2);
        dLine2.setAttribute('stroke', this.colors.highlight);
        dLine2.setAttribute('stroke-width', 2);
        svg.appendChild(dLine2);

        // Mått cirkel 2
        const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text2.setAttribute('x', cx2);
        text2.setAttribute('y', cy2 + r2 + 20);
        text2.setAttribute('text-anchor', 'middle');
        text2.setAttribute('font-size', this.defaults.fontSize);
        text2.setAttribute('fill', this.colors.dimension);
        text2.textContent = `d = ${d2} ${unit}`;
        svg.appendChild(text2);

        // Centerpunkter
        const center1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center1.setAttribute('cx', cx1);
        center1.setAttribute('cy', cy1);
        center1.setAttribute('r', 3);
        center1.setAttribute('fill', this.colors.stroke);
        svg.appendChild(center1);

        const center2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center2.setAttribute('cx', cx2);
        center2.setAttribute('cy', cy2);
        center2.setAttribute('r', 3);
        center2.setAttribute('fill', this.colors.stroke);
        svg.appendChild(center2);

        return svg;
    },

    /**
     * Rendera fyra cirklar i en kvadrat
     */
    renderFourCirclesInSquare(config) {
        const { width = 300, height = 300, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const squareSide = config.squareSide || 6;
        const unit = config.unit || 'cm';

        // Skala
        const size = Math.min(width, height) - 2 * padding;
        const scale = size / squareSide;

        const x = (width - size) / 2;
        const y = (height - size) / 2 - 10;

        // Kvadrat
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', size);
        rect.setAttribute('height', size);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', this.colors.dimension);
        rect.setAttribute('stroke-width', 1.5);
        svg.appendChild(rect);

        // Cirklarnas diameter = squareSide / 2
        const circleD = squareSide / 2;
        const circleR = (circleD * scale) / 2;

        // Fyra cirklar (2x2 grid)
        const positions = [
            { cx: x + circleR, cy: y + circleR },                    // Top-left
            { cx: x + size - circleR, cy: y + circleR },             // Top-right
            { cx: x + circleR, cy: y + size - circleR },             // Bottom-left
            { cx: x + size - circleR, cy: y + size - circleR }       // Bottom-right
        ];

        positions.forEach(pos => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pos.cx);
            circle.setAttribute('cy', pos.cy);
            circle.setAttribute('r', circleR);
            circle.setAttribute('fill', this.colors.fill);
            circle.setAttribute('stroke', this.colors.stroke);
            circle.setAttribute('stroke-width', this.defaults.strokeWidth);
            svg.appendChild(circle);

            // Centerpunkt
            const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            center.setAttribute('cx', pos.cx);
            center.setAttribute('cy', pos.cy);
            center.setAttribute('r', 2);
            center.setAttribute('fill', this.colors.stroke);
            svg.appendChild(center);
        });

        // Mått för kvadraten
        this.addDimension(svg, x, y + size + 18, x + size, y + size + 18,
            `${squareSide} ${unit}`);

        // Mått för en cirkel (diameter)
        const dimText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dimText.setAttribute('x', x + size / 2);
        dimText.setAttribute('y', y - 8);
        dimText.setAttribute('text-anchor', 'middle');
        dimText.setAttribute('font-size', this.defaults.fontSize);
        dimText.setAttribute('fill', this.colors.highlight);
        dimText.textContent = `d = ${circleD} ${unit}`;
        svg.appendChild(dimText);

        return svg;
    },

    /**
     * Rendera sammansatt figur (L-form)
     */
    renderComposite(config) {
        const { width = 320, height = 280, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const measurements = config.measurements || [8, 5, 4, 11];
        const unit = config.unit || 'cm';

        // L-form: measurements = [översta bredd, höger höjd, nedre utskärning bredd, total höjd]
        // Alternativt tolka som: [a, b, c, d] där figuren formar ett L
        const a = measurements[0] || 8;  // Översta horisontella segmentet
        const b = measurements[1] || 5;  // Höger vertikala segmentet (övre del)
        const c = measurements[2] || 4;  // Nedre horisontella (inre utskärning)
        const d = measurements[3] || 11; // Vänster vertikala (total höjd)

        // Beräkna skala
        const maxWidth = a;
        const maxHeight = d;
        const scaleX = (width - 2 * padding) / maxWidth;
        const scaleY = (height - 2 * padding - 40) / maxHeight;
        const scale = Math.min(scaleX, scaleY);

        const startX = padding + 20;
        const startY = padding + 20;

        // L-formens punkter (medurs från övre vänstra)
        // Punkt 1: Start (0, 0)
        // Punkt 2: (a, 0) - översta högra
        // Punkt 3: (a, b) - höger, efter första nedgången
        // Punkt 4: (c, b) - inre hörnet
        // Punkt 5: (c, d) - nedre inre
        // Punkt 6: (0, d) - nedre vänstra
        const points = [
            { x: 0, y: 0 },
            { x: a, y: 0 },
            { x: a, y: b },
            { x: c, y: b },
            { x: c, y: d },
            { x: 0, y: d }
        ];

        // Transformera punkter
        const transformed = points.map(p => ({
            x: startX + p.x * scale,
            y: startY + p.y * scale
        }));

        // Rita L-formen
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const pointsStr = transformed.map(p => `${p.x},${p.y}`).join(' ');
        polygon.setAttribute('points', pointsStr);
        polygon.setAttribute('fill', this.colors.fill);
        polygon.setAttribute('stroke', this.colors.stroke);
        polygon.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(polygon);

        // Mått-etiketter
        // Topp (a)
        this.addDimension(svg,
            transformed[0].x, transformed[0].y - 12,
            transformed[1].x, transformed[1].y - 12,
            `${a} ${unit}`);

        // Höger sida övre (b)
        const rightText1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rightText1.setAttribute('x', transformed[1].x + 12);
        rightText1.setAttribute('y', (transformed[1].y + transformed[2].y) / 2);
        rightText1.setAttribute('font-size', this.defaults.fontSize);
        rightText1.setAttribute('fill', this.colors.dimension);
        rightText1.textContent = `${b} ${unit}`;
        svg.appendChild(rightText1);

        // Inre horisontell (a - c)
        const innerWidth = a - c;
        this.addDimension(svg,
            transformed[3].x, transformed[3].y + 15,
            transformed[2].x, transformed[2].y + 15,
            `${innerWidth} ${unit}`);

        // Vänster sida total (d)
        const leftText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        leftText.setAttribute('x', transformed[0].x - 25);
        leftText.setAttribute('y', (transformed[0].y + transformed[5].y) / 2);
        leftText.setAttribute('font-size', this.defaults.fontSize);
        leftText.setAttribute('fill', this.colors.dimension);
        leftText.textContent = `${d} ${unit}`;
        svg.appendChild(leftText);

        // Nedre bredd (c)
        this.addDimension(svg,
            transformed[5].x, transformed[5].y + 18,
            transformed[4].x, transformed[4].y + 18,
            `${c} ${unit}`);

        // Inre vertikal (d - b)
        const innerHeight = d - b;
        const innerVertText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        innerVertText.setAttribute('x', transformed[3].x + 12);
        innerVertText.setAttribute('y', (transformed[3].y + transformed[4].y) / 2);
        innerVertText.setAttribute('font-size', this.defaults.fontSize);
        innerVertText.setAttribute('fill', this.colors.highlight);
        innerVertText.textContent = `${innerHeight} ${unit}`;
        svg.appendChild(innerVertText);

        return svg;
    },

    /**
     * Lägg till dimension-linje med text
     */
    addDimension(svg, x1, y1, x2, y2, text, vertical = false) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Linje
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', this.colors.dimension);
        line.setAttribute('stroke-width', 1);
        group.appendChild(line);

        // Pilar
        const arrowSize = 5;

        // Text
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', (x1 + x2) / 2);
        textEl.setAttribute('y', vertical ? (y1 + y2) / 2 : y1 - 5);
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('font-size', this.defaults.fontSize);
        textEl.setAttribute('fill', this.colors.dimension);

        if (vertical) {
            textEl.setAttribute('transform', `rotate(-90, ${(x1 + x2) / 2}, ${(y1 + y2) / 2})`);
        }

        textEl.textContent = text;
        group.appendChild(textEl);

        svg.appendChild(group);
    },

    /**
     * Rendera gotiskt fönster (rektangel + halvcirkel)
     */
    renderGothicWindow(config) {
        const { width = 280, height = 320, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const windowWidth = config.width || 2.35;
        const totalHeight = config.totalHeight || 4.5;
        const unit = config.unit || 'm';

        // Beräkna proportioner
        const availableWidth = width - 2 * padding;
        const availableHeight = height - 2 * padding - 30;

        const scale = Math.min(availableWidth / windowWidth, availableHeight / totalHeight);
        const w = windowWidth * scale;
        const h = totalHeight * scale;

        const x = (width - w) / 2;
        const y = padding;

        const semicircleRadius = w / 2;
        const rectHeight = h - semicircleRadius;

        // Rektangeldel
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y + semicircleRadius);
        rect.setAttribute('width', w);
        rect.setAttribute('height', rectHeight);
        rect.setAttribute('fill', this.colors.fill);
        rect.setAttribute('stroke', this.colors.stroke);
        rect.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect);

        // Halvcirkel på toppen
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const arcPath = `M ${x} ${y + semicircleRadius} A ${semicircleRadius} ${semicircleRadius} 0 0 1 ${x + w} ${y + semicircleRadius}`;
        path.setAttribute('d', arcPath);
        path.setAttribute('fill', this.colors.fill);
        path.setAttribute('stroke', this.colors.stroke);
        path.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(path);

        // Mått - bredd
        this.addDimension(svg, x, y + h + 15, x + w, y + h + 15, `${windowWidth} ${unit}`);

        // Mått - höjd
        const heightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heightText.setAttribute('x', x + w + 15);
        heightText.setAttribute('y', y + h / 2);
        heightText.setAttribute('font-size', this.defaults.fontSize);
        heightText.setAttribute('fill', this.colors.dimension);
        heightText.textContent = `${totalHeight} ${unit}`;
        svg.appendChild(heightText);

        return svg;
    },

    /**
     * Rendera stadium/idrottsplats (rektangel med halvcirklar)
     */
    renderStadium(config) {
        const { width = 350, height = 220, padding = 25 } = this.defaults;
        const svg = this.createSVG(width, height);

        const length = config.length || 180;
        const fieldWidth = config.width || 100;
        const unit = config.unit || 'm';

        // Skala
        const availableWidth = width - 2 * padding;
        const availableHeight = height - 2 * padding - 30;
        const scale = Math.min(availableWidth / length, availableHeight / fieldWidth);

        const w = length * scale;
        const h = fieldWidth * scale;
        const radius = h / 2;

        const x = (width - w) / 2;
        const y = (height - h) / 2 - 10;

        // Rektangel (mittdelen)
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x + radius);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w - 2 * radius);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', '#90EE90');
        rect.setAttribute('stroke', this.colors.stroke);
        rect.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect);

        // Vänster halvcirkel
        const leftArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        leftArc.setAttribute('d', `M ${x + radius} ${y} A ${radius} ${radius} 0 0 0 ${x + radius} ${y + h}`);
        leftArc.setAttribute('fill', '#90EE90');
        leftArc.setAttribute('stroke', this.colors.stroke);
        leftArc.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(leftArc);

        // Höger halvcirkel
        const rightArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        rightArc.setAttribute('d', `M ${x + w - radius} ${y} A ${radius} ${radius} 0 0 1 ${x + w - radius} ${y + h}`);
        rightArc.setAttribute('fill', '#90EE90');
        rightArc.setAttribute('stroke', this.colors.stroke);
        rightArc.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rightArc);

        // Mått
        this.addDimension(svg, x, y + h + 18, x + w, y + h + 18, `${length} ${unit}`);

        const widthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        widthText.setAttribute('x', x - 10);
        widthText.setAttribute('y', y + h / 2);
        widthText.setAttribute('font-size', this.defaults.fontSize);
        widthText.setAttribute('fill', this.colors.dimension);
        widthText.setAttribute('text-anchor', 'end');
        widthText.textContent = `${fieldWidth} ${unit}`;
        svg.appendChild(widthText);

        return svg;
    },

    /**
     * Rendera ring (två koncentriska cirklar)
     */
    renderRing(config) {
        const { width = 280, height = 280, padding = 40 } = this.defaults;
        const svg = this.createSVG(width, height);

        const innerRadius = config.innerRadius || 3;
        const outerRadius = config.outerRadius || 4;
        const unit = config.unit || 'cm';

        const maxR = outerRadius;
        const scale = (Math.min(width, height) - 2 * padding) / (2 * maxR);

        const cx = width / 2;
        const cy = height / 2 - 10;

        const outerR = outerRadius * scale;
        const innerR = innerRadius * scale;

        // Yttre cirkel (lila/färgad)
        const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerCircle.setAttribute('cx', cx);
        outerCircle.setAttribute('cy', cy);
        outerCircle.setAttribute('r', outerR);
        outerCircle.setAttribute('fill', '#E1BEE7');
        outerCircle.setAttribute('stroke', this.colors.stroke);
        outerCircle.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(outerCircle);

        // Inre cirkel (vit)
        const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerCircle.setAttribute('cx', cx);
        innerCircle.setAttribute('cy', cy);
        innerCircle.setAttribute('r', innerR);
        innerCircle.setAttribute('fill', 'white');
        innerCircle.setAttribute('stroke', this.colors.stroke);
        innerCircle.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(innerCircle);

        // Centerpunkt
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', cx);
        center.setAttribute('cy', cy);
        center.setAttribute('r', 3);
        center.setAttribute('fill', this.colors.stroke);
        svg.appendChild(center);

        // Radie-linjer
        const innerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        innerLine.setAttribute('x1', cx);
        innerLine.setAttribute('y1', cy);
        innerLine.setAttribute('x2', cx + innerR);
        innerLine.setAttribute('y2', cy);
        innerLine.setAttribute('stroke', this.colors.highlight);
        innerLine.setAttribute('stroke-width', 2);
        svg.appendChild(innerLine);

        // Mått
        const innerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        innerText.setAttribute('x', cx + innerR / 2);
        innerText.setAttribute('y', cy - 8);
        innerText.setAttribute('text-anchor', 'middle');
        innerText.setAttribute('font-size', this.defaults.fontSize);
        innerText.setAttribute('fill', this.colors.highlight);
        innerText.textContent = `${innerRadius} ${unit}`;
        svg.appendChild(innerText);

        this.addDimension(svg, cx - outerR, cy + outerR + 20, cx + outerR, cy + outerR + 20,
            `r = ${outerRadius} ${unit}`);

        return svg;
    },

    /**
     * Rendera jämförelse (generisk)
     */
    renderComparison(config) {
        const { width = 350, height = 180, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const items = config.items || ['A', 'B'];
        const labels = config.labels || items;

        // Rita två objekt sida vid sida
        const boxWidth = (width - 3 * padding) / 2;
        const boxHeight = height - 2 * padding - 20;

        items.forEach((item, i) => {
            const x = padding + i * (boxWidth + padding);
            const y = padding;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', boxWidth);
            rect.setAttribute('height', boxHeight);
            rect.setAttribute('fill', i === 0 ? this.colors.fill : '#FFECB3');
            rect.setAttribute('stroke', this.colors.stroke);
            rect.setAttribute('stroke-width', this.defaults.strokeWidth);
            rect.setAttribute('rx', 8);
            svg.appendChild(rect);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x + boxWidth / 2);
            text.setAttribute('y', y + boxHeight / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '16');
            text.setAttribute('fill', this.colors.stroke);
            text.textContent = labels[i] || item;
            svg.appendChild(text);
        });

        // VS text
        const vsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vsText.setAttribute('x', width / 2);
        vsText.setAttribute('y', height / 2);
        vsText.setAttribute('text-anchor', 'middle');
        vsText.setAttribute('font-size', '14');
        vsText.setAttribute('fill', '#999');
        vsText.textContent = 'vs';
        svg.appendChild(vsText);

        return svg;
    },

    /**
     * Rendera halvcylinder (2D-vy)
     */
    renderHalfCylinder(config) {
        const { width = 300, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const cylWidth = config.width || 6;
        const cylLength = config.length || 4;
        const unit = config.unit || 'cm';

        const availableWidth = width - 2 * padding;
        const availableHeight = height - 2 * padding - 30;

        const w = availableWidth * 0.8;
        const h = availableHeight * 0.6;

        const x = (width - w) / 2;
        const y = padding + 20;

        // Halvcirkel (framsida)
        const arcRadius = h;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x} ${y + arcRadius} A ${w/2} ${arcRadius} 0 0 1 ${x + w} ${y + arcRadius} L ${x + w} ${y + arcRadius} L ${x} ${y + arcRadius} Z`);
        path.setAttribute('fill', this.colors.fill);
        path.setAttribute('stroke', this.colors.stroke);
        path.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(path);

        // Baslinje
        const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        baseLine.setAttribute('x1', x);
        baseLine.setAttribute('y1', y + arcRadius);
        baseLine.setAttribute('x2', x + w);
        baseLine.setAttribute('y2', y + arcRadius);
        baseLine.setAttribute('stroke', this.colors.stroke);
        baseLine.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(baseLine);

        // Mått
        this.addDimension(svg, x, y + arcRadius + 20, x + w, y + arcRadius + 20, `${cylWidth} ${unit}`);

        return svg;
    },

    /**
     * Rendera glas (konisk form)
     */
    renderGlass(config) {
        const { width = 200, height = 280, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const topDiameter = config.topDiameter || 8;
        const bottomDiameter = config.bottomDiameter || 5;
        const glassHeight = config.height || 12;
        const unit = config.unit || 'cm';

        const scale = (height - 2 * padding - 40) / glassHeight;

        const topW = topDiameter * scale * 0.8;
        const bottomW = bottomDiameter * scale * 0.8;
        const h = glassHeight * scale;

        const cx = width / 2;
        const topY = padding + 20;
        const bottomY = topY + h;

        // Glasform (trapets)
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${cx - topW/2} ${topY} L ${cx + topW/2} ${topY} L ${cx + bottomW/2} ${bottomY} L ${cx - bottomW/2} ${bottomY} Z`);
        path.setAttribute('fill', 'rgba(173, 216, 230, 0.5)');
        path.setAttribute('stroke', this.colors.stroke);
        path.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(path);

        // Mått - topp
        this.addDimension(svg, cx - topW/2, topY - 15, cx + topW/2, topY - 15, `${topDiameter} ${unit}`);

        // Mått - höjd
        const heightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heightText.setAttribute('x', cx + topW/2 + 15);
        heightText.setAttribute('y', (topY + bottomY) / 2);
        heightText.setAttribute('font-size', this.defaults.fontSize);
        heightText.setAttribute('fill', this.colors.dimension);
        heightText.textContent = `${glassHeight} ${unit}`;
        svg.appendChild(heightText);

        return svg;
    },

    /**
     * Rendera tre cirklar
     */
    renderThreeCircles(config) {
        const { width = 380, height = 180, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const diameters = config.diameters || [10, 12.9, 13.1];
        const unit = config.unit || 'm';

        const maxD = Math.max(...diameters);
        const availableWidth = (width - 4 * padding) / 3;
        const scale = Math.min(availableWidth / maxD, (height - 2 * padding - 30) / maxD) * 0.8;

        diameters.forEach((d, i) => {
            const r = (d * scale) / 2;
            const cx = padding + availableWidth / 2 + i * (availableWidth + padding);
            const cy = height / 2;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', r);
            circle.setAttribute('fill', this.colors.fill);
            circle.setAttribute('stroke', this.colors.stroke);
            circle.setAttribute('stroke-width', this.defaults.strokeWidth);
            svg.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', cx);
            text.setAttribute('y', cy + r + 18);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', this.defaults.fontSize);
            text.setAttribute('fill', this.colors.dimension);
            text.textContent = `d=${d} ${unit}`;
            svg.appendChild(text);
        });

        return svg;
    },

    /**
     * Rendera nästlade kvadrater
     */
    renderNestedSquares(config) {
        const { width = 280, height = 280, padding = 40 } = this.defaults;
        const svg = this.createSVG(width, height);

        const outerSide = config.outerSide || 10;
        const innerSide = config.innerSide || 6;
        const unit = config.unit || 'cm';

        const size = Math.min(width, height) - 2 * padding;
        const scale = size / outerSide;

        const outerSize = outerSide * scale;
        const innerSize = innerSide * scale;

        const x = (width - outerSize) / 2;
        const y = (height - outerSize) / 2 - 10;

        // Yttre kvadrat
        const outer = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        outer.setAttribute('x', x);
        outer.setAttribute('y', y);
        outer.setAttribute('width', outerSize);
        outer.setAttribute('height', outerSize);
        outer.setAttribute('fill', this.colors.fill);
        outer.setAttribute('stroke', this.colors.stroke);
        outer.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(outer);

        // Inre kvadrat (centrerad)
        const innerX = x + (outerSize - innerSize) / 2;
        const innerY = y + (outerSize - innerSize) / 2;

        const inner = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        inner.setAttribute('x', innerX);
        inner.setAttribute('y', innerY);
        inner.setAttribute('width', innerSize);
        inner.setAttribute('height', innerSize);
        inner.setAttribute('fill', 'white');
        inner.setAttribute('stroke', this.colors.stroke);
        inner.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(inner);

        // Mått
        this.addDimension(svg, x, y + outerSize + 15, x + outerSize, y + outerSize + 15,
            `${outerSide} ${unit}`);

        return svg;
    },

    /**
     * Rendera två kvadrater
     */
    renderTwoSquares(config) {
        const { width = 350, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const side1 = config.side1 || 5;
        const side2 = config.side2 || 8;
        const unit = config.unit || 'cm';

        const maxSide = Math.max(side1, side2);
        const availableHeight = height - 2 * padding - 30;
        const scale = availableHeight / maxSide * 0.8;

        const size1 = side1 * scale;
        const size2 = side2 * scale;

        const gap = 40;
        const totalWidth = size1 + gap + size2;
        const startX = (width - totalWidth) / 2;

        // Första kvadraten
        const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect1.setAttribute('x', startX);
        rect1.setAttribute('y', (height - size1) / 2 - 10);
        rect1.setAttribute('width', size1);
        rect1.setAttribute('height', size1);
        rect1.setAttribute('fill', this.colors.fill);
        rect1.setAttribute('stroke', this.colors.stroke);
        rect1.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect1);

        this.addDimension(svg, startX, (height - size1) / 2 + size1 + 5, startX + size1, (height - size1) / 2 + size1 + 5, `${side1} ${unit}`);

        // Andra kvadraten
        const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect2.setAttribute('x', startX + size1 + gap);
        rect2.setAttribute('y', (height - size2) / 2 - 10);
        rect2.setAttribute('width', size2);
        rect2.setAttribute('height', size2);
        rect2.setAttribute('fill', '#FFECB3');
        rect2.setAttribute('stroke', this.colors.stroke);
        rect2.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect2);

        this.addDimension(svg, startX + size1 + gap, (height - size2) / 2 + size2 + 5, startX + size1 + gap + size2, (height - size2) / 2 + size2 + 5, `${side2} ${unit}`);

        return svg;
    },

    /**
     * Rendera tre kvadrater
     */
    renderThreeSquares(config) {
        const { width = 400, height = 180, padding = 25 } = this.defaults;
        const svg = this.createSVG(width, height);

        const sides = config.sides || [3, 3, 6];
        const unit = config.unit || 'dm';

        const maxSide = Math.max(...sides);
        const availableHeight = height - 2 * padding - 25;
        const scale = availableHeight / maxSide * 0.7;

        let currentX = padding + 20;

        sides.forEach((side, i) => {
            const size = side * scale;
            const y = height - padding - size - 15;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', currentX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', size);
            rect.setAttribute('height', size);
            rect.setAttribute('fill', i < 2 ? this.colors.fill : '#FFECB3');
            rect.setAttribute('stroke', this.colors.stroke);
            rect.setAttribute('stroke-width', this.defaults.strokeWidth);
            svg.appendChild(rect);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', currentX + size / 2);
            text.setAttribute('y', y + size + 15);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', this.defaults.fontSize);
            text.setAttribute('fill', this.colors.dimension);
            text.textContent = `${side} ${unit}²`;
            svg.appendChild(text);

            currentX += size + 15;
        });

        return svg;
    },

    /**
     * Rendera flagga
     */
    renderFlag(config) {
        const { width = 320, height = 220, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const flagWidth = config.width || 16;
        const flagHeight = config.height || 10;
        const unit = config.unit || 'dm';

        const availableWidth = width - 2 * padding;
        const availableHeight = height - 2 * padding - 30;
        const scale = Math.min(availableWidth / flagWidth, availableHeight / flagHeight);

        const w = flagWidth * scale;
        const h = flagHeight * scale;
        const x = (width - w) / 2;
        const y = padding;

        // Flagga bakgrund (grön)
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', '#4CAF50');
        rect.setAttribute('stroke', this.colors.stroke);
        rect.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(rect);

        // Triangel (gul)
        if (config.triangleBase && config.triangleHeight) {
            const triBase = config.triangleBase * scale;
            const triHeight = config.triangleHeight * scale;

            const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            triangle.setAttribute('points', `${x},${y} ${x + triBase},${y + h/2} ${x},${y + h}`);
            triangle.setAttribute('fill', '#FFEB3B');
            triangle.setAttribute('stroke', this.colors.stroke);
            triangle.setAttribute('stroke-width', 1);
            svg.appendChild(triangle);
        }

        // Mått
        this.addDimension(svg, x, y + h + 15, x + w, y + h + 15, `${flagWidth} ${unit}`);

        const heightText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heightText.setAttribute('x', x + w + 12);
        heightText.setAttribute('y', y + h / 2);
        heightText.setAttribute('font-size', this.defaults.fontSize);
        heightText.setAttribute('fill', this.colors.dimension);
        heightText.textContent = `${flagHeight} ${unit}`;
        svg.appendChild(heightText);

        return svg;
    },

    /**
     * Rendera rutnätsfigur
     */
    renderGridShape(config) {
        const { width = 280, height = 280, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const gridSize = config.gridSize || 6;
        const cellSize = (Math.min(width, height) - 2 * padding) / gridSize;

        const startX = (width - gridSize * cellSize) / 2;
        const startY = (height - gridSize * cellSize) / 2;

        // Rita rutnät
        for (let i = 0; i <= gridSize; i++) {
            // Vertikala linjer
            const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            vLine.setAttribute('x1', startX + i * cellSize);
            vLine.setAttribute('y1', startY);
            vLine.setAttribute('x2', startX + i * cellSize);
            vLine.setAttribute('y2', startY + gridSize * cellSize);
            vLine.setAttribute('stroke', '#ddd');
            vLine.setAttribute('stroke-width', 1);
            svg.appendChild(vLine);

            // Horisontella linjer
            const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            hLine.setAttribute('x1', startX);
            hLine.setAttribute('y1', startY + i * cellSize);
            hLine.setAttribute('x2', startX + gridSize * cellSize);
            hLine.setAttribute('y2', startY + i * cellSize);
            hLine.setAttribute('stroke', '#ddd');
            hLine.setAttribute('stroke-width', 1);
            svg.appendChild(hLine);
        }

        // Om det finns markeringar
        if (config.highlighted) {
            config.highlighted.forEach(cell => {
                const cellRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                cellRect.setAttribute('x', startX + cell.x * cellSize);
                cellRect.setAttribute('y', startY + cell.y * cellSize);
                cellRect.setAttribute('width', cellSize);
                cellRect.setAttribute('height', cellSize);
                cellRect.setAttribute('fill', this.colors.fill);
                cellRect.setAttribute('stroke', this.colors.stroke);
                cellRect.setAttribute('stroke-width', 1);
                svg.appendChild(cellRect);
            });
        }

        return svg;
    },

    /**
     * Rendera halvcirkelskillnad
     */
    renderSemicircleDifference(config) {
        const { width = 300, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const outerDiameter = config.outerDiameter || 3.8;
        const innerDiameter = config.innerDiameter || 3.0;
        const unit = config.unit || 'cm';

        const scale = (width - 2 * padding) / outerDiameter * 0.8;
        const outerR = (outerDiameter * scale) / 2;
        const innerR = (innerDiameter * scale) / 2;

        const cx = width / 2;
        const cy = height - padding - 30;

        // Yttre halvcirkel
        const outerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        outerPath.setAttribute('d', `M ${cx - outerR} ${cy} A ${outerR} ${outerR} 0 0 1 ${cx + outerR} ${cy} Z`);
        outerPath.setAttribute('fill', '#80DEEA');
        outerPath.setAttribute('stroke', this.colors.stroke);
        outerPath.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(outerPath);

        // Inre halvcirkel (vit, utskärning)
        const innerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerPath.setAttribute('d', `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`);
        innerPath.setAttribute('fill', 'white');
        innerPath.setAttribute('stroke', this.colors.stroke);
        innerPath.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(innerPath);

        // Mått
        this.addDimension(svg, cx - outerR, cy + 15, cx + outerR, cy + 15, `${outerDiameter} ${unit}`);
        this.addDimension(svg, cx - innerR, cy + 35, cx + innerR, cy + 35, `${innerDiameter} ${unit}`);

        return svg;
    },

    /**
     * Rendera förklaringstext
     */
    renderExplanation(config) {
        const { width = 300, height = 150 } = this.defaults;
        const svg = this.createSVG(width, height);

        const text = config.text || 'Förklaring krävs';

        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', width / 2);
        textEl.setAttribute('y', height / 2);
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('dominant-baseline', 'middle');
        textEl.setAttribute('font-size', '14');
        textEl.setAttribute('fill', this.colors.stroke);
        textEl.textContent = text;
        svg.appendChild(textEl);

        // Ikon
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.setAttribute('x', width / 2);
        icon.setAttribute('y', height / 2 - 30);
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('font-size', '32');
        icon.textContent = '💭';
        svg.appendChild(icon);

        return svg;
    },

    /**
     * Rendera cirkel och kvadrat tillsammans
     */
    renderCircleAndSquare(config) {
        const { width = 320, height = 200, padding = 30 } = this.defaults;
        const svg = this.createSVG(width, height);

        const side = config.side || 4;
        const unit = config.unit || 'cm';

        const availableWidth = (width - 3 * padding) / 2;
        const availableHeight = height - 2 * padding - 20;
        const scale = Math.min(availableWidth, availableHeight) / side * 0.8;
        const size = side * scale;

        // Kvadrat (vänster)
        const sqX = padding + (availableWidth - size) / 2;
        const sqY = (height - size) / 2;

        const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        square.setAttribute('x', sqX);
        square.setAttribute('y', sqY);
        square.setAttribute('width', size);
        square.setAttribute('height', size);
        square.setAttribute('fill', this.colors.fill);
        square.setAttribute('stroke', this.colors.stroke);
        square.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(square);

        // Diagonal på kvadraten
        const diagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        diagonal.setAttribute('x1', sqX);
        diagonal.setAttribute('y1', sqY);
        diagonal.setAttribute('x2', sqX + size);
        diagonal.setAttribute('y2', sqY + size);
        diagonal.setAttribute('stroke', this.colors.highlight);
        diagonal.setAttribute('stroke-width', 2);
        diagonal.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(diagonal);

        // Cirkel (höger) - diametern = diagonalen
        const circleRadius = size / 2;
        const cx = width - padding - availableWidth / 2;
        const cy = height / 2;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', circleRadius);
        circle.setAttribute('fill', '#FFECB3');
        circle.setAttribute('stroke', this.colors.stroke);
        circle.setAttribute('stroke-width', this.defaults.strokeWidth);
        svg.appendChild(circle);

        // Diameter-linje
        const diamLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        diamLine.setAttribute('x1', cx - circleRadius);
        diamLine.setAttribute('y1', cy);
        diamLine.setAttribute('x2', cx + circleRadius);
        diamLine.setAttribute('y2', cy);
        diamLine.setAttribute('stroke', this.colors.highlight);
        diamLine.setAttribute('stroke-width', 2);
        svg.appendChild(diamLine);

        // Mått
        this.addDimension(svg, sqX, sqY + size + 15, sqX + size, sqY + size + 15, `${side} ${unit}`);

        return svg;
    },

    /**
     * Animera figur (highlight)
     */
    animate(container, type = 'pulse') {
        const svg = container.querySelector('svg');
        if (!svg) return;

        const shapes = svg.querySelectorAll('rect, circle, polygon, path');
        shapes.forEach(shape => {
            shape.classList.add(`animate-${type}`);
            setTimeout(() => shape.classList.remove(`animate-${type}`), 1000);
        });
    }
};

export default Shapes2D;
