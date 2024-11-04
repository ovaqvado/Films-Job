import React, { useEffect, useState } from 'react'
import styles from '../../page.module.scss'

interface FormatSelectorProps {
	selectedFormat: string
	setSelectedFormat: (format: string) => void
}

export const InputFormat: React.FC<FormatSelectorProps> = ({
	selectedFormat,
	setSelectedFormat,
}) => {
	const [showFormat, setShowFormat] = useState<boolean>(false)

	const formats: string[] = [
		'Онлайн-платформа',
		'Большой экран',
		'Интернет',
		'Кинотеатр',
	]

	const handleInputFocus = () => {
		setShowFormat(true)
	}

	const handleFormatClick = (format: string) => {
		setSelectedFormat(format)
		setShowFormat(false)
		localStorage.setItem('selectedFormat', format)
	}

	useEffect(() => {
		const storedFormat = localStorage.getItem('selectedFormat')
		if (storedFormat) {
			setSelectedFormat(storedFormat)
		}
	}, [setSelectedFormat])

	return (
		<div className={styles.input_container}>
			<label className={styles.label}>
				Формат (для онлайн-платформ, большого экрана, интернета, другое)
			</label>
			<input
				name='country'
				placeholder='Страна'
				className={`${styles.input} ${styles.secondary_input}`}
				type='text'
				onFocus={handleInputFocus}
				value={selectedFormat}
				readOnly
			/>
			{showFormat && (
				<ul className={styles.ul}>
					{formats.map((item, index) => (
						<li
							className={styles.li}
							key={index}
							onClick={() => handleFormatClick(item)}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
