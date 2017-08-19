import Oidc from 'oidc-client'
import _ from 'lodash'

const defaults = {
	client_id: 'skytcadmin',
	authority: 'SS_AUTH_URL',
	response_type: 'id_token token',
	scope: 'read write profile openid skyslope primeapi',
	redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/#/callback?`,
	post_logout_redirect_uri: "/#/loggedout"
};

let OIDCClient = function( config ) {
	config = config || {}
	return new Oidc.OidcClient( _.defaults( config, defaults ) )

}
export default OIDCClient


