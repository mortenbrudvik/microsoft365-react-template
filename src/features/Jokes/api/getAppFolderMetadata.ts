import { Providers } from "@microsoft/mgt-element";

export const getAppFolderMetadata = async () =>
    await Providers.globalProvider.graph.client
        .api('/me/drive/special/approot')
        .get();