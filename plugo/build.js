// build.js
import fs from 'node:fs/promises';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import config from './plugo.config.js';

const OUTPUT_DIR = './dist';
const OUTPUT_FILE = `${OUTPUT_DIR}/plugo.css`;
const OUTPUT_MIN_FILE = `${OUTPUT_DIR}/plugo.min.css`;

const CUSTOM_THEME_CSS = `:root {
    --bg: #0f172a;
    --card: rgba(255, 255, 255, 0.04);
    --text: #e2e8f0;
    --muted: #94a3b8;
    --accent: #7c3aed;
    --accent-2: #22d3ee;
    --accent-3: #f59e0b;
    --border: rgba(255, 255, 255, 0.08);
    --shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    --blur: blur(60px);
}

[data-theme="light"] {
    --bg: #f8fafc;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #475569;
    --accent: #7c3aed;
    --accent-2: #0ea5e9;
    --accent-3: #f59e0b;
    --border: #e2e8f0;
    --shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
    --blur: blur(30px);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
    scroll-behavior: smooth;
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: var(--accent);
}

img {
    max-width: 100%;
    display: block;
}

.container {
    width: min(1100px, 90vw);
    margin: 0 auto;
}

.section {
    padding: 4rem 0;
}

.section.alt {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
}

.section-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: var(--accent);
    font-size: 0.9rem;
    margin: 0 0 0.4rem;
}

h1, h2, h3 {
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
}

.lead {
    color: var(--muted);
    margin-bottom: 1.2rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.8rem 1.4rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--text);
    background: transparent;
    font-weight: 700;
    transition: all 0.25s ease;
}

.btn.primary {
    background: linear-gradient(120deg, var(--accent), var(--accent-2));
    color: #0b1021;
    border-color: transparent;
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.35);
}

.btn.primary:hover {
    transform: translateY(-2px) scale(1.01);
}

.btn.ghost {
    background: transparent;
}

.hero {
    padding-top: 7rem;
    position: relative;
    overflow: hidden;
}

.hero .glow {
    position: absolute;
    inset: -20% auto auto 50%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.35), transparent 55%);
    filter: var(--blur);
    transform: translateX(-50%);
    z-index: -1;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(10px);
    z-index: 10;
}

[data-theme="light"] .header-content {
    background: rgba(248, 250, 252, 0.82);
}

.brand {
    font-weight: 800;
    letter-spacing: -0.02em;
    font-size: 1.2rem;
}

.nav-list {
    display: flex;
    list-style: none;
    gap: 1.4rem;
    margin: 0;
    padding: 0;
}

.nav-list a {
    font-weight: 600;
}

.burger {
    display: none;
    flex-direction: column;
    gap: 0.2rem;
    background: none;
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    padding: 0.6rem;
}

.burger span {
    width: 22px;
    height: 2px;
    background: var(--text);
}

.actions {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.theme-toggle {
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.grid {
    display: grid;
    gap: 2rem;
}

.two-cols {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: center;
}

.hero-panel {
    display: grid;
    gap: 1rem;
}

.card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 1.2rem;
    padding: 1.4rem;
    box-shadow: var(--shadow);
}

.card.accent {
    border-color: rgba(124, 58, 237, 0.4);
}

.card.secondary {
    border-style: dashed;
}

.label {
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
}

.large {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0.2rem 0;
}

.tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
}

.tags span {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    font-size: 0.9rem;
}

.quick-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.quick-stats dt {
    font-weight: 800;
    font-size: 1.8rem;
}

.quick-stats dd {
    margin: 0;
    color: var(--muted);
}

.filters {
    display: flex;
    gap: 0.8rem;
    align-items: center;
}

.filters input,
.filters select,
.contact-form input,
.contact-form textarea {
    padding: 0.8rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    font-size: 1rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
}

.project-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
}

.project-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 0.9rem;
    margin-bottom: 0.8rem;
}

.project-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;
    color: var(--muted);
}

.project-description {
    display: none;
    color: var(--muted);
    margin-top: 0.5rem;
}

.project-card.open .project-description {
    display: block;
}

.project-card .toggle {
    background: none;
    border: none;
    color: var(--accent);
    font-weight: 700;
    cursor: pointer;
    padding: 0;
}

.skills-grid,
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.skill-card,
.service {
    padding: 1.2rem;
    border-radius: 0.9rem;
    border: 1px solid var(--border);
    background: var(--card);
    font-weight: 700;
    text-align: center;
}

.timeline {
    border-left: 2px solid var(--border);
    padding-left: 1.5rem;
    display: grid;
    gap: 1rem;
}

.timeline-item {
    position: relative;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -1.55rem;
    top: 0.2rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.15);
}

.contact-info {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: grid;
    gap: 0.4rem;
}

.contact-form {
    display: grid;
    gap: 0.6rem;
    background: var(--card);
    padding: 1.4rem;
    border-radius: 1rem;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

.contact-form label {
    font-weight: 700;
}

.form-hint {
    color: var(--muted);
    margin: 0;
    font-size: 0.9rem;
}

.site-footer {
    border-top: 1px solid var(--border);
    padding: 1.6rem 0 2rem;
    background: rgba(0, 0, 0, 0.15);
}

.site-footer .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.footer-links {
    display: flex;
    gap: 1rem;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 860px) {
    .header-content {
        position: relative;
    }

    .nav-list {
        position: absolute;
        right: 0;
        top: 70px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 1rem;
        padding: 1rem;
        flex-direction: column;
        gap: 0.8rem;
        min-width: 200px;
        display: none;
    }

    .nav-list.open {
        display: flex;
    }

    .burger {
        display: inline-flex;
    }
}

@media (max-width: 600px) {
    .section {
        padding: 3rem 0;
    }

    .hero {
        padding-top: 6rem;
    }

    .actions {
        display: none;
    }
}`;


