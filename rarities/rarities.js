const ATTRIBUTE_NAMES = {
    1: { value: "Dogs", icon: "dogs" },
    2: { value: "Access or parking fee", icon: "fee" },
    3: { value: "Climbing gear", icon: "rappelling" },
    4: { value: "Boat", icon: "boat" },
    5: { value: "Scuba gear", icon: "scuba" },
    6: { value: "Recommended for kids", icon: "kids" },
    7: { value: "Takes less than an hour", icon: "onehour" },
    8: { value: "Scenic view", icon: "scenic" },
    9: { value: "Significant Hike", icon: "hiking" },
    10: { value: "Difficult climbing", icon: "climbing" },
    11: { value: "May require wading", icon: "wading" },
    12: { value: "May require swimming", icon: "swimming" },
    13: { value: "Available at all times", icon: "available" },
    14: { value: "Recommended at night", icon: "night" },
    15: { value: "Available during winter", icon: "winter" },
    17: { value: "Poisonous plants", icon: "poisonoak" },
    18: { value: "Dangerous Animals", icon: "dangerousanimals" },
    19: { value: "Ticks", icon: "ticks" },
    20: { value: "Abandoned mines", icon: "mine" },
    21: { value: "Cliff / falling rocks", icon: "cliff" },
    22: { value: "Hunting", icon: "hunting" },
    23: { value: "Dangerous area", icon: "danger" },
    24: { value: "Wheelchair accessible", icon: "wheelchair" },
    25: { value: "Parking available", icon: "parking" },
    26: { value: "Public transportation", icon: "public" },
    27: { value: "Drinking water nearby", icon: "water" },
    28: { value: "Public restrooms nearby", icon: "restrooms" },
    29: { value: "Telephone nearby", icon: "phone" },
    30: { value: "Picnic tables nearby", icon: "picnic" },
    31: { value: "Camping available", icon: "camping" },
    32: { value: "Bicycles", icon: "bicycles" },
    33: { value: "Motorcycles", icon: "motorcycles" },
    34: { value: "Quads", icon: "quads" },
    35: { value: "Off-road vehicles", icon: "jeeps" },
    36: { value: "Snowmobiles", icon: "snowmobiles" },
    37: { value: "Horses", icon: "horses" },
    38: { value: "Campfires", icon: "campfires" },
    39: { value: "Thorns", icon: "thorn" },
    40: { value: "Stealth required", icon: "stealth" },
    41: { value: "Stroller accessible", icon: "stroller" },
    42: { value: "Needs Maintenance", icon: "firstaid" },
    43: { value: "Watch for livestock", icon: "cow" },
    44: { value: "Flashlight required", icon: "flashlight" },
    45: { value: "Lost And Found Tour", icon: "landf" },
    46: { value: "Truck Driver/RV", icon: "rv" },
    47: { value: "Field Puzzle", icon: "field_puzzle" },
    48: { value: "UV Light Required", icon: "uv" },
    49: { value: "Snowshoes", icon: "snowshoes" },
    50: { value: "Cross Country Skis", icon: "skiis" },
    51: { value: "Special Tool Required", icon: "s_tool" },
    52: { value: "Night Cache", icon: "nightcache" },
    53: { value: "Park and Grab", icon: "parkngrab" },
    54: { value: "Abandoned Structure", icon: "abandonedbuilding" },
    55: { value: "Short hike (less than 1km)", icon: "hike_short" },
    56: { value: "Medium hike (1km-10km)", icon: "hike_med" },
    57: { value: "Long Hike (+10km)", icon: "hike_long" },
    58: { value: "Fuel Nearby", icon: "fuel" },
    59: { value: "Food Nearby", icon: "food" },
    60: { value: "Wireless Beacon", icon: "wirelessbeacon" },
    61: { value: "Partnership Cache", icon: "partnership" },
    62: { value: "Seasonal Access", icon: "seasonal" },
    63: { value: "Tourist Friendly", icon: "touristok" },
    64: { value: "Tree Climbing", icon: "treeclimbing" },
    65: { value: "Front Yard (Private Residence)", icon: "frontyard" },
    66: { value: "Teamwork Required", icon: "teamwork" },
    67: { value: "GeoTour", icon: "geotour" },
    69: { value: "Bonus cache", icon: "bonuscache" },
    70: { value: "Power trail", icon: "powertrail" },
    71: { value: "Challenge cache", icon: "challengecache" },
    72: { value: "Geocaching.com solution checker", icon: "hqsolutionchecker" },
};

const TYPE_NAMES_ICONS = {
    "Earthcache": "type_earth",
    "Virtual Cache": "type_virtual",
    "Letterbox Hybrid": "type_letterbox",
    "Traditional Cache": "type_traditional",
    "Multi-cache": "type_multi",
    "Wherigo Cache": "type_wherigo",
    "Webcam Cache": "type_webcam",
    "Event Cache": "type_event",
    "Mega Event Cache": "type_mega",
    "Giga Event Cache": "type_giga",
    "Unknown Cache": "type_mystery",
    "CITO Event": "type_cito",
    "Adventure Lab": "type_advlab",
    "HQ Event": "type_specialevent",
    "Community Celebration Event": "type_specialevent",
    "Locationless (Reverse) Cache": "type_locationless",
    "Project APE Cache": "type_ape",
    "GPS Adventures Exhibit": "type_maze",
    "Geocaching HQ": "type_hq",
    // Add more as needed
};

const TYPE_NAMES_FILTER = {
    "Earthcache": "Earthcache",
    "Virtual Cache": "Virtual Cache",
    "Letterbox Hybrid": "Letterbox Hybrid",
    "Traditional Cache": "Traditional Cache",
    "Multi-cache": "Multi-cache",
    "Wherigo Cache": "Wherigo Cache",
    "Unknown Cache": "Unknown Cache",
    // Add more as needed
};

const SIZE_NAMES = {
    "Micro": "Micro",
    "Small": "Small",
    "Regular": "Regular",
    "Large": "Large",
    "Other": "Other",
    "Virtual": "Virtual",
    "Not chosen": "Not chosen",
    // ...add all sizes you use...
};

const ATTRIBUTE_URL = "https://github.com/cgeo/cgeo/tree/master/main/project/attributes/svgs/";
let dtTypeFilter = null; // null means no filter
let dtSizeFilter = null;
let allData = [], selectedIDs = new Set(), map, markerLayer, markerMap = {};

// --- Logger ---
const DEBUG = false; // Set to true to see detailed shuffle logs
const logger = {
    debug: (...args) => {
        if (DEBUG) {
            console.log(...args);
        }
    },
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
};

