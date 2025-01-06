'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserData } from '../utils/auth'

export default function Dashboard() {
	const [isSidebarOpen, setSidebarOpen] = useState(true)
	const [isProfileMenuOpen, setProfileMenuOpen] = useState(false)
	const [user, setUser] = useState(null)
	const [profilePicUser, setProfilePicUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const userData = await getUserData()
				setUser(userData)
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (user) {
			const fetchProfilePic = async () => {
				try {
					const response = await fetch(
						`https://budgetly-api-pa7n.vercel.app/api/users/user/${user.userId}/profile-pic`
					)
					const data = await response.json()
					console.log(data)
					setProfilePicUser(data.signedUrl)
				} catch (error) {
					console.error('Error fetching profile picture:', error)
				}
			}

			fetchProfilePic()
		}

		return () => {
			setProfilePicUser(null)
		}
	}, [user])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<div className="text-center">
					<Icon
						icon="eos-icons:loading"
						width="40"
						className="animate-spin text-gray-600"
					/>
					<p className="mt-2 text-gray-600">Loading data...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? 'w-64' : 'w-16'
				} bg-gray-800 text-white flex flex-col transition-all duration-300`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<div className="flex items-center space-x-4">
						<img
							src="/logo_budgetly.png"
							alt="Budgetly Logo"
							className={`h-8 transition-all duration-300 ${
								isSidebarOpen ? 'block' : 'hidden'
							}`}
						/>
						{isSidebarOpen && (
							<span className="text-lg font-semibold">Budgetly</span>
						)}
					</div>
					<button
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						className="focus:outline-none"
					>
						<Icon icon="ic:baseline-menu" width="24" />
					</button>
				</div>
				<nav className="flex-grow mt-4 space-y-2">
					{[
						{ name: 'Dashboard', icon: 'ic:baseline-dashboard' },
						{ name: 'Transaksi', icon: 'ic:baseline-receipt-long' },
						{ name: 'AI Insights', icon: 'ic:baseline-insights' },
						{ name: 'Profil', icon: 'ic:baseline-person' },
					].map((item) => (
						<a
							href="#"
							key={item.name}
							className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700"
						>
							<Icon icon={item.icon} width="24" />
							{isSidebarOpen && <span>{item.name}</span>}
						</a>
					))}
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-grow p-6">
				<header className="flex items-center justify-between bg-white p-4 rounded shadow">
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<div className="relative">
						<button
							onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
							className="focus:outline-none"
						>
							<img
								src={profilePicUser || 'https://via.placeholder.com/40'}
								alt="Profile"
								className="w-10 h-10 rounded-full border-2 border-gray-300"
							/>
						</button>
						{isProfileMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
								<ul className="py-2">
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
										>
											Edit Profil
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
										>
											Tambahkan Akun Bank
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
										>
											Tema Aplikasi
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>

				{/* Content Section */}
				<section className="mt-6">
					<h2 className="text-xl font-semibold mb-4">Ringkasan Finansial</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="bg-white p-4 rounded shadow">
							<h3 className="text-lg font-semibold">Total Saldo</h3>
							<p className="text-gray-600">$10,000</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h3 className="text-lg font-semibold">Pengeluaran Bulanan</h3>
							<p className="text-gray-600">$3,500</p>
						</div>
						<div className="bg-white p-4 rounded shadow">
							<h3 className="text-lg font-semibold">
								Pengeluaran Kategori Utama
							</h3>
							<p className="text-gray-600">Hiburan: $1,200</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
