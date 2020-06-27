import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions"
import {connect} from "react-redux";

export const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1,
    cheese: 1,
    meat: 2
};

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://burger-builder-sa.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    // onIngredientAdded = type => {
    //     const updatedCount = this.props.ings[type] + 1;
    //     const updatedIngredients = {...this.props.ings};
    //     updatedIngredients[type] = updatedCount;
    //
    //     const ingredientPrice = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + ingredientPrice;
    //
    //     this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    //     this.updatePurchaseableState(updatedIngredients);
    // };

    onIngredientRemoved = type => {
        if (this.props.ings[type] <= 0) {
            return;
        }
        const updatedCount = this.props.ings[type] - 1;
        const updatedIngredients = {...this.props.ings};
        updatedIngredients[type] = updatedCount;

        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - ingredientPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseableState(updatedIngredients)
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]))
        };
        queryParams.push("price=" + this.state.totalPrice);

        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString
        })
    };

    render() {
        const disabledToggle = {...this.props.ings};
        for (let key in disabledToggle) {
            disabledToggle[key] = disabledToggle[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded...</p> : <Spinner/>
        if (this.props.ings) {
             burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledToggle}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));