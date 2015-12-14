#include <nan.h>
#include <Eigen/SVD>
#include <iostream>
#include <Eigen/Dense>

using namespace v8;

/**
  *  Dot:
  *  Dot product of two arrays.
  *  For 2-D arrays it is equivalent to matrix multiplication, and for 1-D arrays to inner product of vectors
  * (without complex conjugation).
  *
  *  arguments:
  *  info[0]: Number represent the number of rows of the left matrix.
  *  info[1]: Number represent the number of columns of the left matrix.
  *  info[2]: Buffer(object created by Float64Array) represent the left numjs.Matrix object .
  *  info[3]: Number represent the number of rows of the right matrix.
  *  info[4]: Number represent the number of columns of the right matrix.
  *  info[5]: Buffer(object created by Float64Array) represent the right numjs.Matrix object .
  *  info[6]: Buffer(object created by Float64Array) for return value, which is the dot product of
  *           left matrix and right matrix.
*/
void Dot(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

	if (info.Length() < 7) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}
    if (!info[0]->IsUint32() || !info[1]->IsUint32() ||
    	!info[3]->IsUint32() || !info[4]->IsUint32()) {
    	Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[2]->IsNumber()) {
	    double leftParam(info[2]->NumberValue());

	    if(!info[5]->IsNumber()){          
			if (info[5]->IsFloat64Array()) {
				double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                size_t rowsRight(info[3]->Uint32Value());
                size_t colsRight(info[4]->Uint32Value());
                CMd rightMat(refRightData, rowsRight, colsRight);

				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsRight, colsRight);
                    res = leftParam * rightMat;

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
        }

    }
	else{
		if (info[2]->IsFloat64Array()) {
			double *refLeftData = *(Nan::TypedArrayContents<double>(info[2])); 
	        size_t rowsLeft(info[0]->Uint32Value());
            size_t colsLeft(info[1]->Uint32Value());
            CMd leftMat(refLeftData, rowsLeft, colsLeft);

            if(info[5]->IsNumber()){
                double rightParam(info[5]->NumberValue());
                
				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsLeft, colsLeft);
                    res = leftMat * rightParam;
                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
            else{
				if (info[5]->IsFloat64Array()) {
					double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                	size_t rowsRight(info[3]->Uint32Value());
                    size_t colsRight(info[4]->Uint32Value());
                    CMd rightMat(refRightData, rowsRight, colsRight);

					if (info[6]->IsFloat64Array()) {
						double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                        Md res(refResData, rowsLeft, colsRight);
                         res = leftMat * rightMat;
                        Local<Boolean> b = Nan::New(true);
                        info.GetReturnValue().Set(b);
                    }
                }
            }
	    }
	    else{
	        Nan::ThrowTypeError("Wrong type of the first argument");
            return;
	    }

	    Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
	}
}

/**
  *  Inner:
  *  Inner product of two arrays.
  *  For 2-D arrays it is equivalent to sum product over the last axes, and for 1-D arrays to inner product of vectors
  * (without complex conjugation).
  * If a and b are nonscalar, their last dimensions of must match. (assumption)
  *
  *  arguments:
  *  info[0]: Number represent the number of rows of the left matrix.
  *  info[1]: Number represent the number of columns of the left matrix.
  *  info[2]: Buffer(object created by Float64Array) represent the left numjs.Matrix object .
  *  info[3]: Number represent the number of rows of the right matrix.
  *  info[4]: Number represent the number of columns of the right matrix.
  *  info[5]: Buffer(object created by Float64Array) represent the right numjs.Matrix object .
  *  info[6]: Buffer(object created by Float64Array) for return value.
*/
void Inner(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

	if (info.Length() < 7) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}
    if (!info[0]->IsUint32() || !info[1]->IsUint32() ||
    	!info[3]->IsUint32() || !info[4]->IsUint32()) {
    	Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[2]->IsNumber()) {
	    double leftParam(info[2]->NumberValue());

	    if(!info[5]->IsNumber()){
			if (info[5]->IsFloat64Array()) {
				double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                size_t rowsRight(info[3]->Uint32Value());
                size_t colsRight(info[4]->Uint32Value());
                CMd rightMat(refRightData, rowsRight, colsRight);

				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsRight, colsRight);
                    res = leftParam * rightMat;

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
        }

    }
	else{
		if (info[2]->IsFloat64Array()) {
			double *refLeftData = *(Nan::TypedArrayContents<double>(info[2]));
	        size_t rowsLeft(info[0]->Uint32Value());
            size_t colsLeft(info[1]->Uint32Value());
            CMd leftMat(refLeftData, rowsLeft, colsLeft);

            if(info[5]->IsNumber()){
                double rightParam(info[5]->NumberValue());

				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsLeft, colsLeft);
                    res = leftMat * rightParam;
                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
            else{
				if (info[5]->IsFloat64Array()) {
					double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                	size_t rowsRight(info[3]->Uint32Value());
                    size_t colsRight(info[4]->Uint32Value());
                    CMd rightMat(refRightData, rowsRight, colsRight);

					if (info[6]->IsFloat64Array()) {
						double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                        Md res(refResData, rowsLeft, rowsRight);

                        res = (rightMat * leftMat.transpose()).transpose();

                        Local<Boolean> b = Nan::New(true);
                        info.GetReturnValue().Set(b);
                    }
                }
            }
	    }
	    else{
	        Nan::ThrowTypeError("Wrong type of the first argument");
            return;
	    }

	    Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
	}
}

