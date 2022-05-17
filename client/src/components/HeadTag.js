import React from "react";
import { Helmet } from "react-helmet";

export const HeadTag = () => {
    return (
        <Helmet>
            <title>Content Server</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Helmet>
    )
}