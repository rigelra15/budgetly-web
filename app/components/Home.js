'use client'

export default function Home() {
	return (
		<main className="flex-grow p-6 bg-gradient-to-br from-gray-100 to-gray-200">
			<h1 className="text-3xl font-bold text-gray-700">🎉 Dashboard</h1>

			<section className="mt-8">
				<h2 className="text-2xl font-semibold mb-6 text-gray-700">
					Ringkasan Finansial
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">Total Saldo</h3>
							<span className="text-3xl font-bold">$10,000</span>
						</div>
						<p className="mt-2 text-sm text-blue-200">
							Sisa saldo di rekening Anda
						</p>
					</div>

					<div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">Pengeluaran Bulanan</h3>
							<span className="text-3xl font-bold">$3,500</span>
						</div>
						<p className="mt-2 text-sm text-green-200">
							Pengeluaran selama bulan ini
						</p>
					</div>

					<div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold">Kategori Terbesar</h3>
							<span className="text-3xl font-bold">Hiburan</span>
						</div>
						<p className="mt-2 text-sm text-purple-200">
							Pengeluaran terbesar bulan ini: $1,200
						</p>
					</div>
				</div>
			</section>
		</main>
	)
}
