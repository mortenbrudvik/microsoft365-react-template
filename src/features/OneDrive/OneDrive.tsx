import * as React from 'react';
import {FileList} from '@microsoft/mgt-react';
import {Stack, Title} from "@mantine/core";
import {useState} from "react";
import {DriveItem} from '@microsoft/microsoft-graph-types';

export const OneDrive = () => {
    const [folderId, setFolderId] = useState('root');

    const handleItemClick = (event: CustomEvent) => {
        const item = event.detail as DriveItem;
        if (item.folder) {
            setFolderId(item.id!);
        }
    };

    return (
        <Stack w={500}>
            <Title order={3}>OneDrive</Title>
            <FileList itemId={folderId} itemClick={(e) => {
                handleItemClick(e as CustomEvent);
            }}/>
        </Stack>
    );
};