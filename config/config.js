if (process.env.NODE_ENV !== 'production') require('dotenv').config()


const config = {
    databaseUrl: "mongodb+srv://HannaGoldhammer:Hanna123@cluster0-kimns.mongodb.net/lasseslakrits?retryWrites=true&w=majority",
    key: "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"
}

module.exports = config;