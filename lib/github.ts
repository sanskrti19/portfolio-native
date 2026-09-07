const GITHUB_API_URL = "https://api.github.com";

type GithubUserResponse = {
  public_repos: number;
};

type GithubRepositoryResponse = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export type GithubRepository = {
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  updatedAt: string;
};

export type GithubData = {
  publicRepositoryCount: number;
  repositories: GithubRepository[];
};

async function fetchGithub<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${GITHUB_API_URL}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API responded with ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("GitHub API error:", error);

    throw new Error(
      `Failed to fetch GitHub data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

 export async function getGithubData(
  username: string
): Promise<GithubData | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`
    );

    console.log("GITHUB STATUS:", response.status);
    console.log("GITHUB URL:", response.url);

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const profile = await response.json();

    console.log("GITHUB PROFILE:", profile);

    return {
      publicRepositoryCount: profile.public_repos,
      repositories: [],
    };
  } catch (error) {
    console.error("GITHUB FETCH FAILED:", error);
    return null;
  }
}
