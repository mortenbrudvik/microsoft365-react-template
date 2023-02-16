import { Button, Stack, ScrollArea } from '@mantine/core';
import {useJokeStore} from "../stores/useJokeStore";
import { createJoke } from '../api/createJoke';
import { useScrollIntoView } from "@mantine/hooks";
import { JokeCard } from './JokeCard';
import { JokeSidePanel } from './JokeSidePanel';

export const Jokes = () => {
    const {targetRef, scrollIntoView} = useScrollIntoView<HTMLDivElement>()
    const jokeStore = useJokeStore();

    // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    return (
        <>
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
                    scrollIntoView();
                }}>
                    Create Joke
                </Button>
                <div ref={targetRef}/>

            { jokeStore.selectedJoke && <JokeSidePanel jokeId={jokeStore.selectedJoke.id} />}
        </>
    );
};