/* ------------------------------------------------------------
 * Utils
 * ----------------------------------------------------------*/

const LIGHT_FACTOR = 0.2;
const DARK_FACTOR = -0.2;

/**
 * Convert HEX (#rrggbb) -> { r,g,b }
 */
function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

/**
 * Convert {r,g,b} -> HEX
 */
function rgbToHex({ r, g, b }) {
    const toHex = (v) => {
        const h = v.toString(16);
        return h.length === 1 ? '0' + h : h;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Ajuste la luminosité d'une couleur.
 * percent > 0 → éclaircit, percent < 0 → assombrit
 * Ex: 0.2 = +20%, -0.2 = -20%
 */
function adjustColorLuminance(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const adjust = (c) => {
        if (percent > 0) {
            return Math.round(c + (255 - c) * percent);
        }
        return Math.round(c * (1 + percent));
    };
    return rgbToHex({
        r: Math.min(255, Math.max(0, adjust(r))),
        g: Math.min(255, Math.max(0, adjust(g))),
        b: Math.min(255, Math.max(0, adjust(b)))
    });
}

/**
 * Génère un bloc @media pour un breakpoint (sm, md, …)
 */
function wrapWithBreakpoint(breakpointName, minWidth, content) {
    return `
@media (min-width: ${minWidth}) {
${content}
}
`;
}

/* ------------------------------------------------------------
 * Génération du thème
 * ----------------------------------------------------------*/

function generateColors(theme) {
    const { colors } = theme;

    let css = `/* === Colors & CSS variables === */\n:root {\n`;
    for (const [name, value] of Object.entries(colors)) {
        const light = adjustColorLuminance(value, LIGHT_FACTOR);
        const dark = adjustColorLuminance(value, DARK_FACTOR);
        css += `  --color-${name}: ${value};\n`;
        css += `  --color-${name}-light: ${light};\n`;
        css += `  --color-${name}-dark: ${dark};\n`;
    }

    css += `}\n\n`;

    // Mode sombre optionnel
    if (config.darkMode) {
        css += `/* Dark mode via [data-theme="dark"] */\n[data-theme="dark"] {\n`;
        for (const [name, value] of Object.entries(colors)) {
            const darker = adjustColorLuminance(value, -0.35);
            const lighter = adjustColorLuminance(value, 0.1);
            css += `  --color-${name}: ${darker};\n`;
            css += `  --color-${name}-light: ${value};\n`;
            css += `  --color-${name}-dark: ${lighter};\n`;
        }
        css += `}\n\n`;
    }

    return css;
}

function generateTypography(theme) {
    const { typography, spacing } = theme;
    const lineHeightRatio = parseFloat(spacing.ratioLineHeight || '1.25');

    return `/* === Typography === */
:root {
  --font-main: ${typography.main};
  --font-headlines: ${typography.headlines};
  --line-height-ratio: ${lineHeightRatio};
}

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-main);
  line-height: var(--line-height-ratio);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headlines);
  line-height: var(--line-height-ratio);
  margin: 0 0 0.5em 0;
}

/* Exemple de tailles basiques */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  margin: 0 0 1em 0;
}

`;
}

function generateLayout(theme) {
    const { layout } = theme;
    const cols = layout.cols;
    const breakpoints = layout.breakpoints;

    let css = `/* === Layout & Grid === */
:root {
  --container-max-width: ${layout.container};
  --grid-columns: ${cols};
}

/* Container centré */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Ligne de grille */
.row {
  display: flex;
  flex-wrap: wrap;
}

/* Colonnes de base (mobile) */
`;

    // Colonnes .col-1 ... .col-N
    for (let i = 1; i <= cols; i++) {
        const percent = (i / cols) * 100;
        css += `.col-${i} {
  flex: 0 0 ${percent.toFixed(6)}%;
  max-width: ${percent.toFixed(6)}%;
}\n`;
    }

    // Variantes responsives .md:col-6, etc
    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        let inner = '';
        for (let i = 1; i <= cols; i++) {
            const percent = (i / cols) * 100;
            inner += `  .${bpName}\\:col-${i} {
    flex: 0 0 ${percent.toFixed(6)}%;
    max-width: ${percent.toFixed(6)}%;
  }\n`;
        }
        css += wrapWithBreakpoint(bpName, minWidth, inner);
    }

    return css + '\n';
}

function generateSpacing(theme) {
    const spacingTheme = theme.spacing;
    const baseUnit = spacingTheme.baseUnit;
    const breakpoints = theme.layout ? theme.layout.breakpoints : {};

    const scale = {
        0: 0,
        1: 0.25,
        2: 0.5,
        3: 1,
        4: 1.5,
        5: 2
    };

    let css = `/* === Spacing === */
:root {
  --spacing-base: ${baseUnit};
`;

    for (const [key, factor] of Object.entries(scale)) {
        css += `  --spacing-${key}: calc(var(--spacing-base) * ${factor});\n`;
    }
    css += `}\n\n`;

    // Classes .m-1, .mt-1, .mb-1, .mx-1, .my-1, .p-1, etc.
    const props = [
        ['m', ['margin']],
        ['mt', ['margin-top']],
        ['mb', ['margin-bottom']],
        ['ml', ['margin-left']],
        ['mr', ['margin-right']],
        ['mx', ['margin-left', 'margin-right']],
        ['my', ['margin-top', 'margin-bottom']],
        ['p', ['padding']],
        ['pt', ['padding-top']],
        ['pb', ['padding-bottom']],
        ['pl', ['padding-left']],
        ['pr', ['padding-right']],
        ['px', ['padding-left', 'padding-right']],
        ['py', ['padding-top', 'padding-bottom']],
        ['gap', ['gap']]
    ];
    const buildSet = (prefix = '', indent = '') => {
        let block = '';
        for (const key of Object.keys(scale)) {
            for (const [short, cssProps] of props) {
                block += `${indent}.${prefix}${short}-${key} {\n`;
                for (const prop of cssProps) {
                    block += `${indent}  ${prop}: var(--spacing-${key});\n`;
                }
                block += `${indent}}\n`;
            }
        }
        return block;
    };

    css += buildSet();

    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        const responsive = buildSet(`${bpName}\\:`, '  ');
        css += wrapWithBreakpoint(bpName, minWidth, responsive);
    }

    return css + '\n';
}

