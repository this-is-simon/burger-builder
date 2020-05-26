import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                exact
                to={props.link}
                activeClassName={classes.active}>{props.caption}</NavLink>
        </li>
    )
};

export default NavigationItem;