'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import cookie from 'cookiejs'
import HashLoader from 'react-spinners/HashLoader'
import { getUserData } from '../utils/auth'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const containerVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.6, ease: 'easeInOut' },
		},
	}
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
	}

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const userData = await getUserData()
				if (userData) {
					window.location.href = '/dashboard/home'
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()
		await toast.promise(
			axios.post('https://budgetly-api-pa7n.vercel.app/api/users/login', {
				email,
				password,
			}),
			{
				loading: 'Memproses masuk...',
				success: (response) => {
					const { token } = response.data
					cookie.set('auth_budgetly', token)
					window.location.href = '/dashboard/home'
				},
				error: (error) => {
					setError(error.response.data.message)
					return error.response.data.message
				},
			}
		)
	}

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
				<p className="mt-4 text-gray-600">Memeriksa data pengguna...</p>
			</div>
		)
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary to-blue-300">
			<motion.div
				className="bg-white p-8 shadow-lg w-full max-w-md rounded-xl"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div
					className="text-center mb-6"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.img
						src="/logo_budgetly.png"
						alt="Logo"
						className="w-20 mx-auto mb-4 rounded-3xl"
						initial={{ rotate: -180 }}
						animate={{ rotate: 0 }}
						transition={{ duration: 1, ease: 'easeInOut' }}
					/>
					<h1 className="text-2xl font-bold text-primary">Budgetly App</h1>
					<p className="text-gray-600 mt-2">
						Selamat datang kembali, silakan masuk ke akun Anda.
					</p>
				</motion.div>
				{error && (
					<motion.p
						className="text-red-500 text-sm mb-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						{error}
					</motion.p>
				)}
				<motion.form
					onSubmit={handleLogin}
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					className="space-y-4"
				>
					<div>
						<label className="block text-gray-700 mb-2">E-mail</label>
						<div className="relative">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border px-4 py-2 rounded focus:outline-primary"
								placeholder="Masukkan email Anda"
								required
							/>
							<Icon
								icon="ic:baseline-email"
								className="absolute right-3 top-3 text-gray-400"
								width="24"
							/>
						</div>
					</div>
					<div>
						<label className="block text-gray-700 mb-2">Kata Sandi</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border px-4 py-2 rounded focus:outline-primary"
								placeholder="Masukkan kata sandi Anda"
								required
							/>
							<Icon
								icon={
									showPassword
										? 'ic:baseline-visibility'
										: 'ic:baseline-visibility-off'
								}
								className="absolute right-3 top-3 text-gray-400 cursor-pointer"
								width="24"
								onClick={() => setShowPassword(!showPassword)}
							/>
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
					>
						Masuk
					</button>
				</motion.form>
				<motion.p
					className="text-gray-600 text-sm mt-4 text-center"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
				>
					Belum punya akun?{' '}
					<a href="/register" className="text-primary hover:underline">
						Daftar
					</a>
				</motion.p>
			</motion.div>
		</div>
	)
}
