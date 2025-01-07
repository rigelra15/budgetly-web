'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'

export default function TransactionItem({
	icon,
	transactionId,
	title,
	mainCurrency,
	amount,
	subAmount,
	subCurrency,
	date,
	account,
	category,
	photos = [],
	color,
	onTransactionDeleted,
}) {
	const getCategoryColor = (category) => {
		const incomeColors = {
			Allowance: '#2196F3',
			Salary: '#4CAF50',
			'Petty Cash': '#9C27B0',
			Bonus: '#FF9800',
			Other: '#009688',
		}

		const expenseColors = {
			Food: '#F44336',
			'Social Life': '#E91E63',
			Pets: '#795548',
			Transport: '#3F51B5',
			Culture: '#673AB7',
			Household: '#00BCD4',
			Apparel: '#FFC107',
			Beauty: '#CDDC39',
			Health: '#8BC34A',
			Education: '#03A9F4',
			Gift: '#FF5722',
			Other: '#9E9E9E',
		}

		return incomeColors[category] || expenseColors[category] || '#000000'
	}

	const getAccountIcon = (account) => {
		switch (account) {
			case 'card':
				return 'mdi:credit-card'
			case 'cash':
				return 'mdi:cash'
			case 'e-wallet':
				return 'mdi:wallet'
			default:
				return 'mdi:help-circle-outline'
		}
	}

	const formatCurrency = (amount, currency) => {
		const options = {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: currency === 'IDR' ? 0 : 2,
		}

		return new Intl.NumberFormat(
			currency === 'IDR' ? 'id-ID' : 'en-US',
			options
		).format(amount)
	}

	return (
		<div
			className="border border-gray-300 rounded-xl bg-white p-4 flex items-start gap-4"
			onClick={() => showTransactionDetails()}
		>
			{/* Icon */}
			<div
				className="flex items-center justify-center w-12 h-12 rounded-full"
				style={{ backgroundColor: `${color}22` }}
			>
				<Icon icon={icon} width="24" style={{ color }} />
			</div>

			{/* Transaction details */}
			<div className="flex-1">
				{/* Title */}
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-gray-800 text-lg">{title}</h3>
					{photos.length > 0 && (
						<Icon icon="mdi:camera" className="text-blue-500 ml-2" width="20" />
					)}
				</div>

				{/* Category and Account */}
				<div className="flex items-center gap-2 mt-2">
					{/* Category */}
					<span
						className="px-3 py-1 rounded-full text-white text-xs font-medium"
						style={{ backgroundColor: getCategoryColor(category) }}
					>
						{category}
					</span>

					{/* Account */}
					<Icon
						icon={getAccountIcon(account)}
						className="text-gray-600 bg-gray-100 rounded-full p-1"
						width="20"
					/>
				</div>

				{/* Date */}
				<p className="text-gray-500 text-sm mt-2">{date}</p>
			</div>

			{/* Amount */}
			<div className="text-right">
				<p className="font-bold text-gray-800">
					{formatCurrency(amount, mainCurrency)}
				</p>
				<p className="text-gray-500 text-sm">
					{formatCurrency(subAmount, subCurrency)}
				</p>
			</div>
		</div>
	)

	function showTransactionDetails() {
		alert(`Transaction ID: ${transactionId}`)
	}
}

TransactionItem.propTypes = {
	icon: PropTypes.string.isRequired,
	transactionId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	mainCurrency: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	subAmount: PropTypes.number.isRequired,
	subCurrency: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	account: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	photos: PropTypes.array,
	color: PropTypes.string.isRequired,
	onTransactionDeleted: PropTypes.func.isRequired,
}
