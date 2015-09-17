/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('touchstart', clickEnter, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        
        // initialize UI
        paper = document.getElementById('paper');
        paper.appendChild(makeRow());
        cursorBlink(true);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    }
};

/*jslint browser: true, devel: true, sloppy: true */

var activeRow = 0,
    paper,
    justCalculated = false,
    blinkId,
    blinkerOn = true,
    operators = {'+': '+', '-': '-', '*': '×', '/': '÷'},
    operatorSymbols = {'+': '+', '-': '-', '×': '*', '÷': '/', '': ''},
    maxLines = 2000,
    maxPrecision = 8,
    dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function C$(fldNm) {
    var oRe = new RegExp("[;\\s]" + fldNm + "=([^;]*)", "i"),
        fldVal = oRe.exec("; " + document.cookie);
    if (fldVal) {
        return decodeURIComponent(fldVal[1]);
    }
    return "";
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
    return paper.getElementsByTagName('div')[rowIndex].getElementsByTagName('span');
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
    var row = document.createElement('div');
    row.innerHTML = '<span class="operator"></span><span class="operand"></span><span></span>';
    return row;
}

function addRow(className, operatorValue, operandValue) {
    var newRow = makeRow(), lines;

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
    lines = paper.getElementsByTagName('div');
    if (lines.length > maxLines) {
        paper.removeChild(lines[0]);
    } else {
        activeRow = activeRow + 1;
    }

    paper.appendChild(newRow);
    cursorBlink(true);
    window.scrollTo(0, document.body.scrollHeight);
}

function newCalculation() {
    if (justCalculated) {
        justCalculated = false;
        addRow('new');
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
        //if (!/^-?[0-9]+$/.test(aCalc[ii].operand)) {
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
        out = total.toPrecision(maxPrecision).replace(/0*$/g, '');
        if (out.slice(-1) === '.') {
            out = out.slice(0, -1);
        }
        return out;
    }
    return total.toPrecision(minSigFigs);
}

function uiToArray() {
    var rows, calcArray = [], searchRow = activeRow - 1, spans;
    rows = paper.getElementsByTagName('div');

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

    while (searchRow >= 0 && rows[searchRow].className !== 'equals' && rows[searchRow].className !== 'new') {
        spans = rows[searchRow].getElementsByTagName('span');
        calcArray.unshift({"operator": spans[0].innerHTML, "operand": trimOperand(spans[1].innerHTML)});
        searchRow = searchRow - 1;
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
            addRow('equals');
            addRow('', '', calcFromArray(uiToArray()));
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

function keyEnter(e) {
    var key = e.key || String.fromCharCode(e.keyCode);

    // [-] matches both number and operator
    handleMinus(key);

    // Operator
    if (key.match(/^[+*\/]$/)) {
        enterOperator(key);
    }

    // Number
    if (key.match(/^[0-9\.e\$\%]$/)) {
        enterOperand(key);
    }

    // Calculate
    if (e.keyCode === 13 || e.keyCode === 61) {
        hitEquals();
    }
}

function clickEnter(e) {
    var el = getEventTarget(e),
        clickClass = el.className,
        clickValue = el.innerHTML,
        roll;

    if (el.tagName === 'BUTTON') {
        if (clickClass === 'operand') {
            enterOperand(clickValue);
        }

        handleMinus(clickClass);
        if (clickClass === 'operator') {
            enterOperator(operatorSymbols[clickValue]);
        }
        if (clickClass === 'equals') {
            hitEquals();
        }
        if (clickClass === 'backspace') {
            removeOperand();
        }
        if (clickClass === 'exponent') {
            enterOperand('e');
        }
        if (clickClass === 'mystery') {
            roll = Math.ceil(Math.random() * 6).toString(10);
            document.getElementById('rollDice').innerHTML = dice[roll - 1];
            enterOperand(roll, true);
        }
    } else {
        enterOperand(clickValue, true);
    }
}

app.initialize();
