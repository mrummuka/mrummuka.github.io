/**
 * Generic test runner for a suite of test cases.
 * @param {Array} testCases - Array of test case objects.
 * @param {Function} executionFn - A function that takes a test case and returns { passed, actual }.
 * @param {string} resultsContainerId - The ID of the DOM element to render results into.
 * @param {Function} renderFn - A function to render a single test case result.
 */
function runTestSuite(testCases, executionFn, resultsContainerId, renderFn) {
    const container = document.getElementById(resultsContainerId);
    if (!container) {
        console.error(`Test results container with ID "${resultsContainerId}" not found.`);
        return;
    }
    container.innerHTML = ''; // Clear previous results

    let passes = 0;
    let fails = 0;

    testCases.forEach(test => {
        try {
            const { passed, actual } = executionFn(test);
            if (passed) {
                passes++;
            } else {
                fails++;
            }
            renderFn(container, test, passed, actual);
        } catch (error) {
            fails++;
            console.error(`Error in test "${test.name}":`, error);
            renderFn(container, test, false, `Execution Error: ${error.message}`);
        }
    });

    const summary = document.createElement('div');
    summary.className = `summary ${fails === 0 ? 'pass' : 'fail'}`;
    summary.textContent = `${passes} passed, ${fails} failed.`;
    container.prepend(summary);
}

function renderSimpleTestResult(container, test, passed, actual) {
    const resultEl = document.createElement('div');
    resultEl.className = `test-case ${passed ? 'pass' : 'fail'}`;
    resultEl.innerHTML = `
        <h3>${test.name}: ${passed ? 'PASS' : 'FAIL'}</h3>
        <div class="details">
            <p><strong>Input:</strong> <code>${JSON.stringify(test.input)}</code></p>
            <p><strong>Expected:</strong> <code>${JSON.stringify(test.expected)}</code></p>
            <p><strong>Actual:</strong> <code>${JSON.stringify(actual)}</code></p>
        </div>
    `;
    container.appendChild(resultEl);
}

function renderCollectSelectionsTestResult(container, test, passed, actual) {
    const resultEl = document.createElement('div');
    resultEl.className = `test-case ${passed ? 'pass' : 'fail'}`;
    resultEl.innerHTML = `
        <h3>${test.name}: ${passed ? 'PASS' : 'FAIL'}</h3>
        <div class="details">
            <p><strong>Description:</strong> ${test.description}</p>
            <p><strong>Expected:</strong> <code>${test.expected}</code></p>
            <p><strong>Actual:</strong> <code>${actual}</code></p>
        </div>
    `;
    container.appendChild(resultEl);
}

