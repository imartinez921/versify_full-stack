import React from "react";

import ArtistIndexContainer from "../artists/artist_index_container";

const Home = ({ params, history, path }) => {
    // console.log('HOME PROPS', props)

    return (
        <div className="home">
            <div className="home-header">
                Your Versify
            </div>
            <ArtistIndexContainer params={params} history={history} path={path}/>
        </div>
    )
}

export default Home;