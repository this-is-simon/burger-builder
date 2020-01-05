import React from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

export const Layout = props => (
    <Aux>
        <Toolbar />
        <main className={styles.Content}>{props.children}</main>
    </Aux>
);

