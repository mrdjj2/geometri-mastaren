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
            'hemisphere': this.renderHemisphere,
            'half_cylinder': this.renderHalfCylinder,
            'cube_wireframe': this.renderCubeWireframe,
            'cube_nets': this.renderCubeNets,
            'box_net': this.renderBoxNet,
            'density_comparison': this.renderDensityComparison,
            'glass': this.renderGlass,
            'wine_glass': this.renderWineGlass,
            'aquarium': this.renderAquarium,
            'multi_shape': this.renderMultiShape,
            'cylinder_unfolded': this.renderCylinderUnfolded,
            'sphere_shell': this.renderSphereShell,
            'sphere_in_cube': this.renderSphereInCube,
            'spheres_in_box': this.renderSpheresInBox,
            'pyramid_comparison': this.renderPyramidComparison,
            'sphere_from_cube': this.renderSphereFromCube,
            'half_cylinder_tent': this.renderHalfCylinderTent,
            'cuboid_from_areas': this.renderCuboidFromAreas,
            'mold': this.renderMold,
            'prism_with_cutout': this.renderPrismWithCutout,
            'prism_analysis': this.renderPrismAnalysis,
            'cube_conversion': this.renderCubeConversion,
            'design': this.renderDesign,
            'rain': this.renderRain,
            'glass_pane': this.renderGlassPane,
            'snow_road': this.renderSnowRoad,
            'snow_removal': this.renderSnowRemoval,
            'body_water': this.renderBodyWater,
            'examples': this.renderExamples,
            'table': this.renderTable
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
     * Rendera halvcylinder (halvt rör)
     */
    renderHalfCylinder(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = (config.diameter || 10) / 2;
        const h = config.height || 8;
        const scale = this.defaults.scale * 0.8;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        const ellipseRx = r * scale;
        const ellipseRy = r * scale * 0.4;
        const cylinderH = h * scale * 0.4;

        // Halv mantelyta (baksida)
        ctx.beginPath();
        ctx.ellipse(0, cylinderH / 2, ellipseRx, ellipseRy, 0, Math.PI, 0);
        ctx.lineTo(ellipseRx, -cylinderH / 2);
        ctx.ellipse(0, -cylinderH / 2, ellipseRx, ellipseRy, 0, 0, Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Topp halv-ellips
        ctx.beginPath();
        ctx.ellipse(0, -cylinderH / 2, ellipseRx, ellipseRy, 0, Math.PI, 0);
        ctx.lineTo(ellipseRx, -cylinderH / 2);
        ctx.closePath();
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Platt sida (rektangel)
        ctx.beginPath();
        ctx.moveTo(-ellipseRx, -cylinderH / 2);
        ctx.lineTo(-ellipseRx, cylinderH / 2);
        ctx.lineTo(ellipseRx, cylinderH / 2);
        ctx.lineTo(ellipseRx, -cylinderH / 2);
        ctx.closePath();
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.fillText(`d = ${config.diameter || r * 2} ${unit}`, -15, cylinderH / 2 + 25);
        ctx.fillText(`h = ${h} ${unit}`, ellipseRx + 10, 0);

        return canvas;
    },

    /**
     * Rendera kubskelett (tändstickor)
     */
    renderCubeWireframe(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const side = config.side || 4;
        const scale = this.defaults.scale;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2 + 20);

        // Kuben som wireframe
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: side, y: 0, z: 0 },
            { x: side, y: side, z: 0 },
            { x: 0, y: side, z: 0 },
            { x: 0, y: 0, z: side },
            { x: side, y: 0, z: side },
            { x: side, y: side, z: side },
            { x: 0, y: side, z: side }
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - side / 2, v.y - side / 2, v.z - side / 2, config)
        );

        // Rita alla kanter som "tändstickor"
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;

        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(projected[a].x, projected[a].y);
            ctx.lineTo(projected[b].x, projected[b].y);
            ctx.stroke();
        });

        // Hörnpunkter (tändstickhuvuden)
        ctx.fillStyle = '#FF4444';
        vertices.forEach((_, i) => {
            ctx.beginPath();
            ctx.arc(projected[i].x, projected[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.lineWidth = 1;
        ctx.fillText(`${side} ${unit}`, projected[0].x + 10, projected[0].y + 20);

        return canvas;
    },

    /**
     * Rendera kubnät (utvik)
     */
    renderCubeNets(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const side = config.side || 3;
        const scale = 20;
        const unit = config.unit || 'cm';

        ctx.translate(50, 40);

        // Rita ett korsnät (klassiskt kubnät)
        const squares = [
            { x: 1, y: 0 }, // Topp
            { x: 0, y: 1 }, // Vänster
            { x: 1, y: 1 }, // Mitten
            { x: 2, y: 1 }, // Höger
            { x: 3, y: 1 }, // Baksida
            { x: 1, y: 2 }  // Botten
        ];

        squares.forEach((sq, i) => {
            ctx.beginPath();
            ctx.rect(sq.x * side * scale, sq.y * side * scale, side * scale, side * scale);
            ctx.fillStyle = i === 2 ? this.colors.front : this.colors.top;
            ctx.fill();
            ctx.strokeStyle = this.colors.stroke;
            ctx.stroke();
        });

        // Nummer på varje ruta
        ctx.fillStyle = this.colors.text;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        squares.forEach((sq, i) => {
            ctx.fillText(
                (i + 1).toString(),
                sq.x * side * scale + side * scale / 2,
                sq.y * side * scale + side * scale / 2 + 5
            );
        });

        // Mått
        ctx.textAlign = 'left';
        ctx.fillText(`${side} ${unit}`, side * scale + 5, side * scale * 3 + 20);

        return canvas;
    },

    /**
     * Rendera lådnät (utvik för öppen låda)
     */
    renderBoxNet(config) {
        const { width = 340, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const boxSide = config.side || 15;
        const boxHeight = config.height || 5;
        const scale = 3;

        ctx.translate(40, 30);

        // Botten
        ctx.beginPath();
        ctx.rect(boxHeight * scale, boxHeight * scale, boxSide * scale, boxSide * scale);
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Fyra sidor
        const sides = [
            { x: boxHeight * scale, y: 0, w: boxSide * scale, h: boxHeight * scale },
            { x: 0, y: boxHeight * scale, w: boxHeight * scale, h: boxSide * scale },
            { x: boxHeight * scale + boxSide * scale, y: boxHeight * scale, w: boxHeight * scale, h: boxSide * scale },
            { x: boxHeight * scale, y: boxHeight * scale + boxSide * scale, w: boxSide * scale, h: boxHeight * scale }
        ];

        sides.forEach(s => {
            ctx.beginPath();
            ctx.rect(s.x, s.y, s.w, s.h);
            ctx.fillStyle = this.colors.side;
            ctx.fill();
            ctx.stroke();
        });

        // Viklinjer (streckade)
        ctx.setLineDash([5, 3]);
        ctx.strokeStyle = this.colors.highlight;
        ctx.beginPath();
        ctx.moveTo(boxHeight * scale, boxHeight * scale);
        ctx.lineTo(boxHeight * scale + boxSide * scale, boxHeight * scale);
        ctx.moveTo(boxHeight * scale, boxHeight * scale + boxSide * scale);
        ctx.lineTo(boxHeight * scale + boxSide * scale, boxHeight * scale + boxSide * scale);
        ctx.moveTo(boxHeight * scale, boxHeight * scale);
        ctx.lineTo(boxHeight * scale, boxHeight * scale + boxSide * scale);
        ctx.moveTo(boxHeight * scale + boxSide * scale, boxHeight * scale);
        ctx.lineTo(boxHeight * scale + boxSide * scale, boxHeight * scale + boxSide * scale);
        ctx.stroke();
        ctx.setLineDash([]);

        return canvas;
    },

    /**
     * Rendera densitetsjämförelse (guld vs koppar)
     */
    renderDensityComparison(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Två kuber sida vid sida
        const goldSize = 30;
        const copperSize = 40;

        // Guldkub (mindre men tyngre)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.rect(-100 - goldSize / 2, -goldSize / 2, goldSize, goldSize);
        ctx.fill();
        ctx.strokeStyle = '#B8860B';
        ctx.stroke();
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Guld', -100, goldSize / 2 + 20);
        ctx.fillText(`${config.goldWeight || 100} g`, -100, goldSize / 2 + 35);

        // Kopparkub (större)
        ctx.fillStyle = '#B87333';
        ctx.beginPath();
        ctx.rect(50 - copperSize / 2, -copperSize / 2, copperSize, copperSize);
        ctx.fill();
        ctx.strokeStyle = '#8B4513';
        ctx.stroke();
        ctx.fillStyle = this.colors.text;
        ctx.fillText('Koppar', 50, copperSize / 2 + 20);
        ctx.fillText(`${config.copperWeight || 100} g`, 50, copperSize / 2 + 35);

        // Jämförelsetext
        ctx.font = '11px Arial';
        ctx.fillText('Samma vikt, olika volym', 0, -60);

        return canvas;
    },

    /**
     * Rendera glas (konformad behållare)
     */
    renderGlass(config) {
        const { width = 320, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const topDiam = config.topDiameter || 8;
        const bottomDiam = config.bottomDiameter || 4;
        const h = config.height || 12;
        const scale = 8;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        const topR = topDiam * scale / 2;
        const bottomR = bottomDiam * scale / 2;
        const glassH = h * scale;

        // Glaset (trapetsform)
        ctx.beginPath();
        ctx.moveTo(-topR, -glassH / 2);
        ctx.lineTo(-bottomR, glassH / 2);
        ctx.lineTo(bottomR, glassH / 2);
        ctx.lineTo(topR, -glassH / 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Topp-ellips
        ctx.beginPath();
        ctx.ellipse(0, -glassH / 2, topR, topR * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Botten-ellips
        ctx.beginPath();
        ctx.ellipse(0, glassH / 2, bottomR, bottomR * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(135, 206, 235, 0.7)';
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`⌀${topDiam} ${unit}`, 0, -glassH / 2 - 15);
        ctx.fillText(`h = ${h} ${unit}`, topR + 25, 0);

        return canvas;
    },

    /**
     * Rendera vinglas (halvsfär + kon)
     */
    renderWineGlass(config) {
        const { width = 320, height = 320 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = config.hemisphereRadius || 4;
        const coneH = config.coneHeight || 8;
        const scale = 10;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2 - 20);

        const radius = r * scale;
        const coneHeight = coneH * scale;

        // Halvsfär (skål)
        ctx.beginPath();
        ctx.arc(0, -coneHeight / 2, radius, 0, Math.PI);
        const gradient = ctx.createRadialGradient(-radius * 0.3, -coneHeight / 2 - radius * 0.3, 0, 0, -coneHeight / 2, radius);
        gradient.addColorStop(0, 'rgba(200, 220, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(100, 150, 200, 0.4)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Kon (fot)
        ctx.beginPath();
        ctx.moveTo(-radius * 0.1, -coneHeight / 2);
        ctx.lineTo(-radius * 0.6, coneHeight / 2);
        ctx.lineTo(radius * 0.6, coneHeight / 2);
        ctx.lineTo(radius * 0.1, -coneHeight / 2);
        ctx.closePath();
        ctx.fillStyle = 'rgba(180, 200, 220, 0.5)';
        ctx.fill();
        ctx.stroke();

        // Bas
        ctx.beginPath();
        ctx.ellipse(0, coneHeight / 2, radius * 0.6, radius * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150, 170, 190, 0.6)';
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`r = ${r} ${unit}`, radius + 10, -coneHeight / 2);
        ctx.fillText(`h = ${coneH} ${unit}`, radius + 10, 0);

        return canvas;
    },

    /**
     * Rendera akvarium
     */
    renderAquarium(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const l = config.length || 60;
        const w = config.width || 30;
        const h = config.height || 40;
        const waterLevel = config.waterLevel || 35;
        const scale = 2;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2 + 20);

        // Akvariet som genomskinlig kub
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: l, y: 0, z: 0 },
            { x: l, y: h, z: 0 },
            { x: 0, y: h, z: 0 },
            { x: 0, y: 0, z: w },
            { x: l, y: 0, z: w },
            { x: l, y: h, z: w },
            { x: 0, y: h, z: w }
        ];

        const projected = vertices.map(v =>
            this.isoProject((v.x - l / 2) * scale / 20, (v.y - h / 2) * scale / 20, (v.z - w / 2) * scale / 20, { scale: 20 })
        );

        // Glasväggar (genomskinliga)
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#87CEEB';

        // Front
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fill();

        // Höger sida
        ctx.beginPath();
        ctx.moveTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[5].x, projected[5].y);
        ctx.lineTo(projected[6].x, projected[6].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1;

        // Vatten
        const waterH = waterLevel * scale / 20;
        const waterVertices = [
            { x: 0, y: 0, z: 0 },
            { x: l, y: 0, z: 0 },
            { x: l, y: waterLevel, z: 0 },
            { x: 0, y: waterLevel, z: 0 },
            { x: 0, y: 0, z: w },
            { x: l, y: 0, z: w },
            { x: l, y: waterLevel, z: w },
            { x: 0, y: waterLevel, z: w }
        ];

        const waterProj = waterVertices.map(v =>
            this.isoProject((v.x - l / 2) * scale / 20, (v.y - h / 2) * scale / 20, (v.z - w / 2) * scale / 20, { scale: 20 })
        );

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.moveTo(waterProj[0].x, waterProj[0].y);
        ctx.lineTo(waterProj[1].x, waterProj[1].y);
        ctx.lineTo(waterProj[2].x, waterProj[2].y);
        ctx.lineTo(waterProj[3].x, waterProj[3].y);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1;

        // Kanter
        ctx.strokeStyle = this.colors.stroke;
        const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 5], [2, 6], [5, 6], [3, 7], [6, 7]];
        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(projected[a].x, projected[a].y);
            ctx.lineTo(projected[b].x, projected[b].y);
            ctx.stroke();
        });

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.fillText(`${l} ${unit}`, projected[0].x, projected[0].y + 20);
        ctx.fillText(`${h} ${unit}`, projected[0].x - 30, (projected[0].y + projected[3].y) / 2);

        return canvas;
    },

    /**
     * Rendera flera former (cylinder, kon, klot)
     */
    renderMultiShape(config) {
        const { width = 380, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = (config.diameter || 6) / 2;
        const h = config.height || 6;
        const scale = 12;
        const unit = config.unit || 'cm';

        // Tre former i rad
        const shapes = [
            { name: 'Cylinder', x: -120 },
            { name: 'Kon', x: 0 },
            { name: 'Klot', x: 120 }
        ];

        ctx.translate(width / 2, height / 2);

        shapes.forEach((shape, i) => {
            ctx.save();
            ctx.translate(shape.x, 0);

            if (i === 0) {
                // Cylinder
                const rPx = r * scale;
                const hPx = h * scale;
                ctx.beginPath();
                ctx.ellipse(0, hPx / 2, rPx, rPx * 0.3, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.colors.side;
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.rect(-rPx, -hPx / 2, rPx * 2, hPx);
                ctx.fillStyle = this.colors.front;
                ctx.fill();

                ctx.beginPath();
                ctx.ellipse(0, -hPx / 2, rPx, rPx * 0.3, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.colors.top;
                ctx.fill();
                ctx.stroke();
            } else if (i === 1) {
                // Kon
                const rPx = r * scale;
                const hPx = h * scale;
                ctx.beginPath();
                ctx.moveTo(0, -hPx / 2);
                ctx.lineTo(-rPx, hPx / 2);
                ctx.lineTo(rPx, hPx / 2);
                ctx.closePath();
                ctx.fillStyle = this.colors.front;
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.ellipse(0, hPx / 2, rPx, rPx * 0.3, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.colors.side;
                ctx.fill();
                ctx.stroke();
            } else {
                // Klot
                const rPx = r * scale;
                const gradient = ctx.createRadialGradient(-rPx * 0.3, -rPx * 0.3, 0, 0, 0, rPx);
                gradient.addColorStop(0, '#BBDEFB');
                gradient.addColorStop(1, this.colors.front);
                ctx.beginPath();
                ctx.arc(0, 0, rPx, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.stroke();
            }

            ctx.fillStyle = this.colors.text;
            ctx.font = '11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(shape.name, 0, h * scale / 2 + 25);
            ctx.restore();
        });

        // Gemensamma mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`d = ${r * 2} ${unit}, h = ${h} ${unit}`, 0, -h * scale / 2 - 30);

        return canvas;
    },

    /**
     * Rendera cylinder utbredd (mantelyta)
     */
    renderCylinderUnfolded(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = (config.diameter || 6) / 2;
        const h = config.height || 8;
        const circumference = 2 * Math.PI * r;
        const scale = 10;

        ctx.translate(50, 50);

        // Mantelyta som rektangel
        const rectW = circumference * scale;
        const rectH = h * scale;

        ctx.beginPath();
        ctx.rect(0, 30, rectW, rectH);
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Två cirklar (topp och botten)
        const circleR = r * scale;

        ctx.beginPath();
        ctx.arc(rectW / 4, 15, circleR, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(3 * rectW / 4, rectH + 45, circleR, 0, Math.PI * 2);
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Etiketter
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.fillText('Mantelyta', rectW / 2, 30 + rectH / 2);
        ctx.fillText('2πr', rectW / 2, 30 + rectH + 15);
        ctx.fillText('h', -15, 30 + rectH / 2);

        return canvas;
    },

    /**
     * Rendera sfärskal (ihåligt klot)
     */
    renderSphereShell(config) {
        const { width = 320, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const outerR = config.outerRadius || 8;
        const innerR = config.innerRadius || 6;
        const scale = 8;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        // Yttre sfär
        const gradient = ctx.createRadialGradient(-outerR * scale * 0.3, -outerR * scale * 0.3, 0, 0, 0, outerR * scale);
        gradient.addColorStop(0, 'rgba(187, 222, 251, 0.8)');
        gradient.addColorStop(0.7, 'rgba(66, 165, 245, 0.6)');
        gradient.addColorStop(1, 'rgba(30, 136, 229, 0.4)');

        ctx.beginPath();
        ctx.arc(0, 0, outerR * scale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Inre hål (tvärsnitt)
        ctx.beginPath();
        ctx.arc(0, 0, innerR * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.fillText(`R = ${outerR} ${unit}`, outerR * scale + 10, 0);
        ctx.fillText(`r = ${innerR} ${unit}`, innerR * scale + 10, innerR * scale / 2);

        return canvas;
    },

    /**
     * Rendera sfär inuti kub
     */
    renderSphereInCube(config) {
        const { width = 320, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const side = config.side || 10;
        const r = side / 2;
        const scale = 8;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2 + 20);

        // Kub (transparent)
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: side, y: 0, z: 0 },
            { x: side, y: side, z: 0 },
            { x: 0, y: side, z: 0 },
            { x: 0, y: 0, z: side },
            { x: side, y: 0, z: side },
            { x: side, y: side, z: side },
            { x: 0, y: side, z: side }
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - side / 2, v.y - side / 2, v.z - side / 2, { scale })
        );

        // Rita kubkanter
        ctx.strokeStyle = this.colors.stroke;
        const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(projected[a].x, projected[a].y);
            ctx.lineTo(projected[b].x, projected[b].y);
            ctx.stroke();
        });

        // Sfär inuti
        const sphereR = r * scale;
        const gradient = ctx.createRadialGradient(-sphereR * 0.3, -sphereR * 0.3, 0, 0, 0, sphereR);
        gradient.addColorStop(0, 'rgba(255, 193, 7, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 152, 0, 0.6)');

        ctx.beginPath();
        ctx.arc(0, 0, sphereR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#FF9800';
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.fillText(`Kub: ${side} ${unit}`, -40, side * scale / 2 + 30);

        return canvas;
    },

    /**
     * Rendera sfärer i låda
     */
    renderSpheresInBox(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const boxL = config.length || 20;
        const boxW = config.width || 15;
        const boxH = config.height || 10;
        const sphereD = config.sphereDiameter || 5;
        const scale = 4;

        ctx.translate(width / 2, height / 2 + 30);

        // Låda (isometrisk)
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: boxL, y: 0, z: 0 },
            { x: boxL, y: boxH, z: 0 },
            { x: 0, y: boxH, z: 0 },
            { x: 0, y: 0, z: boxW },
            { x: boxL, y: 0, z: boxW },
            { x: boxL, y: boxH, z: boxW },
            { x: 0, y: boxH, z: boxW }
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - boxL / 2, v.y - boxH / 2, v.z - boxW / 2, { scale })
        );

        // Rita låda
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = this.colors.side;
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.strokeStyle = this.colors.stroke;
        const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 5], [2, 6], [5, 6]];
        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(projected[a].x, projected[a].y);
            ctx.lineTo(projected[b].x, projected[b].y);
            ctx.stroke();
        });

        // Rita några sfärer
        const sphereR = sphereD * scale / 2;
        ctx.fillStyle = '#FFC107';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                const x = sphereD / 2 + i * sphereD - boxL / 2;
                const z = sphereD / 2 + j * sphereD - boxW / 2;
                const pos = this.isoProject(x, -boxH / 2 + sphereD / 2, z, { scale });
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, sphereR * 0.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        }

        return canvas;
    },

    /**
     * Rendera pyramidjämförelse
     */
    renderPyramidComparison(config) {
        const { width = 360, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2 + 20);

        // Två pyramider
        const pyramids = [
            { x: -90, base: 40, h: 50, label: config.pyramid1Label || 'Pyramid 1' },
            { x: 90, base: 60, h: 80, label: config.pyramid2Label || 'Pyramid 2' }
        ];

        pyramids.forEach(p => {
            ctx.save();
            ctx.translate(p.x, 0);

            // Rita pyramid
            ctx.beginPath();
            ctx.moveTo(0, -p.h / 2);
            ctx.lineTo(-p.base / 2, p.h / 2);
            ctx.lineTo(p.base / 2, p.h / 2);
            ctx.closePath();
            ctx.fillStyle = this.colors.front;
            ctx.fill();
            ctx.strokeStyle = this.colors.stroke;
            ctx.stroke();

            // Etikett
            ctx.fillStyle = this.colors.text;
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(p.label, 0, p.h / 2 + 20);

            ctx.restore();
        });

        return canvas;
    },

    /**
     * Rendera sfär från kub (svarvad)
     */
    renderSphereFromCube(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const side = config.side || 10;
        const r = side / 2;
        const scale = 8;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        // Kub (wireframe, streckad)
        const half = side * scale / 2;
        ctx.setLineDash([5, 3]);
        ctx.strokeStyle = '#999';
        ctx.strokeRect(-half, -half, side * scale, side * scale);
        ctx.setLineDash([]);

        // Sfär (färgad)
        const sphereR = r * scale;
        const gradient = ctx.createRadialGradient(-sphereR * 0.3, -sphereR * 0.3, 0, 0, 0, sphereR);
        gradient.addColorStop(0, '#BBDEFB');
        gradient.addColorStop(1, this.colors.front);

        ctx.beginPath();
        ctx.arc(0, 0, sphereR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Pilar som visar transformation
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('→ Svarvas →', 0, half + 30);
        ctx.fillText(`Kub: ${side} ${unit}`, 0, -half - 15);

        return canvas;
    },

    /**
     * Rendera halvcylindertält
     */
    renderHalfCylinderTent(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const r = config.radius || 2;
        const length = config.length || 5;
        const scale = 25;
        const unit = config.unit || 'm';

        ctx.translate(width / 2, height / 2 + 20);

        const rPx = r * scale;
        const lPx = length * scale;

        // Halvcylinder (tält)
        // Baksida halvcirkel
        ctx.beginPath();
        ctx.ellipse(lPx / 3, 0, rPx * 0.8, rPx, 0, Math.PI, 0);
        ctx.fillStyle = this.colors.side;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Mantelyta
        ctx.beginPath();
        ctx.moveTo(-lPx / 3, 0);
        ctx.lineTo(-lPx / 3, 0);
        ctx.bezierCurveTo(-lPx / 3, -rPx * 1.2, lPx / 3, -rPx * 1.2, lPx / 3, 0);
        ctx.lineTo(lPx / 3, 0);
        ctx.bezierCurveTo(lPx / 3, -rPx, -lPx / 3, -rPx, -lPx / 3, 0);
        ctx.fillStyle = this.colors.top;
        ctx.fill();
        ctx.stroke();

        // Framsida halvcirkel
        ctx.beginPath();
        ctx.arc(-lPx / 3, 0, rPx, Math.PI, 0);
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.stroke();

        // Golv
        ctx.beginPath();
        ctx.moveTo(-lPx / 3 - rPx, 0);
        ctx.lineTo(lPx / 3 + rPx * 0.8, 0);
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.fillText(`r = ${r} ${unit}`, rPx + 10, -rPx / 2);
        ctx.fillText(`l = ${length} ${unit}`, 0, 25);

        return canvas;
    },

    /**
     * Rendera rätblock från sidoytor
     */
    renderCuboidFromAreas(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const l = config.length || 5;
        const w = config.width || 3;
        const h = config.height || 4;
        const scale = this.defaults.scale * 0.8;

        ctx.translate(width / 2, height / 2 + 20);

        // Rita rätblock med markerade ytor
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: l, y: 0, z: 0 },
            { x: l, y: h, z: 0 },
            { x: 0, y: h, z: 0 },
            { x: 0, y: 0, z: w },
            { x: l, y: 0, z: w },
            { x: l, y: h, z: w },
            { x: 0, y: h, z: w }
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - l / 2, v.y - h / 2, v.z - w / 2, { scale })
        );

        // Topp med area-text
        ctx.beginPath();
        ctx.moveTo(projected[3].x, projected[3].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[6].x, projected[6].y);
        ctx.lineTo(projected[7].x, projected[7].y);
        ctx.closePath();
        ctx.fillStyle = '#FFE0B2';
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
        ctx.fillStyle = '#C8E6C9';
        ctx.fill();
        ctx.stroke();

        // Front
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fillStyle = '#BBDEFB';
        ctx.fill();
        ctx.stroke();

        // Area-etiketter på ytorna
        ctx.fillStyle = this.colors.text;
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';

        const frontCenter = {
            x: (projected[0].x + projected[2].x) / 2,
            y: (projected[0].y + projected[2].y) / 2
        };
        ctx.fillText(`${l * h} cm²`, frontCenter.x, frontCenter.y);

        return canvas;
    },

    /**
     * Rendera gjutform
     */
    renderMold(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const l = config.length || 20;
        const w = config.width || 15;
        const h = config.height || 5;
        const scale = 4;

        ctx.translate(width / 2, height / 2 + 20);

        // Rita form som rätblock med fördjupning
        const outer = this.renderCuboid.call(this, { length: l, width: w, height: h, scale });

        // Kopiera från canvas till detta canvas
        ctx.drawImage(outer, -outer.width / 2, -outer.height / 2);

        // Lägg till text
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Gjutform', 0, h * scale + 40);

        return canvas;
    },

    /**
     * Rendera prisma med urtag
     */
    renderPrismWithCutout(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const l = config.length || 8;
        const w = config.width || 6;
        const h = config.height || 4;
        const cutoutW = config.cutoutWidth || 2;
        const cutoutH = config.cutoutHeight || 2;
        const scale = this.defaults.scale * 0.8;

        ctx.translate(width / 2, height / 2 + 20);

        // Huvudrätblock
        const vertices = [
            { x: 0, y: 0, z: 0 },
            { x: l, y: 0, z: 0 },
            { x: l, y: h, z: 0 },
            { x: 0, y: h, z: 0 }
        ];

        const projected = vertices.map(v =>
            this.isoProject(v.x - l / 2, v.y - h / 2, v.z - w / 2, { scale })
        );

        // Front med urtag
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Urtag (markerat med annan färg)
        const cutoutVerts = [
            { x: l / 2 - cutoutW / 2, y: 0, z: 0 },
            { x: l / 2 + cutoutW / 2, y: 0, z: 0 },
            { x: l / 2 + cutoutW / 2, y: cutoutH, z: 0 },
            { x: l / 2 - cutoutW / 2, y: cutoutH, z: 0 }
        ];

        const cutoutProj = cutoutVerts.map(v =>
            this.isoProject(v.x - l / 2, v.y - h / 2, v.z - w / 2, { scale })
        );

        ctx.beginPath();
        ctx.moveTo(cutoutProj[0].x, cutoutProj[0].y);
        ctx.lineTo(cutoutProj[1].x, cutoutProj[1].y);
        ctx.lineTo(cutoutProj[2].x, cutoutProj[2].y);
        ctx.lineTo(cutoutProj[3].x, cutoutProj[3].y);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = this.colors.highlight;
        ctx.stroke();

        ctx.fillStyle = this.colors.text;
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Urtag', 0, -h * scale / 2 - 10);

        return canvas;
    },

    /**
     * Rendera prismaanalys (är det ett prisma?)
     */
    renderPrismAnalysis(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Rita en generell 3D-form
        ctx.beginPath();
        ctx.moveTo(-60, 60);
        ctx.lineTo(60, 60);
        ctx.lineTo(80, 0);
        ctx.lineTo(0, -60);
        ctx.lineTo(-80, 0);
        ctx.closePath();
        ctx.fillStyle = this.colors.front;
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Frågetecken
        ctx.fillStyle = this.colors.highlight;
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('?', 0, 15);

        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.fillText('Är detta ett prisma?', 0, 90);

        return canvas;
    },

    /**
     * Rendera kubomvandling (dm³ till liter)
     */
    renderCubeConversion(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Kub
        const side = 60;
        ctx.strokeStyle = this.colors.stroke;
        ctx.strokeRect(-side / 2, -side / 2, side, side);
        ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
        ctx.fillRect(-side / 2, -side / 2, side, side);

        // Ekvivalenspilar
        ctx.fillStyle = this.colors.text;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('1 dm³ = 1 liter', 0, -side / 2 - 20);
        ctx.fillText('1 dm', side / 2 + 25, 5);
        ctx.fillText('1 dm', 0, side / 2 + 25);

        return canvas;
    },

    /**
     * Rendera design (konstruktion)
     */
    renderDesign(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Rita en enkel låda-skiss
        ctx.strokeStyle = this.colors.stroke;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(-60, -40, 120, 80);
        ctx.setLineDash([]);

        // Måttpil
        ctx.beginPath();
        ctx.moveTo(-60, 50);
        ctx.lineTo(60, 50);
        ctx.stroke();

        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Designa din egen låda', 0, -60);
        ctx.fillText('V = längd × bredd × höjd', 0, 80);

        return canvas;
    },

    /**
     * Rendera regn (vattenmängd)
     */
    renderRain(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Regnmoln
        ctx.fillStyle = '#78909C';
        ctx.beginPath();
        ctx.arc(-30, -60, 30, 0, Math.PI * 2);
        ctx.arc(10, -50, 35, 0, Math.PI * 2);
        ctx.arc(40, -60, 25, 0, Math.PI * 2);
        ctx.fill();

        // Regndroppar
        ctx.fillStyle = '#2196F3';
        for (let i = 0; i < 8; i++) {
            const x = -50 + i * 15;
            const y = -20 + (i % 3) * 20;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 3, y + 10);
            ctx.lineTo(x + 3, y + 10);
            ctx.closePath();
            ctx.fill();
        }

        // Mark/yta
        ctx.fillStyle = '#8BC34A';
        ctx.fillRect(-80, 40, 160, 30);

        // Mätare
        ctx.strokeStyle = this.colors.stroke;
        ctx.strokeRect(60, 0, 20, 50);
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(62, 30, 16, 18);

        ctx.fillStyle = this.colors.text;
        ctx.font = '10px Arial';
        ctx.fillText('mm', 70, 60);

        return canvas;
    },

    /**
     * Rendera glasskiva
     */
    renderGlassPane(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const paneW = config.width || 120;
        const paneH = config.height || 80;
        const thickness = config.thickness || 5;
        const scale = 1.5;
        const unit = config.unit || 'cm';

        ctx.translate(width / 2, height / 2);

        // Glasskiva (tunn rektangel i 3D)
        ctx.fillStyle = 'rgba(135, 206, 235, 0.4)';
        ctx.strokeStyle = this.colors.stroke;

        // Front
        ctx.fillRect(-paneW * scale / 2, -paneH * scale / 2, paneW * scale, paneH * scale);
        ctx.strokeRect(-paneW * scale / 2, -paneH * scale / 2, paneW * scale, paneH * scale);

        // Tjocklek (kant)
        ctx.fillStyle = 'rgba(100, 180, 220, 0.6)';
        ctx.beginPath();
        ctx.moveTo(paneW * scale / 2, -paneH * scale / 2);
        ctx.lineTo(paneW * scale / 2 + thickness, -paneH * scale / 2 - thickness);
        ctx.lineTo(paneW * scale / 2 + thickness, paneH * scale / 2 - thickness);
        ctx.lineTo(paneW * scale / 2, paneH * scale / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${paneW} × ${paneH} ${unit}`, 0, paneH * scale / 2 + 25);
        ctx.fillText(`${thickness} mm tjock`, 0, paneH * scale / 2 + 40);

        return canvas;
    },

    /**
     * Rendera snöröjning av väg
     */
    renderSnowRoad(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const roadW = config.width || 8;
        const roadL = config.length || 500;
        const snowH = config.snowHeight || 0.2;
        const scale = 15;

        ctx.translate(width / 2, height / 2);

        // Väg (perspektiv)
        ctx.fillStyle = '#607D8B';
        ctx.beginPath();
        ctx.moveTo(-80, 60);
        ctx.lineTo(80, 60);
        ctx.lineTo(40, -40);
        ctx.lineTo(-40, -40);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Snölager
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(-80, 60 - snowH * scale * 10);
        ctx.lineTo(80, 60 - snowH * scale * 10);
        ctx.lineTo(40, -40 - snowH * scale * 5);
        ctx.lineTo(-40, -40 - snowH * scale * 5);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#B0BEC5';
        ctx.stroke();

        // Mått
        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Väg: ${roadW} m × ${roadL} m`, 0, 85);
        ctx.fillText(`Snö: ${snowH} m`, 0, 100);

        return canvas;
    },

    /**
     * Rendera snöröjning (plog)
     */
    renderSnowRemoval(config) {
        const { width = 340, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Snöhög
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(-100, 40);
        ctx.quadraticCurveTo(-50, -40, 0, -20);
        ctx.quadraticCurveTo(50, -40, 100, 40);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#B0BEC5';
        ctx.stroke();

        // Plog (förenklad)
        ctx.fillStyle = '#FF9800';
        ctx.beginPath();
        ctx.moveTo(-40, 20);
        ctx.lineTo(-20, -10);
        ctx.lineTo(20, -10);
        ctx.lineTo(40, 20);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Pilar för snöröjning
        ctx.strokeStyle = this.colors.highlight;
        ctx.beginPath();
        ctx.moveTo(-60, 0);
        ctx.lineTo(-80, 0);
        ctx.moveTo(-80, 0);
        ctx.lineTo(-75, -5);
        ctx.moveTo(-80, 0);
        ctx.lineTo(-75, 5);
        ctx.stroke();

        ctx.fillStyle = this.colors.text;
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Snöröjning', 0, 70);

        return canvas;
    },

    /**
     * Rendera kroppsvatten
     */
    renderBodyWater(config) {
        const { width = 320, height = 300 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const weight = config.weight || 70;
        const waterPercent = config.waterPercent || 60;

        ctx.translate(width / 2, height / 2);

        // Enkel kroppssilhuett
        ctx.fillStyle = '#FFCC80';
        ctx.beginPath();
        ctx.arc(0, -70, 25, 0, Math.PI * 2); // Huvud
        ctx.fill();
        ctx.strokeStyle = this.colors.stroke;
        ctx.stroke();

        // Kropp
        ctx.fillStyle = '#FFCC80';
        ctx.beginPath();
        ctx.ellipse(0, 0, 35, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Vattenfyllning (60%)
        ctx.fillStyle = 'rgba(33, 150, 243, 0.5)';
        ctx.beginPath();
        ctx.ellipse(0, 20, 35, 40, 0, 0, Math.PI);
        ctx.fill();

        // Text
        ctx.fillStyle = this.colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${weight} kg`, 60, 0);
        ctx.fillText(`${waterPercent}% vatten`, 0, 90);

        return canvas;
    },

    /**
     * Rendera exempel (för enhetsomvandling)
     */
    renderExamples(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(width / 2, height / 2);

        // Rubrik
        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Ge exempel på:', 0, -80);

        // Exempel-rutor
        const examples = config.examples || ['2 dl', '20 dm³'];
        examples.forEach((ex, i) => {
            const y = -30 + i * 60;
            ctx.strokeStyle = this.colors.stroke;
            ctx.strokeRect(-80, y, 160, 40);
            ctx.fillStyle = this.colors.front;
            ctx.globalAlpha = 0.2;
            ctx.fillRect(-80, y, 160, 40);
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.colors.text;
            ctx.font = '12px Arial';
            ctx.fillText(ex, 0, y + 25);
        });

        return canvas;
    },

    /**
     * Rendera tabell
     */
    renderTable(config) {
        const { width = 320, height = 280 } = this.defaults;
        const canvas = this.createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.translate(20, 30);

        const cols = config.columns || ['Radie', 'Diameter', 'Omkrets'];
        const rows = config.rows || 3;
        const cellW = 90;
        const cellH = 35;

        // Rita tabellhuvud
        ctx.fillStyle = this.colors.top;
        ctx.fillRect(0, 0, cols.length * cellW, cellH);
        ctx.strokeStyle = this.colors.stroke;
        ctx.strokeRect(0, 0, cols.length * cellW, cellH);

        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 11px Arial';
        ctx.textAlign = 'center';
        cols.forEach((col, i) => {
            ctx.fillText(col, i * cellW + cellW / 2, 22);
            if (i > 0) {
                ctx.beginPath();
                ctx.moveTo(i * cellW, 0);
                ctx.lineTo(i * cellW, (rows + 1) * cellH);
                ctx.stroke();
            }
        });

        // Rita rader
        ctx.font = '11px Arial';
        for (let r = 1; r <= rows; r++) {
            ctx.strokeRect(0, r * cellH, cols.length * cellW, cellH);
            ctx.fillStyle = r % 2 === 0 ? '#f5f5f5' : '#fff';
            ctx.fillRect(1, r * cellH + 1, cols.length * cellW - 2, cellH - 2);
        }

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
