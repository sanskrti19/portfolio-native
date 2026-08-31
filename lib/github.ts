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
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getGithubData(username: string): Promise<GithubData | null> {
  try {
    const [profile, repositories] = await Promise.all([
      fetchGithub<GithubUserResponse>(`/users/${encodeURIComponent(username)}`),
      fetchGithub<GithubRepositoryResponse[]>(
        `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
      ),
    ]);

    return {
      publicRepositoryCount: profile.public_repos,
      repositories: repositories.slice(0, 6).map((repository) => ({
        name: repository.name,
        url: repository.html_url,
        description: repository.description,
        stars: repository.stargazers_count,
        language: repository.language,
        updatedAt: repository.updated_at,
      })),
    };
  } catch (error) {
    console.error("Failed to load GitHub profile data:", error);
    return null;
  }
}
