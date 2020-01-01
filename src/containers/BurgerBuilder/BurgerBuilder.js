import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1,
    cheese: 1,
    meat: 2
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey] })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = type => {
      const updatedCount = this.state.ingredients[type] + 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;

      const ingredientPrice = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const updatedPrice = oldPrice + ingredientPrice;

      this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseableState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
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

    hideBackdropHandler = () => {
        this.setState({purchasing: false})
    };

    render () {
        const disabledToggle = {...this.state.ingredients};
        for (let key in disabledToggle) {
            disabledToggle[key] = disabledToggle[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} hideBackdrop={this.hideBackdropHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledToggle}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;