/*jslint browser: true, devel: true, sloppy: true */

var activeRow = 0,
    paper = document.getElementById('paper'),
    justCalculated = false,
    blinkId,
    blinkerOn = true,
    operators = {'+': '+', '-': '-', '*': '×', '/': '÷'},
    operatorSymbols = {'+': '+', '-': '-', '×': '*', '÷': '/', '': ''},
    maxLines = 2000,
    maxPrecision = 8;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function addEvent(el, evType, fn, bubble) {
    bubble = bubble || false;
    if (el.addEventListener) {
        el.addEventListener(evType, fn, bubble);
    } else if (el.attachEvent) {
        el.attachEvent("on" + evType, fn);
    }
}

function getEventTarget(e) {
    var targ;
    targ = e.target || e.srcElement;
    if (targ.nodeType === 3) { // defeat Safari bug
        targ = targ.parentNode;
    }
    return targ;
}

function touchclick(el, func, bubble) {
    bubble = !!bubble;
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
        el.addEventListener('touchstart', func, bubble);
    } else {
        addEvent(el, 'click', func, bubble);
    }
}

function getSpans(rowIndex) {
    rowIndex = rowIndex || activeRow;
    return paper.getElementsByTagName('li')[rowIndex].getElementsByTagName('span');
}

function cursorBlink(resetBlink) {
    var cursorSpan = getSpans()[2];

    if (resetBlink || !blinkerOn) {
        cursorSpan.className = 'cursorOn';
        blinkerOn = true;
    } else {
        cursorSpan.className = '';
        blinkerOn = false;
    }
    blinkId = window.setTimeout(cursorBlink, 600);
}

function makeRow() {
    var row = document.createElement('li');
    row.innerHTML = '<span class="operator"></span><span class="operand"></span><span></span>';
    return row;
}

function addRow(className, operatorValue, operandValue) {
    var newRow = makeRow(), currentCalc, lines;

    // Stop the blinking
    window.clearTimeout(blinkId);
    getSpans()[2].className = '';

    newRow.className = className || '';
    if (operatorValue) {
        newRow.getElementsByTagName('span')[0].innerHTML = operatorValue;
    }
    if (operandValue) {
        newRow.getElementsByTagName('span')[1].innerHTML = operandValue;
    }

    // if there are more the maxLines divs, remove the top one
    currentCalc = document.querySelector('#paper ul:last-child');
    /*lines = paper.getElementsByTagName('li');
    if (lines.length > maxLines) {
        paper.removeChild(lines[0]);
    } else {
        activeRow = activeRow + 1;
    }*/
    activeRow = activeRow + 1;

    currentCalc.appendChild(newRow);
    cursorBlink(true);
    window.scrollTo(0, document.body.scrollHeight);
}

function newCalculation() {
    if (justCalculated) {
        justCalculated = false;
        paper.appendChild(document.createElement('ul'));
        addRow();
        return true;
    }
    return false;
}

function isPartialNumber(n) {
    var aNumPieces;
    // 1.7976931348623157e+308 to 5e-324
    if (n === '-' || n === '+' || n === '-.' || n === '.' || n === '$' || n === 'π' || n === '%') {
        return true;
    }

    if (/\$/.test(n)) {
        if (n.match(/\$/g).length > 1) {
            return false;
        }
        n = n.replace(/\$/g, '');
    }

    if (/\%/.test(n)) {
        if (n.match(/\%/g).length > 1) {
            return false;
        }
        n = n.replace(/\%/g, '');
    }

    function isExponent(ex) {
        // is integer 0 - 99 starting with +, -, or a number
        var reExponent = /^[\+\-]{0,1}\d{0,2}$/;
        return reExponent.test(ex);
    }

    // partial exponent: (legit full number) + e (+/-) (0 - 99)
    aNumPieces = n.split('e');
    if (aNumPieces.length === 2) {
        return (isNumber(aNumPieces[0]) && isExponent(aNumPieces[1]));
    }
    return isNumber(n);
}

function countSigFigs(num) {
    // if this is an integer or pi, return maxPrecision
    if (/^-?[0-9]+$/.test(num)) {
        return maxPrecision;
    }
    if (num === 'π') {
        return maxPrecision;
    }

    // remove exponents
    num = num.split('e')[0];
    // remove decimal and signs
    num = num.replace(/[\-\.\+\%]/g, '');
    // trim leading zeros
    num = num.replace(/^0*/g, '');

    return num.length;
}

