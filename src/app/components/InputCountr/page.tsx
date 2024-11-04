import React, { useEffect, useState } from 'react'
import styles from '../../page.module.scss'

interface CountrySelectorProps {
	selectedCountry: string
	setSelectedCountry: (country: string) => void
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
	selectedCountry,
	setSelectedCountry,
}) => {
	const [showCountry, setShowCountry] = useState<boolean>(false)

	const countries: string[] = [
		'Россия🇷🇺',
		'Казахстан🇰🇿',
		'Белоруссия🇧🇾',
		'Украина🇺🇦',
	]

	const handleInputFocus = () => {
		setShowCountry(true)
	}

	const handleCountryClick = (country: string) => {
		setSelectedCountry(country)
		setShowCountry(false)
		localStorage.setItem('selectedCountry', country)
	}

	useEffect(() => {
		const storedCountry = localStorage.getItem('selectedCountry')
		if (storedCountry) {
			setSelectedCountry(storedCountry)
		}
	}, [setSelectedCountry])

	return (
		<div className={styles.input_container}>
			<label className={styles.label}>Страна-производитель (копродукция)</label>
			<input
				name='country'
				placeholder='Страна'
				className={`${styles.input} ${styles.secondary_input}`}
				type='text'
				onFocus={handleInputFocus}
				value={selectedCountry}
				readOnly
			/>
			{showCountry && (
				<ul className={styles.ul}>
					{countries.map((item, index) => (
						<li
							className={styles.li}
							key={index}
							onClick={() => handleCountryClick(item)}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CountrySelector
