'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'
import { logout } from '../utils/auth'

export default function Sidebar({
	isSidebarOpen,
	setSidebarOpen,
	profilePicUser,
	user,
}) {
	const pathname = usePathname()

	const handleLogout = async () => {
		const result = await Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Anda akan logout dari akun ini.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, Logout',
			cancelButtonText: 'Batal',
		})

		if (result.isConfirmed) {
			try {
				await logout()
			} catch (error) {
				Swal.fire('Error', 'Gagal logout. Silakan coba lagi.', 'error')
			}
		}
	}

	return (
		<aside
			className={`${
				isSidebarOpen ? 'w-64' : 'w-20'
			} bg-gray-900 text-white flex flex-col transition-all duration-300 shadow-lg ${
				isSidebarOpen ? '' : 'm-4 rounded-2xl'
			}`}
		>
			<div className="flex items-center gap-4 p-4 border-b border-gray-800 relative">
				<img
					src="/logo_budgetly.png"
					alt="Budgetly Logo"
					className="h-12 transition-all duration-300 rounded-lg"
				/>
				{isSidebarOpen && (
					<span className="text-xl font-bold tracking-wide">Budgetly</span>
				)}

				<button
					onClick={() => setSidebarOpen(!isSidebarOpen)}
					className={`absolute -right-3 top-[5rem] transform -translate-y-1/2 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none`}
				>
					<Icon
						icon={
							isSidebarOpen
								? 'tabler:circle-chevron-left-filled'
								: 'tabler:circle-chevron-right-filled'
						}
						width="24"
						className="text-primary-500"
					/>
				</button>
			</div>

			<nav className="flex-grow p-4">
				{[
					{
						name: 'Beranda',
						icon: 'ic:baseline-home',
						path: '/dashboard/home',
					},
					{
						name: 'Transaksi',
						icon: 'ic:baseline-receipt-long',
						path: '/dashboard/transaction',
					},
					{
						name: 'Chatbot AI',
						icon: 'ic:baseline-chat',
						path: '/dashboard/chatbot-ai',
					},
					{
						name: 'Profil',
						icon: 'ic:baseline-person',
						path: '/dashboard/profile',
					},
				].map((item) => {
					const isActive = pathname === item.path
					return (
						<Link
							href={item.path}
							key={item.name}
							className={`flex items-center px-3 py-0.5 space-x-4 rounded-lg transition-all duration-200 ${
								isActive ? 'bg-primary shadow-md' : 'hover:bg-gray-800'
							}`}
						>
							<div
								className={`flex items-center justify-center w-12 h-12 rounded-full ${
									isActive ? 'bg-primary-500 text-white' : ''
								}`}
							>
								<Icon
									icon={item.icon}
									width="24"
									className={`${
										isActive ? 'text-white' : 'text-gray-400'
									} transition-colors`}
								/>
							</div>

							{isSidebarOpen && (
								<span
									className={`text-sm font-medium ${
										isActive ? 'text-white' : 'text-gray-300'
									}`}
								>
									{item.name}
								</span>
							)}
						</Link>
					)
				})}
			</nav>

			<div className="p-4 border-t border-gray-800 flex flex-col gap-4">
				<div className="flex items-center border-b border-gray-800 pb-4">
					<img
						src={profilePicUser || 'https://via.placeholder.com/40'}
						alt="User Profile"
						className="w-12 h-12 rounded-full border-2 border-gray-300"
					/>
					{isSidebarOpen && (
						<div className="ml-4">
							<h3 className="text-base font-bold text-white">
								{user.displayName || 'User Name'}
							</h3>
							<p className="text-sm text-gray-400">
								{user.email || 'user@example.com'}
							</p>
						</div>
					)}
				</div>

				<button
					onClick={handleLogout}
					className="flex items-center space-x-4 hover:text-white hover:bg-red-800 rounded-lg px-4 py-2 transition-all duration-200"
				>
					<Icon icon="ic:baseline-logout" width="24" />
					{isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
				</button>
			</div>
		</aside>
	)
}
