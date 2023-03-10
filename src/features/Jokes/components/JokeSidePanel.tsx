import {useJokeStore} from "../stores/useJokeStore";
import {useClickOutside} from "@mantine/hooks";
import { Affix, Button, Paper, Stack, Text } from "@mantine/core";
import {PeoplePicker, PersonType} from "@microsoft/mgt-react";

export const JokeSidePanel = ({jokeId}: { jokeId: string }) => {
    const jokeStore = useJokeStore();
    const ref = useClickOutside(() => jokeStore.setSelected(undefined));

    const joke = jokeStore.jokes.find(j => j.id === jokeId);
    if (!joke) return <></>;
    const {sharedWith} = joke!;
    return <Affix position={{top: 50, right: 50}}>
        <Paper shadow="xs" p="md" w={400} ref={ref}>
            <Stack>
                <Text weight={550} size="lg" mt={0} mb={0} pb={0}>Share with</Text>

                <PeoplePicker
                    selectionMode="multiple"
                    type={PersonType.any}
                    selectedPeople={sharedWith}
                    selectionChanged={(e: any) => {
                        jokeStore.shareWith(joke, e.target.selectedPeople);
                    }}
                />
                
                <Button w={150} onClick={()=> {
                  jokeStore.delete(joke);
                }}>Delete</Button>
            </Stack>
        </Paper></Affix>
};
