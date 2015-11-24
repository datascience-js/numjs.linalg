var lin = require('../numjs.linalg.js');
var expect = require('chai').expect;

var EPS = 0.1; //TODO: is there a built in check ?

describe('native extension to support linear algebra via the Eigen cpp library', function() {    
    it('Should calculate the eigen values of a matrix \n\t\t\t({{1,2,3},{4,5,6},{7,8,9}})', function() {
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
  it('Should find the solution for \n\t\t\t({{0.8147,0.9134,0.2785},{0.9058,0.6324,0.5469},{0.1270,0.0975,0.9575}} X = {1,2,3})', function() {
        var da = new Float64Array([0.8147,0.9058,0.1270,0.9134,0.6324,0.0975,0.2785,0.5469,0.9575]);
        var mat = new lin.Matrix(da,3,3);
        var b = new Float64Array([1,2,3]);
        res = lin.matrix_solve_linear(mat,b);
        expect(res[0]).to.be.within(0.62- EPS,0.62 + EPS);
        expect(res[1]).to.be.within(-0.4 - EPS,-0.4 + EPS);
        expect(res[2]).to.be.within(3.0 - EPS ,3.0 + EPS);
  });
  
  it('Should multiply  \n\t\t\t({{0.8147,0.9134,0.2785},{0.9058,0.6324,0.5469},{0.1270,0.0975,0.9575}}*\n\t\t\t{{0.9649,0.9572,0.1419},{0.1576,0.4854,0.4218},{0.9706,0.8003,0.9157}})', function() {
        var da1 = new Float64Array([0.8147,0.9058,0.1270,0.9134,0.6324,0.0975,0.2785,0.5469,0.9575]);
        var da2 = new Float64Array([0.9649,0.1576,0.9706,0.9572,0.4854,0.8003,0.1419,0.4218,0.9157]);
        var A = new lin.Matrix(da1,3,3);
        var B = new lin.Matrix(da2,3,3);
        var res = lin.matrix_mul(A,B);
        expect( res.data[0] ).to.be.within(1.2 - EPS, 1.2 + EPS);
        expect( res.data[1] ).to.be.within(1.5 - EPS, 1.5 + EPS);
        expect( res.data[2] ).to.be.within(1.0 - EPS, 1.0 + EPS);
        expect( res.data[3] ).to.be.within(1.4 - EPS, 1.4 + EPS);
        expect( res.data[4] ).to.be.within(1.6 - EPS, 1.6 + EPS);
        expect( res.data[5] ).to.be.within(0.9 - EPS, 0.9 + EPS);
        expect( res.data[6] ).to.be.within(0.7 - EPS, 0.7 + EPS);
        expect( res.data[7] ).to.be.within(0.8 - EPS, 0.8 + EPS);
        expect( res.data[8] ).to.be.within(0.9 - EPS, 0.9 + EPS);        
  });
  
});