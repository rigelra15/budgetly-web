'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import TransactionItem from '../../components/TransactionItem'
import { getUserData } from '@/app/utils/auth'
import HashLoader from 'react-spinners/HashLoader'

export default function TransactionsPage() {
	const [transactions, setTransactions] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [currencyRates, setCurrencyRates] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [tabIndex, setTabIndex] = useState(0)

	useEffect(() => {
		const fetchUserAndData = async () => {
			try {
				const userData = await getUserData()
				setUser(userData)

				const [transactionsResponse, currencyResponse] = await Promise.all([
					axios.get(
						`https://budgetly-api-pa7n.vercel.app/api/transactions/user/${userData.id}`
					),
					axios.get('https://budgetly-api-pa7n.vercel.app/api/currency'),
				])

				setTransactions(transactionsResponse.data.transactions || [])

				const currencyData = currencyResponse.data.currencies || []
				setCurrencyRates(
					currencyData.reduce(
						(acc, curr) => ({
							...acc,
							[curr.currency]: curr.rate,
						}),
						{}
					)
				)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUserAndData()
	}, [])

	const incomeCategories = [
		'Allowance',
		'Salary',
		'Petty Cash',
		'Bonus',
		'Other',
	]
	const expenseCategories = [
		'Food',
		'Social Life',
		'Pets',
		'Transport',
		'Culture',
		'Household',
		'Apparel',
		'Beauty',
		'Health',
		'Education',
		'Gift',
		'Other',
	]
	const allCategories = [
		...new Set([...incomeCategories, ...expenseCategories]),
	]

	const filterTransactions = () => {
		const filteredTransactions =
			tabIndex === 0
				? transactions
				: transactions.filter((t) =>
						tabIndex === 1 ? t.type === 'income' : t.type === 'expense'
				  )

		if (selectedCategory) {
			return filteredTransactions.filter(
				(t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
			)
		}

		return filteredTransactions
	}

	const convertCurrency = (amount, toCurrency) => {
		const targetRate = currencyRates[toCurrency] || 1.0
		const baseRate = currencyRates['IDR'] || 1.0
		return (amount / baseRate) * targetRate
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<HashLoader color="#3f8c92" loading={isLoading} size={50} />
			</div>
		)
	}

	return (
		<div>
			<header className="bg-gradient-to-r from-primary to-teal-500 text-white p-4 shadow flex flex-row gap-2 items-center">
				<Icon icon="bi:journal-text" width="24" />
				<h1 className="text-xl font-bold text-center">Daftar Transaksi</h1>
			</header>

			<div className="p-4">
				{/* Tabs */}
				<div className="flex justify-around mb-4">
					{['All', 'Income', 'Expense'].map((tab, index) => (
						<button
							key={tab}
							onClick={() => {
								setTabIndex(index)
								setSelectedCategory(null)
							}}
							className={`py-2 px-4 rounded ${
								tabIndex === index
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-800'
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Dropdown Filter */}
				<div className="mb-4">
					<select
						value={selectedCategory || ''}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					>
						<option value="">Select Category</option>
						{allCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				{/* Transaction List */}
				<div>
					{filterTransactions().map((transaction) => (
						<TransactionItem
							key={transaction.transactionId}
							icon={
								transaction.type === 'income'
									? 'ic:baseline-arrow-downward'
									: 'ic:baseline-arrow-upward'
							}
							transactionId={transaction.transactionId}
							mainCurrency="IDR"
							amount={transaction.amount}
							subAmount={convertCurrency(transaction.amount, 'USD')}
							subCurrency="USD"
							date={new Date(
								transaction.date._seconds * 1000
							).toLocaleDateString()}
							account={transaction.account || 'Unknown'}
							category={
								transaction.category.charAt(0).toUpperCase() +
								transaction.category.slice(1).toLowerCase()
							}
							photos={transaction.photos || []}
							title={transaction.description || 'No description'}
							color={transaction.type === 'income' ? 'green' : 'red'}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