// Convert coordinate string to decimal format
// Format: "N 60° 10.123", "E 24° 56.789"
// Returns: 60.17038, 24.94648
// Returns null if format is invalid
function convertToDecimal(coordStr) {
    if (!coordStr || typeof coordStr !== "string") return null; // Prevent error if coordStr is undefined or not a string
    const match = coordStr.trim().match(/([NSWE])\s*(\d+)°\s*(\d+\.\d+)/);
    if (!match) return null;
    const [, dir, deg, min] = match;
    let val = parseFloat(deg) + parseFloat(min) / 60;
    if (dir === 'S' || dir === 'W') val *= -1;
    return val;
}

function groupBy(arr, key) {
    return arr.reduce((acc, obj) => {
        const k = obj[key];
        if (!acc[k]) acc[k] = [];
        acc[k].push(obj);
        return acc;
    }, {});
}

// Get the extreme value (min or max) for a specific field in an array of objects
// Returns the object with the extreme value, or null if no valid values found
// 'extreme' can be 'max' or 'min'
// Example: getExtreme(data, "FP", "max") returns the object with the highest FP value
function getExtreme(arr, field, extreme) {
    if (!arr || arr.length === 0) return null;

    // 1. Find the extreme value first.
    let extremeValue = null;
    for (const item of arr) {
        const value = item[field];
        if (value == null) continue;
        if (extremeValue === null || (extreme === 'max' ? value > extremeValue : value < extremeValue)) {
            extremeValue = value;
        }
    }

    if (extremeValue === null) return null;

    // 2. Collect all items that match the extreme value.
    const candidates = arr.filter(item => item[field] === extremeValue);

    // 3. Pick one randomly.
    if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        return candidates[randomIndex];
    }

    return null;
}

function processFile() {
    // Reset shuffle button state
    document.getElementById('shuffleButton')?.remove();
    const fileInput = document.getElementById('inputFile');
    const fileType = document.getElementById('fileType').value;
    if (!fileInput.files.length) return alert('Valitse tiedosto');

    const file = fileInput.files[0];
    if (fileType === "csv" || file.name.toLowerCase().endsWith(".csv")) {
        processCSV(file);
    } else if (fileType === "gpx" || file.name.toLowerCase().endsWith(".gpx")) {
        processGPX(file);
    } else {
        alert("Tuntematon tiedostotyyppi");
    }
}

function processGPX(file) {
    const parser = new DOMParser();
    const reader = new FileReader();

    reader.onload = async function (event) {
        const xml = event.target.result;
        const doc = parser.parseFromString(xml, "application/xml");
        // ...your GPX parsing logic here...

        const ns = {
            gpx: "http://www.topografix.com/GPX/1/0",
            groundspeak: "http://www.groundspeak.com/cache/1/0/1",
            gsak: "http://www.gsak.net/xmlv1/6"
        };

        const wpts = doc.getElementsByTagNameNS(ns.gpx, "wpt");
        let total = 0;
        let cacheCoords = [];
        let cacheList = [];
        const latList = [];
        const lonList = [];
        const types = {};
        const sizes = {};
        const difficulties = {};
        const terrains = {};
        const hiddenDates = {};
        const years = {};
        const days = {};
        const months = {};
        const weekdays = {};
        const diffTerrPairs = {};
        const attributes = {};
        const countries = new Set();
        const states = new Set();
        let oldestDate = null;
        let favoSum = 0;
        let t5BoatCaches = 0;
        let tbelow5BoatCaches = 0;
        let boatSwimWadingCaches = 0;
        let elevation = null;

        /*
        // Pre-fill types with zeros to always show all types
        // commented out since this might be more useful to implement as toggle option
        Object.keys(TYPE_NAMES_ICONS).forEach(type => {
            types[type] = 0;
        });
        */

        for (let wpt of wpts) {
            const cache = wpt.getElementsByTagNameNS(ns.groundspeak, "cache")[0];
            if (!cache) continue;

            // Type
            const type = cache.getElementsByTagNameNS(ns.groundspeak, "type")[0]?.textContent || "?";
            if (type === "User defined cache") {
                continue; // Skip this cache
            }

            // Validate type against TYPE_NAMES_ICONS
            if (!TYPE_NAMES_ICONS.hasOwnProperty(type)) {
                // Optionally: skip this cache, or set to "Unknown", or log a warning
                continue; // to skip
                logger.warn(`Skipping unexpected cache type: "${type}"`);
            }

            types[type] = (types[type] || 0) + 1;

            total++;

            // Coords
            const lat = parseFloat(wpt.getAttribute("lat"));
            const lon = parseFloat(wpt.getAttribute("lon"));
            if (!isNaN(lat) && !isNaN(lon)) {
                cacheCoords.push([lat, lon]);
                latList.push(lat);
                lonList.push(lon);
            }

            // Gccode
            const gccode = wpt.getElementsByTagName("name")[0]?.textContent || "";
            // Name
            const name = cache.getElementsByTagNameNS(ns.groundspeak, "name")[0]?.textContent || "";

            // Size/Container
            const container = cache.getElementsByTagNameNS(ns.groundspeak, "container")[0]?.textContent || "?";
            sizes[container] = (sizes[container] || 0) + 1;

            // Difficulty/Terrain
            const difficulty = parseFloat(cache.getElementsByTagNameNS(ns.groundspeak, "difficulty")[0]?.textContent || "0");
            const terrain = parseFloat(cache.getElementsByTagNameNS(ns.groundspeak, "terrain")[0]?.textContent || "0");
            difficulties[difficulty] = (difficulties[difficulty] || 0) + 1;
            terrains[terrain] = (terrains[terrain] || 0) + 1;
            diffTerrPairs[`${difficulty}/${terrain}`] = (diffTerrPairs[`${difficulty}/${terrain}`] || 0) + 1;

            // Hidden date
            const hidden = wpt.getElementsByTagName("time")[0]?.textContent || "";
            hiddenDates[hidden] = (hiddenDates[hidden] || 0) + 1;

            if (hidden) {
                const date = new Date(hidden);

                // Hidden year
                const year = date.getFullYear();
                years[year] = (years[year] || 0) + 1;

                // Hidden day of month
                const day = date.getDate();
                days[day] = (days[day] || 0) + 1;
                // Hidden month
                const month = date.getMonth() + 1; // Months are 0-indexed
                months[month] = (months[month] || 0) + 1;

                // Hidden day of week
                const weekday = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                weekdays[weekday] = (weekdays[weekday] || 0) + 1;

                // Oldest hidden date
                if (!oldestDate || date < oldestDate) {
                    oldestDate = date;
                }
            }

            // Country/State
            const country = cache.getElementsByTagNameNS(ns.groundspeak, "country")[0]?.textContent || "";
            const state = cache.getElementsByTagNameNS(ns.groundspeak, "state")[0]?.textContent || "";
            if (country.trim()) countries.add(country.trim());
            if (state.trim()) states.add(state.trim());

            // Attributes
            const attSet = new Set();
            const attParent = cache.getElementsByTagNameNS(ns.groundspeak, "attributes")[0];
            if (attParent) {
                const attElements = attParent.getElementsByTagNameNS(ns.groundspeak, "attribute");
                for (let att of attElements) {
                    const attId = parseInt(att.getAttribute("id"), 10);
                    attSet.add(attId);
                    attributes[attId] = (attributes[attId] || 0) + 1;
                }
            }
            // Special conditions
            // T<5 + Boat attribute
            if (attSet.has(4) && terrain !== 5.0) {
                tbelow5BoatCaches++;
            }
            // T5 + Boat attribute
            if (attSet.has(4) && terrain === 5.0) {
                t5BoatCaches++;
            }
            // Boat + Swim + Wading attributes
            if ([4, 11, 12].every(id => attSet.has(id))) {
                boatSwimWadingCaches++;
            }

            // Favo points (gsak)
            let fp = 0;
            const wptExt = wpt.getElementsByTagNameNS(ns.gsak, "wptExtension")[0];
            if (wptExt) {
                const favElem = wptExt.getElementsByTagNameNS(ns.gsak, "FavPoints")[0];
                if (favElem && !isNaN(favElem.textContent)) {
                    fp = parseInt(favElem.textContent, 10);
                    favoSum += fp;
                }
            }

            cacheList.push({
                gccode,
                name,
                country,
                region: state,
                type,
                size: container,
                location: [country, state].filter(Boolean).join(" / "),
                fp,
                hidden,
                difficulty,
                terrain,
                coords: [lat, lon],
                lat,
                lon,
                elevation: null,
                attributes: Array.from(attSet).map(id => ({
                    id,
                    count: attributes[id] || 0
                }))
            });

        }

        // 🌍 Haetaan korkeusarvot kaikille pisteille yhdellä kutsulla
        let elevations = [];
        if (latList.length > 0) {
            elevations = await fetchElevationsInChunks(latList, lonList, 70); // voit säätää 50 tarvittaessa
        }
        cacheList.forEach((cache, i) => {
            cache.elevation = elevations[i] ?? null;
        });

        // After parsing, convert GPX caches to the same format as CSV rows:
        // Example:
        allData = cacheList.map(cache => ({
             ID: cache.gccode,
             "Cache name": cache.name,
             Country: cache.country,
             Region: cache.region,
             Type: cache.type,
             Size: cache.size,
             Difficulty: cache.difficulty,
             Terrain: cache.terrain,
             Hidden: new Date(cache.hidden),
             Latitude_dd: cache.lat,
             Longitude_dd: cache.lon,
             FP: cache.fp,
             Finds: 0, // GPX doesn't have finds
             "Elevation (m)": cache.elevation,
             Reasons: []
         }));

        selectedIDs = new Set();
        collectSelections(allData); // lisää Reasons vain datalle
        const onlySelected = !document.getElementById("showAll").checked;
        const dataToDisplay = onlySelected ? allData.filter(r => r.Reasons?.length) : allData;
        displayFullTable(allData, dataToDisplay, onlySelected);
        visualizeMap(allData, dataToDisplay);
    };

    reader.readAsText(file);
}

