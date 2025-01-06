'use client'
import { useState } from 'react'

export default function Dashboard() {
	const [isSidebarOpen, setSidebarOpen] = useState(true)
	const [isProfileMenuOpen, setProfileMenuOpen] = useState(false)

	return (
		<div className="flex h-screen bg-gray-100">
			<aside
				className={`${
					isSidebarOpen ? 'w-64' : 'w-16'
				} bg-gray-800 text-white flex flex-col transition-all duration-300`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					{isSidebarOpen ? (
						<span className="text-lg font-semibold">Finance Dashboard</span>
					) : (
						<span className="text-lg font-semibold">FD</span>
					)}
					<button
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						className="focus:outline-none"
					>
						<span className="material-icons">menu</span>
					</button>
				</div>
				<nav className="flex-grow mt-4 space-y-2">
					{[
						{ name: 'Dashboard', icon: 'dashboard' },
						{ name: 'Transaksi', icon: 'receipt_long' },
						{ name: 'AI Insights', icon: 'insights' },
						{ name: 'Profil', icon: 'person' },
					].map((item) => (
						<a
							href="#"
							key={item.name}
							className="flex items-center px-4 py-2 space-x-4 hover:bg-gray-700"
						>
							<span className="material-icons">{item.icon}</span>
							{isSidebarOpen && <span>{item.name}</span>}
						</a>
					))}
				</nav>
			</aside>

			<main className="flex-grow p-6">
				<header className="flex items-center justify-between bg-white p-4 rounded shadow">
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<div className="relative">
						<button
							onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
							className="focus:outline-none"
						>
							<img
								src="https://via.placeholder.com/40"
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
