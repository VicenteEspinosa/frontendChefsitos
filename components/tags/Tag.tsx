import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TagService, Tag } from '../../services/tag.service'

export default function TagSelector(props: {
  initialValues?: number[]
  isMobile: boolean
  onSelectionChange: (ids: number[]) => void
}) {
  const [data, setData] = useState([] as Tag[])
  const [tagChosen, setTagChosen] = React.useState<Tag[] | null>(null)
  const formWidth = props.isMobile ? 2 / 2 : 1 / 2

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    if (tagChosen) {
      props.onSelectionChange(tagChosen.map((tag) => tag.id))
    } else {
      props.onSelectionChange([])
    }
  }, [tagChosen])

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
    if (props.initialValues) {
      setTagChosen(
        fetchLoad!.filter((tag) => props.initialValues!.includes(tag.id))
      )
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
      console.log(error)
      return undefined
    }
  }

  return (
    <>
      <Autocomplete
        className="tags-field"
        value={tagChosen ? tagChosen : []}
        onChange={(event: object, value: Tag[] | null, reason: string) => {
          if (reason === 'selectOption' || reason === 'removeOption') {
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
    </>
  )
}
