import {Joke} from "../types/Joke";
import {useJokeStore} from "../stores/useJokeStore";
import {Card, Image, Text} from "@mantine/core";
import {People} from "@microsoft/mgt-react";

export const JokeCard = (props:{joke: Joke}) => {
    const {setSelected, selectedJoke} = useJokeStore();
    const {id, setup, punchline, image, sharedWith} = props.joke;

    const isSelected = selectedJoke?.id === id;
    const textColor = isSelected ? "blue" : "black";
    return <Card
        key={id}
        shadow="xl"
        radius="lg"
        withBorder
        m="md"
        p="xl"
        w={400}
        onClick={() => {
            console.log("set selected joke: " + id );
            return setSelected(props.joke);
        }}
    >
        <Card.Section>
            <Image
                src={image}
                height={100}
                alt="No way!"
            />
        </Card.Section>

        <Text color={textColor }
              size="lg"
              mt="md">
            {setup}
        </Text>

        <Text
            color={textColor }
            weight={450} size="lg" mt="md">
            {punchline}
        </Text>

        <People people={sharedWith} showPresence/>
    </Card>;
};
