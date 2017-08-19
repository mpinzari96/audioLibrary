'use strict'

const grunt = require('grunt'),
    execSh = require('exec-sh'),
    path = require('path')

module.exports = (options) => {
    grunt.registerTask("db-clean", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("flyway\\windows\\flyway clean -user=aqbxuser -password=verysecret -url=jdbc:postgresql://192.168.99.100:5432/aqbx", {cwd: path.join(__dirname, "../../skyslope-aqbx-database")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    console.log("Database clean (Meaning all data is gone)")
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-migrate", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("flyway\\windows\\flyway migrate -user=aqbxuser -password=verysecret -url=jdbc:postgresql://192.168.99.100:5432/aqbx", {cwd: path.join(__dirname, "../../skyslope-aqbx-database")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-info", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("flyway\\windows\\flyway info -user=aqbxuser -password=verysecret -url=jdbc:postgresql://192.168.99.100:5432/aqbx", {cwd: path.join(__dirname, "../../skyslope-aqbx-database")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-import-validate", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("node database//loopback-script-runner.js validate integ", {cwd: path.join(__dirname, "../")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-import-validate-production", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("node database//loopback-script-runner.js validate integ", {cwd: path.join(__dirname, "../")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-import-process", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("node database//loopback-script-runner.js process integ", {cwd: path.join(__dirname, "../")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })
    grunt.registerTask("db-import-process-production", function () {
        let done = this.async()
        return new Promise(
            (resolve, reject) => {
                execSh("node database//loopback-script-runner.js process integ", {cwd: path.join(__dirname, "../")}, function (err) {
                    if (err) {
                        console.log("Exit code: ", err.code);
                        reject(err)
                    }
                    resolve()
                })

            })
            .then(
                () => {
                    done()
                })
    })


}

