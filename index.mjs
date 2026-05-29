#!/usr/bin/env node

// Thivi MCP Server — thin client that proxies to the Thivi API
// Usage: THIVI_URL=https://thivi.net THIVI_TOKEN=pat_xxx npx thivi-mcp

const THIVI_URL = process.env.THIVI_URL || 'https://thivi.net'
const THIVI_TOKEN = process.env.THIVI_TOKEN

if (!THIVI_TOKEN) {
  process.stderr.write('Error: THIVI_TOKEN environment variable is required.\n')
  process.stderr.write('Create a token at: ' + THIVI_URL + '/preferences → API Tokens\n')
  process.exit(1)
}

const headers = { Authorization: `Bearer ${THIVI_TOKEN}`, 'Content-Type': 'application/json' }

async function apiCall(method, path, body) {
  const opts = { method, headers }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(`${THIVI_URL}/api${path}`, opts)
  return res.json()
}

// JSON-RPC over stdio
let buffer = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', chunk => {
  buffer += chunk
  const lines = buffer.split('\n')
  buffer = lines.pop()
  for (const line of lines) {
    if (line.trim()) handleMessage(JSON.parse(line.trim()))
  }
})

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n')
}

async function handleMessage(msg) {
  const { method, params, id } = msg

  if (method === 'initialize') {
    return send({ jsonrpc: '2.0', id, result: { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'thivi', version: '1.0.0' } } })
  }

  if (method === 'notifications/initialized') return

  if (method === 'tools/list') {
    const result = await apiCall('POST', '/mcp/message', { method: 'tools/list', params: {}, id })
    return send({ jsonrpc: '2.0', id, result: result.result })
  }

  if (method === 'tools/call') {
    const result = await apiCall('POST', '/mcp/message', { method: 'tools/call', params, id })
    return send({ jsonrpc: '2.0', id, result: result.result || result })
  }

  if (method === 'resources/list') {
    const result = await apiCall('POST', '/mcp/message', { method: 'resources/list', params: {}, id })
    return send({ jsonrpc: '2.0', id, result: result.result })
  }

  send({ jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found' } })
}

process.stderr.write(`Thivi MCP server started (${THIVI_URL})\n`)