/* ------------------------------------------------------------
 * Utilities
 * ----------------------------------------------------------*/

function generateUtilityFlex(theme) {
    const breakpoints = theme.layout.breakpoints;

    let css = `/* === Utility: Flex === */ 
.flex { display: flex; }
.inline-flex { display: inline-flex; }

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }

.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
\n`;

    // Variantes responsives .md:flex, etc.
    const baseClasses = [
        'flex',
        'inline-flex',
        'flex-row',
        'flex-col',
        'items-start',
        'items-center',
        'items-end',
        'justify-start',
        'justify-center',
        'justify-between',
        'justify-end',
        'flex-wrap',
        'flex-nowrap'
    ];

    for (const [bpName, minWidth] of Object.entries(breakpoints)) {
        let inner = '';
        for (const cls of baseClasses) {
            inner += `  .${bpName}\\:${cls} { ${getUtilityFlexRuleForClass(cls)} }\n`;
        }
        css += wrapWithBreakpoint(bpName, minWidth, inner);
    }

    return css;
}

function getUtilityFlexRuleForClass(cls) {
    switch (cls) {
        case 'flex':
            return 'display: flex;';
        case 'inline-flex':
            return 'display: inline-flex;';
        case 'flex-row':
            return 'flex-direction: row;';
        case 'flex-col':
            return 'flex-direction: column;';
        case 'items-start':
            return 'align-items: flex-start;';
        case 'items-center':
            return 'align-items: center;';
        case 'items-end':
            return 'align-items: flex-end;';
        case 'justify-start':
            return 'justify-content: flex-start;';
        case 'justify-center':
            return 'justify-content: center;';
        case 'justify-between':
            return 'justify-content: space-between;';
        case 'justify-end':
            return 'justify-content: flex-end;';
        case 'flex-wrap':
            return 'flex-wrap: wrap;';
        case 'flex-nowrap':
            return 'flex-wrap: nowrap;';
        default:
            return '';
    }
}

