const axios = require('axios')
const cors = require('cors')
const express = require('express')

const {createRequestHandler, getBaseURL} = require('./helpers')

const DOCUSIGN_URI = 'https://account-d.docusign.com'

const server = express()
server.use(cors())
server.use(express.json())

server.post(
  '/docusign/authorization',
  createRequestHandler(async (request, response) => {
    const {body} = request

    const {data} = await axios.post(
      `${DOCUSIGN_URI}/oauth/token`,
      {
        code: body.code,
        grant_type: 'authorization_code'
      },
      {
        headers: {
          Authorization: `Basic ${body.authorization}`,
          'Content-Type': 'application/json'
        }
      }
    )
    response.json(data)
  })
)

server.post(
  '/user',
  createRequestHandler(async (request, response) => {
    const {body} = request

    const {data} = await axios.get(`${DOCUSIGN_URI}/oauth/userinfo`, {
      headers: {
        Authorization: `Bearer ${body.access_token}`,
        'Content-Type': 'application/json'
      }
    })
    response.json(data)
  })
)

server.post(
  '/folders',
  createRequestHandler(async (request, response) => {
    const {body} = request

    const baseURL = getBaseURL(body.account_id, body.base_uri)
    const {data} = await axios.get(`${baseURL}/folders`, {
      headers: {
        Authorization: `Bearer ${body.access_token}`
      }
    })
    response.json(data)
  })
)

server.post(
  '/groups',
  createRequestHandler(async (request, response) => {
    const {body} = request

    const baseURL = getBaseURL(body.account_id, body.base_uri)
    const {data} = await axios.get(`${baseURL}/groups`, {
      headers: {
        Authorization: `Bearer ${body.access_token}`
      }
    })
    response.json(data)
  })
)

server.listen(5000)
