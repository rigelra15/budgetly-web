'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function RegisterPage() {
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [image, setImage] = useState(null)
	const [previewImage, setPreviewImage] = useState(null)
	const [error, setError] = useState('')

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

	const handleImageChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImage(file)
			const reader = new FileReader()
			reader.onload = () => setPreviewImage(reader.result)
			reader.readAsDataURL(file)
		}
	}

	const handleRegister = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('name', displayName)
		formData.append('email', email)
		formData.append('password', password)
		if (image) formData.append('image', image)

		await toast.promise(
			axios.post(
				'https://budgetly-api-pa7n.vercel.app/api/users/register',
				{
					displayName,
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			),
			{
				loading: 'Memproses registrasi...',
				success: 'Registrasi berhasil. Silakan login.',
				error: 'Terjadi kesalahan, coba lagi.',
			}
		)
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary to-blue-300">
			<motion.div
				className="bg-white p-8 rounded shadow-lg w-full max-w-md"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Logo */}
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
					<h1 className="text-2xl font-bold text-primary">
						Buat Akun Budgetly
					</h1>
					<p className="text-gray-600 mt-2">
						Bergabung untuk mulai mengelola keuanganmu
					</p>
				</motion.div>

				{/* Profile Image Upload */}
				<motion.div
					className="flex flex-col items-center mb-6"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
				>
					<label htmlFor="profile-image" className="cursor-pointer">
						<div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200 flex items-center justify-center">
							{previewImage ? (
								<img
									src={previewImage}
									alt="Profile Preview"
									className="w-full h-full object-cover"
								/>
							) : (
								<Icon
									icon="ic:baseline-add-a-photo"
									className="text-gray-500"
									width="32"
								/>
							)}
						</div>
					</label>
					<input
						type="file"
						id="profile-image"
						className="hidden"
						accept="image/*"
						onChange={handleImageChange}
					/>
				</motion.div>

				{/* Form */}
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
					onSubmit={handleRegister}
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					className="space-y-4"
				>
					<div>
						<label className="block text-gray-700 mb-2">Nama Lengkap</label>
						<input
							type="text"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							className="w-full border px-4 py-2 rounded focus:outline-primary"
							placeholder="Nama lengkap"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-2">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full border px-4 py-2 rounded focus:outline-primary"
							placeholder="Email"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-2">Kata Sandi</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border px-4 py-2 rounded focus:outline-primary"
								placeholder="Password"
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
						Daftar
					</button>
				</motion.form>
				<motion.p
					className="text-gray-600 text-sm mt-4 text-center"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
				>
					Sudah punya akun?{' '}
					<a href="/login" className="text-primary hover:underline">
						Login
					</a>
				</motion.p>
			</motion.div>
		</div>
	)
}
