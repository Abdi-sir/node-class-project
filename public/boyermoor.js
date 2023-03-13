function boyerMoore(text, pattern) {
    // Initialize the bad-character table
    var badCharTable = new Array(256);
    for (var i = 0; i < 256; i++) {
        badCharTable[i] = -1;
    }
    // Fill in the bad-character table
    for (var i = 0; i < pattern.length; i++) {
        badCharTable[pattern.charCodeAt(i)] = i;
    }

    // Initialize the good-suffix table
    var goodSuffixTable = new Array(pattern.length + 1);
    for (var i = 0; i < goodSuffixTable.length; i++) {
        goodSuffixTable[i] = pattern.length;
    }
    // Fill in the good-suffix table
    for (var i = pattern.length - 1; i >= 0; i--) {
        // Check for suffixes that are also prefixes
        var j = i;
        while (j >= 0 && pattern.charAt(j) == pattern.charAt(pattern.length - 1 - i + j)) {
            j--;
        }
        goodSuffixTable[i] = i - j;
    }

    // Search for the pattern in the text
    var i = 0;
    while (i <= text.length - pattern.length) {
        var j = pattern.length - 1;
        while (j >= 0 && pattern.charAt(j) == text.charAt(i + j)) {
            j--;
        }
        if (j < 0) {
            return i;
        } else {
            i += Math.max(goodSuffixTable[j], j - badCharTable[text.charCodeAt(i + j)]);
        }
    }

    // The pattern was not found in the text
    return -1;
}
