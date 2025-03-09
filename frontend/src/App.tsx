import { useState } from 'react';
import './App.css';

function App() {
	const fetchData = () => {
		fetch(`http://localhost:${import.meta.env.VITE_PORT}/`)
			.then((response) => response.text())
			.then((data) => setMessage(data))
			.catch((error) => console.error('Error fetching data:', error));
	};
	const [message, setMessage] = useState<string>('');

	return (
		<>
			{/* Main container with a subtle gradient */}
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
				{/* Navigation bar */}
				<nav className="bg-white/70 backdrop-blur-sm border-b border-slate-200 fixed w-full top-0 z-10">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<svg
								className="w-8 h-8 text-indigo-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
							</svg>
							<span className="text-xl font-semibold text-slate-800">
								API Demo
							</span>
						</div>
					</div>
				</nav>

				{/* Main content */}
				<main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="text-center space-y-4">
							<h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
								Welcome to Our API Demo
							</h1>
							<p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
								Experience seamless communication between React frontend and Go
								backend server.
							</p>
						</div>

						<div className="mt-12 flex flex-col items-center space-y-8">
							{/* Interactive card */}
							<div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow duration-300">
								<div className="flex flex-col items-center space-y-6">
									<button
										onClick={fetchData}
										className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg
										transition-all duration-200 ease-in-out transform hover:scale-[1.02]
										focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
										shadow-sm hover:shadow flex items-center space-x-2"
									>
										<span>Fetch Data from Server</span>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
									</button>

									{/* Loading state indicator could be added here */}

									{message && (
										<div className="w-full animate-fade-in">
											<div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
												<h2 className="text-xl font-semibold text-slate-800 mb-3">
													Server Response
												</h2>
												<div className="bg-white rounded-lg p-4 border border-slate-200">
													<p className="text-slate-600 font-mono text-sm break-all">
														{message}
													</p>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Info card */}
							<div className="w-full max-w-2xl p-6 bg-indigo-50 rounded-xl border border-indigo-100">
								<div className="flex items-start space-x-4">
									<div className="p-2 bg-indigo-100 rounded-lg">
										<svg
											className="w-6 h-6 text-indigo-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<h3 className="text-sm font-medium text-indigo-900">
											How it works
										</h3>
										<p className="mt-1 text-sm text-indigo-800">
											Click the button above to make an API call to the Go
											backend server. The response will be displayed in a
											formatted card below.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default App;
