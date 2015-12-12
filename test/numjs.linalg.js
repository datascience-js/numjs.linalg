var assert = require('chai').assert,
    expect = require('chai').expect,
    linalg = require('../numjs.linalg');

var EPS = 0.1; //TODO: is there a built in check ?

describe('numjs.linalg - native extension to support linear algebra via the Eigen cpp library', function() {
    describe('dot', function () {
        it('should return the product of two numbers', function () {
            assert.equal(linalg.dot(7, 3), 21);
        })

        it('should return the inner product of two vectors', function () {
            var jsMatLeft = new linalg.Matrix([1, 1, 1, 1], 1, 4);
            var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 4, 1);
            assert.equal(linalg.dot(jsMatLeft, jsMatRight), 6);
        })

        it('should return the inner product of two 2-D arrays', function () {
            var jsMatLeft = new linalg.Matrix([1, 1, 1, 1], 2, 2);
            var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 2, 2);
            var matrix = linalg.dot(jsMatLeft, jsMatRight);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(4);
            expect(matrix.data["1"]).to.equal(4);
            expect(matrix.data["2"]).to.equal(2);
            expect(matrix.data["3"]).to.equal(2);
        })

        it('should return the dot product of number and vector', function () {
            var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 4, 1);
            var matrix = linalg.dot(3, jsMatRight);
            expect(matrix).to.have.property('rows').equal(4);
            expect(matrix).to.have.property('cols').equal(1);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(6);
            expect(matrix.data["1"]).to.equal(6);
            expect(matrix.data["2"]).to.equal(3);
            expect(matrix.data["3"]).to.equal(3);
        })

        it('should return the dot product of number and 2-D array', function () {
            var jsMatRight = new linalg.Matrix([2, 2, 1, 1], 2, 2);
            var matrix = linalg.dot(2, jsMatRight);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(4);
            expect(matrix.data["1"]).to.equal(4);
            expect(matrix.data["2"]).to.equal(2);
            expect(matrix.data["3"]).to.equal(2);
        })
    })

    describe("identity", function() {
        it ("should create a 2x2 identity matrix", function() {
            var output = linalg.identity(2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
        })

        it('should create a 3X3 identity matrix', function() {
            var output = linalg.identity(3);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
        })

        it('should create a 1X1 identity matrix', function() {
            var output = linalg.identity(1);
            expect(output).to.have.property('rows').equal(1);
            expect(output).to.have.property('cols').equal(1);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
        })
    })

    describe('tril', function() {
        it ('should be a 1X1 with single 1 value', function() {
            var inputMat = new linalg.Matrix([1], 1, 1);
            var output = linalg.tril(inputMat);
            expect(output).to.have.property('rows').equal(1);
            expect(output).to.have.property('cols').equal(1);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
        })

        it ('should be a 2X2 lower triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1], 2, 2);
            var output = linalg.tril(inputMat);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
        })

        it ('should be a 2X2 lower triagonal matrix (custom values)', function() {
            var inputMat = new linalg.Matrix([1,2,3,4], 2, 2);
            var output = linalg.tril(inputMat);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(2);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(4);
        })

        it ('should be a 3X3 lower triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1,1,1,1,1,1], 3, 3);
            var output = linalg.tril(inputMat);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
        })

        it ('should be a 4X4 lower triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 4, 4);
            var output = linalg.tril(inputMat);
            expect(output).to.have.property('rows').equal(4);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
            expect(output.data["4"]).to.equal(0);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(1);
            expect(output.data["7"]).to.equal(1);
            expect(output.data["8"]).to.equal(0);
            expect(output.data["9"]).to.equal(0);
            expect(output.data["10"]).to.equal(1);
            expect(output.data["11"]).to.equal(1);
            expect(output.data["12"]).to.equal(0);
            expect(output.data["13"]).to.equal(0);
            expect(output.data["14"]).to.equal(0);
            expect(output.data["15"]).to.equal(1);
        })
    })

    describe('zeros', function() {
        it('should create a 2X2 zero filled matrix', function() {
            var output = linalg.zeros(2, 2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');
            expect(output.data["0"]).to.equal(0);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
        })

        it('should create a 2X2 zero filled matrix (one parameter specified)', function() {
            var output = linalg.zeros(2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');
            expect(output.data["0"]).to.equal(0);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
        })

        it ('should be a 3X3 zero filled matrix', function() {
            var output = linalg.zeros(3, 3);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(0);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(0);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(0);
        })

        it ('should be a 4X4 zero filled matrix', function() {
            var output = linalg.zeros(4, 4);
            expect(output).to.have.property('rows').equal(4);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(0);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(0);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(0);
            expect(output.data["9"]).to.equal(0);
            expect(output.data["10"]).to.equal(0);
            expect(output.data["11"]).to.equal(0);
            expect(output.data["12"]).to.equal(0);
            expect(output.data["13"]).to.equal(0);
            expect(output.data["14"]).to.equal(0);
            expect(output.data["15"]).to.equal(0);
        })
    })

    describe('ones', function() {
        it('should create a 2X2 ones matrix', function() {
            var output = linalg.ones(2, 2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');
            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
        })

        it('should create a 2X2 ones matrix (one parameter specified)', function() {
            var output = linalg.ones(2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');
            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
        })

        it ('should be a 3X3 ones matrix', function() {
            var output = linalg.ones(3, 3);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(1);
            expect(output.data["7"]).to.equal(1);
            expect(output.data["8"]).to.equal(1);
        })

        it ('should be a 4X4 ones matrix', function() {
            var output = linalg.ones(4, 4);
            expect(output).to.have.property('rows').equal(4);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(1);
            expect(output.data["7"]).to.equal(1);
            expect(output.data["8"]).to.equal(1);
            expect(output.data["9"]).to.equal(1);
            expect(output.data["10"]).to.equal(1);
            expect(output.data["11"]).to.equal(1);
            expect(output.data["12"]).to.equal(1);
            expect(output.data["13"]).to.equal(1);
            expect(output.data["14"]).to.equal(1);
            expect(output.data["15"]).to.equal(1);
        })
    })

    describe('triu', function() {
        it ('should be a 1X1 with single 1 value', function() {
            var inputMat = new linalg.Matrix([1], 1, 1);
            var output = linalg.triu(inputMat);
            expect(output).to.have.property('rows').equal(1);
            expect(output).to.have.property('cols').equal(1);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
        })

        it ('should be a 2X2 upper triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1], 2, 2);
            var output = linalg.triu(inputMat);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
        })

        it ('should be a 2X2 lower upper triagonal matrix (custom values)', function() {
            var inputMat = new linalg.Matrix([1,2,3,4], 2, 2);
            var output = linalg.triu(inputMat);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(3);
            expect(output.data["3"]).to.equal(4);
        })

        it ('should be a 3X3 upper triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1,1,1,1,1,1], 3, 3);
            var output = linalg.triu(inputMat);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(1);
            expect(output.data["7"]).to.equal(1);
            expect(output.data["8"]).to.equal(1);
        })

        it ('should be a 4X4 upper triagonal matrix', function() {
            var inputMat = new linalg.Matrix([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 4, 4);
            var output = linalg.triu(inputMat);
            expect(output).to.have.property('rows').equal(4);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
            expect(output.data["9"]).to.equal(1);
            expect(output.data["10"]).to.equal(1);
            expect(output.data["11"]).to.equal(0);
            expect(output.data["12"]).to.equal(1);
            expect(output.data["13"]).to.equal(1);
            expect(output.data["14"]).to.equal(1);
            expect(output.data["15"]).to.equal(1);
        })
    })

    describe('tri', function() {
        it ('should be a 1X1 with single 1 value', function() {
            var output = linalg.tri(1, 1);
            expect(output).to.have.property('rows').equal(1);
            expect(output).to.have.property('cols').equal(1);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
        })

        it ('should be a 2X2 lower triagonal matrix', function() {
            var output = linalg.tri(2, 2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
        })

        it ('should be a 3X3 lower triagonal matrix', function() {
            var output = linalg.tri(3, 3);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
        })

        it ('should be a 4X4 lower triagonal matrix', function() {
            var output = linalg.tri(4, 4);
            expect(output).to.have.property('rows').equal(4);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(1);
            expect(output.data["4"]).to.equal(0);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(1);
            expect(output.data["7"]).to.equal(1);
            expect(output.data["8"]).to.equal(0);
            expect(output.data["9"]).to.equal(0);
            expect(output.data["10"]).to.equal(1);
            expect(output.data["11"]).to.equal(1);
            expect(output.data["12"]).to.equal(0);
            expect(output.data["13"]).to.equal(0);
            expect(output.data["14"]).to.equal(0);
            expect(output.data["15"]).to.equal(1);
        })

        it('should create a 3X4 lower triagonal matrix', function() {
            var output = linalg.tri(3, 4);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(1);
            expect(output.data["2"]).to.equal(1);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(1);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
            expect(output.data["9"]).to.equal(0);
            expect(output.data["10"]).to.equal(0);
            expect(output.data["11"]).to.equal(0);
        })
    })

    describe('eye', function() {
        it('should create a 3X3 identity matrix', function() {
            var output = linalg.eye(3, 3);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(3);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
        })

        it('should create a 2X2 identity matrix (one parameter usage test)', function() {
            var output = linalg.eye(2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
        })

        it('should create a 2X2 identity matrix', function() {
            var output = linalg.eye(2, 2);
            expect(output).to.have.property('rows').equal(2);
            expect(output).to.have.property('cols').equal(2);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(1);
        })

        it('should create a 1X1 identity matrix', function() {
            var output = linalg.eye(1, 1);
            expect(output).to.have.property('rows').equal(1);
            expect(output).to.have.property('cols').equal(1);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
        })

        it('should create a 3X4 eyematrix', function() {
            var output = linalg.eye(3, 4);
            expect(output).to.have.property('rows').equal(3);
            expect(output).to.have.property('cols').equal(4);
            expect(output).to.have.property('data');

            expect(output.data["0"]).to.equal(1);
            expect(output.data["1"]).to.equal(0);
            expect(output.data["2"]).to.equal(0);
            expect(output.data["3"]).to.equal(0);
            expect(output.data["4"]).to.equal(1);
            expect(output.data["5"]).to.equal(0);
            expect(output.data["6"]).to.equal(0);
            expect(output.data["7"]).to.equal(0);
            expect(output.data["8"]).to.equal(1);
            expect(output.data["9"]).to.equal(0);
            expect(output.data["10"]).to.equal(0);
            expect(output.data["11"]).to.equal(0);
        })
    })

    describe('matrix_power', function () {
        it('should raise a 2-D array(square) to the power 3', function () {
            var jsMatLeft = new linalg.Matrix([1, 1, 1, 1], 2, 2);
            var matrix = linalg.matrix_power(jsMatLeft, 3);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(4);
            expect(matrix.data["1"]).to.equal(4);
            expect(matrix.data["2"]).to.equal(4);
            expect(matrix.data["3"]).to.equal(4);
        })

        it('should return the same 2-D array which raised to the power of 1', function () {
            var jsMat = new linalg.Matrix([0, -1, 1, 0], 2, 2);
            var matrix = linalg.matrix_power(jsMat, 1);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(0);
            expect(matrix.data["1"]).to.equal(-1);
            expect(matrix.data["2"]).to.equal(1);
            expect(matrix.data["3"]).to.equal(0);
        })

        it('should return the identity matrix of the same shape as M', function () {
            var jsMat = new linalg.Matrix([0, -1, 1, 0], 2, 2);
            var matrix = linalg.matrix_power(jsMat, 0);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(1);
            expect(matrix.data["1"]).to.equal(0);
            expect(matrix.data["2"]).to.equal(0);
            expect(matrix.data["3"]).to.equal(1);
        })

        it('should return M**(-3)', function () {
            var jsMat = new linalg.Matrix([0, -1, 1, 0], 2, 2);
            var matrix = linalg.matrix_power(jsMat, -3);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(0);
            expect(matrix.data["1"]).to.equal(-1);
            expect(matrix.data["2"]).to.equal(1);
            expect(matrix.data["3"]).to.equal(0);
        })

        it('should return M**(-1)', function () {
            var jsMat = new linalg.Matrix([0, -1, 1, 0], 2, 2);
            var matrix = linalg.matrix_power(jsMat, -1);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(0);
            expect(matrix.data["1"]).to.equal(1);
            expect(matrix.data["2"]).to.equal(-1);
            expect(matrix.data["3"]).to.equal(0);
        })
    })

    describe('trace', function() {
        it ('should return 2 (regular ones matrix)', function() {
            var jsMat = new linalg.Matrix([1, 1, 1, 1], 2, 2);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(2);
        })

        it ('should return 0 (zeros matrix)', function() {
            var jsMat = new linalg.Matrix([0,0,0,0], 2, 2);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(0);
        })

        it ('should return 14 (3X3 matrix)', function() {
            var jsMat = new linalg.Matrix([1,2,3,4,5,6,7,8,9], 3, 3);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(15);
        })

        it ('should return 3 (3X3 ones matrix)', function() {
            var jsMat = new linalg.Matrix([1,1,1,1,1,1,1,1,1], 3, 3);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(3);
        })

        it ('should return 0 (2X2 reverse numbers test)', function() {
            var jsMat = new linalg.Matrix([-1, 1, -1, 1], 2, 2);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(0);
        })

        it ('should return -2 (2X2 negative numbers test)', function() {
            var jsMat = new linalg.Matrix([-1, -1, -1, -1], 2, 2);
            var trace = linalg.trace(jsMat);
            expect(trace).to.equal(-2);
        })
    })

    describe('det', function () {
        it('should return 7 (positive determinant)', function () {
            var jsMat = new linalg.Matrix([2, -1, 1, 3], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(7);
        })

        it('should return 1 (positive determinant)', function () {
            var jsMat = new linalg.Matrix([0, -1, 1, 0], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(1);
        })

        it('should return -2 (negative determinant)', function () {
            var jsMat = new linalg.Matrix([-2, -1, 0, 1], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(-2);
        })

        it('should return 0 (all numbers are the same)', function () {
            var jsMat = new linalg.Matrix([1, 1, 1, 1], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(0);
        })

        it('should return 0 (all numbers are not the same)', function () {
            var jsMat = new linalg.Matrix([2, 2, 1, 1], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(0);
        })

        it('should return 0 (all numbers are zero)', function () {
            var jsMat = new linalg.Matrix([0, 0, 0, 0], 2, 2);
            var det = linalg.det(jsMat);
            expect(det).to.equal(0);
        })
    })

    describe('matrix_rank', function () {
        it('should return 1', function () {
            var jsMat = new linalg.Matrix([1, 1, 1, 1], 1, 4);
            var rank = linalg.matrix_rank(jsMat);
            expect(rank).to.equal(1);
        })

        it('should return 4', function () {
            var jsMat = new linalg.Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 4, 4);
            var rank = linalg.matrix_rank(jsMat);
            expect(rank).to.equal(4);
        })

        it('should return 4 (default threshold)', function () {
            var jsMat = new linalg.Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.3], 4, 4);
            var rank = linalg.matrix_rank(jsMat);
            expect(rank).to.equal(4);
        })

        it('should return 4 (threshold: 0.2, same matrix as before, different threshold)', function () {
            var jsMat = new linalg.Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.3], 4, 4);
            var rank = linalg.matrix_rank(jsMat, 0.2);
            expect(rank).to.equal(4);
        })

        it('should return 3 (threshold: 0.3, same matrix as before, different threshold)', function () {
            var jsMat = new linalg.Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.3], 4, 4);
            var rank = linalg.matrix_rank(jsMat, 0.3);
            expect(rank).to.equal(3);
        })
    })

    describe('inv', function () {
        it('should return the inverse of a matrix [[1,2], [3,4]]', function () {
            var jsMat = new linalg.Matrix([1, 3, 2, 4], 2, 2);
            var matrix = linalg.inv(jsMat);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(-1.9999999999999996);
            expect(matrix.data["1"]).to.equal(1.4999999999999998);
            expect(matrix.data["2"]).to.equal(0.9999999999999998);
            expect(matrix.data["3"]).to.equal(-0.4999999999999999);
        })

        it('should return the id matrix (inverse of id)', function () {
            var jsMat = new linalg.Matrix([1, 0, 0, 1], 2, 2);
            var matrix = linalg.inv(jsMat);
            expect(matrix).to.have.property('rows').equal(2);
            expect(matrix).to.have.property('cols').equal(2);
            expect(matrix).to.have.property('data');
            expect(matrix.data["0"]).to.equal(1);
            expect(matrix.data["1"]).to.equal(0);
            expect(matrix.data["2"]).to.equal(0);
            expect(matrix.data["3"]).to.equal(1);
        })
    })

    describe('matrix_eigen_values', function () {
        it('Should calculate the eigen values of a matrix \n\t\t\t({{1,2,3},{4,5,6},{7,8,9}})', function () {
            var da = new Float64Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            var mat = new linalg.Matrix(da, 3, 3);
            var res = linalg.matrix_eigen_values(mat);
            expect(res[0]).to.be.within(16.1, 16.2);
            expect(res[1]).to.be.within(0.0, EPS);
            expect(res[2]).to.be.within(-1.2, -1.1);
            expect(res[3]).to.be.within(0.0, EPS);
            expect(res[4]).to.be.within(-EPS, EPS);
            expect(res[5]).to.be.within(0.0, EPS);
        })
    })

    describe('matrix_solve_linear', function () {
        it('Should find the solution for \n\t\t\t({{0.8147,0.9134,0.2785},{0.9058,0.6324,0.5469},{0.1270,0.0975,0.9575}} X = {1,2,3})', function () {
            var da = new Float64Array([0.8147, 0.9058, 0.1270, 0.9134, 0.6324, 0.0975, 0.2785, 0.5469, 0.9575]);
            var mat = new linalg.Matrix(da, 3, 3);
            var b = new Float64Array([1, 2, 3]);
            res = linalg.matrix_solve_linear(mat, b);
            expect(res[0]).to.be.within(0.62 - EPS, 0.62 + EPS);
            expect(res[1]).to.be.within(-0.4 - EPS, -0.4 + EPS);
            expect(res[2]).to.be.within(3.0 - EPS, 3.0 + EPS);
        })
    })

    describe('matrix_mul', function () {
        it('Should multiply  \n\t\t\t({{0.8147,0.9134,0.2785},{0.9058,0.6324,0.5469},{0.1270,0.0975,0.9575}}*\n\t\t\t{{0.9649,0.9572,0.1419},{0.1576,0.4854,0.4218},{0.9706,0.8003,0.9157}})', function () {
            var da1 = new Float64Array([0.8147, 0.9058, 0.1270, 0.9134, 0.6324, 0.0975, 0.2785, 0.5469, 0.9575]);
            var da2 = new Float64Array([0.9649, 0.1576, 0.9706, 0.9572, 0.4854, 0.8003, 0.1419, 0.4218, 0.9157]);
            var A = new linalg.Matrix(da1, 3, 3);
            var B = new linalg.Matrix(da2, 3, 3);
            var res = linalg.matrix_mul(A, B);
            expect(res.data[0]).to.be.within(1.2 - EPS, 1.2 + EPS);
            expect(res.data[1]).to.be.within(1.5 - EPS, 1.5 + EPS);
            expect(res.data[2]).to.be.within(1.0 - EPS, 1.0 + EPS);
            expect(res.data[3]).to.be.within(1.4 - EPS, 1.4 + EPS);
            expect(res.data[4]).to.be.within(1.6 - EPS, 1.6 + EPS);
            expect(res.data[5]).to.be.within(0.9 - EPS, 0.9 + EPS);
            expect(res.data[6]).to.be.within(0.7 - EPS, 0.7 + EPS);
            expect(res.data[7]).to.be.within(0.8 - EPS, 0.8 + EPS);
            expect(res.data[8]).to.be.within(0.9 - EPS, 0.9 + EPS);
        })
    })
})