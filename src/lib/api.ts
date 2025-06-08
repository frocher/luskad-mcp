// Helper for GET requests with optional query
async function fetchFromApi(
  apiUrl: string,
  apiKey: string,
  path: string,
  query?: string
): Promise<any | null> {
  try {
    const url = new URL(`${apiUrl}${path}`);
    if (query) {
      url.searchParams.set("q", query);
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch ${path}: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
}

export async function listProjects(apiUrl: string, apiKey: string): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, "/projects");
}

export async function fetchCodingRules(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/coding_rules`, query);
}

export async function fetchRisks(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/risks`, query);
}

export async function fetchTasks(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/tasks`, query);
}

export async function fetchTeamMembers(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/team_members`);
}

export async function fetchFeatures(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/features`);
}
