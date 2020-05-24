import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Simon Atkins',
                address: {
                    street: '123 Main Street',
                    zipCode: 'EE11 11FF',
                    country: 'Afghanistan'
                },
                email: 'simonsimon@emails.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false });
            })
    }

    render() {
        let form;
        if (!this.state.loading) {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="email" name="email" placeholder="Your email" />
                    <input type="text" name="street" placeholder="Your street" />
                    <input type="text" name="postcode" placeholder="Your postcode" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            );
        } else {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;