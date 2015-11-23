var lin = require('../numjs.linalg.js');
var expect = require('chai').expect;

var EPS = 0.1; // is there a built in check ?

describe('native extension to support linear algebra via the Eigen cpp library', function() {    
    it('Should calculate the eigen values of a matrix ({{1,2,3},{4,5,6},{7,8,9}})', function() {
        var da = new Float64Array([1,2,3,4,5,6,7,8,9]);
        var mat = new lin.Matrix(da,3,3);
        var res = lin.matrix_eigen_values(mat);
        expect(res[0]).to.be.within(16.1,16.2);
        expect(res[1]).to.be.within(0.0,EPS);
        expect(res[2]).to.be.within(-1.2,-1.1);
        expect(res[3]).to.be.within(0.0,EPS);
        expect(res[4]).to.be.within(-EPS,EPS);
        expect(res[5]).to.be.within(0.0,EPS);
  });
});