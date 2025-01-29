const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab');
    }

    return await response.json();
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    if (!username) {
      throw new Error("Invalid username provided");
    }

    console.log("Searching for:", username);

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      console.warn(`User "${username}" not found.`);
      return null; // Return null instead of throwing an error
    }

    if (!response.ok) {
      throw new Error(`Invalid API response: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("An error occurred:", err);
    return null;
  }
};

export { searchGithub, searchGithubUser };
