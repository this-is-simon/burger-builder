import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    render() {
        return (
            <Aux>
                <Toolbar/>
                <SideDrawer closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>{this.props.children}</main>
            </Aux>
        )
    };
}

export default Layout;