function processCSV() {
    const fileInput = document.getElementById('inputFile');
    if (!fileInput.files.length) return alert('Valitse CSV-tiedosto');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const text = event.target.result;
        // Get the first non-empty line
        const firstLine = text.split(/\r?\n/).find(line => line.trim().length > 0);
        // Count delimiters
        const commaCount = (firstLine.match(/,/g) || []).length;
        const semicolonCount = (firstLine.match(/;/g) || []).length;
        // Choose delimiter with more occurrences
        const delimiter = semicolonCount > commaCount ? ";" : ",";

        Papa.parse(file, {
            header: true,
            delimiter: delimiter,
            skipEmptyLines: true,
            complete: function (results) {
                allData = results.data.map(row => {
                    row.ID = row["GC-code"] || row["GCCODE"];
                    row.Latitude_dd = convertToDecimal(row.Latitude);
                    row.Longitude_dd = convertToDecimal(row.Longitude);
                    row.Hidden = new Date(row.Hidden);
                    row.FP = parseInt(row.FP || 0);
                    row.Finds = parseInt(row.Finds || 0);
                    row["Elevation (m)"] = parseFloat(row["Elevation (m)"] || 0);
                    row.Difficulty = parseFloat(row.Difficulty);
                    row.Terrain = parseFloat(row.Terrain);
                    row.Reasons = [];
                    return row;
                });

                selectedIDs = new Set();
                collectSelections(allData); // lisää Reasons vain datalle
                const onlySelected = !document.getElementById("showAll").checked;
                const dataToDisplay = onlySelected ? allData.filter(r => r.Reasons?.length) : allData;
                displayFullTable(allData, dataToDisplay, onlySelected);
                visualizeMap(allData, dataToDisplay);
            }
        });
    };

    reader.readAsText(file);
}

async function fetchElevationsInChunks(latList, lonList, chunkSize = 100) {
    const elevationCache = JSON.parse(localStorage.getItem('elevationCache')) || {};
    const results = new Array(latList.length).fill(null);
    const toFetch = [];

    // 1. Check cache first
    for (let i = 0; i < latList.length; i++) {
        const key = `${latList[i].toFixed(4)},${lonList[i].toFixed(4)}`;
        if (elevationCache[key] !== undefined) {
            results[i] = elevationCache[key];
        } else {
            toFetch.push({ index: i, lat: latList[i], lon: lonList[i] });
        }
    }

    logger.debug(`Found ${latList.length - toFetch.length} elevations in cache. Fetching ${toFetch.length} new elevations.`);

    if (toFetch.length === 0) {
        return results;
    }

    // 2. Fetch missing elevations in chunks
    let limitExceeded = false;
    for (let i = 0; i < toFetch.length; i += chunkSize) {
        if (limitExceeded) break;

        const chunk = toFetch.slice(i, i + chunkSize);
        const latChunk = chunk.map(p => p.lat);
        const lonChunk = chunk.map(p => p.lon);
        const url = `https://api.open-meteo.com/v1/elevation?latitude=${latChunk.join(",")}&longitude=${lonChunk.join(",")}`;

        try {
            const resp = await fetch(url);
            const data = await resp.json();

            if (data.error && data.reason && data.reason.toLowerCase().includes("limit")) {
                logger.warn("Elevation API rate limit exceeded. Stopping further requests.");
                limitExceeded = true;
                continue; // Stop fetching more chunks
            }

            if (Array.isArray(data.elevation)) {
                // 3. Populate results and update cache
                data.elevation.forEach((elev, j) => {
                    const originalIndex = chunk[j].index;
                    const key = `${chunk[j].lat.toFixed(4)},${chunk[j].lon.toFixed(4)}`;
                    results[originalIndex] = elev;
                    elevationCache[key] = elev;
                });
            } else {
                logger.warn("Unexpected elevation response:", data);
            }
        } catch (err) {
            logger.error("Elevation fetch failed:", err);
            // Don't try subsequent chunks if one fails
            limitExceeded = true; 
        }
    }

    // 4. Save updated cache to localStorage
    try {
        localStorage.setItem('elevationCache', JSON.stringify(elevationCache));
    } catch (e) {
        logger.error("Failed to save elevation cache to localStorage:", e);
    }

    return results;
}

