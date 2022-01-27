const { services } = require('../config');
const { GetMovie } = require('./requests')

module.exports = {
    getMovie : new GetMovie(services.GetMovie),
}