import { Button, Stack, ScrollArea, Title } from '@mantine/core';
import {useJokeStore} from "../stores/useJokeStore";
import { createJoke } from '../api/createJoke';
import { useScrollIntoView } from "@mantine/hooks";
import { JokeCard } from './JokeCard';
import { JokeSidePanel } from './JokeSidePanel';
import * as React from "react";
import { postJokes } from "features/Jokes/api/postJokes";
import { useEffect } from "react";
import { getJokes } from "features/Jokes/api/getJokes";

export const Jokes = () => {
    const {targetRef, scrollIntoView} = useScrollIntoView<HTMLDivElement>()
    const [isLoading, setIsLoading] = React.useState(true);
    const jokeStore = useJokeStore();
    
    useEffect(() => {
        const fetchJokes = async () => {
            console.log("Fetching jokes");
            jokeStore.clear();
            
            const jokes = await getJokes();
            console.log(jokes);
            jokes.forEach(joke => jokeStore.addJoke(joke));
            setIsLoading(false);
            
        };
        
        fetchJokes();
    }, []);
    
    useEffect(() => {
        (async () => {
            console.log("Posting jokes");
            await postJokes(jokeStore.jokes);
        }
        )();
    }, [jokeStore.jokes]);
    
    if(isLoading) return (<div>Loading...</div>);

    // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    return (
        <Stack>
            <Title order={3}>Jokes</Title>
            
            <ScrollArea >
                <Stack mb={25}>
                    {jokeStore.jokes.map(joke => (
                        <JokeCard joke={joke}/>
                    ))}
                </Stack>
            </ScrollArea>
                <Button mt={15} onClick={async () => {
                    const joke = await createJoke('nature');
                    jokeStore.addJoke(joke);
                    console.log('Joke created: ' + joke.id);
                    
                    scrollIntoView();
                }}>
                    Create Joke
                </Button>
                <div ref={targetRef}/>

            { jokeStore.selectedJoke && <JokeSidePanel jokeId={jokeStore.selectedJoke.id} />}
        </Stack>
    );
};