function addReason(row, reason) {
    if (!row) return;
    row.Reasons ??= [];
    if (!row.Reasons.includes(reason)) row.Reasons.push(reason);
}

// Collect selections based on various criteria
// Returns an array of selected cache objects with reasons for selection
// Each object will have a 'Reasons' array explaining why it was selected
function collectSelections(data, reasonsToRun = null) {
    // Nollaa aiemmat valinnat ja syyt ennen uutta ajoa, ellei ajeta vain tietyille syille
    if (!reasonsToRun) {
        data.forEach(row => row.Reasons = []);
        selectedIDs.clear();
    }

    const selected = [];
    function add(r, reason) {
        if (r && !selectedIDs.has(r.ID)) {
            addReason(r, reason);
            selected.push(r);
            selectedIDs.add(r.ID);
        } else if (r) {
            // Jos kätkö on jo valittu toisesta syystä, lisätään vain uusi syy
            const existing = allData.find(e => e.ID === r.ID);
            addReason(existing, reason);
        }
    }

    const criteria = {
        "Listan vanhin": () => add(getExtreme(data, "Hidden", "min"), "Listan vanhin"),
        "Listan suosituin": () => add(getExtreme(data, "FP", "max"), "Listan suosituin"),
        "Listan korkein": () => add(getExtreme(data, "Elevation (m)", "max"), "Listan korkein"),
        "Listan matalin": () => add(getExtreme(data, "Elevation (m)", "min"), "Listan matalin"),
        "Listan löydetyin": () => add(getExtreme(data, "Finds", "max"), "Listan löydetyin"),
        "Listan vähiten löydetty": () => add(getExtreme(data, "Finds", "min"), "Listan vähiten löydetty"),
    };

    // Run base criteria
    Object.keys(criteria).forEach(reason => {
        if (!reasonsToRun || reasonsToRun.includes(reason)) {
            criteria[reason]();
        }
    });

    // Checkboxes
    const showCountry = document.getElementById("showCountry").checked;
    const showRegion = document.getElementById("showRegion").checked;
    const showCounty = document.getElementById("showCounty").checked;

     if (showCountry) {
        const countryGroups = groupBy(data, "Country");
        for (const country in countryGroups) {
            if (!reasonsToRun || reasonsToRun.includes(`Maan vanhin`)) add(getExtreme(countryGroups[country], "Hidden", "min"), `Maan vanhin`);
            if (!reasonsToRun || reasonsToRun.includes(`Maan suosituin`)) add(getExtreme(countryGroups[country], "FP", "max"), `Maan suosituin`);
            if (!reasonsToRun || reasonsToRun.includes(`Maan korkein`)) add(getExtreme(countryGroups[country], "Elevation (m)", "max"), `Maan korkein`);
            if (!reasonsToRun || reasonsToRun.includes(`Maan matalin`)) add(getExtreme(countryGroups[country], "Elevation (m)", "min"), `Maan matalin`);
        }
     }

    if (showRegion) {
        const regionGroups = groupBy(data, "Region");
        for (const region in regionGroups) {
            if (!reasonsToRun || reasonsToRun.includes(`Alueen vanhin`)) add(getExtreme(regionGroups[region], "Hidden", "min"), `Alueen vanhin`);
            if (!reasonsToRun || reasonsToRun.includes(`Alueen suosituin`)) add(getExtreme(regionGroups[region], "FP", "max"), `Alueen suosituin`);
            if (!reasonsToRun || reasonsToRun.includes(`Alueen korkein`)) add(getExtreme(regionGroups[region], "Elevation (m)", "max"), `Alueen korkein`);
            if (!reasonsToRun || reasonsToRun.includes(`Alueen matalin`)) add(getExtreme(regionGroups[region], "Elevation (m)", "min"), `Alueen matalin`);
        }
    }

    if (showCounty) {
        const countyGroups = groupBy(data, "County");
        for (const county in countyGroups) {
            if (!reasonsToRun || reasonsToRun.includes(`Kunnan vanhin`)) add(getExtreme(countyGroups[county], "Hidden", "min"), `Kunnan vanhin`);
            if (!reasonsToRun || reasonsToRun.includes(`Kunnan suosituin`)) add(getExtreme(countyGroups[county], "FP", "max"), `Kunnan suosituin`);
            if (!reasonsToRun || reasonsToRun.includes(`Kunnan korkein`)) add(getExtreme(countyGroups[county], "Elevation (m)", "max"), `Kunnan korkein`);
            if (!reasonsToRun || reasonsToRun.includes(`Kunnan matalin`)) add(getExtreme(countyGroups[county], "Elevation (m)","min"), `Kunnan matalin`);
        }
    }

    const byType = groupBy(data, "Type");
    for (const k in byType) {
        if (!reasonsToRun || reasonsToRun.includes(`Type:${k}`)) add(getExtreme(byType[k], "FP", "max"), `Type:${k}`);
    }
    const bySize = groupBy(data, "Size");
    for (const k in bySize) {
        if (!reasonsToRun || reasonsToRun.includes(`Size:${k}`)) add(getExtreme(bySize[k], "FP", "max"), `Size:${k}`);
    }
    const byDiff = groupBy(data, "Difficulty");
    for (const k in byDiff) {
        if (!reasonsToRun || reasonsToRun.includes(`D${k}`)) add(getExtreme(byDiff[k], "FP", "max"), `D${k}`);
    }
    const byTerr = groupBy(data, "Terrain");
    for (const k in byTerr) {
        if (!reasonsToRun || reasonsToRun.includes(`T${k}`)) add(getExtreme(byTerr[k], "FP", "max"), `T${k}`);
    }

    ["Size", "Difficulty", "Terrain"].forEach(key => {
        const groups = groupBy(data, key);
        for (const val in groups) {
            if (groups[val].length === 1) {
                const only = groups[val][0];
                const reason = `Ainoa ${key} ${val}`;
                if (!reasonsToRun || reasonsToRun.includes(reason)) {
                    addReason(only, reason);
                }
            }
        }
    });

    return selected;
}