function generateUtilityColor(theme) {
    const { colors } = theme;

    let css = `/* === Utility: Colors (text & background) === */\n`;

    for (const name of Object.keys(colors)) {
        css += `.text-${name} { color: var(--color-${name}); }\n`;
        css += `.text-${name}-light { color: var(--color-${name}-light); }\n`;
        css += `.text-${name}-dark { color: var(--color-${name}-dark); }\n`;

        css += `.bg-${name} { background-color: var(--color-${name}); }\n`;
        css += `.bg-${name}-light { background-color: var(--color-${name}-light); }\n`;
        css += `.bg-${name}-dark { background-color: var(--color-${name}-dark); }\n`;
    }

    return css + '\n';
}

function generateUtilitySpacing(theme) {
    return generateSpacing(theme);
}

function generateUtilityImage() {
    return `/* === Utility: Image === */
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-contain {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

`;
}

/* ------------------------------------------------------------
 * Components
 * ----------------------------------------------------------*/

function generateComponentButton(theme) {
    const { transition } = theme;
    return `/* === Component: Button === */
:root {
  --btn-radius: 9999px;
  --btn-padding-y: 0.5rem;
  --btn-padding-x: 1rem;
  --transition-duration: ${transition.duration};
  --transition-type: ${transition.type};
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  border-radius: var(--btn-radius);
  border: none;
  cursor: pointer;
  font-family: var(--font-main);
  font-weight: 600;
  transition: background-color var(--transition-duration) var(--transition-type),
              transform var(--transition-duration) var(--transition-type),
              box-shadow var(--transition-duration) var(--transition-type);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variantes colorées */
.btn-primary {
  background-color: var(--color-primary);
  color: #fff;
}
.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
}

.btn-success {
  background-color: var(--color-success);
  color: #000;
}
.btn-success:hover {
  background-color: var(--color-success-dark);
}

.btn-warning {
  background-color: var(--color-warning);
  color: #000;
}
.btn-warning:hover {
  background-color: var(--color-warning-dark);
}

.btn-danger {
  background-color: var(--color-danger);
  color: #fff;
}
.btn-danger:hover {
  background-color: var(--color-danger-dark);
}

`;
}

