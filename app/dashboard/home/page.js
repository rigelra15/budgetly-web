'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import HashLoader from 'react-spinners/HashLoader'
import { Icon } from '@iconify/react'

export default function HomePage() {
	const [profilePicUrl, setProfilePicUrl] = useState(
		'https://via.placeholder.com/150'
	)
	const [userDatas, setUserDatas] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				await Promise.all([fetchUserData(), fetchProfilePic()])
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const fetchUserData = async () => {
		try {
			const userId = '12XrOac57IVZMknvmoFc'
			const response = await axios.get(
				`https://budgetly-api-pa7n.vercel.app/api/users/user/${userId}`
			)
			setUserDatas(response.data || {})
		} catch (error) {
			console.error('Error fetching user data:', error)
		}
	}

	const fetchProfilePic = async () => {
		try {
			const userId = '12XrOac57IVZMknvmoFc'
			const response = await axios.get(
				`https://budgetly-api-pa7n.vercel.app/api/users/user/${userId}/profile-pic`
			)
			setProfilePicUrl(response.data?.signedUrl || profilePicUrl)
		} catch (error) {
			console.error('Error fetching profile picture:', error)
		}
	}

	const calculateTotalBalance = (userDatas) => {
		if (!userDatas.transactions) return 0
		const transactions = userDatas.transactions

		const totalIncome = transactions
			.filter((t) => t.type === 'income')
			.reduce((sum, t) => sum + t.amount, 0)
		const totalExpense = transactions
			.filter((t) => t.type === 'expense')
			.reduce((sum, t) => sum + t.amount, 0)

		return totalIncome - totalExpense
	}

	const transactions = userDatas.transactions || []
	const income = transactions
		.filter((t) => t.type === 'income')
		.reduce((sum, t) => sum + t.amount, 0)
	const expenses = transactions
		.filter((t) => t.type === 'expense')
		.reduce((sum, t) => sum + t.amount, 0)

	return (
		<div className="min-h-screen bg-white">
			{isLoading ? (
				<div className="flex items-center justify-center h-screen bg-white flex-col gap-4">
					<HashLoader size={50} color="#3F8C92" />
					<p className="mt-4 text-gray-600">Memuat ringkasan...</p>
				</div>
			) : (
				<div className="p-6">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center gap-4">
							<img
								src={profilePicUrl}
								alt="Profile"
								className="w-16 h-16 rounded-full object-cover"
							/>
							<div>
								<p className="text-gray-500 text-sm">Selamat Datang,</p>
								<h2 className="text-lg font-bold">
									{userDatas.displayName || 'User'}
								</h2>
							</div>
						</div>
						<button className="p-2 rounded-full hover:bg-gray-100">
							<Icon
								icon="mdi:cog-outline"
								className="text-gray-500"
								width="24"
								height="24"
							/>
						</button>
					</div>

					{/* Balance Card */}
					<div className="bg-gradient-to-r from-primary to-teal-500 text-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-bold">Saldo Total</h3>
						<p className="text-2xl font-bold mt-2">{`Rp ${calculateTotalBalance(
							userDatas
						).toLocaleString()}`}</p>
					</div>

					{/* Summary Section */}
					<section className="mt-6">
						<h3 className="text-lg font-bold text-gray-800 mb-4">
							Ringkasan Finansial
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
								<h4 className="text-lg font-bold">Pemasukan</h4>
								<p className="text-xl font-bold">{`Rp ${income.toLocaleString()}`}</p>
							</div>
							<div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
								<h4 className="text-lg font-bold">Pengeluaran</h4>
								<p className="text-xl font-bold">{`Rp ${expenses.toLocaleString()}`}</p>
							</div>
							<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
								<h4 className="text-lg font-bold">Saldo</h4>
								<p className="text-xl font-bold">{`Rp ${calculateTotalBalance(
									userDatas
								).toLocaleString()}`}</p>
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	)
}