async function shuffleCaches(isFilteredShuffle) {
    logger.debug(`[Shuffle] Initiated. isFilteredShuffle: ${isFilteredShuffle}`);
    const table = $('#allCaches').DataTable();
    const highlightedRow = table.rows('.row-highlight').data()[0];

    // 1. Capture current filter state
    const currentFilters = [];
    table.columns().every(function () {
        if (this.search()) {
            currentFilters.push({ index: this.index(), search: this.search() });
        }
    });
    logger.debug('[Shuffle] Captured filters:', currentFilters);

    // 2. Determine which "rare" categories (reasons) to re-shuffle.
    let reasonsToShuffle = null; // null means all reasons

    if (highlightedRow) {
        // --- Scenario 1: Single-item shuffle ---
        const cacheIdToShuffle = highlightedRow[0];
        logger.debug(`[Shuffle] Mode: Single item shuffle for: ${cacheIdToShuffle}`);
        // Find the cache from the master data list, which has its reasons populated.
        logger.debug('[Shuffle Debug] allData before find:', JSON.parse(JSON.stringify(allData.map(c => ({ ID: c.ID, Reasons: c.Reasons })))));
        const cacheToShuffle = allData.find(c => c.ID === cacheIdToShuffle);
        reasonsToShuffle = cacheToShuffle?.Reasons || null;
    } else if (isFilteredShuffle) {
        // --- Scenario 2: Filtered shuffle ---
        logger.debug('[Shuffle] Mode: Filtered shuffle');
        const visibleRowsData = table.rows({ search: 'applied' }).data().toArray();
        const reasonSet = new Set();
        visibleRowsData.forEach(rowData => {
            const cacheId = rowData[0];
            const cache = allData.find(c => c.ID === cacheId);
            if (cache && cache.Reasons) {
                cache.Reasons.forEach(reason => reasonSet.add(reason));
            }
        });
        reasonsToShuffle = Array.from(reasonSet);
    } else {
        // --- Scenario 3: Full shuffle ---
        logger.debug('[Shuffle] Mode: Full shuffle on all categories.');
        // reasonsToShuffle remains null to indicate all categories
    }

    logger.debug(`[Shuffle] Using full data pool of ${allData.length} caches for selection.`);
    if (reasonsToShuffle) {
        logger.debug(`[Shuffle] Re-running selection for reasons:`, reasonsToShuffle);
        if (reasonsToShuffle.length === 0) logger.warn("[Shuffle] reasonsToShuffle is an empty array. This might indicate an issue.");
    } else {
        logger.debug('[Shuffle] Re-running selection for ALL reasons.');
    }

    // 3. Remove caches that are currently selected for the reasons we are about to re-shuffle.
    // This allows them to be picked again, or for a new cache to take their place, while preserving other selections.
    allData.forEach(cache => {
        if (!cache.Reasons || cache.Reasons.length === 0) return;

        // If reasonsToShuffle is null (full shuffle), all reasons are targeted.
        // Otherwise, only reasons matching the shuffle scope are targeted.
        const reasonsToRemove = reasonsToShuffle ? cache.Reasons.filter(r => reasonsToShuffle.includes(r)) : cache.Reasons;

        if (reasonsToRemove.length > 0) {
            if (reasonsToShuffle) { // For single/filtered shuffle, only clear reasons if the cache is being replaced
                logger.debug(`[Shuffle] Clearing reasons ${JSON.stringify(reasonsToRemove)} from cache ${cache.ID}`);
            }
            // Keep only the reasons that are NOT being shuffled
            cache.Reasons = cache.Reasons.filter(r => !reasonsToRemove.includes(r));
            // If no reasons are left, it's no longer a "selected" cache for any reason.
            if (cache.Reasons.length === 0) {
                selectedIDs.delete(cache.ID);
            }
        }
    });
    
    // 4. Re-run the selection for the targeted reasons, always using the full data pool.
    collectSelections(allData, reasonsToShuffle);

    // 5. Update UI
    const newDataToDisplay = allData.filter(r => r.Reasons?.length > 0);
    logger.debug(`[Shuffle] New selection contains ${newDataToDisplay.length} caches.`);
    displayFullTable(allData, newDataToDisplay, true);
    visualizeMap(allData, newDataToDisplay);

    // 6. Reapply filters after a short delay to ensure DataTable is ready
    if (currentFilters.length > 0) {
        setTimeout(() => {
            logger.debug('[Shuffle] Re-applying filters...');
            const newTable = $('#allCaches').DataTable();
            // Clear any existing search
            newTable.columns().search('').draw();
            // Apply captured filters
            currentFilters.forEach(filter => {
                newTable.column(filter.index).search(filter.search, true, false);
            });
            newTable.draw();
            logger.debug('[Shuffle] Filters reapplied.');
        }, 100); // A short delay is often sufficient
    }
}
// Make it globally available for onclick handlers and tests
window.shuffleCaches = shuffleCaches;

function updateShuffleFilteredButtonState() {
    const shuffleFilteredButton = document.getElementById('shuffleFilteredButton');
    if (!shuffleFilteredButton) return;

    const table = $('#allCaches').DataTable();
    let hasFilters = false;
    table.columns().every(function() {
        if (this.search()) {
            hasFilters = true;
        }
    });

    shuffleFilteredButton.disabled = !hasFilters;
}

