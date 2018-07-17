import { createStore, combineReducers } from 'redux' 
import uuid from 'uuid'

const expensesReducerDefaultState = []

const addExpense = (
	{ 
		description = '', 
		note = '', 
		amount = 0, 
		createdAt = 0 } = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description, 
		note,
		amount,
		createdAt
	}
})

const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
})

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense]
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id)
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {...expense, ...action.updates}
				} else {
					return expense
				}
			})
		default:
			return state
	}
}

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		default:
			return state
	}
}
 
const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
)

store.subscribe(() => {
	console.log(store.getState())
})

const expenseOne = store.dispatch(addExpense({
	description: 'rent',
	amount: 100
}))

const expenseTwo = store.dispatch(addExpense({
	description: 'coffee',
	amount: 10
}))

store.dispatch(removeExpense({
	id: expenseOne.expense.id
}))

store.dispatch(editExpense( expenseTwo.expense.id, { amount: 1000 }))

store.dispatch(setTextFilter('rent'))

const demoState = {
		expenses: [{
				id: 'hi',
				description: 'january rent',
				note: 'final payment for that address',
				amount: 54500,
				createdAt: 0
		}],
		filters: {
				text: 'rent',
				sortBy: 'amount',
				startDate: undefined,
				endDate: undefined
		}
}

const user = {
	name: 'malina',
	age: 28
}

console.log({hi: 'testing', age: 30, ...user, location: 'la'})