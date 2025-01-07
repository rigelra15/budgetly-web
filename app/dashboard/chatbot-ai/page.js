'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import { getUserData } from '@/app/utils/auth'
import DotLoader from 'react-spinners/DotLoader'
import HashLoader from 'react-spinners/HashLoader'
import BeatLoader from 'react-spinners/BeatLoader'
import Swal from 'sweetalert2'

export default function ChatbotAIPage() {
	const [user, setUser] = useState(null)
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isFetching, setIsFetching] = useState(true)

	const handleSendMessage = async () => {
		if (!input.trim()) return

		const userMessage = { sender: 'user', text: input }
		setMessages((prev) => [...prev, userMessage])

		try {
			await axios.post(
				'https://budgetly-api-pa7n.vercel.app/api/chatbot/save-conversation',
				{
					userId: user.id,
					messages: [...messages, userMessage],
				}
			)
		} catch (error) {
			console.error('Error saat menyimpan percakapan user:', error)
		}

		setIsLoading(true)

		try {
			const response = await axios.post(
				'https://budgetly-api-pa7n.vercel.app/api/chatbot/generate',
				{
					userId: user.id,
					prompt: input,
				}
			)

			const botMessage = {
				sender: 'bot',
				text: response.data.response,
			}
			setMessages((prev) => [...prev, botMessage])

			await axios.post(
				'https://budgetly-api-pa7n.vercel.app/api/chatbot/save-conversation',
				{
					userId: user.id,
					messages: [...messages, userMessage, botMessage],
				}
			)
		} catch (error) {
			console.error('Error saat mengirim pesan:', error)
			const botErrorMessage = {
				sender: 'bot',
				text: 'Oops! Terjadi kesalahan. Silakan coba lagi.',
			}
			setMessages((prev) => [...prev, botErrorMessage])

			try {
				await axios.post(
					'https://budgetly-api-pa7n.vercel.app/api/chatbot/save-conversation',
					{
						userId: user.id,
						messages: [...messages, userMessage, botErrorMessage],
					}
				)
			} catch (error) {
				console.error('Error saat menyimpan percakapan error:', error)
			}
		} finally {
			setIsLoading(false)
		}

		setInput('')
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUserData()
				setUser(userData)

				const response = await axios.get(
					`https://budgetly-api-pa7n.vercel.app/api/chatbot/get-conversation/${userData.id}`
				)
				setMessages(response.data.messages || [])
			} catch (error) {
				console.error('Error fetching user data or conversation:', error)
			} finally {
				setIsFetching(false)
			}
		}

		fetchData()
	}, [])

	const handleDeleteConversations = async () => {
		const result = await Swal.fire({
			title: 'Konfirmasi Penghapusan',
			text: 'Apakah Anda yakin ingin menghapus semua percakapan? Tindakan ini tidak dapat dibatalkan.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Ya, hapus!',
			cancelButtonText: 'Batal',
		})

		if (result.isConfirmed) {
			setIsFetching(true)
			try {
				await axios.delete(
					`https://budgetly-api-pa7n.vercel.app/api/chatbot/delete-conversation`,
					{
						data: {
							userId: user.id,
						},
					}
				)

				setMessages([])

				Swal.fire({
					title: 'Berhasil!',
					text: 'Semua percakapan telah dihapus.',
					icon: 'success',
					confirmButtonColor: '#3085d6',
				})
			} catch (error) {
				console.error('Error saat menghapus percakapan:', error)
				Swal.fire({
					title: 'Gagal!',
					text: 'Terjadi kesalahan saat menghapus percakapan. Silakan coba lagi.',
					icon: 'error',
					confirmButtonColor: '#d33',
				})
			} finally {
				setIsFetching(false)
			}
		}
	}

	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-gradient-to-r from-primary to-teal-500 text-white p-4 shadow flex flex-row gap-2 justify-between">
				<h1 className="text-xl font-bold text-center">Chatbot AI</h1>
				{/* Button clear convs */}
				<button onClick={handleDeleteConversations}>
					<Icon icon="bi:trash" width="24" />
				</button>
			</header>

			{/* Chat Messages */}
			<div className="flex-grow p-4 overflow-y-auto space-y-4">
				{isFetching ? (
					<div className="flex items-center justify-center h-full">
						<HashLoader color="#3f8c92" size={50} />
					</div>
				) : (
					messages.map((message, index) => (
						<div
							key={index}
							className={`flex ${
								message.sender === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							<div
								className={`max-w-xs p-4 rounded-3xl shadow ${
									message.sender === 'user'
										? 'bg-primary text-white'
										: 'bg-gray-200 text-gray-800'
								}`}
							>
								{message.text}
							</div>
						</div>
					))
				)}
				{/* Loader saat bot sedang memproses */}
				{isLoading && !isFetching && (
					<div className="flex justify-start">
						<BeatLoader color="#3f8c92" size={20} />
					</div>
				)}
			</div>

			{/* Chat Input */}
			<div className="p-4 bg-white border-t border-gray-200">
				<div className="flex items-center space-x-2">
					<input
						type="text"
						placeholder="Ketik pesan Anda..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
						className="flex-grow border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					<button
						onClick={handleSendMessage}
						className={`bg-primary text-white p-2 rounded-full hover:bg-primary/90 ${
							isLoading ? 'cursor-not-allowed opacity-50' : ''
						}`}
						disabled={isLoading}
					>
						<Icon icon="ic:baseline-send" width="24" />
					</button>
				</div>
			</div>
		</div>
	)
}
