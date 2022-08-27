import type { GhProfile, GhRepoArray } from '@/types/gh';

export interface GetGhResult {
  profile: GhProfile | null;
  repos: GhRepoArray;
}

const getGh = async (): Promise<GetGhResult> => {
  try {
    const dataArr = await Promise.all([
      await fetch('https://api.github.com/users/amir4rab'),
      await fetch('https://api.github.com/users/amir4rab/repos')
    ]);
    const [profile, repos] = await Promise.all([
      (await dataArr[0].json()) as GhProfile,
      (await dataArr[1].json()) as GhRepoArray
    ]);

    return {
      profile,
      repos: repos.sort((a, b) =>
        a.stargazers_count > b.stargazers_count
          ? -1
          : a.stargazers_count < b.stargazers_count
          ? 1
          : 0
      )
    };
  } catch (err) {
    console.error(`getGh: Failed to get data from github: err: `, err);
    return {
      profile: null,
      repos: []
    };
  }
};

export default getGh;
