var linalg = require('./build/Release/numjs.linalg');
var smalloc = require('smalloc');

function Matrix(array, rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.data = smalloc.alloc(rows*cols, smalloc.Types.Double);

    if(array.length === 0){
        for(var i = 0; i < rows*cols; i++){
            this.data[i] = 0.0;
        }
    }
    else if(array.length === rows*cols){
        for(var i = 0; i < rows*cols; i++){
            this.data[i] = array[i];
        }
    }
    else{
        throw new Error("The array.length !== rows*cols");
        return;
    }
}

var dot = function(leftMatrix, rightMatrix, out){
    var lrows = 1, lcols = 1, rrows = 1, rcols = 1;

    if(!leftMatrix || !rightMatrix){
        throw new Error("The input parameters are undefined");
        return;
    }

    if(!isNaN(leftMatrix) && !isNaN(rightMatrix)){
        return leftMatrix * rightMatrix;
    }

    if(leftMatrix instanceof Matrix){
        lrows = leftMatrix.rows;
        lcols = leftMatrix.cols;
    }
    else if(isNaN(leftMatrix)){
        throw new Error("The leftMatrix parameter is not instance of Matrix or a number");
        return;
    }

    if(rightMatrix instanceof Matrix){
        rrows = rightMatrix.rows;
        rcols = rightMatrix.cols;
    }
    else if(isNaN(rightMatrix)){
        throw new Error("The rightMatrix parameter is not instance of Matrix or a number");
        return;
    }

    if(!out){
        var newRows=lrows, newCols=rcols;

        if(!isNaN(leftMatrix) && isNaN(rightMatrix)) {// scalar*mat
            newRows=rrows;
            newCols=rcols;
        }
        else if(!isNaN(leftMatrix) && isNaN(rightMatrix)) {// mat*scalar
            newRows=lrows;
            newCols=lcols;
        }

        out = new Matrix([], newRows, newCols);
    }
    else if(!out instanceof Matrix){
        throw new Error("The out parameter is not instance of Matrix");
        return;
    }

    var isSuc = linalg.dot(lrows, lcols, leftMatrix.data ? leftMatrix.data : leftMatrix,
                rrows, rcols, rightMatrix.data ? rightMatrix.data : rightMatrix, out.data);

    if(out.rows * out.cols === 1){
        return out.data[0];
    }

    return out;
}

var matrix_power = function(matrix, n){
    if(n===1){
        return matrix;
    }

    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");
        return;
    }

    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");
        return;
    }

    var out = new Matrix([], matrix.rows, matrix.cols);
    linalg.matrix_power(matrix.data, matrix.rows, matrix.cols, n, out.data);
    return out;
}

var inv = function(matrix){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");
        return;
    }

    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");
        return;
    }

    var out = new Matrix([], matrix.rows, matrix.cols);
    linalg.inv(matrix.data, matrix.rows, matrix.cols, out.data);
    return out;
}

var det = function(matrix){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");
        return;
    }
    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");
        return;
    }
    return linalg.det(matrix.data, matrix.rows, matrix.cols);
}

var matrix_rank = function(matrix, tol){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");
        return;
    }
    if(tol && !isNaN(tol)){
        return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols, tol);
    }
    else{
        return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols);
    }
}

// Simple tests for dot
var jsMatLeft = new Matrix([1, 1, 1, 1], 1, 4);
var jsMatRight = new Matrix([2, 2, 1, 1], 4, 1);
var jsMatLeft2 = new Matrix([1, 1, 1, 1], 2, 2);
var jsMatRight2 = new Matrix([2, 2, 1, 1], 2, 2);
/*console.log(dot(jsMatLeft, jsMatRight));
console.log(dot(jsMatLeft2, jsMatRight2));
console.log(dot(3, jsMatRight));
console.log(dot(2, jsMatRight2));
console.log(dot(7, 3));*/

// Simple tests for power
var jsMatI = new Matrix([0, -1, 1, 0], 2, 2);
/*console.log(matrix_power(jsMatLeft2, 3));
console.log(matrix_power(jsMatI, 1));
console.log(matrix_power(jsMatI,0));
console.log(matrix_power(jsMatI, -3));
console.log(matrix_power(jsMatI, -1));*/

// simple test dor det
var jsMatdet = new Matrix([2, -1, 1, 3], 2, 2);
/*console.log(det(jsMatdet)); //should be: 7
console.log(det(jsMatI)); //should be: 1
console.log(det(jsMatLeft2)); //should be: 0
console.log(det(jsMatRight2)); //should be: 0*/

//simple tests for rank
var jsrank1 = new Matrix([1, 1, 1, 1], 1, 4);
console.log(matrix_rank(jsrank1)); // expected 1
var jsrank2 = new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
console.log(matrix_rank(jsrank2)); // expected 4
var jsrank3 = new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.3], 4, 4);
console.log(matrix_rank(jsrank3)); // expected 4
console.log(matrix_rank(jsrank3, 0.2)); // expected 4
console.log(matrix_rank(jsrank3, 0.4)); // expected 3