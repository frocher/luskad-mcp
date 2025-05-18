

export async function listProjects(apiUrl: string, apiKey: string): Promise<any | null> {
  try {
    const url = new URL(`${apiUrl}/projects`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to list projects: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error listing projects:", error);
    return null;
  }
}

export async function fetchCodingRules(
  apiUrl: string,
  apiKey: string,
  projectId: string,
  query: string | undefined
): Promise<any | null> {
  try {
    const url = new URL(`${apiUrl}/projects/${projectId}/coding_rules`);
    if (query) {
      url.searchParams.set("q", query);
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch coding rules: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching coding rules:", error);
    return null;
  }
}
