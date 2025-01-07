'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function PopupDialog({
	isOpen,
	onClose,
	title = 'Header Dialog',
	children,
	color = 'bg-primary',
}) {
	if (!isOpen) return
	null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<motion.div
				className="bg-white rounded-2xl shadow-lg relative"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				{/* Header */}
				<div className={`${color} text-white rounded-t-2xl p-4`}>
					<h2 className="text-center text-lg font-bold">{title}</h2>
					{/* Close Icon */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-white"
					>
						<Icon icon="ic:baseline-close" width={28} />
					</button>
				</div>

				{/* Content */}
				<div className="p-4 space-y-4">{children}</div>
			</motion.div>
		</div>
	)
}
