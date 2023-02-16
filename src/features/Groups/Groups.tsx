import * as React from 'react';
import {useEffect} from "react";
import {Providers} from "@microsoft/mgt-element";
import {Group, Site} from '@microsoft/microsoft-graph-types';
import {useGroupStore} from "./stores/useGroupStore";

export const Groups = () => {
    
    const groupStore = useGroupStore();
    
    useEffect(() => {
        const fetchGroups = async () => {
            const graphClient = Providers.globalProvider.graph.client;

            // Fetch Microsoft Teams groups
            const teamsResult = await graphClient
                .api('/me/joinedTeams')
                .select('id,displayName,description')
                .get();

            teamsResult.value.forEach((group: Group) => {
                if(groupStore.exists(group.id)) {
                    return;
                }
                groupStore.addGroup({
                    id: group.id,
                    type: "teams",
                    name: group.displayName ?? "",
                    description: group.description ?? ""
                });
            });

            // Fetch SharePoint groups
            const domainData = await Providers.client?.api("/sites/root?$select=siteCollection").get();
            if(!domainData) return null;
            const domain = domainData.siteCollection.hostname.split(".")[0];

            const sites =  await Providers.client?.api("/sites?search=" + domain + ".sharepoint&$Select=id,name,displayName,webUrl").get();

            sites.value.forEach((group: Site) => {
                if(groupStore.exists(group.id)) {
                    return;
                }
                groupStore.addGroup({
                    id: group.id,
                    type: "sharepoint",
                    name: group.displayName ?? "",
                    description: group.description ?? ""
                });
            });
        }

        fetchGroups();
    }, []);
    
    return (
        <div>
            <h2>Microsoft Teams groups:</h2>
            <ul>
                {groupStore.teams.map((team) => (
                    <li key={team.id}>
                        {team.name} ({team.description})
                    </li>
                ))}
            </ul>
            <h2>SharePoint groups:</h2>
            <ul>
                {groupStore.sites.map((group) => (
                    <li key={group.id}>
                        {group.name} ({group.description})
                    </li>
                ))}
            </ul>
        </div>
    );
};