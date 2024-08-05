import { words } from '../data/output.js';

const commonLetters = ['ה', 'י', 'ו', 'ר', 'ל'];

// https://www.sttmedia.com/characterfrequency-hebrew
function getLetterPercentage(letter) {
    switch (letter) {
        case 'א': return 4.7;
        case 'ב': return 5.34;
        case 'ג': return 1.71;
        case 'ד': return 2.69;
        case 'ה': return 8.48;
        case 'ו': return 11.11;
        case 'ז': return 0.94;
        case 'ח': return 2.2;
        case 'ט': return 1.6;
        case 'י': return 11.67;
        case 'כ': return 1.96;
        case 'ל': return 6.27;
        case 'מ': return 5.11;
        case 'נ': return 3.65;
        case 'ס': return 2.16;
        case 'ע': return 2.72;
        case 'פ': return 2.22;
        case 'צ': return 1.31;
        case 'ק': return 2.55;
        case 'ר': return 6.52;
        case 'ש': return 4.33;
        case 'ת': return 5.49;
        case 'ך': return 0.39;
        case 'ם': return 2.68;
        case 'ן': return 1.36;
        case 'ף': return 0.22;
        case 'ץ': return 0.19;
        default: return 0.00001;
    }
}

function getLetterCountAndPosition(word) {
    const chars = [...word];
    const charCount = {};
    const charPositions = {};

    chars.forEach((char, i) => {
        charCount[char] = (charCount[char] || 0) + 1;
        if (!charPositions[char]) {
            charPositions[char] = [i];
        } else {
            charPositions[char].push(i);
        }
    });

    return [charCount, charPositions];
}

function getWordScore(word, averageLetterPosition, guestResult = null) {
    let score = 0;

    const [letterCount, letterPositions] = getLetterCountAndPosition(word);

    for (const [k, v] of Object.entries(letterCount)) {
        const letterPercentage = getLetterPercentage(k);
        score += letterPercentage;
        score -= v;
    }

    return score;
}

function getMostCommonPosition() {
    const letterPosition = {
        "א": { appeared: 0, position: 0 },
        "ב": { appeared: 0, position: 0 },
        "ג": { appeared: 0, position: 0 },
        "ד": { appeared: 0, position: 0 },
        "ה": { appeared: 0, position: 0 },
        "ו": { appeared: 0, position: 0 },
        "ז": { appeared: 0, position: 0 },
        "ח": { appeared: 0, position: 0 },
        "ט": { appeared: 0, position: 0 },
        "י": { appeared: 0, position: 0 },
        "כ": { appeared: 0, position: 0 },
        "ל": { appeared: 0, position: 0 },
        "מ": { appeared: 0, position: 0 },
        "נ": { appeared: 0, position: 0 },
        "ס": { appeared: 0, position: 0 },
        "ע": { appeared: 0, position: 0 },
        "פ": { appeared: 0, position: 0 },
        "צ": { appeared: 0, position: 0 },
        "ק": { appeared: 0, position: 0 },
        "ר": { appeared: 0, position: 0 },
        "ש": { appeared: 0, position: 0 },
        "ת": { appeared: 0, position: 0 },
        "ך": { appeared: 0, position: 0 },
        "ם": { appeared: 0, position: 0 },
        "ן": { appeared: 0, position: 0 },
        "ף": { appeared: 0, position: 0 },
        "ץ": { appeared: 0, position: 0 },
    };

    words.forEach(word => {
        [...word].forEach((letter, i) => {
            letterPosition[letter].position += i;
            letterPosition[letter].appeared += 1;
        });
    });

    const averageLetterPosition = {};
    for (const [letter, data] of Object.entries(letterPosition)) {
        averageLetterPosition[letter] = data.position / data.appeared;
    }

    return averageLetterPosition;
}

function bestWords(wordList, averageLetterPosition) {
    let bestScore = -1000000;
    let bestWords = [];

    wordList.forEach(word => {
        const score = getWordScore(word, averageLetterPosition);

        if (score > bestScore) {
            bestScore = score;
            bestWords = [word];
        } else if (Math.abs(score - bestScore) < 0.001) {
            bestWords.push(word);
        }
    });

    return [bestWords, bestScore];
}

const averageLetterPosition = getMostCommonPosition();

export { bestWords, averageLetterPosition, commonLetters };