function renderShuffleTestResult(container, test, passed, actual) {
    const resultEl = document.createElement('div');
    resultEl.className = `test-case ${passed ? 'pass' : 'fail'}`;
    resultEl.innerHTML = `
        <h3>${test.name}: ${passed ? 'PASS' : 'FAIL'}</h3>
        <div class="details">
            <p><strong>Description:</strong> ${test.description}</p>
            <p><strong>Expected:</strong> <code>${test.expected}</code></p>
            <p><strong>Actual:</strong> <code>${actual}</code></p>
        </div>
    `;
    container.appendChild(resultEl);
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// Mock Data
const mockCaches = [
    { ID: 'GC1', FP: 100, Hidden: new Date('2001-01-01'), Difficulty: 1, Terrain: 5, Country: 'Finland', Region: 'Uusimaa', Reasons: [] },
    { ID: 'GC2', FP: 200, Hidden: new Date('2002-02-02'), Difficulty: 2, Terrain: 4, Country: 'Finland', Region: 'Uusimaa', Reasons: [] },
    { ID: 'GC3', FP: 200, Hidden: new Date('2003-03-03'), Difficulty: 3, Terrain: 3, Country: 'Finland', Region: 'Lappi', Reasons: [] },
    { ID: 'GC4', FP: 50,  Hidden: new Date('2004-04-04'), Difficulty: 4, Terrain: 2, Country: 'Sweden', Region: 'Stockholm', Reasons: [] },
    { ID: 'GC5', FP: 150, Hidden: new Date('2000-05-05'), Difficulty: 5, Terrain: 1, Country: 'Sweden', Region: 'Norrbotten', Reasons: [] },
    { ID: 'GC6', FP: 150, Hidden: new Date('2000-05-05'), Difficulty: 5, Terrain: 1, Country: 'Sweden', Region: 'Norrbotten', Reasons: [] }, // Duplicate for randomness check
];


// --- Test Suites ---

document.addEventListener('DOMContentLoaded', runAllTests);

function runAllTests() {
    // Mock Math.random to be predictable for tests
    let seed = 0.5;
    Math.random = function() { return seed; };

    runUtilityFunctionTests();
    runGetExtremeTests();
    runCollectSelectionsTests();
    runShuffleTests();
}

function runUtilityFunctionTests() {
    const testCases = [
        { name: "groupBy Country", input: { data: mockCaches, key: 'Country' }, expected: { Finland: 3, Sweden: 3 } },
        { name: "convertToDecimal N", input: 'N 60° 10.123', expected: '60.16872' },
        { name: "convertToDecimal E", input: 'E 24° 56.789', expected: '24.94648' },
        { name: "convertToDecimal S", input: 'S 33° 51.743', expected: '-33.86238' },
        { name: "convertToDecimal Invalid String", input: 'invalid string', expected: null },
        { name: "convertToDecimal Null Input", input: null, expected: null },
    ];

    runTestSuite(testCases, (test) => {
        let actual;
        if (test.name.startsWith('groupBy')) {
            const grouped = groupBy(test.input.data, test.input.key);
            actual = { Finland: grouped.Finland.length, Sweden: grouped.Sweden.length };
        } else {
            const result = convertToDecimal(test.input);
            actual = result === null ? null : result.toFixed(5);
        }
        return { passed: JSON.stringify(actual) === JSON.stringify(test.expected), actual };
    }, 'utils-test-results', renderSimpleTestResult);
}

function runGetExtremeTests() {
    const testCases = [
        { name: "Find max FP", input: { data: mockCaches, field: 'FP', extreme: 'max' }, expected: 200 },
        { name: "Find min Hidden Date", input: { data: mockCaches, field: 'Hidden', extreme: 'min' }, expected: 'GC5' },
        { name: "Random choice on tie (seed 0.5)", input: { data: mockCaches, field: 'FP', extreme: 'max', seed: 0.5 }, expected: 'GC3' },
        { name: "Random choice on tie (seed 0.4)", input: { data: mockCaches, field: 'FP', extreme: 'max', seed: 0.4 }, expected: 'GC2' },
        { name: "Empty array returns null", input: { data: [], field: 'FP', extreme: 'max' }, expected: null },
    ];

    runTestSuite(testCases, (test) => {
        if (test.input.seed !== undefined) {
            Math.random = () => test.input.seed;
        }
        const result = getExtreme(test.input.data, test.input.field, test.input.extreme);
        let actual = null;
        if (result) {
            actual = result[test.input.field] instanceof Date ? result.ID : result[test.input.field];
        }
        return { passed: actual === test.expected, actual };
    }, 'getextreme-test-results', renderSimpleTestResult);
}

function runCollectSelectionsTests() {
    const getTestData = () => JSON.parse(JSON.stringify(mockCaches)).map(c => ({ ...c, Hidden: new Date(c.Hidden), Reasons: [] }));


    const testCases = [
        {
            name: "Identifies oldest cache",
            description: "Should find the cache with the minimum 'Hidden' date.",
            setup: () => {
                const data = getTestData();
                allData = data; // Set global
                collectSelections(data);
                const oldest = data.find(c => c.Reasons.includes('Listan vanhin'));
                return oldest ? oldest.ID : null;

            },
            validator: (actual) => actual === 'GC5' || actual === 'GC6',
            expected: "GC5 or GC6"
        },
        {
            name: "Identifies most favorited cache",
            description: "Should find a cache with the maximum 'FP' value.",
            setup: () => {
                const data = getTestData();
                allData = data;
                collectSelections(data);
                const popular = data.find(c => c.Reasons.includes('Listan suosituin'));
                return popular ? popular.ID : null;

            },
            validator: (actual) => actual === 'GC2' || actual === 'GC3',
            expected: "GC2 or GC3"
        },
        {
            name: "Identifies oldest cache per country",
            description: "Should find oldest for Finland (GC1) and Sweden (GC5/GC6).",
            setup: () => {
                const data = getTestData();
                allData = data;
                collectSelections(data);
                const oldestFinland = data.find(c => c.ID === 'GC1');
                const oldestSweden = data.find(c => c.ID === 'GC5' || c.ID === 'GC6');

                return oldestFinland.Reasons.includes('Maan vanhin') && oldestSweden.Reasons.includes('Maan vanhin');
            },
            validator: (actual) => actual === true,
            expected: "true"
        },
        {
            name: "Runs only for specified reasons",
            description: "Calling with `reasonsToRun` should only select for those reasons.",
            setup: () => {
                const data = getTestData();
                allData = data;
                selectedIDs.clear();
                collectSelections(data, ['Listan vanhin']);
                const selected = data.filter(c => c.Reasons.length > 0);

                return selected.length === 1 && selected[0].Reasons.includes('Listan vanhin');
            },
            validator: (actual) => actual === true,
            expected: "true"
        },
        {
            name: "Adds a new reason to an already selected cache",
            description: "A cache selected for one reason should be able to get a second reason on a subsequent run.",
            setup: () => {
                const data = getTestData();
                allData = data;
                selectedIDs.clear();
                data.forEach(c => c.Reasons = []);
                
                // Make GC1 the only D1 cache
                data.find(c => c.ID === 'GC1').Difficulty = 1;
                data.find(c => c.ID === 'GC2').Difficulty = 2;

                // Run for 'Maan vanhin'

                collectSelections(data, ['Maan vanhin']);
                // Run for 'Ainoa'
                collectSelections(data, ['Ainoa Difficulty 1']);

                const gc1 = data.find(c => c.ID === 'GC1');
                return gc1.Reasons.length;
            },
            validator: (actual) => actual === 2,
            expected: "2"
        },
    ];

    runTestSuite(testCases, (test) => {
        const actual = test.setup();
        const passed = test.validator(actual);
        return { passed, actual };
    }, 'collect-test-results', renderCollectSelectionsTestResult);
}


function runShuffleTests() {
    const getTestData = () => JSON.parse(JSON.stringify(mockCaches)).map(c => ({ ...c, Hidden: new Date(c.Hidden), Reasons: [] }));

    // Mock the global functions and objects that shuffleCaches depends on
    const mockDependencies = (highlightedRowData = null, filteredData = null) => {
        const mockApi = {
            rows: (selector) => {
                if (selector === '.row-highlight') {
                    return { data: () => [highlightedRowData] };
                }
                // For { search: 'applied' }
                return { data: () => ({ toArray: () => filteredData || allData.map(c => [c.ID]) }) };
            },
            columns: () => ({
                every: (callback) => {
                    // Simulate no filters for simplicity in mock
                    callback({ search: () => '' });
                },
                search: () => ({ draw: () => {} }), // Mock chaining
            }),
        };
        // Mock DataTable API
        window.jQuery.fn.DataTable = () => mockApi;

        // Mock UI update functions to prevent errors and track calls
        window.displayFullTable = jest.fn();
        window.visualizeMap = jest.fn();
        window.updateShuffleFilteredButtonState = jest.fn();
    };
    // Simple mock function creator
    const jest = { fn: () => {
        let calls = [];
        const mockFn = (...args) => { calls.push(args); };
        mockFn.mock = { calls: calls };
        return mockFn;
    }};


    const testCases = [
        {
            name: "Full Shuffle changes selection",
            description: "When multiple candidates exist, a full shuffle should pick a different one.",
            setup: () => {
                allData = getTestData();
                mockDependencies();

                // Initial selection (seed 0.4 picks GC2 for max FP)
                Math.random = () => 0.4;
                collectSelections(allData);
                const initialSelection = allData.find(c => c.Reasons.includes('Listan suosituin')).ID;
                assert(initialSelection === 'GC2', "Initial selection should be GC2");

                // Change seed for shuffle (seed 0.6 picks GC3 for max FP)
                Math.random = () => 0.6;
                window.shuffleCaches(false); // Run full shuffle

                const finalSelection = allData.find(c => c.Reasons.includes('Listan suosituin')).ID;
                return finalSelection;
            },
            validator: (actual) => actual === 'GC3',
            expected: "GC3"
        },
        {
            name: "Single-Item Shuffle works correctly",
            description: "Shuffling a selected item should only re-run selection for that item's reasons.",
            setup: () => {
                allData = getTestData();
                // Highlight GC2, which was selected for 'Listan suosituin'
                mockDependencies([['GC2']]);

                // Initial selection
                Math.random = () => 0.4; // Picks GC2 for 'suosituin', GC5 for 'vanhin'
                collectSelections(allData);
                const oldestBefore = allData.find(c => c.Reasons.includes('Listan vanhin')).ID;

                // Shuffle with a seed that would pick GC3 for 'suosituin' but GC6 for 'vanhin'
                Math.random = () => 0.6;
                window.shuffleCaches(false); // Run single-item shuffle

                const popularAfter = allData.find(c => c.Reasons.includes('Listan suosituin')).ID;
                const oldestAfter = allData.find(c => c.Reasons.includes('Listan vanhin')).ID;

                // Check that 'suosituin' changed, but 'vanhin' did not.
                return { popularChanged: popularAfter === 'GC3', oldestUnchanged: oldestAfter === oldestBefore };
            },
            validator: (actual) => actual.popularChanged && actual.oldestUnchanged,
            expected: "{ popularChanged: true, oldestUnchanged: true }"
        },
        {
            name: "Filtered Shuffle re-runs correct reasons",
            description: "Shuffle filtered should only re-run reasons from visible rows, preserving other selections.",
            setup: () => {
                allData = getTestData();
                // Initial selection
                Math.random = () => 0.4; // Picks GC2 for 'suosituin', GC5 for 'vanhin'
                collectSelections(allData);
                const oldestBefore = allData.find(c => c.Reasons.includes('Listan vanhin')).ID;
                assert(oldestBefore === 'GC5', "Oldest before should be GC5");

                // Simulate filtering the table to only show the 'Listan suosituin' cache (GC2)
                const filteredData = allData.filter(c => c.ID === 'GC2').map(c => [c.ID, 'name', 'type', 'size', 'diff', 'terr', 'country', 'region', 'county', 'date', 'finds', 'fp', 'elev', 'Listan suosituin']);
                mockDependencies(null, filteredData);

                // Shuffle with a seed that would pick GC3 for 'suosituin' and GC6 for 'vanhin'
                Math.random = () => 0.6;
                window.shuffleCaches(true); // Run filtered shuffle

                const popularAfter = allData.find(c => c.Reasons.includes('Listan suosituin')).ID;
                const oldestAfter = allData.find(c => c.Reasons.includes('Listan vanhin')).ID;

                // Check that 'suosituin' changed, but 'vanhin' (which was filtered out) did not.
                return { popularChanged: popularAfter === 'GC3', oldestUnchanged: oldestAfter === oldestBefore };
            },
            validator: (actual) => actual.popularChanged && actual.oldestUnchanged,
            expected: "{ popularChanged: true, oldestUnchanged: true }"
        }
    ];

    runTestSuite(testCases, (test) => {
        const actual = test.setup();
        const passed = test.validator(actual);

        return { passed, actual: JSON.stringify(actual) };
    }, 'shuffle-test-results', renderShuffleTestResult);
}