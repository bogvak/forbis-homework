import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Bitcoin from "src/components/Bitcoin";
import Analyses from "src/components/Analyses";
import "./App.scss";

const App: React.FC = () => (
    <Router>
        <div className="main-app">
            <div className="main-app-menu">
                <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left py-4 px-6 bg-white shadow sm:items-baseline w-full">
                    <Link to="/">Home</Link>
                    <Link to="/currencies">Bitcoin</Link>
                    <Link to="/analysis">Analysis</Link>
                </nav>
            </div>
            <div className="page-container">
                <Switch>
                    <Route path="/currencies">
                        <Bitcoin />
                    </Route>
                    <Route path="/analysis">
                        <Analyses />
                    </Route>
                    <Route path="/">
                        <div>Test task for Forbis frontend dev position applying</div>
                    </Route>
                </Switch>
            </div>
        </div>
    </Router>
);

export default App;
