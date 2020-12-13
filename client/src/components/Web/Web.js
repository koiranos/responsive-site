import React from 'react';
import Menu from '../Menu/Menu';
import Page from  '../Page/Page';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import PanelPage from '../PanelPage/PanelPage';
import PanelMenu from '../PanelMenu/PanelMenu';


export default class Web extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlePages = this.handlePages.bind(this);
    }

    handlePages = () => {
        this.props.getpages();
    }

    handleClick = (title, description) => {
        this.setState({
            title,
            description
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/page">
                        <Menu pages={this.props.pages} onclick = {this.handleClick} />
                        <Page title={this.state.title} description={this.state.description} />
                    </Route>
                    <Route path="/admin">
                        <PanelMenu handlepages={this.handlePages}/>
                        <PanelPage pages={this.props.pages} />
                    </Route>
                    <Route path="/">
                        <Menu pages={this.props.pages} onclick = {this.handleClick} getpages={this.handlePages} />
                        <Home />
                    </Route>
                </Switch>
            </div>
        )
    }
}