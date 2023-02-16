import React, {useState} from 'react';
import {ColorScheme, ColorSchemeProvider, MantineProvider, Navbar} from "@mantine/core";
import {Brand} from "./Brand";
import {MainLinks} from "./MainLinks";
import {UserLogin} from './UserLogin';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Groups, Jokes, OneDrive} from './features';
import { useIsSignedIn } from "hooks";

function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const isSignedIn = useIsSignedIn();
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <div>
                    <Navbar className="aside" p="xs" width={{base: 300}}>
                        <Navbar.Section mt="xs">
                            <Brand/>
                        </Navbar.Section>
                        <Navbar.Section grow mt="md">
                            {isSignedIn && <MainLinks/>}
                        </Navbar.Section>
                        <Navbar.Section>
                            <UserLogin/>
                        </Navbar.Section>
                    </Navbar>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Jokes/>}/>
                            <Route path="/jokes" element={<Jokes/>}/>
                            <Route path="/onedrive" element={<OneDrive/>}/>
                            <Route path="/groups" element={<Groups/>}/>
                        </Routes>
                    </div>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