function calcFromArray(aCalc) {
    var ii, len, total = 0, allInt = true, hasMoney = false, sigFig, minSigFigs = maxPrecision, out;

    len = aCalc.length;
    if (len === 1) {
        return aCalc[0].operand;
    }

    // Clean up and find rounding type
    for (ii = 0; ii < len; ii = ii + 1) {
        if (/e/.test(aCalc[ii].operand)) {
            allInt = false;
        }
        if (/\$/.test(aCalc[ii].operand)) {
            hasMoney = true;
            aCalc[ii].operand = aCalc[ii].operand.replace(/\$/g, '');
        }
        if (/\%/.test(aCalc[ii].operand)) {
            aCalc[ii].operand = aCalc[ii].operand.replace(/\%/g, '');
            aCalc[ii].operand = (aCalc[ii].operand / 100).toString();
        }

        sigFig = countSigFigs(aCalc[ii].operand);
        if (sigFig > maxPrecision) {
            sigFig = maxPrecision;
        }
        if (minSigFigs === 0 || sigFig < minSigFigs) {
            minSigFigs = sigFig;
        }

        if (aCalc[ii].operand === 'π') {
            aCalc[ii].operand = Math.PI;
        }
    }

    total = aCalc[0].operand;
    for (ii = 1; ii < len; ii = ii + 1) {
        if (aCalc[ii].operator === '+') {
            total = +total + +aCalc[ii].operand;
        }
        if (aCalc[ii].operator === '-') {
            total = total - aCalc[ii].operand;
        }
        if (aCalc[ii].operator === '×') {
            total = total * aCalc[ii].operand;
        }
        if (aCalc[ii].operator === '÷') {
            total = total / aCalc[ii].operand;
        }
    }

    if (hasMoney) {
        return '$' + total.toFixed(2);
    }

    if (allInt) {
        return parseInt(total).toString(10);
    }

    return total.toExponential(minSigFigs - 1);
}

function uiToArray() {
    var rows, calcArray = [], searchRow = activeRow - 1, spans, ii, len;
    rows = document.querySelectorAll('#paper ul:last-child li');

    function trimOperand(num) {
        var aNum;
        aNum = num.split('e');
        aNum[0] = aNum[0].replace(/^0*/g, '');

        if (aNum.length === 1) {
            return aNum[0];
        }
        if (aNum[1] === "" || aNum[1] === "-" || aNum[1] === "+") {
            return aNum[0];
        }
        return aNum.join('e');
    }

    len = rows.length;
    for (ii = 0; ii < len; ii = ii + 1) {
        if (rows[ii].className !== 'equals') {
            spans = rows[ii].getElementsByTagName('span');
            calcArray.push({"operator": spans[0].innerHTML, "operand": trimOperand(spans[1].innerHTML)});
        }
    }

    return calcArray;
}

function enterOperand(digit, replace) {
    var spans, currentNumber, newNumber;
    spans = getSpans();
    currentNumber = spans[1].innerHTML;

    // Make sure its a legit number
    if (replace || justCalculated) {
        newNumber = digit;
    } else {
        newNumber = currentNumber + digit;
    }

    // Should be able to have $ at beginning or end, but not middle
    if (currentNumber.length > 1) {
        if (currentNumber.slice(0, 1) !== '$' && /\$/.test(currentNumber)) {
            return;
        }
        // Should be able to have % at beginning or end, but not middle
        if (currentNumber.slice(0, 1) !== '%' && /\%/.test(currentNumber)) {
            return;
        }
        // Both $ and % are not allowed
        if (/\$/.test(newNumber) && /\%/.test(newNumber)) {
            return;
        }
    }

    if (!isPartialNumber(newNumber)) {
        return;
    }

    if (newCalculation()) {
        spans = getSpans();
    }

    spans[1].innerHTML = newNumber;
}

function enterOperator(symbol) {
    var spans = getSpans();

    // If there is no number above or on it, exit.
    if (!spans[1].innerHTML && (activeRow === 0 || !getSpans(activeRow - 1)[1].innerHTML)) {
        return;
    }
    // Or if the number above is possibly, but not yet, legit.
    if (spans[1].innerHTML === '-' || spans[1].innerHTML === '.' || spans[1].innerHTML === '-.') {
        return;
    }

    justCalculated = false;

    // if there is already an operator on the active row, replace it
    if (spans[0].innerHTML && !spans[1].innerHTML) {
        spans[0].innerHTML = operators[symbol];
    } else {
        addRow('', operators[symbol]);
    }
}

function hitEquals() {
    var val;
    if (!newCalculation()) {
        val = getSpans()[1].innerHTML;
        if (val !== '-' && isPartialNumber(val)) {
            addRow('equals', '', calcFromArray(uiToArray()));
            justCalculated = true;
        }
    }
}

function removeOperand() {
    var spans = getSpans();

    // If there is no number, or number is a result, exit.
    if (!spans[1].innerHTML || justCalculated) {
        return;
    }

    // Remove digit on the right
    spans[1].innerHTML = spans[1].innerHTML.slice(0, -1);
}

function isMinusOperand() {
    var spans = getSpans();
    if (spans[1].innerHTML.slice(-1) === 'e') {
        return true;
    }
    // if there is a number, treat as operator
    if (spans[1].innerHTML) {
        return false;
    }
    return true;
}

function handleMinus(command) {
    if (command === '-' || command === 'minus') {
        if (isMinusOperand()) {
            enterOperand('-');
        } else {
            enterOperator('-');
        }
    }
}
