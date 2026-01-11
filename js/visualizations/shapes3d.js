/**
 * 3D Shapes Visualization - Canvas-baserade isometriska figurer
 */

const Shapes3D = {
    // Standard Canvas-inställningar
    defaults: {
        width: 320,
        height: 280,
        scale: 20,       // Pixlar per enhet
        isoAngle: 30,    // Isometrisk vinkel i grader
        rotationY: 0     // Rotation runt Y-axeln
    },

    // Färger
    colors: {
        top: '#90CAF9',
        front: '#42A5F5',
        side: '#1E88E5',
        stroke: '#0D47A1',
        highlight: '#FFC107',
        text: '#333'
    },

    /**
     * Skapa Canvas-element
     */
    createCanvas(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.classList.add('shape-canvas');
        return canvas;
    },

    /**
     * Konvertera 3D-koordinater till isometrisk 2D
     */
    isoProject(x, y, z, config = {}) {
        const angle = (config.isoAngle || this.defaults.isoAngle) * Math.PI / 180;
        const scale = config.scale || this.defaults.scale;

        // Isometrisk projektion
        const isoX = (x - z) * Math.cos(angle);
        const isoY = y + (x + z) * Math.sin(angle);

        return {
            x: isoX * scale,
            y: -isoY * scale // Inverterad Y för canvas
        };
    },

    /**
     * Rendera figur baserat på typ
     */
    render(container, config) {
        const type = config.type;
        const renderers = {
            'cuboid': this.renderCuboid,
            'cube': this.renderCube,
            'prism': this.renderPrism,
            'triangular_prism': this.renderTriangularPrism,
            'pyramid': this.renderPyramid,
            'cylinder': this.renderCylinder,
            'cone': this.renderCone,
            'sphere': this.renderSphere,
            'hemisphere': this.renderHemisphere
        };

        const renderer = renderers[type];
        if (renderer) {
            container.innerHTML = '';
            const canvas = renderer.call(this, config);
            container.appendChild(canvas);

            // Lägg till interaktivitet
            this.addInteractivity(canvas, config, renderer);
        } else {
            container.innerHTML = `<div class="viz-placeholder">3D-visualisering för ${type}</div>`;
        }
    },

    /**
     * Rendera rätblock
     */
    renderCuboid(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const l = config.length || 5;
        const w = config.width || 3;
        const h = config.height || 4;

        // Centrera
        ctx.translate(width / 2, height / 2 + 20);

        // Hörn (i 3D-koordinater)
        const vertices = [
            { x: 0, y: 0, z: 0 },           // 0: front-bottom-left
            { x: l, y: 0, z: 0 },           // 1: front-bottom-right
            { x: l, y: h, z: 0 },           // 2: front-top-right
            { x: 0, y: h, z: 0 },           // 3: front-top-left
            { x: 0, y: 0, z: w },           // 4: back-bottom-left
            { x: l, y: 0, z: w },           // 5: back-bottom-right
            { x: l, y: h, z: w },           // 6: back-top-right
            { x: 0, y: h, z: w }            // 7: back-top-left
        ];

        // Projicera till 2D
        const projected = vertices.map(v => this.isoProject(v.x - l / 2, v.y - h / 2, v.z - w / 2, config));

        // Rita ytor (bak till fram)
        // Topp
        ctx.beginPath();
        ctx.moveTo(projected[3].x, projected[3].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[6].x, projected[6].y);
        ctx.lineTo(projected[7].x, projected[7].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Höger sida
        ctx.beginPath();
        ctx.moveTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[6].x, projected[6].y);
        ctx.lineTo(projected[5].x, projected[5].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Front
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';

        const unit = config.unit || 'cm';

        // Längd
        ctx.fillText(`${l} ${unit}`, projected[0].x + (projected[1].x - projected[0].x) / 2 - 15, projected[0].y + 20);

        // Bredd
        ctx.fillText(`${w} ${unit}`, projected[1].x + 20, projected[1].y + (projected[5].y - projected[1].y) / 2);

        // Höjd
        ctx.fillText(`${h} ${unit}`, projected[0].x - 35, projected[0].y + (projected[3].y - projected[0].y) / 2);

        return canvas;
    },

    /**
     * Rendera kub
     */
    renderCube(config) {
        const side = config.side || 5;
        return this.renderCuboid({
            ...config,
            length: side,
            width: side,
            height: side
        });
    },

    /**
     * Rendera generellt prisma (med given basarea och höjd)
     */
    renderPrism(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const baseArea = config.baseArea || 42;
        const h = config.height || 25;
        const unit = config.unit || 'cm';

        // Visualisera som ett hexagonalt prisma för att visa "generellt prisma"
        // Beräkna en representativ storlek baserat på basarean
        const baseRadius = Math.sqrt(baseArea / Math.PI) * 1.5; // Approximera hexagonradie
        const scale = Math.min(this.defaults.scale * 0.8, 200 / Math.max(baseRadius * 2, h));

        ctx.translate(width / 2, height / 2 + 20);

        const sides = 6; // Hexagon
        const r = baseRadius * scale * 0.4;
        const prismH = h * scale * 0.3;

        // Generera hexagon-punkter för topp och botten
        const topPoints = [];
        const bottomPoints = [];
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
            const x = r * Math.cos(angle);
            const z = r * Math.sin(angle) * 0.5; // Perspektiv
            topPoints.push({ x, y: -prismH / 2 + z * 0.3, z });
            bottomPoints.push({ x, y: prismH / 2 + z * 0.3, z });
        }

        // Rita baksidorna först
        ctx.fillStyle = this.colors.side;
        ctx.strokeStyle = this.colors.stroke;
        for (let i = 0; i < sides; i++) {
            const next = (i + 1) % sides;
            if (topPoints[i].z > 0 || topPoints[next].z > 0) {
                ctx.beginPath();
                ctx.moveTo(topPoints[i].x, topPoints[i].y);
                ctx.lineTo(topPoints[next].x, topPoints[next].y);
                ctx.lineTo(bottomPoints[next].x, bottomPoints[next].y);
                ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }

        // Topp-yta
        ctx.beginPath();
        ctx.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 1; i < sides; i++) {
            ctx.lineTo(topPoints[i].x, topPoints[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Rita framsidorna
        ctx.fillStyle = this.colors.front;
        for (let i = 0; i < sides; i++) {
            const next = (i + 1) % sides;
            if (topPoints[i].z <= 0 && topPoints[next].z <= 0) {
                ctx.beginPath();
                ctx.moveTo(topPoints[i].x, topPoints[i].y);
                ctx.lineTo(topPoints[next].x, topPoints[next].y);
                ctx.lineTo(bottomPoints[next].x, bottomPoints[next].y);
                ctx.lineTo(bottomPoints[i].x, bottomPoints[i].y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';

        // Basarea
        ctx.fillText(`B = ${baseArea} ${unit}²`, -35, -prismH / 2 - 15);

        // Höjd
        ctx.fillText(`h = ${h} ${unit}`, r + 15, 0);

        // Höjd-linje (streckad)
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(r + 10, -prismH / 2);
        ctx.lineTo(r + 10, prismH / 2);
        ctx.strokeStyle = this.colors.highlight;
        ctx.stroke();
        ctx.setLineDash([]);

        // Pilar för höjd
        ctx.beginPath();
        ctx.moveTo(r + 10, -prismH / 2);
        ctx.lineTo(r + 5, -prismH / 2 + 8);
        ctx.moveTo(r + 10, -prismH / 2);
        ctx.lineTo(r + 15, -prismH / 2 + 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(r + 10, prismH / 2);
        ctx.lineTo(r + 5, prismH / 2 - 8);
        ctx.moveTo(r + 10, prismH / 2);
        ctx.lineTo(r + 15, prismH / 2 - 8);
        ctx.stroke();

        return canvas;
    },

    /**
     * Rendera triangelprisma
     */
    renderTriangularPrism(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const base = config.base || 4;
        const tHeight = config.triangleHeight || 3;
        const depth = config.prismHeight || 5;

        ctx.translate(width / 2, height / 2 + 20);

        // Triangel-punkter (i 3D)
        const vertices = [
            // Front triangel
            { x: 0, y: 0, z: 0 },           // 0: bottom-left
            { x: base, y: 0, z: 0 },        // 1: bottom-right
            { x: base / 2, y: tHeight, z: 0 }, // 2: top
            // Back triangel
            { x: 0, y: 0, z: depth },       // 3: bottom-left
            { x: base, y: 0, z: depth },    // 4: bottom-right
            { x: base / 2, y: tHeight, z: depth } // 5: top
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - base / 2, v.y - tHeight / 2, v.z - depth / 2, config)
        );

        // Rita ytor
        // Topp (rektangel mellan toppar)
        ctx.beginPath();
        ctx.moveTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[5].x, projected[5].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Höger sida
        ctx.beginPath();
        ctx.moveTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[5].x, projected[5].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Front triangel
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.stroke();

        return canvas;
    },

    /**
     * Rendera pyramid
     */
    renderPyramid(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const baseL = config.baseSide || config.baseLength || 6;
        const baseW = config.baseWidth || baseL;
        const h = config.height || 6;

        ctx.translate(width / 2, height / 2 + 30);

        // Hörn
        const vertices = [
            { x: 0, y: 0, z: 0 },           // 0: front-left
            { x: baseL, y: 0, z: 0 },       // 1: front-right
            { x: baseL, y: 0, z: baseW },   // 2: back-right
            { x: 0, y: 0, z: baseW },       // 3: back-left
            { x: baseL / 2, y: h, z: baseW / 2 } // 4: top
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - baseL / 2, v.y - h / 3, v.z - baseW / 2, config)
        );

        // Rita ytor (från bak till fram)
        // Vänster sida
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Bak sida
        ctx.beginPath();
        ctx.moveTo(projected[3].x, projected[3].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Höger sida
        ctx.beginPath();
        ctx.moveTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Front sida
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[4].x, projected[4].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        const unit = config.unit || 'cm';
        ctx.fillText(`${baseL} ${unit}`, projected[0].x + 10, projected[0].y + 20);
        ctx.fillText(`h = ${h} ${unit}`, projected[4].x + 10, projected[4].y - 5);

        return canvas;
    },

    /**
     * Rendera cylinder
     */
    renderCylinder(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = (config.diameter || 6) / 2;
        const h = config.height || 8;
        const scale = this.defaults.scale;

        ctx.translate(width / 2, height / 2);

        // Mantelyta (förenklad som rektangel med ellipser)
        const ellipseRx = r * scale;
        const ellipseRy = r * scale * 0.4; // Perspektiv-komprimering

        // Botten-ellips
        ctx.beginPath();
        ctx.ellipse(0, h * scale / 2, ellipseRx, ellipseRy, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Mantelyta (rektangel)
        ctx.beginPath();
        ctx.moveTo(-ellipseRx, -h * scale / 2);
        ctx.lineTo(-ellipseRx, h * scale / 2);
        ctx.lineTo(ellipseRx, h * scale / 2);
        ctx.lineTo(ellipseRx, -h * scale / 2);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.stroke();

        // Topp-ellips
        ctx.beginPath();
        ctx.ellipse(0, -h * scale / 2, ellipseRx, ellipseRy, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        const unit = config.unit || 'cm';
        ctx.fillText(`d = ${config.diameter || r * 2} ${unit}`, -20, h * scale / 2 + 25);
        ctx.fillText(`h = ${h} ${unit}`, ellipseRx + 10, 0);

        return canvas;
    },

    /**
     * Rendera kon
     */
    renderCone(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = (config.diameter || 6) / 2;
        const h = config.height || 10;
        const scale = this.defaults.scale;

        ctx.translate(width / 2, height / 2 + 20);

        const ellipseRx = r * scale;
        const ellipseRy = r * scale * 0.4;
        const topY = -h * scale / 2;
        const bottomY = h * scale / 2;

        // Kon-sidor
        ctx.beginPath();
        ctx.moveTo(0, topY);
        ctx.lineTo(-ellipseRx, bottomY);
        ctx.lineTo(ellipseRx, bottomY);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Botten-ellips
        ctx.beginPath();
        ctx.ellipse(0, bottomY, ellipseRx, ellipseRy, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        const unit = config.unit || 'cm';
        ctx.fillText(`d = ${config.diameter || r * 2} ${unit}`, -20, bottomY + 25);
        ctx.fillText(`h = ${h} ${unit}`, ellipseRx + 10, 0);

        return canvas;
    },

    /**
     * Rendera klot (sfär)
     */
    renderSphere(config) {
        const { width = 300, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const diameter = config.diameter || 10;
        const r = diameter / 2;
        const scale = this.defaults.scale;
        const radius = Math.min(r * scale, 90); // Begränsa maxstorlek
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        // Sfär med gradient
        const gradient = ctx.createRadialGradient(
            -radius * 0.3, -radius * 0.3, 0,
            0, 0, radius
        );
        gradient.addColorStop(0, '#BBDEFB');
        gradient.addColorStop(0.5, this.colors.front);
        gradient.addColorStop(1, this.colors.side);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // "Ekvator" ellips för 3D-känsla
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.stroke();

        // Diameter-linje genom klotet
        ctx.beginPath();
        ctx.moveTo(-radius, 0);
        ctx.lineTo(radius, 0);
        ctx.strokeStyle = this.colors.highlight;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;

        // Diameter-etikett
        ctx.fillStyle = this.colors.text;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`d = ${diameter} ${unit}`, 0, radius + 30);

        return canvas;
    },

    /**
     * Rendera halvklot
     */
    renderHemisphere(config) {
        const { width = 300, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = config.radius || 5;
        const scale = this.defaults.scale;
        const radius = Math.min(r * scale, 80); // Begränsa maxstorlek
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2 + 20);

        // Halvklot (halv cirkel + ellips)
        const gradient = ctx.createRadialGradient(
            -radius * 0.3, -radius * 0.3, 0,
            0, 0, radius
        );
        gradient.addColorStop(0, '#BBDEFB');
        gradient.addColorStop(1, this.colors.front);

        ctx.beginPath();
        ctx.arc(0, 0, radius, Math.PI, 0);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Bas-ellips
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Radie-linje
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.strokeStyle = this.colors.highlight;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;

        // Radie-etikett på linjen
        ctx.fillStyle = this.colors.highlight;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`r = ${r} ${unit}`, radius / 2, -10);

        // Centerpunkt
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.stroke;
        ctx.fill();

        return canvas;
    },

    /**
     * Lägg till interaktivitet (rotation med mus)
     */
    addInteractivity(canvas, config, renderer) {
        let isDragging = false;
        let startX = 0;
        let rotation = 0;

        canvas.style.cursor = 'grab';

        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            canvas.style.cursor = 'grabbing';
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            rotation = deltaX;
            // Här skulle vi kunna re-rendera med ny rotation
            // Men för enkelhetens skull skippar vi det nu
        });

        canvas.addEventListener('mouseup', () => {
            isDragging = false;
            canvas.style.cursor = 'grab';
        });

        canvas.addEventListener('mouseleave', () => {
            isDragging = false;
            canvas.style.cursor = 'grab';
        });
    }
};

export default Shapes3D;
