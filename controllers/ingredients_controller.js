const {
	getAllIngredients,
	addIngredient,
	removeIngredient,
	removeAllIngredients
} = require("../utils/ingredients_utilities")


//GET ALL INGREDIENTS
const getIngredients = function(req, res) {
	//console.log(req.cookies)
	  getAllIngredients(req)
		.exec((err, items) => {
			if (err) {
				res.status(500)
				res.json({
					error: err.message
				})
			}
			try {
				items.fridgeIngredients.sort()
				items.pantryIngredients.sort()
				res.send(items)
			} catch (err) {	
				res.status(500).json({error: "Error retrieving ingredients"})
			}
	})
}

//CREATE NEW INGREDIENT
const createIngredient = function(req, res) {
	addIngredient(req)
		.then((user) => {
			res.status(201)
			res.send(user)
			})
		.catch(err => 
			res.status(500).json({error: err.message})
			)
}

//DELETE A INGREDIENT
const deleteIngredient = function(req, res) {
	// Check for error from middleware
	if (req.error) {
		res.status(req.error.status)
		res.send(req.error.message)
	} else {
		// execute the query from deleteIng
		removeIngredient(req).exec(err => {
			if (err) {
				res.status(500)
				res.json({
				error: err.message
				})
			}
            res.sendStatus(204)
		})
	}
}

//DELETE ALL INGREDIENTS
const deleteAllIngredients = function(req, res) {
	// Check for error from middleware
	if (req.error) {
		res.status(req.error.status)
		res.send(req.error.message)
	} else {
		// execute the query from delete
		removeAllIngredients(req).exec((err, user) => {
			if (err) {
				res.status(500)
				res.json({
				error: err.message
				})
			}
			if (user) {
				res.sendStatus(204)
			} else {
				res.status(500)
				res.json({
				error: 'Error deleting ingredients'
				})
			}
		})
	}
}


module.exports = {
	getIngredients,
    createIngredient,
	deleteIngredient,
	deleteAllIngredients
}
