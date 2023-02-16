import { Joke } from "features/Jokes/types/Joke";
import { Providers } from "@microsoft/mgt-element";

export const postJokes = async (jokes: Joke[]) =>
{
    return await Providers.globalProvider.graph.client
        .api('/me/drive/special/approot/children/jokes.json/content')
        .put(JSON.stringify(jokes));
};

    