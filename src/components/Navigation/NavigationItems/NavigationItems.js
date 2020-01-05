import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active="true" caption="Burger Builder" />
            <NavigationItem link="/" caption="Link" />
        </ul>
    )
};

export default NavigationItems;