function generateComponentCard(theme) {
    return `/* === Component: Card === */
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
}

.card-header {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.card-footer {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #64748b;
}

`;
}

function generateComponentAlert(theme) {
    return `/* === Component: Alert === */
.alert {
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.alert-primary {
  background-color: var(--color-primary-light);
  color: #0f172a;
}

.alert-success {
  background-color: var(--color-success-light);
  color: #0f172a;
}

.alert-warning {
  background-color: var(--color-warning-light);
  color: #0f172a;
}

.alert-danger {
  background-color: var(--color-danger-light);
  color: #0f172a;
}

`;
}

/* ------------------------------------------------------------
 * Build principal
 * ----------------------------------------------------------*/

function generateCSS(config) {
    const theme = config.theme;

    let css = `/* ==========================================================
 * Plugo CSS Framework
 * Fichier généré automatiquement - ne pas modifier à la main.
 * ========================================================== */
`;

    // Thème global
    css += generateColors(theme);
    css += generateTypography(theme);
    css += generateLayout(theme);

    // Components
    if (config.components.includes('button')) {
        css += generateComponentButton(theme);
    }
    if (config.components.includes('card')) {
        css += generateComponentCard(theme);
    }
    if (config.components.includes('alert')) {
        css += generateComponentAlert(theme);
    }

    // Utilities
    if (config.utilities.includes('flex')) {
        css += generateUtilityFlex(theme);
    }
    if (config.utilities.includes('color')) {
        css += generateUtilityColor(theme);
    }
    if (config.utilities.includes('spacing')) {
        css += generateUtilitySpacing(theme);
    }
    if (config.utilities.includes('image')) {
        css += generateUtilityImage();
    }

    return css;
}

/**
 * Très basique : compte les classes via regex `.nom {`
 */
function countClasses(css) {
    const matches = css.match(/\.[a-zA-Z0-9\\:_-]+\s*\{/g) || [];
    return matches.length;
}

/* ------------------------------------------------------------
 * Pipeline PostCSS + écriture fichiers + rapport
 * ----------------------------------------------------------*/

async function runBuild() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const rawCss = generateCSS(config);

        // CSS avec autoprefixer (non minifié)
        const prefixed = await postcss([autoprefixer]).process(rawCss, {
            from: undefined
        });

        await fs.writeFile(OUTPUT_FILE, prefixed.css, 'utf8');

        // CSS minifié (autoprefixer + cssnano)
        const minified = await postcss([
            autoprefixer,
            cssnano({ preset: 'default' })
        ]).process(rawCss, {
            from: undefined
        });

        await fs.writeFile(OUTPUT_MIN_FILE, minified.css, 'utf8');

        // Rapport de build (bonus)
        const totalClasses = countClasses(prefixed.css);
        const sizePretty = (bytes) =>
            (bytes / 1024).toFixed(2) + ' kB';

        const sizeRaw = Buffer.byteLength(rawCss, 'utf8');
        const sizePrefixed = Buffer.byteLength(prefixed.css, 'utf8');
        const sizeMin = Buffer.byteLength(minified.css, 'utf8');

        console.log('✅ Build Plugo terminé !');
        console.log('───────────────────────────────');
        console.log(`Classes générées : ${totalClasses}`);
        console.log(`Taille brute      : ${sizePretty(sizeRaw)}`);
        console.log(`Taille plugo.css  : ${sizePretty(sizePrefixed)}`);
        console.log(`Taille plugo.min.css : ${sizePretty(sizeMin)}`);
        console.log('Fichiers générés :');
        console.log(` - ${OUTPUT_FILE}`);
        console.log(` - ${OUTPUT_MIN_FILE}`);
        console.log('───────────────────────────────');
    } catch (err) {
        console.error('❌ Erreur lors du build :', err);
        process.exit(1);
    }
}

runBuild();
