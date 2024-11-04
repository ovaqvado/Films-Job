import { useEffect, useState } from 'react'
import styles from '../../page.module.scss'

interface GenreSelectorProps {
	selectedGenre: string
	setSelectedGenre: (genre: string) => void
}

export const InputGenre: React.FC<GenreSelectorProps> = ({
	selectedGenre,
	setSelectedGenre,
}) => {
	const [showGenre, setShowGenre] = useState<boolean>(false)

	const genres: string[] = [
		'Ужасы🎃',
		'Романтика💕',
		'Приключения🗺️',
		'Фантастика🔮',
	]

	const handleInputFocus = () => {
		setShowGenre(true)
	}

	const handleGenreClick = (genre: string) => {
		setSelectedGenre(genre)
		setShowGenre(false)
		localStorage.setItem('selectedGenre', genre)
	}

	useEffect(() => {
		const storedGenre = localStorage.getItem('selectedGenre')
		if (storedGenre) {
			setSelectedGenre(storedGenre)
		}
	}, [setSelectedGenre])

	return (
		<div className={styles.input_container}>
			<label className={styles.label}>Жанр</label>
			<input
				name='genre'
				placeholder='Жанр'
				className={`${styles.input}`}
				type='text'
				onFocus={handleInputFocus}
				value={selectedGenre}
				readOnly
			/>
			{showGenre && (
				<ul className={styles.ul}>
					{genres.map((item, index) => (
						<li
							className={styles.li}
							key={index}
							onClick={() => handleGenreClick(item)}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
