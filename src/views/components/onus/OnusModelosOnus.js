import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Aside from '../design/layout/Aside';
import Footer from '../design/layout/Footer';
import ListaModelosOnus from './ListaModelosOnus';
import ListaOnus from './ListaOnus';

const OnusModelosOnus = () => {
    const location = useLocation();
    return (
    <>
    <div className="container">
        <Aside/>
        <main>
            <Card>
                <CardContent>
                <Tabs>
                    <TabList>
                    <Tab><i className='bx bx-hdd'></i> ONUS</Tab>
                    <Tab><i className="bx bx-category"></i> Modelos ONUS</Tab>
                    </TabList>
                    <TabPanel>
                    <ListaOnus location={location}/>
                    </TabPanel>
                    <TabPanel>
                    <ListaModelosOnus location={location}/>
                    </TabPanel>
                </Tabs>
                </CardContent>
            </Card>
    </main>
    <Footer/>
    </div>
    </>
    );
}
 
export default OnusModelosOnus;