const GITHUB_API = "https://api.github.com";

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function commitJsonToRepo({
  owner,
  repo,
  token,
  path: filePath,
  content,
  message,
}: {
  owner: string;
  repo: string;
  token: string;
  path: string;
  content: unknown;
  message: string;
}) {
  const fullPath = `repos/${owner}/${repo}/contents/${filePath}`;

  const getRes = await fetch(`${GITHUB_API}/${fullPath}?ref=main`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  let sha: string | undefined;
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const body = {
    message,
    content: utf8ToBase64(JSON.stringify(content, null, 2)),
    branch: "main",
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(`${GITHUB_API}/${fullPath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${err}`);
  }

  return res.json();
}

export async function getRepoSha({
  owner,
  repo,
  token,
  path: filePath,
}: {
  owner: string;
  repo: string;
  token: string;
  path: string;
}) {
  const fullPath = `repos/${owner}/${repo}/contents/${filePath}`;
  const res = await fetch(`${GITHUB_API}/${fullPath}?ref=main`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.sha as string | undefined;
}
