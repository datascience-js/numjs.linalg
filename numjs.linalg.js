var linalg = require('./build/Release/numjs.linalg');

var numjs_linalg = {
    Matrix: function (array, rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Float64Array(rows * cols);

        if (array.length === 0) {
            for (var j = 0; j < rows * cols; j++) {
                this.data[j] = 0.0;
            }
        }
        else if (array.length === rows * cols) {
            for (var i = 0; i < rows * cols; i++) {
                this.data[i] = array[i];
            }
        }
        else {
            throw new Error("The array.length !== rows*cols");

        }
    },

    dot: function (leftMatrix, rightMatrix, out) {
        var lrows = 1, lcols = 1, rrows = 1, rcols = 1;

        if (!leftMatrix || !rightMatrix) {
            throw new Error("The input parameters are undefined");

        }

        if (!isNaN(leftMatrix) && !isNaN(rightMatrix)) {
            return leftMatrix * rightMatrix;
        }

        if (leftMatrix instanceof numjs_linalg.Matrix) {
            lrows = leftMatrix.rows;
            lcols = leftMatrix.cols;
        }
        else if (isNaN(leftMatrix)) {
            throw new Error("The leftMatrix parameter is not instance of Matrix or a number");

        }

        if (rightMatrix instanceof numjs_linalg.Matrix) {
            rrows = rightMatrix.rows;
            rcols = rightMatrix.cols;
        }
        else if (isNaN(rightMatrix)) {
            throw new Error("The rightMatrix parameter is not instance of Matrix or a number");

        }

        if (!out) {
            var newRows = lrows, newCols = rcols;

            if (!isNaN(leftMatrix) && isNaN(rightMatrix)) {// scalar*mat
                newRows = rrows;
                newCols = rcols;
            }
            else if (!isNaN(leftMatrix) && isNaN(rightMatrix)) {// mat*scalar
                newRows = lrows;
                newCols = lcols;
            }

            out = new numjs_linalg.Matrix([], newRows, newCols);
        }
        else if (!out instanceof numjs_linalg.Matrix) {
            throw new Error("The out parameter is not instance of Matrix");

        }

        var isSuc = linalg.dot(lrows, lcols, leftMatrix.data ? leftMatrix.data : leftMatrix,
            rrows, rcols, rightMatrix.data ? rightMatrix.data : rightMatrix, out.data);

        if (out.rows * out.cols === 1) {
            return out.data[0];
        }

        return out;
    },

    matrix_power: function (matrix, n) {
        if (n === 1) {
            return matrix;
        }

        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");
        }

        var out = new numjs_linalg.Matrix([], matrix.rows, matrix.cols);
        linalg.matrix_power(matrix.data, matrix.rows, matrix.cols, n, out.data);
        return out;
    },

    inv: function (matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");
        }

        var out = new numjs_linalg.Matrix([], matrix.rows, matrix.cols);
        linalg.inv(matrix.data, matrix.rows, matrix.cols, out.data);
        return out;
    },

    trace: function(matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        return linalg.trace(matrix.data, matrix.rows, matrix.cols);
    },

    det: function (matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");

        }
        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");

        }
        return linalg.det(matrix.data, matrix.rows, matrix.cols);
    },

    matrix_rank: function (matrix, tol) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");

        }
        if (tol && !isNaN(tol)) {
            return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols, tol);
        }
        else {
            return linalg.matrix_rank(matrix.data, matrix.rows, matrix.cols);
        }
    },

    matrix_eigen_values: function (matrix, tol) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }
        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");
        }
        var eigenTestResult = new Float64Array(2 * matrix.cols);
        linalg.get_eigen_values(matrix.rows, matrix.cols, matrix.data, eigenTestResult);
        return eigenTestResult;
    },

    matrix_solve_linear: function (matrix, b) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }
        if (b.length !== matrix.cols) {
            throw new Error("matrix and the parameter dimensions must agree.");
        }
        //TODO: check matrix rank ?
        var x = new Float64Array(matrix.cols);
        linalg.solve_linear_system_householder_qr(matrix.rows, matrix.cols, matrix.data, b, x);
        return x;
    },

    matrix_mul: function (matrixA, matrixB) {
        if (!matrixA || !(matrixA instanceof numjs_linalg.Matrix) || !matrixB || !(matrixB instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }
        if (matrixA.cols !== matrixB.rows) {
            throw new Error("matrix and the parameter dimensions must agree, i.e. matrixA.cols == matrixB.rows");
        }
        var res = new Float64Array(matrixA.rows * matrixB.cols);
        linalg.mat_mul(matrixA.rows, matrixA.cols, matrixA.data, matrixB.rows, matrixB.cols, matrixB.data, res);
        return new numjs_linalg.Matrix(res, matrixA.rows, matrixB.cols);
    }
};

module.exports = numjs_linalg;