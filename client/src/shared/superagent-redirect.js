/**
 * Wraps Superagent
 * @param  {Object} superagent
 * @param  {String} type
 * @return {void}
 */
function redirect( handler ) {
    return function( request ) {
        var end = request.end;
        request.end = function( cb ) {
            return end.call(this, ( err, res ) => {
                if (err && err.status === 401) {
                    return handler()
                }

                if (typeof cb !== 'function') return;
                cb(err, res)
            });
        };
        return request;
    };
}

module.exports = redirect;
