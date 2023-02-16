import * as React from 'react';
import { useEffect } from "react";
import { Providers } from "@microsoft/mgt-element";
import { Site } from '@microsoft/microsoft-graph-types';
import { useGroupStore } from "./stores/useGroupStore";
import { Stack, Group, Text, Title } from '@mantine/core';
import { SiMicrosoftsharepoint, SiMicrosoftteams } from "react-icons/si";
import { getTeams } from "features/Groups/api/getTeams";
import { GroupItem } from "features/Groups/types/GroupItem";
import { getSites } from "features/Groups/api/getSites";

export const Groups = () => {
    
    const groupStore = useGroupStore();
    
    useEffect(() => {
        const fetchGroups = async () => {
            const teams = await getTeams();
            teams.forEach((group: GroupItem) => {
                if(!groupStore.exists(group.id)) {
                    groupStore.addGroup(group);
                }
            });
            
            const sites = await getSites();

            sites.forEach((site: GroupItem) => {
                if(!groupStore.exists(site.id)) {
                    groupStore.addGroup(site);
                }
            });
        }

        fetchGroups();
    }, []);
    
    return (
        <Stack>
            <Title order={3}>Groups</Title>
            <Stack spacing={6}>
                {groupStore.teams.map((team) => (
                    <Group spacing={8}>
                        <SiMicrosoftteams color="blue" size={20} />
                        <Text size={16} key={team.id}>{team.name}</Text>
                    </Group>
                ))}
                {groupStore.sites.map((site) => (
                    <Group spacing={8}>
                        <SiMicrosoftsharepoint color="green" size={20} />
                        <Text size={16} key={site.id}>{site.name}</Text>
                    </Group>
                ))}
            </Stack>
        </Stack>
    );
};