// Visualize the map with all caches or selected ones
// If showHeatmap is checked, display a heatmap of all caches
// Otherwise, show markers for each cache with detailed info in popups
// allRows: array of all cache data, selectedRows: array of selected cache data
function visualizeMap(allRows, selectedRows) {
    if (map) map.remove();
    markerMap = {}; // Clear marker references

    map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const rowsToShow = selectedRows;
    const bounds = L.latLngBounds([]);
    markerLayer = L.markerClusterGroup();

    let highlightedMarker = null;

    rowsToShow.forEach(row => {
        if (!row.Latitude_dd || !row.Longitude_dd) return;
        let markerOptions = {};
        if (row.Reasons && row.Reasons.length > 0) {
            markerOptions = {
                icon: L.icon({
                    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
                    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            };
        }
        const popupHtml = `
            <div style="width: 260px;">
                <b>Cache info:</b><br>
                <b>ID:</b> ${row.ID} ${selectedIDs.has(row.ID) ? "🎯" : ""}<br>
                <b>Cache name:</b> ${row["Cache name"]}<br>
                <b>Country:</b> ${row.Country || ""}<br>
                <b>Region:</b> ${row.Region || ""}<br>
                <b>Difficulty:</b> ${row.Difficulty}<br>
                <b>Terrain:</b> ${row.Terrain}<br>
                <b>Favorite points:</b> ${row.FP}<br>
                <b>Hidden:</b> ${row.Hidden ? row.Hidden.toISOString().slice(0, 10) : ""}<br>
                <b>Latitude:</b> ${row.Latitude_dd}<br>
                <b>Longitude:</b> ${row.Longitude_dd}<br>
                <b>Elevation:</b> ${row["Elevation (m)"]}<br>
                <b>Size:</b> ${row.Size}<br>
                <b>Type:</b> ${row.Type}<br>
                <b>Criteria:</b> ${row.Reasons.length > 0 ? row.Reasons.join(", ") : "-"}
            </div>
        `;
        const marker = L.marker([row.Latitude_dd, row.Longitude_dd], markerOptions).bindPopup(popupHtml);
        
        // Store marker for table->map interaction
        markerMap[row.ID] = marker;

        // Add map->table interaction
        marker.on('click', function() {
            const table = $('#allCaches').DataTable();
            // Clear previous highlight
            table.rows('.row-highlight').nodes().to$().removeClass('row-highlight');
            
            const rowNode = table.rows().nodes().to$().filter(`:has(td:first-child:contains(${row.ID}))`);
            if (rowNode.length) {
                rowNode.addClass('row-highlight');
                // Scroll to the row
                $('html, body').animate({
                    scrollTop: rowNode.offset().top - 150 // Adjust offset as needed
                }, 500);
            }
        });
        markerLayer.addLayer(marker);
        bounds.extend([row.Latitude_dd, row.Longitude_dd]);
    });

    map.addLayer(markerLayer);

    if (bounds.isValid()) {
        map.fitBounds(bounds);
    } else if (allRows.length > 0) {
        const allBounds = L.latLngBounds(allRows.map(r => [r.Latitude_dd, r.Longitude_dd]).filter(c => c[0] && c[1]));
        if(allBounds.isValid()) map.fitBounds(allBounds);
    }

    function addResetViewButton(map) {
        const controlContainer = map.zoomControl._container;
        const button = L.DomUtil.create('a', 'leaflet-control-zoom-reset', controlContainer);
        button.innerHTML = '⤾';
        button.href = '#';
        button.title = 'Reset view';
        L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.preventDefault(e);
            if (bounds.isValid()) {
                map.fitBounds(bounds);
            }
        });
    }
    addResetViewButton(map);
}
// Generate ranges for numeric filtering
// values: array of numeric values
// maxRanges: maximum number of ranges to generate
// minRanges: minimum number of ranges to generate
// Returns an array of objects with label, min, and max values
// Example: generateRanges([1, 2, 3, 4, 5])
// Returns: [{ label: "1–2", min: 1, max: 2 }, { label: "2–3", min: 2, max: 3 }, { label: "3–4", min: 3, max: 4 }, { label: "4–5", min: 4, max: 5 }]
function generateRanges(values, maxRanges = 10, minRanges = 5) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const count = values.length;
    let numRanges = Math.min(maxRanges, Math.max(minRanges, Math.ceil(count / 20)));
    if (min === max) numRanges = 1;
    const step = (max - min) / numRanges;
    let ranges = [];
    for (let i = 0; i < numRanges; i++) {
        let start = Math.round(min + i * step);
        let end = Math.round(i === numRanges - 1 ? max : min + (i + 1) * step - 1);
        ranges.push({ label: `${start}–${end}`, min: start, max: end });
    }
    return ranges;
}

// Generate date ranges for filtering
// dateStrings: array of "yyyy-mm-dd"
// maxRanges: maximum number of ranges to generate
// minRanges: minimum number of ranges to generate
// Returns an array of objects with label, min, and max dates
// Example: generateDateRanges(["2023-01-01", "2023-01-15", "2023-02-01"])
// Returns: [{ label: "2023-01-01 – 2023-01-15", min: "2023-01-01", max: "2023-01-15" }, { label: "2023-01-15 – 2023-02-01", min: "2023-01-15", max: "2023-02-01" }]
function generateDateRanges(dateStrings, maxRanges = 10, minRanges = 5) {
    // dateStrings: array of "yyyy-mm-dd"
    const sorted = dateStrings.slice().sort();
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    let numRanges = Math.min(maxRanges, Math.max(minRanges, Math.ceil(sorted.length / 20)));
    if (min === max) numRanges = 1;
    const step = Math.floor(sorted.length / numRanges);
    let ranges = [];
    for (let i = 0; i < numRanges; i++) {
        let startIdx = i * step;
        let endIdx = (i === numRanges - 1) ? sorted.length - 1 : (i + 1) * step - 1;
        let start = sorted[startIdx];
        let end = sorted[endIdx];
        let label = `${start} – ${end}`;
        ranges.push({ label, min: start, max: end });
    }
    return ranges;
}

