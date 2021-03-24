import React, { Fragment } from 'react'

import {
    Switch,
    useRouteMatch,
    Route,
    useParams,
    useLocation
} from "react-router-dom";

import { Navbars } from '../../components';
import { Home,AddEvent, ListEvent } from '../../components/molecules';

const Main = () => {

    let { path, url } = useRouteMatch();

    return (
        <Fragment>
            <Navbars />

            <Switch>
                <Route exact path={`${path}`} component={Home} />
                <Route exact path={`${path}:topicId`} component={MainContent} />
            </Switch>

        </Fragment>
    )
}

const MainContent =()=> {
    let { topicId } = useParams();
    let { path, url } = useRouteMatch();
    let location = useLocation();
    console.log("location Maincontain", location);

    console.log('parameter topicId', topicId);
    console.log("path di home Tes", path);
    console.log("url di home Tes", url);

    if (location.pathname === "/") {
        return(
            <Home />
        );
    }
    else if (location.pathname === "/list-event") {
        return(
            <ListEvent />
        );
    }
    else if (location.pathname === "/add-event") {
        return(
            <AddEvent />
        );
    }
    else{
        return (
            <div>
            <h3>{topicId} Pages Not Found</h3>
            </div>
        );
    }
}

export default Main
