var assert = require('chai').assert,
    expect = require('chai').expect,
    linalg = require('../numjs.linalg');

describe('numjs.linalg', function() {
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
});
