import React, { Component } from 'react';  
import Head from 'next/head';
import AppLayout from '../components/AppLayout';


const profile = () => { 
        return<>
            <Head>
                <title>head</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout>
                <div>
                    프로필~
                </div>
            </AppLayout>
        </> 
}

export default profile;