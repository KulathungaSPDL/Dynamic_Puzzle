var lengthOfGrid, divElement, initialValue, numberOfBox, temparyBoxValeX, tempImage, tile, numberPattern, result, boxCrrentDetails, 
blank, rightValue, leftValue, upValue, downValue;

function makingGrid(btn) {
    lengthOfGrid = document.getElementById('userInput').value;
    document.getElementById(btn.id).disabled = true;  //disable button after submit value
    var x = document.getElementById("puzzle"); // x is puzzle id
    numberOfBox = lengthOfGrid * lengthOfGrid; // check numbers of box
    gridWidth = 450 / lengthOfGrid; // find one grid length and width
    gridHeight = 450 / lengthOfGrid;
    imagePosition = Math.floor(100 / (lengthOfGrid - 1)); // assume grid size 100% / Ex -> input = 3 ===== image position is 33

    if (lengthOfGrid >= 3 && lengthOfGrid < 100) {
        var i = 0;
        while (i < numberOfBox) {  //make dynamic div
            for (var j = 0; j < lengthOfGrid; j++) {
                for (var k = 0; k <lengthOfGrid; k++) {
                    divElement = document.createElement('div');
                    divElement.className = 'box' + i;
                    divElement.id = 'box' + j + '.' + k;
                    divElement.onclick = function() {
                        moveImages(this.id);
                    };
                    divElement.style.width = gridWidth + 'px';
                    divElement.style.height = gridHeight + 'px';
                    if (j == (lengthOfGrid - 1) && (k == (lengthOfGrid - 1))) {
                        divElement.style.backgroundPosition = '200% 200%';
                    } else {
                        divElement.style.backgroundPosition = (k * imagePosition) + '%' + (j  * imagePosition) +'%';
                    }
                    divElement.style.backgroundSize = '450px 450px';
                    x.style.gridTemplateColumns = "auto ".repeat(lengthOfGrid);
                    x.appendChild(divElement);
                    i++;
                }
            }
        }
        puzzleShuffle();   
    } else {
        alert("Grid length can not define !");
    }
}

function randomGenerate (x, y) {
    temparyBoxValeX = document.getElementById(x).className;
    tempImage = document.getElementById(x).style.backgroundPosition;
    document.getElementById(x).className = document.getElementById(y).className;
    document.getElementById(x).style.backgroundPosition = document.getElementById(y).style.backgroundPosition
    document.getElementById(y).className = temparyBoxValeX;
    document.getElementById(y).style.backgroundPosition = tempImage;
}

function puzzleShuffle() {
    for (j = 0; j < lengthOfGrid; j++) {
        for (k = 0; k < lengthOfGrid; k++) {
            var row = Math.floor(Math.random() * lengthOfGrid);
            var col = Math.floor(Math.random() * lengthOfGrid);
            randomGenerate('box' + j + '.' + k, 'box' + row + '.' + col);
        }
    }
 }

function moveImages(a) {
    tile = document.getElementById(a).className; //get clicked posiion class name
    numberPattern = /\d+/g;
    result = a.match( numberPattern ) //separate j and k value from clicked position
    var j = Number(result[0]);
    var k = Number(result[1]);
    //make expected result (class name)
    expectedArry = [];
    for (var m = 0; m < numberOfBox; m++) {
        expectedArry.push('box' + m);
    }
    //current grid class name
    recentArray = [];
    for (var s = 0; s < lengthOfGrid; s++) {
        for (var d = 0; d <lengthOfGrid; d++) {
            boxCrrentDetails = document.getElementById('box' + s + '.' + d).className;
            recentArray.push(boxCrrentDetails);
        }
    }
    //Check win or not 
    if (JSON.stringify(expectedArry)==JSON.stringify(recentArray)) {
        alert("You Win !");
    } else {
        // Nothing
    }
    blank = ('box' + (numberOfBox - 1));
    if (tile != blank) {
        if (k < (lengthOfGrid - 1)) { // check right
            blank = ('box' + (numberOfBox - 1));
            rightValue = document.getElementById('box' + j + '.' + (k + 1)).className;
            if (rightValue == blank) {
                randomGenerate('box' + j + '.' + k, 'box' + j + '.' + (k + 1));
                return;
            }
        } // check left
        if (k > 0) {
            blank = ('box' + (numberOfBox - 1));
            leftValue = document.getElementById('box' + j + '.' +  (k - 1)).className;
            if (leftValue == blank) {
                randomGenerate('box' + j + '.' + k, 'box' + j + '.' + (k - 1));
                return;
            }
        } //check up
        if (j > 0) {
            blank = ('box' + (numberOfBox - 1));
            upValue = document.getElementById('box' + (j - 1) + '.' + k).className;
            if (upValue == blank) {
                randomGenerate('box' + j + '.' + k, 'box' + (j - 1) + '.' + k);
                return;
            }
        } //check down
        if (j < (lengthOfGrid - 1)) { 
            blank = ('box' + (numberOfBox - 1));
            downValue = document.getElementById('box' + (j + 1) + '.' + k).className;
            if (downValue == blank) {
                randomGenerate('box' + j + '.' + k, 'box' + (j + 1) + '.' + k);
                return;
            }
        }
    } else {
        //nothing
    }
}

function setAnswer() {
    var m = 0;
    while(m < numberOfBox) {
        for (var s = 0; s < lengthOfGrid; s++) {
            for (var d = 0; d < lengthOfGrid; d++) {
                initialValue = ('box' + m);
                document.getElementById('box' + s + '.' + d).className = initialValue;
                if (s == (lengthOfGrid - 1) && (d == (lengthOfGrid - 1))) {
                    document.getElementById('box' + s + '.' + d).style.backgroundPosition  = divElement.style.backgroundPosition = '200% 200%';
                } else {
                    document.getElementById('box' + s + '.' + d).style.backgroundPosition  = divElement.style.backgroundPosition = (d * imagePosition) + '%' + (s  * imagePosition) +'%';
                }
                m++;
            }
        }
    }
}