'use strict';

let SuperagentResponseBase = require( 'superagent/lib/response-base' ),
	mockDelay,
	mockError,
	mockResponse
// MockResponseBase = () => {
// 	return {
// 		status() {
// 			return this.status;
// 		},
// 		ok() {
// 			return this.ok;
// 		},
// 		body: {},
// 		get: jest.genMockFunction(),
// 		toError: jest.genMockFunction()
// 	}
// }
// SuperagentResponseBase( )


let Request = {
	post() {
		return this;
	},
	get() {
		return this;
	},
	send() {
		return this;
	},
	query() {
		return this;
	},
	field() {
		return this;
	},
	set() {
		return this;
	},
	accept() {
		return this;
	},
	timeout() {
		return this;
	},
	end: jest.genMockFunction().mockImplementation( function( callback ) {
		if( mockDelay ) {
			this.delayTimer = setTimeout( callback, 0, mockError, mockResponse );

			return;
		}

		callback( mockError, mockResponse );
	} ),
	//expose helper methods for tests to set
	__setMockDelay( boolValue ) {
		mockDelay = boolValue;
	},
	__setMockResponse( status, body, error ) {
		mockResponse = new SuperagentResponseBase(
			{
				get: jest.genMockFunction(),
				toError: jest.genMockFunction()
			}
		)
		mockError = error
		mockResponse.body = body
		mockResponse._setStatusProperties( status )
	},
	__setMockError( mockErr ) {
		mockError = mockErr;
	}
};

module.exports = Request;