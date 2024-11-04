import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
	title: 'Films',
	description: 'App films',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link rel='icon' href='/film_icon.svg' />
			</head>
			<body className='body'>{children}</body>
		</html>
	)
}
