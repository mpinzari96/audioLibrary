import OIDCClient from './../utils/oidc-client'
class AppAuthManager {
    static signIn( token, nextPath ) {
        let client
        if (!token) {
            client = OIDCClient();
        } else {
            client = OIDCClient( {acr_values: `otac:${token}`} );
        }
        client.createSigninRequest().then( req => {
            window.location = req.url;
        } ).catch( function( err ) {
            //TODO:  Re-direct to error page
            console.log( err );
        } );
    }

    static signOut( idToken ) {
        let client = OIDCClient()
        client.createSignoutRequest( idToken )
            .then( req => {
                window.location = req.url;
            } )
            .catch( e => {
                console.log( e )
            } )
    }
}
export default AppAuthManager;
