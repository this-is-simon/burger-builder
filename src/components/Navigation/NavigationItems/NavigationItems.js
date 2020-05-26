import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" caption="Burger Builder" />
            <NavigationItem link="/orders" caption="Orders" />
        </ul>
    )
};

export default NavigationItems;