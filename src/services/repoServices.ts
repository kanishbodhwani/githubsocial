import { getSecure } from "../utils/secureStorage";

export const getUserRepoDetails = async (username: string, repo: string) => {
  try {
    const accessToken = await getSecure("access_token");
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repository details. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("getUserRepoDetails error:", error.message);
    return null;
  }
};

export const getUserRepoReadme = async (username: string, repo: string, branch: string) => {
  try {
    const accessToken = await getSecure("access_token");
    const response = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3.raw",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch README.md. Status: ${response.status}`);
      return "No README.md found";
    }

    const readmeContent = await response.text();
    return readmeContent;
  } catch (error: any) {
    console.error("getUserRepoReadme error:", error.message);
    return "Error fetching README.md";
  }
};