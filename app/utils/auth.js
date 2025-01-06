'use client'

import { jwtDecode } from 'jwt-decode'
import cookie from 'cookiejs'

export function getUserData() {
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
		console.log('Data pengguna:', decoded)
		return decoded
	} catch (error) {
		console.error('Error saat mendekode token:', error)
		return null
	}
}