/**
  *  Outer:
  *  Outer product of two arrays.
  *
  *
  *  arguments:
  *  info[0]: Number represent the number of rows of the left matrix.
  *  info[1]: Number represent the number of columns of the left matrix.
  *  info[2]: Buffer(object created by Float64Array) represent the left numjs.Matrix object .
  *  info[3]: Number represent the number of rows of the right matrix.
  *  info[4]: Number represent the number of columns of the right matrix.
  *  info[5]: Buffer(object created by Float64Array) represent the right numjs.Matrix object .
  *  info[6]: Buffer(object created by Float64Array) for return value.
*/
void Outer(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

	if (info.Length() < 7) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}
    if (!info[0]->IsUint32() || !info[1]->IsUint32() ||
    	!info[3]->IsUint32() || !info[4]->IsUint32()) {
    	Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[2]->IsNumber()) {
	    double leftParam(info[2]->NumberValue());

	    if(!info[5]->IsNumber()){
			if (info[5]->IsFloat64Array()) {
				double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                size_t rowsRight(info[3]->Uint32Value());
                size_t colsRight(info[4]->Uint32Value());
                CMd rightMat(refRightData, rowsRight, colsRight);

				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsRight, colsRight);
                    res = leftParam * rightMat;

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
        }

    }
	else{
		if (info[2]->IsFloat64Array()) {
			double *refLeftData = *(Nan::TypedArrayContents<double>(info[2]));
	        size_t rowsLeft(info[0]->Uint32Value());
            size_t colsLeft(info[1]->Uint32Value());
            CMd leftMat(refLeftData, rowsLeft, colsLeft);

            if(info[5]->IsNumber()){
                double rightParam(info[5]->NumberValue());

				if (info[6]->IsFloat64Array()) {
					double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                    Md res(refResData, rowsLeft, colsLeft);
                    res = leftMat * rightParam;
                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
            else{
				if (info[5]->IsFloat64Array()) {
					double *refRightData = *(Nan::TypedArrayContents<double>(info[5]));
                	size_t rowsRight(info[3]->Uint32Value());
                    size_t colsRight(info[4]->Uint32Value());
                    CMd rightMat(refRightData, rowsRight, colsRight);

					if (info[6]->IsFloat64Array()) {
						double *refResData = *(Nan::TypedArrayContents<double>(info[6]));
                        Md res(refResData, rowsLeft, colsRight);

                        res = leftMat * rightMat;

                        Local<Boolean> b = Nan::New(true);
                        info.GetReturnValue().Set(b);
                    }
                }
            }
	    }
	    else{
	        Nan::ThrowTypeError("Wrong type of the first argument");
            return;
	    }

	    Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
	}
}

/**
  *  Cholesky:
  *  Return the Cholesky decomposition, L * L.H, of the square matrix a,
  *  where L is lower-triangular and .H is the conjugate transpose operator
  *  (which is the ordinary transpose if a is real-valued). a must be Hermitian
  *  (symmetric if real-valued) and positive-definite. Only L is actually returned.
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Buffer(object created by Float64Array) for return value, inverse of the given matrix.
*/
void Cholesky(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 4) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

		if (info[3]->IsFloat64Array()) {
			double *refResData = *(Nan::TypedArrayContents<double>(info[3]));
            Md res(refResData, rowsMatrix, colsMatrix);
            res = inputMat.llt().matrixL();
            Local<Boolean> b = Nan::New(true);
            info.GetReturnValue().Set(b);
        }
        else{
            Nan::ThrowTypeError("Wrong arguments (4th arg)");
            Local<Boolean> b = Nan::New(false);
            info.GetReturnValue().Set(b);
        }
    }
    else{
        Nan::ThrowTypeError("Wrong arguments (1st arg)");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Identity:
  *  Creates a new identity matrix - a square nXn matrix with ones on the diagonal
  *  and zeros elsewhere
  *
  *  arguments:
  *  info[0]: Number n which represents the matrix dimensions
  *  info[2]: Buffer(object created by Float64Array) for return value(identity matrix nXn).
*/
void Identity(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 2) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[0]->IsNumber()) {
        Nan::ThrowTypeError("Wrong argument given, should be a number");
        return;
    }

    if (info[1]->IsFloat64Array()) {
        size_t rowsMatrix(info[0]->Uint32Value());
        size_t colsMatrix(info[0]->Uint32Value());

        double *refResData = *(Nan::TypedArrayContents<double>(info[1]));
        Md res(refResData, rowsMatrix, colsMatrix);
        res = Md::Identity(rowsMatrix, colsMatrix);

        Local<Boolean> b = Nan::New(true);
        info.GetReturnValue().Set(b);
    }

    else{
        Nan::ThrowTypeError("Wrong arguments2");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Tri:
  *  Creates a new nXm matrix with ones at and below the matrix diagonal
  *  and zeros elsewhere.
  *
  *  arguments:
  *  info[0]: Number n which represents the number of rows in the newly built matrix
  *  info[1]: Number m which represents the number of cols in the newly built matrix
  *  info[2]: Buffer(object created by Float64Array) for return value(eye matrix nXm).
*/
void Tri(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 3) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[0]->IsNumber() || !info[1]->IsNumber()) {
        Nan::ThrowTypeError("Wrong argument given, should be a number");
        return;
    }

    if (info[2]->IsFloat64Array()) {
        size_t rowsMatrix(info[0]->Uint32Value());
        size_t colsMatrix(info[1]->Uint32Value());

        double *refResData = *(Nan::TypedArrayContents<double>(info[2]));
        Md res(refResData, rowsMatrix, colsMatrix);
        res = Md::Ones(rowsMatrix, colsMatrix);
        for (int i = 0; i < rowsMatrix; i++) {
            for (int j = i + 1; j < colsMatrix; j++) {
                res(i, j) = 0;
            }
        }

        Local<Boolean> b = Nan::New(true);
        info.GetReturnValue().Set(b);
    }

    else{
        Nan::ThrowTypeError("Wrong arguments2");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Eye:
  *  Creates a new nXm matrix with ones on the diagonal
  *  and zeros elsewhere.
  *
  *  arguments:
  *  info[0]: Number n which represents the number of rows in the newly built matrix
  *  info[1]: Number m which represents the number of cols in the newly built matrix
  *  info[2]: Buffer(object created by Float64Array) for return value(eye matrix nXm).
*/
void Eye(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 3) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[0]->IsNumber() || !info[1]->IsNumber()) {
        Nan::ThrowTypeError("Wrong argument given, should be a number");
        return;
    }

    if (info[2]->IsFloat64Array()) {
        size_t rowsMatrix(info[0]->Uint32Value());
        size_t colsMatrix(info[1]->Uint32Value());

        double *refResData = *(Nan::TypedArrayContents<double>(info[2]));
        Md res(refResData, rowsMatrix, colsMatrix);
        res = Md::Identity(rowsMatrix, colsMatrix);

        Local<Boolean> b = Nan::New(true);
        info.GetReturnValue().Set(b);
    }

    else{
        Nan::ThrowTypeError("Wrong arguments2");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Tril:
  *  Creates a copy of a given matrix with all elements above the diagonal zeroed
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be converted to lower diagonal matrix
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Buffer(object created by Float64Array) for return value(M**m).
*/
void Tril(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 4) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());
        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

		if (info[3]->IsFloat64Array()) {
			double *refResData = *(Nan::TypedArrayContents<double>(info[3]));
            Md res(refResData, rowsMatrix, colsMatrix);
            for (int i = 0; i < rowsMatrix; i++) {
                for (int j = 0; j < colsMatrix; j++) {
                    if (j > i) {
                        res(i, j) = 0;
                    } else {
                        res(i, j) = inputMat(i, j);
                    }
                }
            }

            Local<Boolean> b = Nan::New(true);
            info.GetReturnValue().Set(b);
        }

        else{
            Nan::ThrowTypeError("Wrong argument - output matrix data should be float64array");
            Local<Boolean> b = Nan::New(false);
            info.GetReturnValue().Set(b);
        }
    }
    else{
        Nan::ThrowTypeError("Wrong argument - input matrix data should be float64array");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Triu:
  *  Creates a copy of a given matrix with all elements below the diagonal zeroed
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be converted to lower diagonal matrix
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Buffer(object created by Float64Array) for return value(M**m).
*/
void Triu(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 4) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());
        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

		if (info[3]->IsFloat64Array()) {
			double *refResData = *(Nan::TypedArrayContents<double>(info[3]));
            Md res(refResData, rowsMatrix, colsMatrix);
            for (int i = 0; i < rowsMatrix; i++) {
                for (int j = 0; j < colsMatrix; j++) {
                    if (j < i) {
                        res(i, j) = 0;
                    } else {
                        res(i, j) = inputMat(i, j);
                    }
                }
            }

            Local<Boolean> b = Nan::New(true);
            info.GetReturnValue().Set(b);
        }

        else{
            Nan::ThrowTypeError("Wrong argument - output matrix data should be float64array");
            Local<Boolean> b = Nan::New(false);
            info.GetReturnValue().Set(b);
        }
    }
    else{
        Nan::ThrowTypeError("Wrong argument - input matrix data should be float64array");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  MatrixPower:
  *  Raise a square matrix to the (integer) power n.
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be "powered".
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Number m represent the exponent. Can be any integer or long integer, positive, negative, or zero.
  *  info[4]: Buffer(object created by Float64Array) for return value(M**m).
              If the exponent is positive or zero then the type of the elements is the same as those of M.
              If the exponent is negative the elements are floating-point.
*/
void MatrixPower(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 5) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber() || !info[3]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

    
	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());
        double expParam(info[3]->NumberValue());
        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

		if (info[4]->IsFloat64Array()) {
			double *refResData = *(Nan::TypedArrayContents<double>(info[4]));
            Md res(refResData, rowsMatrix, colsMatrix);

            if(expParam == 0){
                res = inputMat.Identity(rowsMatrix, colsMatrix);
            }
            else{
                res = inputMat;
                if(expParam < 0){
                    res = res.inverse();
                }

                for (int i=1; i< abs(expParam); i++)
                {
                    res *= inputMat;
                }
            }

            Local<Boolean> b = Nan::New(true);
            info.GetReturnValue().Set(b);
        }
        else{
            Nan::ThrowTypeError("Wrong arguments2");
            Local<Boolean> b = Nan::New(false);
            info.GetReturnValue().Set(b);
        }
    }
    else{
        Nan::ThrowTypeError("Wrong arguments3");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Inverse:
  *  Compute the (multiplicative) inverse of a matrix.
  *  Given a square matrix a, return the matrix ainv satisfying dot(a, ainv) = dot(ainv, a)
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Buffer(object created by Float64Array) for return value, inverse of the given matrix.
*/
void Inverse(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 4) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

		if (info[3]->IsFloat64Array()) {
			double *refResData = *(Nan::TypedArrayContents<double>(info[3]));
            Md res(refResData, rowsMatrix, colsMatrix);
            res = inputMat.inverse();
            Local<Boolean> b = Nan::New(true);
            info.GetReturnValue().Set(b);
        }
        else{
            Nan::ThrowTypeError("Wrong arguments (4th arg)");
            Local<Boolean> b = Nan::New(false);
            info.GetReturnValue().Set(b);
        }
    }
    else{
        Nan::ThrowTypeError("Wrong arguments (1st arg)");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}


