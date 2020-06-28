import React from 'react'; 
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
    return<>
        <Head>
            <title>head</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.1/antd.css"/>
        </Head>
        <AppLayout> 
            <div>hi next ...</div>
        </AppLayout>
    </>
   
}

export default Home;