// Initialize DataTable filters for each column
// Adds dropdowns to each column header for filtering
// Supports date range filtering for date columns and numeric range filtering for numeric columns
// Also supports value-based filtering for other columns
// tableSelector: CSS selector for the DataTable element
function initDataTableFilters(tableSelector) {
    const table = $(tableSelector).DataTable();
    // Updated column indices
    const rangeCols = { "Löydöt": 10, "FP": 11, "Korkeus": 12 };
    const dateColIdx = 9; // Piilotettu-sarakkeen indeksi
    const reasonsColIdx = 13; // "Lisätiedot"-sarakkeen indeksi


    table.columns().every(function (colIdx) {
        let column = this;
        let header = $(column.header());
        let title = header.text();
        header.empty().append(title + '<br/>');

        if (colIdx === dateColIdx) {
            // Date range filter
            let values = column.data().toArray();
            let ranges = generateDateRanges(values.map(v => v));
            let select = $('<select><option value="">Kaikki</option></select>')
                .appendTo(header)
                .on('click', function (e) { e.stopPropagation(); }) // Prevent sorting on select click
                .on('change', function () {
                    $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(fn => !fn._isDateRangeFilter || fn._colIdx !== colIdx);
                    let val = $(this).val();
                    if (val) {
                        let [min, max] = val.split('|');
                        let filterFn = function (settings, data, dataIndex) {
                            let cellValue = data[colIdx];
                            return cellValue >= min && cellValue <= max;
                        };
                        filterFn._isDateRangeFilter = true;
                        filterFn._colIdx = colIdx;
                        $.fn.dataTable.ext.search.push(filterFn);
                    }
                    table.draw();
                });
            ranges.forEach(r => select.append(`<option value="${r.min}|${r.max}">${r.label}</option>`));

        } else if (Object.values(rangeCols).includes(colIdx)) {
            // Numeric range filter
            let values = column.data().toArray().map(v => parseFloat(v)).filter(v => !isNaN(v));
            let ranges = generateRanges(values);
            let select = $('<select><option value="">Kaikki</option></select>')
                .appendTo(header)
                .on('click', function (e) { e.stopPropagation(); }) // Prevent sorting on select click
                .on('change', function () {
                    $.fn.dataTable.ext.search = $.fn.dataTable.ext.search.filter(fn => !fn._isNumericRangeFilter || fn._colIdx !== colIdx);
                    let val = $(this).val();
                    if (val) {
                        let [min, max] = val.split('-').map(Number);
                        let filterFn = function (settings, data, dataIndex) {
                            let cellValue = parseFloat(data[colIdx]);
                            return !isNaN(cellValue) && cellValue >= min && cellValue <= max;
                        };
                        filterFn._isNumericRangeFilter = true;
                        filterFn._colIdx = colIdx;
                        $.fn.dataTable.ext.search.push(filterFn);
                    }
                    table.draw();
                });
            ranges.forEach(r => select.append(`<option value="${r.min}-${r.max}">${r.label}</option>`));

        } else if (colIdx === reasonsColIdx) {
            // *** UUSI LOGIIKKA "LISÄTIEDOT"-SARAKKEELLE ***
            let select = $('<select><option value="">Kaikki</option></select>')
                .appendTo(header)
                .on('click', function (e) { e.stopPropagation(); })
                .on('change', function () {
                    // Hae valittu arvo ja tee haku, joka etsii osajonoa (ei tarkkaa osumaa)
                    let val = $(this).val();
                    column.search(val, false, false).draw();
                });

            // Kerää kaikki yksittäiset syyt sarakkeen soluista
            let reasons = new Set();
            column.data().each(function (cellData) {
                if (cellData) {
                    cellData.split(/,\s*/).forEach(reason => {
                        if (reason) reasons.add(reason);
                    });
                }
            });

            // Järjestä syyt aakkosjärjestykseen ja lisää ne pudotusvalikkoon
            Array.from(reasons).sort().forEach(function (d) {
                select.append('<option value="' + d + '">' + d + '</option>');
            });

        } else {
            // Default value-based filter for other columns
            let select = $('<select><option value="">Kaikki</option></select>')
                .appendTo(header)
                .on('click', function (e) { e.stopPropagation(); }) // Prevent sorting on select click
                .on('change', function () {
                    let val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });
            column.data().unique().sort().each(function (d) {
                if (d) select.append('<option value="' + d + '">' + d + '</option>');
            });
        }
    });
}


// Display full table with all caches
// data: array of all cache objects
// Each object will have detailed cache information including reasons for selection
// Displays a comprehensive table with all cache details
// Includes columns for ID, name, type, size, difficulty, terrain, region,
// county, hidden date, finds, favorite points, elevation, and additional reasons
function displayFullTable(data, selecteddata, onlySelected = false) {
    let html = onlySelected?  "<h2>Valitut kätköt</h2>" : "<h2>Kaikki kätköt</h2>";
    let headerHtml = html;

    // Add Shuffle button if showing selected caches
    if (onlySelected) {
        headerHtml += `
            <button onclick="shuffleCaches(false)">Shuffle</button>
            <button id="shuffleFilteredButton" onclick="shuffleCaches(true)">Shuffle filtered</button>
        `;
    }

    // Create header container if it doesn't exist
    if (!document.getElementById('results-header')) {
        document.getElementById('results').innerHTML = '<div id="results-header"></div><div id="table-container"></div>';
    }
    document.getElementById('results-header').innerHTML = headerHtml;

    // If table already exists, just update its data
    if ($.fn.DataTable.isDataTable('#allCaches')) {
        const table = $('#allCaches').DataTable();
        const tableData = onlySelected ? selecteddata : data;
        const tableRows = tableData.map(r => {
            const extra = r.Reasons.join(", ");
            const hiddenDate = r.Hidden instanceof Date && !isNaN(r.Hidden) ? r.Hidden.toISOString().split("T")[0] : "";
            return [r.ID, r["Cache name"], r.Type, r.Size, r.Difficulty, r.Terrain, r.Country || '', r.Region || '', r.County || '', hiddenDate, r.Finds, r.FP, r["Elevation (m)"], extra];
        });

        table.clear().rows.add(tableRows).draw();
        // Recalculate column widths after redrawing
        table.columns.adjust().draw();
        return;
    }

    // --- First time table creation ---
    html += "<table id='allCaches' class='display' style='width:100%'><thead><tr><th>ID</th><th>Nimi</th><th>Tyyppi</th><th>Koko</th><th>Vaikeus</th><th>Maasto</th><th>Maa</th><th>Alue</th><th>Kunta</th><th>Piilotettu</th><th>Löydöt</th><th>FP</th><th>Korkeus</th><th>Lisätiedot</th></tr></thead><tbody>";
    const tableData = onlySelected ? selecteddata : data;

    tableData.forEach(r => {
        const extra = r.Reasons.join(", ");
        const hiddenDate = r.Hidden instanceof Date && !isNaN(r.Hidden) ? r.Hidden.toISOString().split("T")[0] : "";
        html += `<tr><td>${r.ID}</td><td>${r["Cache name"]}</td><td>${r.Type}</td><td>${r.Size}</td><td>${r.Difficulty}</td><td>${r.Terrain}</td><td>${r.Country || ''}</td><td>${r.Region || ''}</td><td>${r.County || ''}</td><td>${hiddenDate}</td><td>${r.Finds}</td><td>${r.FP}</td><td>${r["Elevation (m)"] || ''}</td><td>${extra}</td></tr>`;
    });
    html += "</tbody></table>";

    document.getElementById('table-container').innerHTML = html.substring(html.indexOf("<table"));

    // Use setTimeout to ensure the DOM is fully updated before initializing DataTable
    $(document).ready(function() {
        const table = $('#allCaches').DataTable({
            scrollX: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/Finnish.json"
            },
            initComplete: function () {
                initDataTableFilters('#allCaches');
            }
        });

        // Add table->map interaction
        $('#allCaches tbody').on('click', 'tr', function () {
            const table = $('#allCaches').DataTable();
            const data = table.row(this).data();
            if (!data) return;

            const cacheId = data[0]; // Assuming ID is the first column
            const marker = markerMap[cacheId];

            if (marker) {
                // Highlight row
                table.rows('.row-highlight').nodes().to$().removeClass('row-highlight');
                $(this).addClass('row-highlight');

                markerLayer.zoomToShowLayer(marker, () => {
                    marker.openPopup();
                });
            }
        });

        // Update map whenever the table is filtered
        table.on('draw', function () {
            const filteredData = table.rows({ search: 'applied' }).data().toArray();
            const ids = new Set(filteredData.map(row => row[0])); // Assuming ID is column 0
            const matchingRows = allData.filter(row => ids.has(row.ID));
            visualizeMap(allData, matchingRows); // Show only filtered caches
            // Update the shuffle button state whenever filters change
            updateShuffleFilteredButtonState();
        });
    });
}

