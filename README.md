# @pipeworx/mcp-uselessfacts

MCP server for random useless facts

## Tools

| Tool | Description |
|------|-------------|
| `random_fact` | Get a random useless (but interesting) fact |
| `today_fact` | Get today's useless fact of the day |

## Quickstart (Pipeworx Gateway)

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "random_fact",
      "arguments": {}
    }
  }'
```

## License

MIT
