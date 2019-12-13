import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 4
    };

    addIngredientHandler = type => {
      const updatedCount = this.state.ingredients[type] + 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;

      const ingredientPrice = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const updatedPrice = oldPrice + ingredientPrice;

      this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
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
        const updatedPrice = oldPrice + ingredientPrice;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
    };

    render () {
        const disabledToggle = {...this.state.ingredients};
        for (let key in disabledToggle) {
            disabledToggle[key] = disabledToggle[key] <= 0
        }

        return (
            <Aux>
                <p>{this.state.totalPrice}</p>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledToggle}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;