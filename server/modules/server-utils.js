const _ = require( 'lodash' )
class ServerUtils {
	attachedModels( app ) {
		return _.filter( app.models(), ( model ) => {
			return !_.isNull( model.dataSource )
		} )
	}

}
module.exports = new ServerUtils()