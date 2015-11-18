var linalg = require('./build/Release/numjs.linalg');

function Matrix(array, rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.data = new Float64Array(rows*cols);

    if(array.length === 0){
        for(var j = 0; j < rows*cols; j++){
            this.data[j] = 0.0;
        }
    }
    else if(array.length === rows*cols){
        for(var i = 0; i < rows*cols; i++){
            this.data[i] = array[i];
        }
    }
    else{
        throw new Error("The array.length !== rows*cols");

    }
}

var dot = function(leftMatrix, rightMatrix, out){
    var lrows = 1, lcols = 1, rrows = 1, rcols = 1;

    if(!leftMatrix || !rightMatrix){
        throw new Error("The input parameters are undefined");

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

    }

    if(rightMatrix instanceof Matrix){
        rrows = rightMatrix.rows;
        rcols = rightMatrix.cols;
    }
    else if(isNaN(rightMatrix)){
        throw new Error("The rightMatrix parameter is not instance of Matrix or a number");

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

    }

    var isSuc = linalg.dot(lrows, lcols, leftMatrix.data ? leftMatrix.data : leftMatrix,
                rrows, rcols, rightMatrix.data ? rightMatrix.data : rightMatrix, out.data);

    if(out.rows * out.cols === 1){
        return out.data[0];
    }

    return out;
};

var matrix_power = function(matrix, n){
    if(n===1){
        return matrix;
    }

    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");

    }

    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");

    }

    var out = new Matrix([], matrix.rows, matrix.cols);
    linalg.matrix_power(matrix.data, matrix.rows, matrix.cols, n, out.data);
    return out;
};

var inv = function(matrix){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");

    }

    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");

    }

    var out = new Matrix([], matrix.rows, matrix.cols);
    linalg.inv(matrix.data, matrix.rows, matrix.cols, out.data);
    return out;
};

var det = function(matrix){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");

    }
    if(matrix.rows !== matrix.cols){
        throw new Error("matrix must be square, i.e. M.rows == M.cols");

    }
    return linalg.det(matrix.data, matrix.rows, matrix.cols);
};

var matrix_rank = function(matrix, tol){
    if(!matrix || !(matrix instanceof Matrix)){
        throw new Error("The first arg must be instanceof numjs.Matrix");

    }
    if(tol && !isNaN(tol)){
        return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols, tol);
    }
    else{
        return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols);
    }
};
var da = new Float64Array([1,0,0,0,1,0,0,0,1]);
var m = new Matrix(da,3,3);
var res = det(m);
console.log("Hey\n" + res);