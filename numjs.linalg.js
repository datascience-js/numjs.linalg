var linalg = require('./build/Release/numjs.linalg');

var numjs_linalg = {
    /**
     * The matrix base class. represents a rowsXcols matrix
     * ================
     * usage example:
     * var onesMat = new numjs_linalg.Matrix([1,1,1,1], 2, 2); <- creates a new 2x2 ones matrix
     * var zeroMat = new numjs_linalg.Matrix([], 4, 4); <- creates a new zero filled 4x4 matrix
     * var customValsMat = new numjs_linalg.Matrix([1,2,3,4], 2, 2); <- creates a new 2x2 matrix with values {1,2;3,4}
     * var customValsVector = new numjs_linalg.Matrix([1,2,3,4], 1, 4); <- creates a vector with values {1,2,3,4}
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
     * var zeroVector = numjs_linalg.zeros(1, 4) <- creates a new zero filled vector
     * var zeroScalar = numjs_linalg.zeros(1) <- creates a 0 value scalar
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
     * var oneVector = numjs_linalg.ones(1, 4) <- creates a new ones filled vector
     * var oneScalar = numjs_linalg.ones(1) <- creates a 1 value scalar
     * ========================
     *
     * @param rows - the number of rows for the newly built matrix
     * @param cols - the number of cols for the newly built matrix - optional - defaults to rows
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
     * var nonSquareEmpty = numjs_linalg.empty(3, 4); <- creates a 3x4 empty matrix
     * var emptySquareMat = numjs_linalg.empty(5); <-creates a 5x5 empty matrix
     * ===================
     *
     * @param rows - the number of matrix rows
     * @param cols - the number of matrix cols - optional - defaults to rows
     */
    empty: function(rows, cols) {
        if (!rows) {
            throw new Error("input parameters are undefined")
        }

        if (!cols) {
            cols = rows;
        }

        if (rows <= 0 || cols <= 0) {
            throw new Error("rows and cols parameters must be positive");
        }

        return new numjs_linalg.Matrix([], rows, cols, {isEmpty: true});
    },

    /**
     * Computes the Dot product of matrices.
     * For 2-D matrices it is equivalent to matrix multiplication,
     * and for 1-D matrix it is equivalent to inner product of vectors
     * ==================
     * usage example:
     * var jsMatLeft = linalg.ones([1, 1, 1, 1], 1, 4); <- creates a ones vector
     * var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 4, 1); <- creates a custom values vector
     * var dotproduct = linalg.dot(jsMatLeft, jsMatRight) <- computes the dot product == 6
     *
     * var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 2, 2); <- creates a new custom values matrix
     * var dotproduct = linalg.dot(2, jsMatRight); <- computes the dot product of the matrix with a number
     * ==================
     *
     * @param leftMatrix - The left input matrix to perform dot computation
     * @param rightMatrix - The right input matrix to perform dot computation
     * @param out - The dot product of two input matrices
     */
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
     * Computes the ordinary inner product of vectors for 1-D matrices, or in 2 dimensions, computes the sum product
     * over the last axes. (i.e. sum of left.row[i] * right.row[j])
     * If a or b are scalars, computes a*b.
     * NOTE: If a and b are nonscalar, their last dimensions of must match. (i.e. the number of cols)
     * ==================
     * usage example:
     * Compute the sum product over the second axes of two 2-D matrices
     * var jsMatLeft = new linalg.Matrix([1, 4, 2, 5, 3, 6], 2, 3); <- creates a new 2x3 matrix
     * var jsMatRight = new linalg.Matrix([7, 10,8, 11,9, 12], 2, 3); <- creates a new 2x3 matrix
     * var matrix = linalg.inner(jsMatLeft, jsMatRight); compute the sum product over the second axes
     *
     * Compute the inner product of two 1-D matrices
     * var jsMatLeft = new linalg.Matrix([1, 1, 1, 1], 1, 4); <- creates a new 1x4 matrix (vector)
     * var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 1, 4); <- creates a new 1x4 matrix (vector)
     * var innerProduct = linalg.inner(2, jsMatRight); <- computes the inner product of the matrices
     * ==================
     *
     * @param leftMatrix - The left input matrix to perform inner/sum product computation
     * @param rightMatrix - The right input matrix to perform inner/sum product computation
     * @param out - The inner/sum product of two input matrices
     */
    inner: function (leftMatrix, rightMatrix) {
        var lrows = 1, lcols = 1, rrows = 1, rcols = 1, newRows, newCols, out;

        if (!leftMatrix || !rightMatrix) {
            throw new Error("The input parameters are undefined");
        }

        // In case left matrix and right matrix are both scalars
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

        if(isNaN(leftMatrix) && isNaN(rightMatrix) && rightMatrix.cols !== leftMatrix.cols){
            throw new Error("The last dimensions of left and right matrices must match");
        }

        newRows = lrows;
        newCols = rrows;

        // In case left matrix is scalar
        if (!isNaN(leftMatrix) && isNaN(rightMatrix)) {// scalar*mat
            newRows = rrows;
            newCols = rcols;
        }
        // In case right matrix is scalar
        else if (!isNaN(leftMatrix) && isNaN(rightMatrix)) {// mat*scalar
            newRows = lrows;
            newCols = lcols;
        }

        // Create new matrix for the results
        out = new numjs_linalg.Matrix([], newRows, newCols);

        var isSuc = linalg.inner(lrows, lcols, leftMatrix.data ? leftMatrix.data : leftMatrix,
            rrows, rcols, rightMatrix.data ? rightMatrix.data : rightMatrix, out.data);

        if (out.rows * out.cols === 1) {
            return out.data[0];
        }

        return out;
    },

    /**
     * Compute the outer product of two 1-D matrices. (i.e. out[i, j] = a[i] * b[j])
     * If a or b are scalars, computes a*b.
     * ==================
     * usage example:
     * var jsMatLeft = new linalg.Matrix([1, 1, 1, 1], 1, 4); <- creates a new 1x4 matrix (vector)
     * var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 1, 4); <- creates a new 1x4 matrix (vector)
     * var matrix = linalg.outer(jsMatLeft, jsMatRight); <- computes the outer product of the two matrices
     * ==================
     *
     * @param leftVector - The left input 1-D matrix to perform outer product computation.
     *                      Input is flattened if not already 1-dimensional.
     * @param rightVector - The right input 1-D matrix to perform outer product computation.
     *                      Input is flattened if not already 1-dimensional.
     * @return The ordinary outer product of two vectors.
     */
    outer: function (leftVector, rightVector, out) {
        var lrows = 1, lcols = 1, rrows = 1, rcols = 1, newRows, newCols;

        if (!leftVector || !rightVector) {
            throw new Error("The input parameters are undefined");
        }

        // In case left matrix and right matrix are both scalars
        if (!isNaN(leftVector) && !isNaN(rightVector)) {
            return leftVector * rightVector;
        }

        if (leftVector instanceof numjs_linalg.Matrix) {
            lrows = leftVector.rows * leftVector.cols;
            lcols = 1;
        }
        else if (isNaN(leftVector)) {
            throw new Error("The leftMatrix parameter is not instance of Matrix or a number");
        }

        if (rightVector instanceof numjs_linalg.Matrix) {
            if (leftVector instanceof numjs_linalg.Matrix){
                rrows = 1;
                rcols = rightVector.rows * rightVector.cols;
            }
            else {
                rrows = rightVector.rows;
                rcols = rightVector.cols;
            }
        }
        else if (isNaN(rightVector)) {
            throw new Error("The rightMatrix parameter is not instance of Matrix or a number");
        }

        if (!out) {
            newRows = lrows;
            newCols = rcols;

            // In case left matrix is scalar
            if (!isNaN(leftVector) && isNaN(rightVector)) {// scalar*mat
                newRows = rrows;
                newCols = rcols;
            }
            // In case right matrix is scalar
            else if (!isNaN(leftVector) && isNaN(rightVector)) {// mat*scalar
                newRows = lrows;
                newCols = lcols;
            }

            out = new numjs_linalg.Matrix([], newRows, newCols);
        }
        else if (!out instanceof numjs_linalg.Matrix) {
            throw new Error("The out parameter is not instance of Matrix");
        }

        var isSuc = linalg.outer(lrows, lcols, leftVector.data ? leftVector.data : leftVector,
            rrows, rcols, rightVector.data ? rightVector.data : rightVector, out.data);

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
     * var mat2 = numjs_linalg.identity(5); <- creates a 5x5 identity matrix
     * var scalar = numjs_linalg.identity(1); <- creates a single 1 value (scalar)
     * =====================
     *
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
     * var eyeMat2 = numjs_linalg.eye(5, 5) <- creates a 5x5 indentity matrix
     * var scalar = numjs_linalg.eye(1) <- creates a scalar with the value of 1.
     * =========================
     *
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
     * var mat = tri(5,7); <- creates a 5x7 lower triagonal matrix
     * var scalar = tri(1,1); <- creates a scalar with the value of 1
     * ============================
     *
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
     * (a lower triagonal copy of the input)
     * ==============
     * usage example:
     * var mat = new linalg.Matrix([1,2,3,4,5,6,7,8,9], 3, 3); <- input matrix
     * var trilMat = linalg.tril(mat); <- creates a lower triagonal copy of mat
     *
     * var mat = linalg.ones(5); <- creates a 5x5 ones matrix
     * var trilMat = linalg.tril(mat); <- creates a lower triagonal copy of mat
     * ==============
     *
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
     * var triMat = linalg.tril(mat); <- creates an upper triagonal matrix of mat
     *
     * var mat = linalg.ones(5); <- creates a 5x5 ones matrix
     * var trilMat = linalg.tril(mat); <- creates an upper triagonal copy of mat
     * ==============
     *
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
     *
     * var inputMat = new linalg.Matrix([1,1,1,1, 2, 2); <- create a new input 2x2 ones matrix
     * var identityMat = linalg.matrix_power(inputMat, 0); <- create identity matrix by raising it to the power of 0
     * =================
     *
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
     * Cholesky decomposition.
     *
     * Return the Cholesky decomposition, L * L.H, of the square matrix a, where L is lower-triangular
     * and .H is the conjugate transpose operator (which is the ordinary transpose if a is real-valued).
     * a must be Hermitian (symmetric if real-valued) and positive-definite. Only L is actually returned.
     * =================
     * usage example:
     * var jsMat = new linalg.Matrix([4, -1, 2, -1, 6, 0, 2, 0, 5], 3, 3); <- create a 3x3 Hermitian and positive-definite matrix
     * var matrix = linalg.cholesky(jsMat); <-  return the lower-triangular Cholesky factor of jsMat
     * =================
     *
     * @param matrix - the input matrix. Must be Hermitian (symmetric if all elements are real), positive-definite input matrix.
     * @return The lower-triangular Cholesky factor of a. Returns a matrix object if a is a matrix object.
     */
    cholesky: function (matrix) {
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        if (matrix.rows !== matrix.cols) {
            throw new Error("matrix must be square, i.e. M.rows == M.cols");
        }

        var out = new numjs_linalg.Matrix([], matrix.rows, matrix.cols);
        linalg.cholesky(matrix.data, matrix.rows, matrix.cols, out.data);
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
     * Singular Value Decomposition.
     * Factors the matrix a as u * np.diag(s) * v, where u and v are unitary and s is a 1-d array of a‘s singular values.
     * =================
     * usage example:
     * var jsMat = new linalg.Matrix([0.68, -0.211, 0.566, 0.597, 0.823, -0.605], 3, 2); <- create a new 3X2 matrix
     * var svdObj = linalg.svd(jsMat, false, false); <- compute the Singular Value Decomposition (just s)
     * or:
     * var svdObj = linalg.svd(jsMat, false); <- compute the Singular Value Decomposition (just u,s,v, when u and v are thin)
     * or:
     * var svdObj = linalg.svd(jsMat); <- compute the Singular Value Decomposition (just u,s,v, when u and v are full)
     * =================
     *
     * @param matrix - A real matrix of shape (M, N).
     * @param full_matrices - bool, optional - If True (default), u and v have the shapes (M, M) and (N, N),
     *                        respectively. Otherwise, the shapes are (M, K) and (K, N), respectively, where K = min(M, N).
     * @param compute_uv - bool, optional - Whether or not to compute u and v in addition to s. True by default.
     * @returns object contains u, s, v:
     *          u : Unitary matrices. The actual shape depends on the value of full_matrices.
     *              Only returned when compute_uv is True.
     *          s:  The singular values for every matrix, sorted in descending order (a Float64Array).
     *          v: Unitary matrices. The actual shape depends on the value of full_matrices.
     *          Only returned when compute_uv is True.
     */
    svd: function (matrix, full_matrices, compute_uv) {
        var outU = null, outS=null, outV=null, k=1;
        if (!matrix || !(matrix instanceof numjs_linalg.Matrix)) {
            throw new Error("The first arg must be instanceof numjs.Matrix");
        }

        if(full_matrices === undefined || full_matrices === null){
            full_matrices = true;
        }
        if(compute_uv === undefined || compute_uv === null){
            compute_uv = true;
        }

        k = Math.min(matrix.rows, matrix.cols);
        outS = new Float64Array(k);

        if(compute_uv){
            if(full_matrices){
                outU = new numjs_linalg.Matrix([], matrix.rows, matrix.rows);
                outV = new numjs_linalg.Matrix([], matrix.cols, matrix.cols);
            }
            else{
                outU = new numjs_linalg.Matrix([], matrix.rows, k);
                outV = new numjs_linalg.Matrix([], k, matrix.cols);
            }
        }

        linalg.svd(matrix.data, matrix.rows, matrix.cols, full_matrices, compute_uv,
                outU ? outU.data : outU, outS, outV ? outV.data : outV);

        return {u: outU, s: outS, v: outV};
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

    /**
     * Solve linear equation system
     * ========================
     * usage example:
     * var A = linalg.eye(3,3); <- create a 3x3 eye matrix
     * var resMat = linalg.matrix_eigen_values(A); <- get the values of x in A*x=b system of equations
     * ========================
     *
     * @param matrix - the matrix whos eigen values we wish to find
     * @returns {Float64Array} such that every pair is the real and imaginary part of an eigen value.
     */    
    matrix_eigen_values: function (matrix) {
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
    
    /**
     * Solve linear equation system
     * ========================
     * usage example:
     * var A = linalg.eye(3,3); <- create a 3x3 eye matrix
     * var b = new Float64Array([1,2,3]); <- create the 
     * var resMat = linalg.matrix_solve_linear(A, b); <- get the values of x in A*x=b system of equations
     * ========================
     *
     * @param matrix - the matrix defining the coefficients  
     * @param b - the constraint vector as a Float64Array in the 
     * @returns {Float64Array} such every value is the x_i respective value.
     */    
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

    /**
     * Multiplies two matrices
     * ========================
     * usage example:
     * var mat1 = linalg.ones(3,3); <- create a 3x3 ones matrix
     * var mat2 = linalg.ones(3,3); <- create a 3x3 ones matrix
     * var resMat = linalg.matrix_mul(mat1, mat2); <- create a matrix which is the product of the two matrices multiplication
     * ========================
     *
     * @param matrixA - the first input matrix
     * @param matrixB - the second input matrix
     * @returns {numjs_linalg.Matrix}
     */
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