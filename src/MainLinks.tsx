import React from 'react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import {Cloud, MoodSmile, Share} from 'tabler-icons-react';
import {Link} from "react-router-dom";
import { useIsSignedIn } from "hooks";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    page?: string;
}

function MainLink({ icon, color, label, page }: MainLinkProps) {
    
    return (<Link to={"/" + page} style={{textDecoration: 'none'}}>
            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                <Group>
                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>

                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton></Link>
    );
}

const data = [
    { icon: <MoodSmile size={16}  />, color: 'teal', label: 'Jokes', page: 'jokes' },
    { icon: <Cloud size={16} />, color: 'blue', label: 'OneDrive', page: 'onedrive' },
    { icon: <Share size={16} />, color: 'green', label: 'Groups', page: 'groups' },
];

export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
}