function exportSelectedToGPX() {
    const nsGpx = "http://www.topografix.com/GPX/1/0";
    const nsGroundspeak = "http://www.groundspeak.com/cache/1/0/1";
    const nsGSAK = "http://www.gsak.net/xmlv1/6";
    const nsxsi = "http://www.w3.org/2001/XMLSchema-instance";


    const table = $('#allCaches').DataTable();
    if (!table) {
        alert("Ehdotuslistaa ei ole vielä luotu.");
        return;
    }

    const doc = document.implementation.createDocument(nsGpx, "gpx", null);
    const gpx = doc.documentElement;

    gpx.setAttribute("version", "1.0");
    gpx.setAttribute("creator", "Geokätköanalyysi");
    gpx.setAttribute("xmlns", nsGpx);
    gpx.setAttribute("xmlns:groundspeak", nsGroundspeak);
    gpx.setAttribute("xmlns:xsi", nsxsi);
    gpx.setAttribute("xsi:schemaLocation", `${nsGpx} ${nsGpx}/gpx.xsd ${nsGroundspeak} ${nsGroundspeak}/cache.xsd`);
    gpx.setAttribute("xmlns:gsak", nsGSAK);


    const dataRows = table.rows({ search: 'applied' }).data().toArray();
    if (dataRows.length === 0) {
        alert("Ei valittuja rivejä.");
        return;
    }

    dataRows.forEach(cells => {
        const [
            id, name, type, size, difficulty, terrain, country,
            region, county, hiddenStr, finds, fp, elev, reasonsText
        ] = cells.map(text => text ? text.trim() : '');

        const match = allData.find(r => r.ID === id);
        if (!match) return;

        const lat = match.Latitude_dd;
        const lon = match.Longitude_dd;
        if (!lat || !lon) return;

        const wpt = doc.createElementNS(nsGpx, "wpt");
        wpt.setAttribute("lat", lat);
        wpt.setAttribute("lon", lon);

        const time = doc.createElementNS(nsGpx, "time");
        time.textContent = new Date(hiddenStr).toISOString();
        wpt.appendChild(time);

        const nameEl = doc.createElementNS(nsGpx, "name");
        nameEl.textContent = id;
        wpt.appendChild(nameEl);

        const desc = doc.createElementNS(nsGpx, "desc");
        desc.textContent = name;
        wpt.appendChild(desc);

        const sym = doc.createElementNS(nsGpx, "sym");
        sym.textContent = "Geocache";
        wpt.appendChild(sym);

        const typeEl = doc.createElementNS(nsGpx, "type");
        typeEl.textContent = "Geocache|" + (type || "Unknown Cache");
        wpt.appendChild(typeEl);

        const cache = doc.createElementNS(nsGroundspeak, "cache");
        cache.setAttribute("id", "0");
        cache.setAttribute("available", "True");
        cache.setAttribute("archived", "False");

        const gsname = doc.createElementNS(nsGroundspeak, "name");
        gsname.textContent = name;
        cache.appendChild(gsname);

        const gsplacedBy = doc.createElementNS(nsGroundspeak, "placed_by");
        gsplacedBy.textContent = "";
        cache.appendChild(gsplacedBy);

        const gsowner = doc.createElementNS(nsGroundspeak, "owner");
        gsowner.textContent = "";
        cache.appendChild(gsowner);

        const gstype = doc.createElementNS(nsGroundspeak, "type");
        gstype.textContent = type;
        cache.appendChild(gstype);

        const gscontainer = doc.createElementNS(nsGroundspeak, "container");
        gscontainer.textContent = size;
        cache.appendChild(gscontainer);

        const gsdifficulty = doc.createElementNS(nsGroundspeak, "difficulty");
        gsdifficulty.textContent = parseFloat(difficulty).toFixed(1);
        cache.appendChild(gsdifficulty);

        const gsterrain = doc.createElementNS(nsGroundspeak, "terrain");
        gsterrain.textContent = parseFloat(terrain).toFixed(1);
        cache.appendChild(gsterrain);

        const gscountry = doc.createElementNS(nsGroundspeak, "country");
        gscountry.textContent = country || match.Country || "";
        cache.appendChild(gscountry);

        const gsstate = doc.createElementNS(nsGroundspeak, "state");
        gsstate.textContent = region;
        cache.appendChild(gsstate);

        const gsakExt = doc.createElementNS(nsGSAK, "wptExtension");
        const gcNote = doc.createElementNS(nsGSAK, "GcNote");
        gcNote.textContent = reasonsText;
        gsakExt.appendChild(gcNote);

        wpt.appendChild(cache);
        wpt.appendChild(gsakExt);
        gpx.appendChild(wpt);
    });

    const serializer = new XMLSerializer();
    const gpxString = '<?xml version="1.0" encoding="UTF-8"?>' + serializer.serializeToString(doc);

    const blob = new Blob([gpxString], { type: "application/gpx+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "valitut_kätköt.gpx";
    a.click();
    URL.revokeObjectURL(url);
}

function getCurrentSelection() {
    const showAll = document.getElementById("showAll").checked;
    if (showAll) {
        return allData;
    } else {
        return collectSelections(allData);
    }
}

if (document.getElementById("showAll")) {
    document.getElementById("showAll").addEventListener("change", () => {
        const onlySelected = !document.getElementById("showAll").checked;
        const table = $('#allCaches').DataTable();
        if (table) {
            table.destroy();
        }
        const tableEl = document.getElementById("allCaches");
        if (tableEl) tableEl.parentElement.removeChild(tableEl);
        
        collectSelections(allData); // lisää Reasons vain datalle
        const dataToDisplay = onlySelected ? allData.filter(r => r.Reasons?.length > 0) : allData;
        displayFullTable(allData, dataToDisplay, onlySelected);
        visualizeMap(allData, dataToDisplay);           // Päivitä kartta
    });
}