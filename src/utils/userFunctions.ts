export const getExtractedData = async (data: any) => {
    const repos = await Promise.all(data.map(async (repo: any) => {
        const { forks_count, full_name, language, name, stargazers_count, description, contributors_url } = repo;
        const contributorAvatars = await getContributorAvatars(contributors_url);
        return { forks_count, full_name, language, name, stargazers_count, description, contributorAvatars };
    }));

    return repos;
}

const getContributorAvatars = async (contributors_url: string) => {
    // try {
    //     console.log("contributors_url", contributors_url);
    //     const arrayOfContributors = await fetch(contributors_url, {
    //         headers: {
    //             Accept: "application/vnd.github.v3+json",
    //         },
    //     });
    //     if (!arrayOfContributors.ok) {
    //         throw new Error(`Failed to fetch contributors: ${arrayOfContributors.statusText}`);
    //     }
    //     const arrayOfContributorsData = await arrayOfContributors.json();
    //     if (!Array.isArray(arrayOfContributorsData)) {
    //         throw new Error(`Unexpected data format for contributors: ${JSON.stringify(arrayOfContributorsData)}`);
    //     }
    //     const contributorAvatars = arrayOfContributorsData.map((contributor: any) => contributor.avatar_url);
    //     return contributorAvatars;
    // } catch (error: any) {
    //     console.error(`Error in getContributorAvatars: ${error.message}`);
    //     return [];
    // }
    return [];
}