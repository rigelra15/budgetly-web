'use client'

import { jwtDecode } from 'jwt-decode'
import cookie from 'cookiejs'

export async function getUserData() {
	if (typeof window === 'undefined') {
		console.error('Fungsi ini hanya dapat dipanggil di sisi client.')
		return null
	}

	const token = cookie.get('auth_budgetly')
	if (!token) {
		console.log('Token tidak ditemukan.')
		return null
	}

	try {
		const decoded = jwtDecode(token)
		const response = await fetch(
			`https://budgetly-api-pa7n.vercel.app/api/users/user/${decoded.userId}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error saat mendekode token:', error)
		return null
	}
}

export async function logout() {
	if (typeof window === 'undefined') {
		console.error('Fungsi ini hanya dapat dipanggil di sisi client.')
		return
	}

	cookie.remove('auth_budgetly')
	window.location.href = '/login'
}
