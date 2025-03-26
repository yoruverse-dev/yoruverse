import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TIMEOUT = 2000;

const query = `
query Page($perPage: Int, $page: Int) {
  Page(perPage: $perPage, page: $page) {
    characters {
      id
      name {
        full
      }
      favourites
      media {
            nodes {
                title {
                romaji
                }
            }
        }
      image {
          large
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}`;

const variables = {
    perPage: 50,
    page: 372,
};

async function fetchData() {
    let hasNextPage = true;

    do {
        const data = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!data.ok) {
            console.log(await data.json());
            throw new Error(`HTTP error! status: ${data.status}`);
        }

        const json = await data.json();
        const characters = json.data.Page.characters;

        const pageInfo = json.data.Page.pageInfo;
        hasNextPage = pageInfo.hasNextPage;

        variables.page += 1;
        // Simulate a delay for the next request

        const mappedCharacters = characters.map((character: any) => ({
            name: character.name.full,
            favourites: character.favourites,
            image: character.image.large,
            media: character.media.nodes.map((media: any) => media.title.romaji),
        }));

        await supabase.from('characters').insert(mappedCharacters).select();

        console.log('Inserted characters:', mappedCharacters.length);
        console.log('Page:', variables.page - 1);
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT));
    } while (hasNextPage);
}

fetchData().then(() => {
    console.log('All data fetched successfully!');
});