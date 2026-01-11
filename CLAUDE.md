# Geometri-Mästaren

Swedish geometry learning PWA (Progressive Web App) for students, covering Chapter 3 of the mathematics curriculum.

## Project Overview

- **Type**: Static web application (HTML/CSS/JavaScript ES6 modules)
- **Language**: Swedish (Svenska)
- **Target**: Middle school geometry education
- **Deployment**: GitHub Pages (https://mrdjj2.github.io/geometri-mastaren/)

## Project Structure

```
Matte_Geometry/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── app.js              # Main application entry point
│   ├── data/
│   │   └── exercises.js    # All 160 exercise definitions
│   └── utils/
│       └── storage.js      # LocalStorage wrapper, profiles, progress
└── assets/
    └── icons/              # PWA icons
```

## Exercise Data Structure

Each exercise in `js/data/exercises.js` follows this structure:

```javascript
{
    id: '3.1.1',           // Format: section.number
    topic: '3.1',          // Topic ID for filtering
    level: 1,              // 1=ETT, 2=TVÅ, 3=TRE (difficulty)
    number: 1,             // Display number
    title: 'Title',        // Swedish title
    description: 'Text',   // Problem description in Swedish
    visualization: {},     // Optional visualization config
    inputs: [],            // Input field definitions
    answers: {},           // Correct answers (numbers or text)
    tolerance: 0.1,        // Allowed deviation for numeric answers
    hints: [],             // Progressive hints
    points: 15             // Points awarded
}
```

## Topics (Kapitel 3)

| ID | Name | Exercises | Level Distribution |
|----|------|-----------|-------------------|
| 3.1 | Omkrets och Area | 1-28 | ETT: 1-10, TVÅ: 11-20, TRE: 21-28 |
| 3.2 | Cirkelns Area | 31-48 | ETT: 31-36, TVÅ: 37-42, TRE: 43-48 |
| 3.3 | Volym och Begränsningsarea | 49-66 | ETT: 49-54, TVÅ: 55-60, TRE: 61-66 |
| 3.4 | Enheter för Volym | 67-90 | ETT: 67-74, TVÅ: 75-82, TRE: 83-90 |
| 3.5 | Prisma och Pyramid | 91-108 | ETT: 91-96, TVÅ: 97-102, TRE: 103-108 |
| 3.6 | Cylinder, Kon och Klot | 109-135 | ETT: 109-117, TVÅ: 118-126, TRE: 127-135 |
| mix | Blandade Uppgifter | 136-162 | ETT: 136-144, TVÅ: 145-153, TRE: 154-162 |

**Total: 160 exercises** (54 Level 1 + 54 Level 2 + 52 Level 3)

## Source Material

- `Geometri_Kapitel3_Uppgifter.txt` - Textbook content extracted from the physical book
- Exercise answers and calculations must match the textbook exactly

## Key Technical Details

### LocalStorage Keys
- Prefix: `geometri_`
- Profile data: `geometri_profile_{id}_data`
- Topic progress: `geometri_profile_{id}_topicProgress`
- Exercise details: `geometri_profile_{id}_exerciseDetails`

### Answer Validation
- Numeric answers use `tolerance` for comparison
- Text answers check for keyword inclusion
- Multiple inputs validated independently

## Development Notes

### Running Locally
```bash
python -m http.server 8080
# or
npx serve
```

### Testing
Use Playwright MCP to test:
1. Profile creation
2. Topic navigation
3. Level filtering
4. Exercise solving
5. Achievement unlocking

### Common Issues

1. **Level classification**: Verify against textbook - source file may have errors
2. **Calculation answers**: Double-check formulas (π calculations, unit conversions)
3. **Exercise numbering**: Some sections skip numbers (e.g., 29-30 don't exist)

## Git Workflow

- Main branch: `main`
- Deploy: Automatic via GitHub Pages on push
- Commit messages: Swedish or English, use conventional commits

## Important Reminders

- Always verify exercise data against the physical textbook
- Test level filtering after any exercise changes
- Push to update live site (takes 1-2 minutes to rebuild)
