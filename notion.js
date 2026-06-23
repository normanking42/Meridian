const NOTION_BASE = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

async function notionRequest(method, path, token, body = null) {
  const res = await fetch(`${NOTION_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export default async function handler(req, res) {
  // Allow requests from any origin (your Vercel deployment)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, token, dbId, pageId, properties } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing Notion token' });
  }

  try {
    let data;

    if (action === 'query') {
      if (!dbId) return res.status(400).json({ error: 'Missing dbId' });
      data = await notionRequest('POST', `/databases/${dbId}/query`, token, {});

    } else if (action === 'create') {
      if (!dbId || !properties) return res.status(400).json({ error: 'Missing dbId or properties' });
      data = await notionRequest('POST', '/pages', token, {
        parent: { database_id: dbId },
        properties,
      });

    } else if (action === 'update') {
      if (!pageId || !properties) return res.status(400).json({ error: 'Missing pageId or properties' });
      data = await notionRequest('PATCH', `/pages/${pageId}`, token, { properties });

    } else {
      return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    if (data.object === 'error') {
      return res.status(400).json({ error: data.message });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
