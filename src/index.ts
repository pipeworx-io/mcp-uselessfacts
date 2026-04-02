/**
 * Uselessfacts MCP — wraps uselessfacts.jsph.pl API (free, no auth)
 *
 * Tools:
 * - random_fact: Get a random useless fact
 * - today_fact: Get today's useless fact
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://uselessfacts.jsph.pl/api/v2';

type UselessFact = {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
};

function formatFact(data: UselessFact) {
  return {
    id: data.id,
    fact: data.text,
    source: data.source,
    source_url: data.source_url,
    permalink: data.permalink,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_fact',
    description: 'Get a random useless (but interesting) fact.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'today_fact',
    description: "Get today's useless fact of the day.",
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

async function callTool(name: string, _args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_fact':
      return randomFact();
    case 'today_fact':
      return todayFact();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomFact() {
  const res = await fetch(`${BASE_URL}/facts/random?language=en`);
  if (!res.ok) throw new Error(`Useless Facts error: ${res.status}`);

  const data = (await res.json()) as UselessFact;
  return formatFact(data);
}

async function todayFact() {
  const res = await fetch(`${BASE_URL}/facts/today?language=en`);
  if (!res.ok) throw new Error(`Useless Facts error: ${res.status}`);

  const data = (await res.json()) as UselessFact;
  return formatFact(data);
}

export default { tools, callTool } satisfies McpToolExport;
