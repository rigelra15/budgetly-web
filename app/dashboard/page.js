'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { getUserData } from '../utils/auth'
import HashLoader from 'react-spinners/HashLoader'
import Home from '../components/Home'

export default function Dashboard() {
	const [isSidebarOpen, setSidebarOpen] = useState(true)
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
						`https://budgetly-api-pa7n.vercel.app/api/users/user/${user.id}/profile-pic`
					)
					const data = await response.json()
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
			<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
				<HashLoader
					color={'#3f8c92'}
					loading={isLoading}
					size={30}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
				<p className="mt-4 text-gray-600">Memuat data...</p>
			</div>
		)
	}

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				setSidebarOpen={setSidebarOpen}
				profilePicUser={profilePicUser}
				user={user}
			/>

			{/* Main Content */}
			<Home />
		</div>
	)
}
