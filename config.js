const configuration = {
    mongodb :{
        url: process.env.DATABASE_URL
    },
    jwt: {
        secretKey: "PPI"
    },

}

module.exports = {
    configuration
}
