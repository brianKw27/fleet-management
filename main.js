const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function getVowelsCount(str) {
    return str.split('').filter(a => VOWELS.includes(a)).length;
}

function getConsonantsCount(str) {
    return str.split('').filter(a => !VOWELS.includes(a)).length;
}

function gcd(k, n) {
    return k ? gcd(n % k, k) : n;
}

function getSS(sn, dn) {
    let baseSS;
    if (sn.length % 2 === 0) {
        baseSS = getVowelsCount(dn) * 1.5;
    } else {
        baseSS = getConsonantsCount(dn);
    }
    if (gcd(sn.length, dn.length) > 1) {
        baseSS = baseSS * 1.5;
    }
    return baseSS;
}

function calculateTotalSS(idx, ss, destinationName, driverName, availableDrivers, res) {
    const len = destinationName.length;
    if (idx === len) {
        // console.log(res.currentLoop, "currentLoop")
        if (res.max < ss) {
            res.max = ss;
            res.resultMatch = [...res.currentLoop];
        }
        return;
    }

    for (let i = 0; i < availableDrivers.length; i++) {
        if (availableDrivers[i] === true) {
            availableDrivers[i] = false;
            const val = getSS(destinationName[idx], driverName[i]);
            res.currentLoop[idx] = i;
            calculateTotalSS(idx + 1, ss + val, destinationName, driverName, availableDrivers, res);
            availableDrivers[i] = true;
        }
    }
}

function solveProblem(destinationNames, driverNames) {
    const len = destinationNames.length;
    const freeDrivers = new Array(len).fill(true);
    const result = {
        max: -1,
        currentLoop: new Array(len).fill(0)
    };

    calculateTotalSS(0, 0, destinationNames, driverNames, freeDrivers, result);

    console.log('SS:',result.max);
    result.resultMatch.map((value, i) => {
        console.log(destinationNames[i], '->', driverNames[value]);
    })
}


const destinationNames = ['towercity','silicon valley','londondream','michigan']; //destination names
const driverNames = ['Johns', 'MichaleKing', 'JeremyBrick', 'BrianKennedy']; // driver names

solveProblem(destinationNames, driverNames);