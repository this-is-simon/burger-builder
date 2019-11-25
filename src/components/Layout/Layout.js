import React from 'react';
import Aux from '../../hoc/Aux'
import styles from './Layout.module.css';

export const Layout = props => (
    <Aux>
        <div>Toolbar, Sidebar, Background</div>
        <main className={styles.Content}>{props.children}</main>
    </Aux>
);

