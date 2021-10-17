import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/global/Header/Header';
import Grid from '@material-ui/core/Grid';
import PageRender from './PageRender';
import { refreshToken } from './redux/actions/authAction';
import { getCategory } from './redux/actions/categoryAction';
import { getHomeBlogs } from './redux/actions/homeBlogsAction';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import SocketClient from './SocketClient';
import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work
import { API_URL } from './utils/config';
import { RootStore } from './utils/TypeScript';
moment.locale('vi');

const App = () => {
    const dispatch = useDispatch();
    const { callback } = useSelector((state: RootStore) => state);

    useEffect(() => {
        dispatch(refreshToken());
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHomeBlogs());
    }, [dispatch, callback]);

    useEffect(() => {
        const socket = io(API_URL);
        dispatch({ type: 'SOCKET', payload: socket });
        return () => {
            socket.close();
        };
    }, [dispatch]);

    return (
        <>
            <SocketClient />
            <Router>
                <Header />
                <Grid container style={{ padding: '0 40px', background: '' }}>
                    <Grid item xs={12}>
                        <Switch>
                            <Route exact path="/" component={PageRender} />
                            <Route exact path="/:page" component={PageRender} />
                            <Route exact path="/:page/:slug" component={PageRender} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </>
    );
};

export default App;
