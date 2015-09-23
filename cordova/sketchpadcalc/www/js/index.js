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
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        document.addEventListener('touchstart', clickEnter, false);
        paper = document.getElementById('paper');
        document.querySelector('#paper ul').appendChild(makeRow());
        cursorBlink(true);
    }
};

/*jslint browser: true, devel: true, sloppy: true */

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