/**
  *  Trace:
  *  Computes The sum along the diagonals of an array
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *
  *  Return value: a Number represent the trace (diagonal sum) of the given matrix.
*/
void Trace(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 3) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);
        v8::Local<v8::Number> num = Nan::New(inputMat.trace());
        info.GetReturnValue().Set(num);
    }
    else{
        Nan::ThrowTypeError("Wrong arguments");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}


/**
  *  Det:
  *  Compute the determinant of an array.
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *
  *  Return value: a Number represent the determinant of the given matrix.
*/
void Det(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 3) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);
        v8::Local<v8::Number> num = Nan::New(inputMat.determinant());
        info.GetReturnValue().Set(num);
    }
    else{
        Nan::ThrowTypeError("Wrong arguments");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  SVD:
  *  Singular Value Decomposition.
  *  Factors the matrix a as u * np.diag(s) * v, where u and v are unitary and s is a 1-d array of a�s singular values.
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: full_matrices(bool, optional): If True (default), u and v have the shapes (M, M) and (N, N), respectively.
  *           Otherwise, the shapes are (M, K) and (K, N), respectively, where K = min(M, N).
  *  info[4]: compute_uv (bool, optional): Whether or not to compute u and v in addition to s. True by default.
  *  info[5]: outU - Unitary matrices. The actual shape depends on the value of full_matrices.
  *                  Only returned when compute_uv is True.
  *  info[6]: outS - The singular values for every matrix, sorted in descending order.
  *  info[7]: outV - Unitary matrices. The actual shape depends on the value of full_matrices.
  *                  Only returned when compute_uv is True.
*/
void SVD(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 8) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        int rowsMatrix(info[1]->Uint32Value());
        int colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

        bool isFullMatrices = info[3]->BooleanValue();
        bool isComputeUV = info[4]->BooleanValue();
        int k = min(rowsMatrix,colsMatrix);

        if(isComputeUV){
            if (info[5]->IsFloat64Array() && info[6]->IsFloat64Array() && info[7]->IsFloat64Array()) {

                double *refResU = *(Nan::TypedArrayContents<double>(info[5]));
                double *refResS = *(Nan::TypedArrayContents<double>(info[6]));
                double *refResV = *(Nan::TypedArrayContents<double>(info[7]));

                if(isFullMatrices){
                    Eigen::JacobiSVD<Eigen::MatrixXd> svd(inputMat, Eigen::ComputeFullU | Eigen::ComputeFullV);

                    Md resU(refResU, rowsMatrix, rowsMatrix);
                    Md resV(refResV, colsMatrix, colsMatrix);

                    resU = svd.matrixU();
                    resV = svd.matrixV();

                    std::memcpy(refResS, svd.singularValues().data(), k * sizeof(double));

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
                else{
                    Eigen::JacobiSVD<Eigen::MatrixXd> svd(inputMat, Eigen::ComputeThinU | Eigen::ComputeThinV);

                    Md resU(refResU, rowsMatrix, k);
                    Md resV(refResV, k, colsMatrix);

                    resU = svd.matrixU();
                    resV = svd.matrixV();

                    std::memcpy(refResS, svd.singularValues().data(), k * sizeof(double));

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
        }
        else{
            if(info[6]->IsFloat64Array()){
                double *refResS = *(Nan::TypedArrayContents<double>(info[6]));
                Eigen::JacobiSVD<Eigen::MatrixXd> svd(inputMat);
                std::memcpy(refResS, svd.singularValues().data(), k * sizeof(double));

                Local<Boolean> b = Nan::New(true);
                info.GetReturnValue().Set(b);
            }
        }
    }
    else{
        Nan::ThrowTypeError("Wrong arguments");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

/**
  *  Rank:
  *  Return matrix rank of array using SVD method
  *  Rank of the array is the number of SVD singular values of the array that are greater than threshold(info[3]).
  *
  *  arguments:
  *  info[0]: Buffer(object created by Float64Array) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Optional - Number represent the threshold which SVD values are considered zero.
  *                     If this arg is not given, and S is an array with singular values for M,
  *                     and eps is the epsilon value for datatype of S, then tol is set to S.max() * max(M.shape) * eps
  *
  *  Return value: a Number represent the matrix rank of the given matrix .
*/
void Rank(const Nan::FunctionCallbackInfo<v8::Value>& info){
    using CMd = Eigen::Map <const Eigen::MatrixXd >;
    using Md = Eigen::Map <Eigen::MatrixXd >;

    if (info.Length() < 3) {
        Nan::ThrowTypeError("Wrong number of arguments");
        return;
    }

    if (!info[1]->IsNumber() || !info[2]->IsNumber()) {
        Nan::ThrowTypeError("Wrong arguments");
        return;
    }

	if (info[0]->IsFloat64Array()) {
		double *refMatrixData = *(Nan::TypedArrayContents<double>(info[0]));
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);
        Eigen::JacobiSVD<Eigen::MatrixXd> svd(inputMat);
        if (info.Length() == 4 && info[3]->IsNumber()){
            svd.setThreshold((float)info[3]->NumberValue());
        }

        v8::Local<v8::Number> num = Nan::New((int)svd.rank());
        info.GetReturnValue().Set(num);
    }
    else{
        Nan::ThrowTypeError("Wrong arguments");
        Local<Boolean> b = Nan::New(false);
        info.GetReturnValue().Set(b);
    }
}

NAN_METHOD(GetEigenValues){
	using CMd = Eigen::Map <const Eigen::MatrixXd >;
	using EMd = Eigen::Map <Eigen::EigenSolver<const Eigen::MatrixXd>::EigenvalueType>;

	if (info.Length() != 4) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}

	if (!info[0]->IsUint32() || !info[1]->IsUint32()) {
		Nan::ThrowTypeError("Wrong arguments");
		return;
	}
	size_t rows1(info[0]->Uint32Value());
	size_t cols1(info[1]->Uint32Value());

	double *data1 = nullptr;
	double *resRawData = nullptr;

	if (info[2]->IsFloat64Array() && info[3]->IsFloat64Array()) {
		data1 = *(Nan::TypedArrayContents<double>(info[2]));
		resRawData = *(Nan::TypedArrayContents<double>(info[3]));
	}
	else{
		Nan::ThrowTypeError("Wrong arguments");
		return;
	}

	CMd first(data1, rows1, cols1);
	EMd eigenResults(reinterpret_cast<std::complex<double>*>(resRawData)/*very ugly but well defined afaik */, rows1, 1);
	Eigen::EigenSolver<Eigen::MatrixXd> eigenSolver(first, false);

	eigenResults = eigenSolver.eigenvalues();
	Local<Boolean> b = Nan::New(true);
	info.GetReturnValue().Set(b);
}


NAN_METHOD(SolveLinearSystemHouseholderQr){
	using CMd = Eigen::Map <const Eigen::MatrixXd >;
	using Md = Eigen::Map <Eigen::MatrixXd >;
	using MVd = Eigen::Map < Eigen::VectorXd >;

	if (info.Length() != 5) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}

	if (!info[0]->IsUint32() || !info[1]->IsUint32()) {
		Nan::ThrowTypeError("Wrong arguments");
		return;
	}
	size_t rows1(info[0]->Uint32Value());
	size_t cols1(info[1]->Uint32Value());

	double *data1 = nullptr;

	if (!info[2]->IsFloat64Array() || !info[3]->IsFloat64Array() || !info[4]->IsFloat64Array()) {
		Nan::ThrowTypeError("Wrong arguments - expected Float64Array");
		return;
	}
	data1 = *(Nan::TypedArrayContents<double>(info[2]));
	CMd matrixA(data1, rows1, cols1);	
	double *parameterData = nullptr;
	parameterData = *(Nan::TypedArrayContents<double>(info[3]));
	double *resultVectorData = nullptr;
	resultVectorData = *(Nan::TypedArrayContents<double>(info[4]));
	MVd paramVector(parameterData, rows1, 1);
	MVd resultVector(resultVectorData, rows1, 1);
	resultVector = matrixA.householderQr().solve(paramVector);

	//TODO: maybe support tolerance and get the required precision: double relative_error = (matrixA*resultVector - paramVector).norm() / paramVector.norm();
	Local<Boolean> b = Nan::New(true);
	info.GetReturnValue().Set(b);
}

/**
  *  Matrix multiplication:
  *  Given compatible matrices A,B returns A*B.
  *  For 2-D arrays it is equivalent to matrix multiplication, and for 1-D arrays to inner product of vectors
  * (without complex conjugation).
  *
  *  arguments:
  *  info[0]: Number represent the number of rows of the left matrix.
  *  info[1]: Number represent the number of columns of the left matrix.
  *  info[2]: Buffer(object created by Float64Array) represent the left numjs.Matrix object .
  *  info[3]: Number represent the number of rows of the right matrix.
  *  info[4]: Number represent the number of columns of the right matrix.
  *  info[5]: Buffer(object created by Float64Array) represent the right numjs.Matrix object .
  *  info[6]: Buffer(object created by Float64Array) for return value, which is the dot product of
  *           left matrix and right matrix.
*/
NAN_METHOD(MatMul){
	using CMd = Eigen::Map <const Eigen::MatrixXd >;
	using Md = Eigen::Map <Eigen::MatrixXd >;

	if (info.Length() < 7) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}

	if (!info[0]->IsUint32() || !info[1]->IsUint32() ||
		!info[3]->IsUint32() || !info[4]->IsUint32() ) {
		Nan::ThrowTypeError("Wrong arguments");
		return;
	}
	size_t rows1(info[0]->Uint32Value());
	size_t cols1(info[1]->Uint32Value());

	if (!info[2]->IsFloat64Array() || !info[5]->IsFloat64Array() || !info[6]->IsFloat64Array()) {
		Nan::ThrowTypeError("Wrong arguments - expected Float64Array");
		return;
	}
	
	double *data1 = *(Nan::TypedArrayContents<double>(info[2]));
	CMd first(data1, rows1, cols1);

	size_t rows2(info[3]->Uint32Value());
	size_t cols2(info[4]->Uint32Value());

	double *data2 = *(Nan::TypedArrayContents<double>(info[5]));

	CMd second(data2, rows2, cols2);

	double *resRawData = *(Nan::TypedArrayContents<double>(info[6]));

	Md res(resRawData, rows1, cols2);
	res = first * second;
	Local<Boolean> b = Nan::New(true);
	info.GetReturnValue().Set(b);
}



