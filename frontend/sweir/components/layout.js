import CustomNavbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
    return (
        <React.Fragment>
            <Head>
                <title>Software Engineer in Residence</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

        <CustomNavbar/>
        {children}

        < Footer/>
        </React.Fragment>
    )
}