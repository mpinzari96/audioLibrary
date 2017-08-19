class Logger {
  constructor( user ) {
    this.user = user;
  }

  error( message, err ) {
    console.log( err )
  }
}
export default Logger
