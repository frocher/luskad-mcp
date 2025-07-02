// Helper for GET requests with optional query
async function fetchFromApi(
  apiUrl: string,
  apiKey: string,
  path: string,
  query?: { key: string; value: string }[]
): Promise<any | null> {
  try {
    const url = new URL(`${apiUrl}${path}`);
    if (query && Array.isArray(query)) {
      for (const param of query) {
        url.searchParams.set(param.key, param.value);
      }
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

export async function fetchThroughput(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  startDate: string,
  endDate: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/throughput`, [
    { key: "start_date", value: startDate },
    { key: "end_date", value: endDate },
  ]);
}

export async function fetchBuildTime(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  startDate: string,
  endDate: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/build_time`, [
    { key: "start_date", value: startDate },
    { key: "end_date", value: endDate },
  ]);
}

export async function fetchCodingRules(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(
    apiUrl,
    apiKey,
    `/projects/${projectId}/coding_rules`,
    query ? [{ key: "q", value: query }] : undefined
  );
}

export async function fetchRisks(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(
    apiUrl,
    apiKey,
    `/projects/${projectId}/risks`,
    query ? [{ key: "q", value: query }] : undefined
  );
}

export async function fetchTasks(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(
    apiUrl,
    apiKey,
    `/projects/${projectId}/tasks`,
    query ? [{ key: "q", value: query }] : undefined
  );
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
