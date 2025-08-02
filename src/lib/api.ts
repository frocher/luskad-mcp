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

/**
 * List all projects
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @returns A promise that resolves to the list of projects
 */
export async function listProjects(apiUrl: string, apiKey: string): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, "/projects");
}

/**
 * Fetch all contacts for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @returns A promise that resolves to the list of contacts
 */
export async function fetchContacts(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/contacts`);
}

/**
 * Fetch all coding rules for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @param query - The query string
 * @returns A promise that resolves to the list of coding rules
 */
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

/**
 * Fetch planning for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @returns A promise that resolves to the list of contacts
 */
export async function fetchPlanning(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/planning`);
}

/**
 * Fetch progress for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @param query - The query string
 * @returns A promise that resolves to the list of progress
 */
export async function fetchProgress(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  return fetchFromApi(
    apiUrl,
    apiKey,
    `/projects/${projectId}/progress`,
    query ? [{ key: "q", value: query }] : undefined
  );
}

/**
 * Fetch all risks for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @param query - The query string
 * @returns A promise that resolves to the list of risks
 */
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

/**
 * Fetch all tasks for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @param query - The query string
 * @returns A promise that resolves to the list of tasks
 */
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

/**
 * Fetch all team members for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @returns A promise that resolves to the list of team members
 */
export async function fetchTeamMembers(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/team_members`);
}

/**
 * Fetch all features for a project
 * @param apiUrl - The base URL of the API
 * @param apiKey - The API key
 * @param projectId - The ID of the project
 * @returns A promise that resolves to the list of features
 */
export async function fetchFeatures(
  apiUrl: string,
  apiKey: string,
  projectId: string
): Promise<any | null> {
  return fetchFromApi(apiUrl, apiKey, `/projects/${projectId}/features`);
}
