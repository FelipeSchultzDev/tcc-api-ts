const variables = {
  Api: {
    port: process.env.port || 3001
  },
  Database: {
    connection: process.env.connection || 'mongodb://localhost/tcc'
  },
  Security: {
    secretKey: 'eusoqueromeformarlogo'
  }
}

export default variables
