import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  TagService,
  Tag,
} from '../../services/tag.service'

export default function TagSelector(props: { isMobile: boolean }){
	const [data, setData] = useState([] as Tag[])
	const [tagChosen, setTagChosen] = React.useState<Tag | null>(null)
	const formWidth = props.isMobile ? 2 / 5 : 1 / 5

	useEffect(() => {
		getList()
	}, [])

	const getList = async () => {
		const preload = TagService.tagArrayValue
		if (preload) {
			setData(preload)
			return
		}
		const fetchLoad = await onTagFetch()
		if (fetchLoad) {
			setData(fetchLoad)
		}
		return
	}

	async function onTagFetch() {
		try {
			const tagArray = await TagService.getAllTags()
			if (tagArray) {
				return tagArray
			}
		} catch (error) {
			console.log('Error en la linea 40 de Tag.tsx')
			console.log(error)
			return undefined
		}
	}

	return (
		<>
			<Autocomplete 
				onChange={(
					event: object,
					value: Tag | null,
					reason: string
				) => {
					console.log(typeof event)
					if (reason === 'selectOption') {
						setTagChosen(value)
					} else if (reason === 'clear') {
						setTagChosen(null)
					}
				}}
				multiple
				id="tag-selector"
				options={data.sort(
					(a, b) => -b.name.charAt(0).localeCompare(a.name.charAt(0))
				)}
				groupBy={(option) => option.name.charAt(0).toUpperCase()}
				getOptionLabel={(option) => option.name}
				sx={{ width: formWidth }}
				renderInput={(params) => <TextField {...params} label="Tags" />}
			/>
			<div>{`Valor escogido: ${JSON.stringify(tagChosen)}`}</div>
		</>
	)
}