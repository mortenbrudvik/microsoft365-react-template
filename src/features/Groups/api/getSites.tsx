import { GroupItem } from "features/Groups/types/GroupItem";
import { Providers } from "@microsoft/mgt-element";
import { Site } from "@microsoft/microsoft-graph-types";

export const getSites = async (): Promise<GroupItem[]> => {
        const domainData = await Providers.client?.api("/sites/root?$select=siteCollection").get();
        if(!domainData) return [];
        
        const domain = domainData.siteCollection.hostname.split(".")[0];
    
        const sites =  await Providers.client?.api("/sites?search=" + domain + ".sharepoint&$Select=id,name,displayName,webUrl").get();
    
        return sites.value.map((group: Site) => {
            return {
                id: group.id,
                type: "sharepoint",
                name: group.displayName ?? "",
                description: group.description ?? ""
            }
        });
    }
    