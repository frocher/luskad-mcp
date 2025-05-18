const LUSKAD_API_BASE_URL = "https://app.luskad.com/api/v1";

export async function listProjects(apiKey: string): Promise<any | null> {
  try {
    const url = new URL(`${LUSKAD_API_BASE_URL}/projects`);
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
  projectId: string,
  query: string | undefined,
  apiKey: string
): Promise<any | null> {
  try {
    const url = new URL(`${LUSKAD_API_BASE_URL}/projects/${projectId}/coding_rules`);
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
