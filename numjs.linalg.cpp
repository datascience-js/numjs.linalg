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
  *  info[2]: Buffer(object created by smalloc) represent the left numjs.Matrix object .
  *  info[3]: Number represent the number of rows of the right matrix.
  *  info[4]: Number represent the number of columns of the right matrix.
  *  info[5]: Buffer(object created by smalloc) represent the right numjs.Matrix object .
  *  info[6]: Buffer(object created by smalloc) for return value, which is the dot product of
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
            Local<Object> rightBuffer = info[5].As<Object>();

            if (rightBuffer->HasIndexedPropertiesInExternalArrayData()) {
                double *refRightData = static_cast<double*>(rightBuffer->GetIndexedPropertiesExternalArrayData());
                size_t rowsRight(info[3]->Uint32Value());
                size_t colsRight(info[4]->Uint32Value());
                CMd rightMat(refRightData, rowsRight, colsRight);

                Local<Object> resBuffer = info[6].As<Object>();
                if (resBuffer->HasIndexedPropertiesInExternalArrayData()) {
                    double *refResData = static_cast<double*>(resBuffer->GetIndexedPropertiesExternalArrayData());
                    Md res(refResData, rowsRight, colsRight);
                    res = leftParam * rightMat;

                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
        }
    }
	else{
	    Local<Object> leftBuffer = info[2].As<Object>();
	    if (leftBuffer->HasIndexedPropertiesInExternalArrayData()) {
	        double *refLeftData = static_cast<double*>(leftBuffer->GetIndexedPropertiesExternalArrayData());
	        size_t rowsLeft(info[0]->Uint32Value());
            size_t colsLeft(info[1]->Uint32Value());
            CMd leftMat(refLeftData, rowsLeft, colsLeft);

            if(info[5]->IsNumber()){
                double rightParam(info[5]->NumberValue());
                Local<Object> resBuffer = info[6].As<Object>();
                if (resBuffer->HasIndexedPropertiesInExternalArrayData()) {
                    double *refResData = static_cast<double*>(resBuffer->GetIndexedPropertiesExternalArrayData());
                    Md res(refResData, rowsLeft, colsLeft);
                    res = leftMat * rightParam;
                    Local<Boolean> b = Nan::New(true);
                    info.GetReturnValue().Set(b);
                }
            }
            else{
                Local<Object> rightBuffer = info[5].As<Object>();
                if (rightBuffer->HasIndexedPropertiesInExternalArrayData()) {
                    double *refRightData = static_cast<double*>(rightBuffer->GetIndexedPropertiesExternalArrayData());
                	size_t rowsRight(info[3]->Uint32Value());
                    size_t colsRight(info[4]->Uint32Value());
                    CMd rightMat(refRightData, rowsRight, colsRight);

                    Local<Object> resBuffer = info[6].As<Object>();
                    if (resBuffer->HasIndexedPropertiesInExternalArrayData()) {
                        double *refResData = static_cast<double*>(resBuffer->GetIndexedPropertiesExternalArrayData());
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
  *  MatrixPower:
  *  Raise a square matrix to the (integer) power n.
  *
  *  arguments:
  *  info[0]: Buffer(object created by smalloc) represent the numjs.Matrix object to be "powered".
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Number m represent the exponent. Can be any integer or long integer, positive, negative, or zero.
  *  info[4]: Buffer(object created by smalloc) for return value(M**m).
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

    Local<Object> matrixBuffer = info[0].As<Object>();
    if (matrixBuffer->HasIndexedPropertiesInExternalArrayData()) {
        double *refMatrixData = static_cast<double*>(matrixBuffer->GetIndexedPropertiesExternalArrayData());
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());
        double expParam(info[3]->NumberValue());
        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

        Local<Object> resBuffer = info[4].As<Object>();
        if (resBuffer->HasIndexedPropertiesInExternalArrayData()) {
            double *refResData = static_cast<double*>(resBuffer->GetIndexedPropertiesExternalArrayData());
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
  *   Given a square matrix a, return the matrix ainv satisfying dot(a, ainv) = dot(ainv, a)
  *
  *  arguments:
  *  info[0]: Buffer(object created by smalloc) represent the numjs.Matrix object to be inverted.
  *           Must be square, i.e. M.rows == M.cols.
  *  info[1]: Number represent the number of rows of the matrix.
  *  info[2]: Number represent the number of columns of the matrix.
  *  info[3]: Buffer(object created by smalloc) for return value, inverse of the given matrix.
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

    Local<Object> matrixBuffer = info[0].As<Object>();
    if (matrixBuffer->HasIndexedPropertiesInExternalArrayData()) {
        double *refMatrixData = static_cast<double*>(matrixBuffer->GetIndexedPropertiesExternalArrayData());
        size_t rowsMatrix(info[1]->Uint32Value());
        size_t colsMatrix(info[2]->Uint32Value());

        Md inputMat(refMatrixData, rowsMatrix, colsMatrix);

        Local<Object> resBuffer = info[4].As<Object>();
        if (resBuffer->HasIndexedPropertiesInExternalArrayData()) {
            double *refResData = static_cast<double*>(resBuffer->GetIndexedPropertiesExternalArrayData());
            Md res(refResData, rowsMatrix, colsMatrix);
            res = inputMat.inverse();
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
  *  Det:
  *  Compute the determinant of an array.
  *
  *  arguments:
  *  info[0]: Buffer(object created by smalloc) represent the numjs.Matrix object to be inverted.
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

    Local<Object> matrixBuffer = info[0].As<Object>();
    if (matrixBuffer->HasIndexedPropertiesInExternalArrayData()) {
        double *refMatrixData = static_cast<double*>(matrixBuffer->GetIndexedPropertiesExternalArrayData());
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
  *  Rank:
  *  Return matrix rank of array using SVD method
  *  Rank of the array is the number of SVD singular values of the array that are greater than threshold(info[3]).
  *
  *  arguments:
  *  info[0]: Buffer(object created by smalloc) represent the numjs.Matrix object to be inverted.
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

    Local<Object> matrixBuffer = info[0].As<Object>();
    if (matrixBuffer->HasIndexedPropertiesInExternalArrayData()) {
        double *refMatrixData = static_cast<double*>(matrixBuffer->GetIndexedPropertiesExternalArrayData());
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
void Init(v8::Local<v8::Object> exports) {
	exports->Set(Nan::New("dot").ToLocalChecked(),
		Nan::New<v8::FunctionTemplate>(Dot)->GetFunction());
	exports->Set(Nan::New("matrix_power").ToLocalChecked(),
    		Nan::New<v8::FunctionTemplate>(MatrixPower)->GetFunction());
    exports->Set(Nan::New("inv").ToLocalChecked(),
        		Nan::New<v8::FunctionTemplate>(Inverse)->GetFunction());
    exports->Set(Nan::New("det").ToLocalChecked(),
            		Nan::New<v8::FunctionTemplate>(Det)->GetFunction());
    exports->Set(Nan::New("matrix_rank").ToLocalChecked(),
                		Nan::New<v8::FunctionTemplate>(Rank)->GetFunction());
}

NODE_MODULE(addon, Init)

