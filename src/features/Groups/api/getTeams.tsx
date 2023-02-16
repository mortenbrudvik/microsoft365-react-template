import { Providers } from "@microsoft/mgt-element";
import { Group } from "@microsoft/microsoft-graph-types";
import { GroupItem } from "features/Groups/types/GroupItem";

export const getTeams = async (): Promise<GroupItem[]> => {

    const graphClient = Providers.globalProvider.graph.client;

    const teamsResult = await graphClient
        .api('/me/joinedTeams')
        .select('id,displayName,description')
        .get();

    return teamsResult.value.map((group: Group) => {
        return {
            id: group.id,
            type: "teams",
            name: group.displayName ?? "",
            description: group.description ?? ""
        }
    });
}
    