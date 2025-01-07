'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { fetchProfilePic, getUserData } from '../../utils/auth'
import HashLoader from 'react-spinners/HashLoader'

export default function ProfilPage() {
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
		const fetchProfPic = async () => {
			try {
				const response = await fetchProfilePic()
				setProfilePicUser(response)
			} catch (error) {
				console.error('Error fetching profile picture:', error)
			}
		}

		if (user) {
			fetchProfPic()
		}
	}, [user])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<HashLoader color="#3f8c92" loading={isLoading} size={50} />
			</div>
		)
	}

	if (!user) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p>Data user tidak ditemukan.</p>
			</div>
		)
	}

	return (
		<div className="h-screen">
			<header className="bg-gradient-to-r from-primary to-teal-500 text-white p-4 shadow flex flex-row gap-3 items-center">
				<Icon icon="bi:person-circle" width="24" />
				<h1 className="text-xl font-bold text-center">Preferensi Akun</h1>
			</header>

			<div className="p-4">
				<div className="flex gap-8">
					<div className="text-center">
						<img
							src={profilePicUser || '/default-profile.png'}
							alt="Profile"
							className="w-24 h-24 rounded-full border-2 border-gray-300 mx-auto"
						/>
						<div className="mt-4 space-y-2">
							<button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-300 hover:bg-blue-100 w-full">
								Ubah
							</button>
							<button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-200 w-full">
								Hapus
							</button>
						</div>
					</div>

					<div className="flex-1 space-y-4">
						<div>
							<label className="block text-gray-600 text-sm mb-1">
								Nama Lengkap
							</label>
							<input
								type="text"
								value={user.displayName || ''}
								onChange={(e) =>
									setUser((prev) => ({
										...prev,
										displayName: e.target.value,
									}))
								}
								className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>

						<div>
							<label className="block text-gray-600 text-sm mb-1">Email</label>
							<input
								type="text"
								value={user.email || ''}
								onChange={(e) =>
									setUser((prev) => ({ ...prev, email: e.target.value }))
								}
								className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>

						<div>
							<label className="block text-gray-600 text-sm mb-1">
								Mata Uang Utama
							</label>
							<input
								type="text"
								value={user.currency || ''}
								onChange={(e) =>
									setUser((prev) => ({ ...prev, currency: e.target.value }))
								}
								className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>

						<div>
							<label className="block text-gray-600 text-sm mb-1">
								Dibuat pada
							</label>
							<input
								type="text"
								value={
									user?.createdAt
										? new Date(user.createdAt._seconds * 1000).toLocaleString(
												'id-ID',
												{
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: '2-digit',
													minute: '2-digit',
													second: '2-digit',
												}
										  )
										: ''
								}
								disabled
								className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-600 cursor-not-allowed"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
