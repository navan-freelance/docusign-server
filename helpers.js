const createRequestHandler = (asyncFunction) => {
  return async (request, response) => {
    try {
      await asyncFunction(request, response)
    } catch (error) {
      console.warn(error)
      response.status(500).send(error.message)
    }
  }
}

const getBaseURL = (accountID, baseURI) => {
  return `${baseURI}/restapi/v2.1/accounts/${accountID}`
}

module.exports = {createRequestHandler, getBaseURL}
