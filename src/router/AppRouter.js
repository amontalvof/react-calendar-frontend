import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login">
                        <LoginScreen />
                    </Route>
                    <Route exact path="/">
                        <CalendarScreen />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
