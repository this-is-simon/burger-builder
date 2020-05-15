import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

export const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
                <Button btnType="Danger" clicked={() => {alert('you clicked cancel')}}>CANCEL</Button>
                <Button btnType="Success" clicked={() => {alert('you clicked continue')}}>CONTINUE</Button>
        </div>
    )
}