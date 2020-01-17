import React from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = React.useState([]);

    const filteredIngredientsHandler = React.useCallback((filteredIngredients) => {
        setUserIngredients(filteredIngredients);
    }, []);

    const addIngredientHandler = (ingredient) => {
        fetch('https://react-hooks-update-95c2c.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => (
                [...prevIngredients, {id: responseData.name, ...ingredient}]
            ));
        });
    };

    const removeIngredientHandler = (id) => {
        console.log('Removing', id);
        setUserIngredients(prevIngredients => {
            return prevIngredients.filter(ig => ig.id !== id);
        });
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                {/* Need to add list here! */}
                <IngredientList ingredients={userIngredients} onRemoveIngredient={removeIngredientHandler}/>
            </section>
        </div>
    );
};

export default Ingredients;