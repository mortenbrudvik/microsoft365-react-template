import * as React from 'react';
import {FileList} from '@microsoft/mgt-react';
import {Breadcrumbs, Stack, Title} from "@mantine/core";
import {useState} from "react";
import {DriveItem} from '@microsoft/microsoft-graph-types';

export const OneDrive = () => {
    const [folderId, setFolderId] = useState('root');
    const [breadcrumbs, setBreadcrumbs] = useState<DriveItem[]>([]);

    const handleItemClick = (event: CustomEvent) => {
        const item = event.detail as DriveItem;
        if (item.folder) {
            setFolderId(item.id!);
            setBreadcrumbs([...breadcrumbs, item]);
        }
    };

    const handleBreadcrumbClick = (item: DriveItem) => {
        setFolderId(item.id!);
        setBreadcrumbs(breadcrumbs.slice(0, breadcrumbs.indexOf(item) + 1));
    };

    return (
        <Stack w={500}>
            <Title order={3}>OneDrive</Title>
            <Breadcrumbs>
                <a href="#" onClick={() => handleBreadcrumbClick({ id: 'root' })}>
                    Home
                </a>
                {breadcrumbs.map((item) => (
                    <a key={item.id} href="#" onClick={() => handleBreadcrumbClick(item)}>
                        {item.name}
                    </a>
                ))}
            </Breadcrumbs>
            <FileList itemId={folderId} itemClick={(e) => {
                handleItemClick(e as CustomEvent);
            }}/>
        </Stack>
    );
};