import { getSecure } from "../utils/secureStorage";
import { getExtractedData } from "../utils/userFunctions";

export const getUser = async (username: string) => {
  try {
    const accessToken = await getSecure("access_token");
    const response = await fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("getUser error:", error.message);
    return null;
  }
};

export const getUserRepositories = async (username: string) => {
  try {
    const accessToken = await getSecure("access_token");
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const data = await response.json();
    const repos = await getExtractedData(data);
    return repos;
  } catch (error: any) {
    console.error("getUserRepositories error:", error.message);
    return [];
  }
};

export const getUserUsernameWithAccessToken = async (accessToken: string) => {
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const data = await response.json();
    return data.login;
  } catch (error: any) {
    console.error("getUserUsernameWithAccessToken error:", error.message);
    return null;
  }
};

export const getUserFollowers = async (username: string) => {
  try {
    const accessToken = await getSecure("access_token");
    const response = await fetch(`https://api.github.com/users/${username}/followers`, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("getUserFollowers error:", error.message);
    return [];
  }
};