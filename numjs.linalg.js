var linalg = require('./build/Release/numjs.linalg');

var numjs_linalg = {
    /**
     * The matrix base class. represents a rowsXcols matrix
     * ================
     * usage example:
     * var newMat = new numjs_linalg.Matrix([1,1,1,1], 2, 2); <- creates a new 2x2 ones matrix
     * ================
     *
     * @param array - an array of data to populate the newly built matrix
     * @param rows - the newly built matrix number of rows
     * @param cols - the newly built matrix number of cols
     * @constructor
     */
    Matrix: function (array, rows, cols, internalData) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Float64Array(rows * cols);

        if (arguments.length > 3 && internalData && internalData["isEmpty"]) return;

        if (array.length === 0) {
            var defaultValue = (internalData && internalData["isOnes"])? 1.0 : 0.0;
            for (var j = 0; j < rows * cols; j++) {
                this.data[j] = defaultValue;
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

    /**
     * Creates a new zero filled matrix with the shape specified by number of rows and cols
     * =======================
     * usage example:
     * var newMat = numjs_linalg.zeros(3,4); <- creates a new 3X4 zero filled matrix
     * var newMat = numjs_linalg.zeros(3); <- creates a new 3X3 zero filled matrix
     * =======================
     *
     * @param rows - the number of rows for the newly built matrix
     * @param cols - the number of cols for the newly built matrix - OPTIONAL - defaults to rows
     * @returns {numjs_linalg.Matrix}
     */
    zeros: function(rows, cols) {
        if (!rows)  {
            throw new Error("now input parameters given");
        }

        if (!cols) {
            cols = rows;
        }

        if (rows <= 0 || cols <= 0) {
            throw new Error("rows and cols parameters must be positive numbers");
        }

        return new numjs_linalg.Matrix([], rows, cols);
    },

    /**
     * Creates a new one-value filled matrix with the shape specified by number of rows and cols
     * =======================
     * usage example:
     * var newMat = numjs_linalg.ones(3,4); <- creates a new 3X4 one-value filled matrix
     * var newMat = numjs_linalg.ones(3); <- creates a new 3X3 one-value filled matrix
     * ========================
     *
     * @param rows - the number of rows for the newly built matrix
     * @param cols - the number of cols for the newly built matrix - OPTIONAL - defaults to rows
     * @returns {numjs_linalg.Matrix}
     */
    ones: function(rows, cols) {
        if (!rows)  {
            throw new Error("now input parameters given");
        }

        if (!cols) {
            cols = rows;
        }

        if (rows <= 0 || cols <= 0) {
            throw new Error("rows and cols parameters must be positive numbers");
        }

        return new numjs_linalg.Matrix([], rows, cols, {isOnes:true});
    },


    /**
     * Creates a new empty matrix, with no initialized values within it.
     * ===================
     * usage example:
     * var emptyMat = numjs_linalg.empty(3, 3); <- creates a 3x3 empty matrix
     * ==============
     * @param rows - the number of matrix rows
     * @param cols - the number of matrix cols
     */
    empty: function(rows, cols) {
        if (!rows || !cols) {
            throw new Error("input parameters are undefined")
        }

        if (rows <= 0 || cols <= 0) {
            throw new Error("rows and cols parameters must be positive");
        }

        return new numjs_linalg.Matrix([], rows, cols, {isEmpty: true});
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

    /**
     * Creates a square nXn identity matrix - a matrix with ones on the main diagonal
     * and zeros elsewhere.
     * =====================
     * usage example:
     * var mat = numjs_linalg.identity(3); <- creates a 3x3 identity matrix
     * =====================
     * @param n - the dimensions of the nXn matrix
     */
    identity: function(n) {
        if (!n || n <= 0) {
            throw new Error("invalid argument, should be a positive number");
        }

        var out = new numjs_linalg.Matrix([], n, n);
        linalg.identity(n, out.data);
        return out;
    },

    /**
     * Creates a matrix with ones on the main diagonal and zeros elsewhere
     * the matrix can be of any size, not necessarily nXn
     * =========================
     * usage example:
     * var eyeMat = numjs_linalg.eye(3,4); <- creates a 3x4 eye matrix
     * var idMat = numjs_linalg.eye(3); <- creates a 3x3 identity matrix
     * =========================
     * @param n - the number of matrix rows
     * @param m - the number of matrix cols - optional parameter, defaults to n
     */
    eye: function(n, m) {
        if (!n) {
            throw new Error("Undefined arguments")
        }

        if (!m) {
            m = n;
        }

        if (n <= 0 || m <= 0) {
            throw new Error("The rows and cols arguments must be positive");
        }

        var out = new numjs_linalg.Matrix([], n, m);
        linalg.eye(n, m, out.data);
        return out;
    },

    /**
     * Creates a matrix with ones at and below the main diagonal and zeros elsewhere
     * matrix size is nXm.
     * ============================
     * usage example:
     * var mat = tri(3,3); <- creates a 3x3 lower triagonal matrix
     * ============================
     * @param n - the number of matrix rows
     * @param m - the number of matrix cols
     */
    tri : function(n, m) {
        if (!n || !m) {
            throw new Error("Must specify two arguments - number of rows and number of cols");
        }

        if (n <= 0 || m <= 0) {
            throw new Error("The rows and cols arguments must be positive");
        }

        var out = new numjs_linalg.Matrix([], n, m);
        linalg.tri(n,m, out.data);
        return out;
    },

    /**
     * Creates a copy of a given matrix with all elements above the diagonal zeroed
     * ==============
     * usage example:
     * var mat = new linalg.Matrix([1,2,3,4,5,6,7,8,9], 3, 3); <- input matrix
     * var triMat = linalg.tril(mat); <- creates a lower triagonal matrix of mat
     * ==============
     * @param matrix - the matrix to convert into a lower triagonal matrix
     */
    tril: function(matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The argument must be instanceof numjs.Matrix");
        }

        var out = new numjs_linalg.Matrix([], matrix.rows, matrix.cols);
        linalg.tril(matrix.data, matrix.rows, matrix.cols, out.data);
        return out;
    },

    /**
     * Creates a copy of a given matrix with all elements below the diagonal zeroed
     * ==============
     * usage example:
     * var mat = new linalg.Matrix([1,2,3,4,5,6,7,8,9], 3, 3); <- input matrix
     * var triMat = linalg.tril(mat); <- creates a upper triagonal matrix of mat
     * ==============
     * @param matrix - the matrix to convert into a lower triagonal matrix
     */
    triu: function(matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The argument must be instanceof numjs.Matrix");
        }

        var out = new numjs_linalg.Matrix([], matrix.rows, matrix.cols);
        linalg.triu(matrix.data, matrix.rows, matrix.cols, out.data);
        return out;
    },

    /**
     * Raise a square matrix to the (integer) power n.
     * =================
     * usage example:
     * var inputMat = new linalg.Matrix([1, 1, 1, 1], 2, 2); <- create a new input 2x2 ones matrix
     * var powerMat = linalg.matrix_power(inputMat, 3); <- returns a new matrix raised to the power of 3
     * =================
     * @param matrix - the input matrix
     * @param n - number that represents the exponent, can be positive, negative or zero.
     */
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

    /**
     * Computes The sum along the diagonals of a matrix
     * =================
     * usage example:
     * var inputMat = new linalg.Matrix([1, 1, 1, 1], 2, 2); <- create a new 2x2 ones matrix
     * var trace = linalg.trace(inputMat); <- returns the matrix trace
     * ================
     *
     * @param matrix - the input matrix to compute its trace
     */
    trace: function(matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        return linalg.trace(matrix.data, matrix.rows, matrix.cols);
    },

    /**
     * Computes the determinant of a square nxn matrix
     * =================
     * usage example:
     * var inputMat = new linalg.Matrix([1, 1, 1, 1], 2, 2); <- create a new 2X2 ones matrix
     * var det = linalg.det(inputMat); <- compute return the input matrix determinant value
     * =================
     *
     * @param matrix - the input matrix to compute its determinant
     * @returns the determinant of the matrix
     */
    det: function (matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");

        }
        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");

        }
        return linalg.det(matrix.data, matrix.rows, matrix.cols);
    },

    /**
     * Computes The input matrix rank using SVD method
     *
     * =====================
     * usage example:
     * var inputMat = new linalg.Matrix([1, 1, 1, 1], 1, 4); <- creates a new 1X4 ones vector
     * var rank = linalg.matrix_rank(inputMat); <- calculates the rank
     * =====================
     *
     * @param matrix - the input matrix to compute its rank
     * @param tol - Number which represents the threshold which SVD values are considered zero.
     *              If this arg is not given, and input matrix has only singular values,
     *              and eps is the epsilon value for datatype of the matrix,
     *              then tol is set to matrix.max() * max(matrix.shape) * eps
     */
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