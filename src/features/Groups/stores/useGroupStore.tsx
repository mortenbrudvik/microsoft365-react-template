import * as React from 'react';
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import { GroupItem } from '../types/GroupItem';
export interface GroupStore {
    sites: GroupItem[];
    teams: GroupItem[];
    addGroup: (group: GroupItem) => void;
    exists: (id?: string) => boolean;
}

export const useGroupStore = create(immer<GroupStore>((set, get) => ({
    sites: [],
    teams: [],
    addGroup: (group: GroupItem) => set((state) => {
        if(group.type === "sharepoint"){
            state.sites.push(group);
        } else if(group.type === "teams"){  
            state.teams.push(group);
        }
    }),
    exists: (id?: string) => {
        return get().sites.some(g => g.id === id) || get().teams.some(g => g.id === id);
    },
})));