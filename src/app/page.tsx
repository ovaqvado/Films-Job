'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { InputGenre } from './components/InputCatalog/page'
import CountrySelector from './components/InputCountr/page'
import { InputFormat } from './components/InputFormat/page'
import arrow_right from './image/arrow_right.svg'
import arrow_pag from './image/pag_arrow.svg'
import styles from './page.module.scss'

const getStoredData = () => {
	if (typeof window !== 'undefined') {
		const storedData = localStorage.getItem('projectData')
		return storedData ? JSON.parse(storedData) : {}
	}
	return {}
}

export default function Home() {
	const storedData = getStoredData()

	const [selectedCountry, setSelectedCountry] = useState<string>(
		storedData.selectedCountry || ''
	)
	const [selectedGenre, setSelectedGenre] = useState<string>(
		storedData.selectedGenre || ''
	)
	const [selectedFormat, setSelectedFormat] = useState<string>(
		storedData.selectedFormat || ''
	)
	const [name, setName] = useState<string>(storedData.name || '')
	const [unnumbered, setUnnumbered] = useState<string>(
		storedData.unnumbered || ''
	)
	const [budget, setBudget] = useState<string>(storedData.budget || '')
	const [synopsis, setSynopsis] = useState<string>(storedData.synopsis || '')
	const [nameDirty, setNameDirty] = useState(false)
	const [nameError, setNameError] = useState(false)

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.name === 'projectName') {
			setNameDirty(true)
			setNameError(!e.target.value.length)
		}
	}

	useEffect(() => {
		setNameError(!name.length)
	}, [name])

	const isButtonDisabled =
		!name || !selectedCountry || !selectedGenre || !selectedFormat

	useEffect(() => {
		const projectData = {
			name,
			selectedCountry,
			selectedGenre,
			selectedFormat,
			unnumbered,
			budget,
			synopsis,
		}
		localStorage.setItem('projectData', JSON.stringify(projectData))
	}, [
		name,
		selectedCountry,
		selectedGenre,
		selectedFormat,
		unnumbered,
		budget,
		synopsis,
	])

	const handleSave = () => {
		const projectData = {
			name,
			selectedCountry,
			selectedGenre,
			selectedFormat,
			unnumbered,
			budget,
			synopsis,
		}
		localStorage.setItem('projectData', JSON.stringify(projectData))
	}

	return (
		<div className={styles.page}>
			<div className={styles.title_btn}>
				<p className={styles.title}>Производственные параметры фильма</p>
				<button type='button' className={styles.btn_res}>
					Отменить изменение
				</button>
			</div>
			<div className={styles.inputs_box}>
				<div className={styles.input_column}>
					<div className={styles.input_container}>
						<label className={styles.label}>Название проекта</label>
						<input
							name='projectName'
							placeholder='Название'
							className={`${styles.input} ${
								nameDirty && nameError ? styles.error : ''
							}`}
							type='text'
							onBlur={handleBlur}
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						{nameDirty && nameError ? (
							<p className={styles.error_text}>Заполните поле</p>
						) : null}
					</div>
					<InputGenre
						selectedGenre={selectedGenre}
						setSelectedGenre={setSelectedGenre}
					/>

					<InputFormat
						selectedFormat={selectedFormat}
						setSelectedFormat={setSelectedFormat}
					/>
					<div className={styles.input_container}>
						<label className={`${styles.label} ${styles.unf}`}>
							№ УНФ или отсутствует
						</label>
						<input
							name='unnumbered'
							placeholder='890-000-000-00-000'
							className={styles.input}
							type='text'
							value={unnumbered}
							onChange={e => setUnnumbered(e.target.value)}
						/>
					</div>
				</div>
				<div className={styles.input_column}>
					<CountrySelector
						selectedCountry={selectedCountry}
						setSelectedCountry={setSelectedCountry}
					/>
					<div className={styles.input_container}>
						<label className={styles.label}>
							Сведения о сметной стоимости производства фильма на территории
							Нижегородской области, если есть
						</label>
						<input
							name='budget'
							placeholder='Сметная стоимость'
							className={styles.input}
							type='text'
							value={budget}
							onChange={e => setBudget(e.target.value)}
						/>
					</div>
					<div className={styles.input_container}>
						<label className={styles.label}>Синопсис</label>
						<textarea
							name='synopsis'
							placeholder='Напишите краткое изложение'
							className={`${styles.input_sinop} ${styles.secondary_input}`}
							value={synopsis}
							onChange={e => setSynopsis(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className={styles.pag_btn}>
				<div className={styles.pagination}>
					<p className={styles.num_pag}>1</p>
					<p className={styles.num_pag}>2</p>
					<p className={styles.num_pag}>...</p>
					<p className={styles.num_pag}>4</p>
					<p className={styles.num_pag}>
						<Image src={arrow_pag} alt='arrow_pag' />
					</p>
				</div>
				<div className={styles.btn_container}>
					<button
						onClick={handleSave}
						disabled={isButtonDisabled}
						className={styles.next_btn}
					>
						Следующий шаг
					</button>
					<Image className={styles.arrow_img} src={arrow_right} alt='arrow' />
				</div>
			</div>
		</div>
	)
}
