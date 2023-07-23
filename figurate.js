/**
 * figurate numbers generator
 * @author Stepan Fyodorovic
 * @description figurate numbers generator for various shapes and levels
 */

$(function() {

  let generateButton = $('#generate-button');
  generateButton.bind('click', generate);

  $('select').bind('change', function() {
    generateButton.prop('disabled', false);
  });

});

function generate() {

  $(this).prop('disabled', true);

  let shape = $('#shape-select').val();
  let n = parseInt($('#n-select').val());

  let value = calculateNumber(shape, n);
  $('#value').html('value: ' + value);

  let array2D = getArray2D(shape, n);
  graphicalDisplay(shape, array2D);
}

function getArray2D(shape, n) {

  let array2D = [], outerCtr, innerCtr;

  switch(shape) {

    case 'square':

      for(outerCtr = 0; outerCtr < n; outerCtr++) {

      array2D[outerCtr] = [];

        for(innerCtr = 0; innerCtr < n; innerCtr++) {
          array2D[outerCtr][innerCtr] = true;
        }
      }
      return array2D;

    case 'triangular':

      for(outerCtr = 0; outerCtr < n; outerCtr++) {
      
        array2D[outerCtr] = [];

        for(innerCtr = 0; innerCtr < outerCtr + 1; innerCtr++) {

          array2D[outerCtr][innerCtr] = true;
        }
      }
      return array2D;

    case 'star':

      let offset = n - 1;
      let triangleEdgeLength = 3 * n - 2;
      let arrayEdgeLength = 4 * n - 3;

      for(outerCtr = 0; outerCtr < arrayEdgeLength; outerCtr++) {
      
        array2D[outerCtr] = [];

        for(innerCtr = 0; innerCtr < arrayEdgeLength; innerCtr++) {
          array2D[outerCtr][innerCtr] = false;
        }
      }

      for(outerCtr = 0; outerCtr < triangleEdgeLength; outerCtr++) {

        for(innerCtr = 0; innerCtr < outerCtr + 1; innerCtr++) {

          array2D[outerCtr][innerCtr + offset] = true;
          array2D[innerCtr + offset][outerCtr] = true;
        }
      }
      return array2D;
  }
}

function graphicalDisplay(shape, array2D) {

  let containerDiv = $('#graphical-display');
  containerDiv.html('');

  let row, col, divRow, divCell, validCellsThisRow;
  const widthPerCell = 55; // 50px + (2 * 2.5px)

  for(row = 0; row < array2D.length; row++) {

    validCellsThisRow = 0;

    divRow = $('<div class="row"></div>');

    if(shape === 'square') {
      divRow.addClass('square-row');
    }

    for(col = 0; col < array2D[row].length; col++) {

      if(array2D[row][col] === true) {
        divCell = $('<div class="cell"></div>');
        divRow.append(divCell);
        validCellsThisRow++;
      }
    }
    divRow.css('width', (validCellsThisRow * widthPerCell) + 'px');
    containerDiv.append(divRow);
  }
}

function calculateNumber(shape, n) {

  switch(shape) {

    case 'square':

      return Math.pow(n, 2);

    case 'triangular':

      return n * (n + 1) / 2

    case 'star':

      return 6 * n * (n - 1) + 1;
  }
}