void Init(v8::Local<v8::Object> exports) {
	exports->Set(Nan::New("dot").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Dot)->GetFunction());
	exports->Set(Nan::New("inner").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Inner)->GetFunction());
	exports->Set(Nan::New("outer").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Outer)->GetFunction());
	exports->Set(Nan::New("cholesky").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Cholesky)->GetFunction());
	exports->Set(Nan::New("svd").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(SVD)->GetFunction());
	exports->Set(Nan::New("matrix_power").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(MatrixPower)->GetFunction());
	exports->Set(Nan::New("eye").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Eye)->GetFunction());
	exports->Set(Nan::New("identity").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Identity)->GetFunction());
	exports->Set(Nan::New("tri").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Tri)->GetFunction());
	exports->Set(Nan::New("tril").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Tril)->GetFunction());
	exports->Set(Nan::New("triu").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Triu)->GetFunction());
    exports->Set(Nan::New("inv").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Inverse)->GetFunction());
    exports->Set(Nan::New("det").ToLocalChecked(),	Nan::New<v8::FunctionTemplate>(Det)->GetFunction());
    exports->Set(Nan::New("trace").ToLocalChecked(),	Nan::New<v8::FunctionTemplate>(Trace)->GetFunction());
    exports->Set(Nan::New("matrix_rank").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(Rank)->GetFunction());
	exports->Set(Nan::New("get_eigen_values").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(GetEigenValues)->GetFunction());
	exports->Set(Nan::New("solve_linear_system_householder_qr").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(SolveLinearSystemHouseholderQr)->GetFunction());
	exports->Set(Nan::New("mat_mul").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(MatMul)->GetFunction());
}

NODE_MODULE(addon, Init)

