import getGh, { GetGhResult } from './getGh';

const getTotalCommits = async () => {
  try {
    const commitsStats = await fetch(
      'https://api.github.com/search/commits?q=author:amir4rab'
    );

    const { total_count } = (await commitsStats.json()) as {
      total_count: number;
      incomplete_results: boolean;
      items: unknown[];
    };

    return total_count;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export interface GhStats {
  total: number;
  totalRepos: number;
  followers: number;
  following: number;
  rawData: GetGhResult;
}

/** Fetches github stats for selected user */
const getGhStats = async (): Promise<GhStats> => {
  const [total, stats] = await Promise.all([getTotalCommits(), getGh()]);

  return {
    total,
    totalRepos: stats.repos.length,
    followers: stats.profile === null ? 0 : stats.profile.followers,
    following: stats.profile === null ? 0 : stats.profile.following,
    rawData: stats
  };
};

export default getGhStats;
