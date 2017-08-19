let request = require( 'superagent-use' )( require( 'superagent' ) );
let redirect = require( './superagent-redirect' );
request.use( redirect( () => {
	//localStorage.setItem( "nextPath", window.location.hash.split( '#' )[ 1 ] )
	window.location.href = '#/auth?clear=true'
} ) );

export default class ResourceBase {

	constructor( model ) {
		this.request = request
		this.model = model
		this.apiResource = (model.__name__.toLowerCase()) + "s"
	}

	getAll( token ) {
		return new Promise( ( resolve, reject ) => {
			request
				.get( `API_BASE_URL/api/${this.apiResource}` )
				.set( 'api-key', 'Bearer ' + token )
				.end( ( error, res ) => {
					error ? reject( error ) : resolve( res.body );
				} )
		} );
	}

	find( token, filter ) {
		return new Promise( ( resolve, reject ) => {
			request
				.get( `API_BASE_URL/api/${this.apiResource}` )
				.query( filter ? filter : {} )
				.set( 'api-key', 'Bearer ' + token )
				.end( ( error, res ) => {
					error ? reject( error ) : resolve( res.body );
				} )
		} );
	}

	getById( token, modelId ) {
		return new Promise( ( resolve, reject ) => {
			request
				.get( `API_BASE_URL/api/${this.apiResource}/${modelId}` )
				.set( 'api-key', 'Bearer ' + token )
				.end( ( error, res ) => {
					error ? reject( error ) : resolve( res.body );
				} )
		} );
	}


	post( token, modelJSON ) {
		return new Promise( ( fulfill, reject ) => {
			request
				.post( `API_BASE_URL/api/${this.apiResource}` )
				.set( 'api-key', 'Bearer ' + token )
				.send( modelJSON )
				.end( ( err, res ) => {
					if( err ) reject( err )
					fulfill( res )
				} )
		} )
	}

	postRelation( token, modelId, relation, modelJSON ) {
		return new Promise( ( fulfill, reject ) => {
			request
				.post( `API_BASE_URL/api/${this.apiResource}/${modelId}/${relation}` )
				.set( 'api-key', 'Bearer ' + token )
				.send( modelJSON )
				.end( ( err, res ) => {
					if( err ) reject( err )
					fulfill( res )
				} )
		} )
	}

	patch( token, modelId, modelJSON ) {
		return new Promise( ( fulfill, reject ) => {
			request
				.patch( `API_BASE_URL/api/${this.apiResource}/${modelId}` )
				.set( 'api-key', 'Bearer ' + token )
				.send( modelJSON )
				.end( ( err, res ) => {
					if( err ) reject( err )
					fulfill( res )
				} )
		} )
	}
}