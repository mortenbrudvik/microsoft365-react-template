import { Providers } from "@microsoft/mgt-element";
import { Joke } from "features/Jokes/types/Joke";

export const getJokes = async () : Promise<Joke[]> =>
    await Providers.globalProvider.graph.client
        .api('/me/drive/special/approot/children/jokes.json/content')
        .get()