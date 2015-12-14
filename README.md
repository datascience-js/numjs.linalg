![](https://github.com/datascience-js/numjs/blob/master/design/props/numJS_logo.png)

# numjs.linalg

A nodejs addon that enables to harness the power of [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) while usign JavaScript 

## Setup

This library is dependant on [Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page). Therefore it requires that the a folder contatining an Eigen library will be pressent in the directory above it (currently builds against and requires: eigen-eigen-10219c95fe65).

To setup the addon after pulling run

```text
$ npm i
$ npm run configure
$ npm run build
```

Subsequent builds can be just:

```
$ npm run build
```

## Running tests

After building:

```
$ npm test
```

## Usage examples

These are just some usage examples to illustrate the API surface of the library.

To avoid namespacing issues:

```javascript
import {Matrix, <anything else>} from numjs_linalg
```

###### Creating matrixces:
```javascript
var newMat = new Matrix([1, 1, 1, 1], 2, 2); // 2x2 matrix new Matrix([], 4, 4); // zero filled
// custom values
var customValsMat = new Matrix([1,2,3,4],2,2); 
var vector = new Matrix([1,2,3,4], 1, 4);// one by 4 vector
```
###### Creating matrices declaratively with easy syntax:
```javascript
var newMat = zeros(100); // zeros matrix
var newMat2 = zeros(80, 120); // doesn’t have to be square
var ones = ones(80, 120); // ones matrix
var scalar = ones(1); // ones value scalar
var oneVector = ones(1, 4);
var emptyMat = empty(3); // empty 3x3 matrix
var emptyRectangle = empty(30000, 800); 
var i = identity(1000); // 1000x1000 identity matrix
var j = eye(1000, 800); // numpy eye (ones on diagonal, zeros elsewhere)
var t = tri(5, 100); // lower triangular matrix of ones.
var t2 = tril(mat); // upper triangular copy
var t3 = triu(mat); // lower triangular copy
```

###### Some linear algebra:
```javascript
// calculate the dot product of two matrices. 
dot(mat1, mat2);
// raises a matrix to a power
matrix_power(mat1, 100); // power of 100
matrix_power(mat1, 0.5); // square root of the matrix
// inverse of a matrix
inv(mat); // only for a square matrix
// calculate the trace of a matrix
trace(mat);
// calculate the determinant of a matrix
det(mat);
//calculate the rank of the matrix
matrix_rank(mat);
// get eigen values of matrix (as a typed array)
matrix_eigen_values(mat); 
// get solution to the matrix as a linear system as a typed // array
matrix_solve_linear(mat); 
// calculate the matrix multiplication product of two matrices. This method takes an out parameter to save allocations when possible
matmul(mat1, mat2, out);
```
