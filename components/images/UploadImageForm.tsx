/* eslint-disable */
import { useRef, useState } from 'react'

export default function UploadImageForm(props: { showImagePreview: boolean }) {
  const [imageSrc, setImageSrc] = useState<string>()
  const [uploadData, setUploadData] = useState()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = (onChangeEvent: React.FormEvent) => {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      if (typeof onLoadEvent.target!.result === 'string') {
        setImageSrc(onLoadEvent.target!.result)
      } else {
        setImageSrc(undefined)
      }
      setUploadData(undefined)
    }
    const target = onChangeEvent.target as HTMLInputElement
    reader.readAsDataURL(target.files![0])
  }
  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const files = (fileInputRef.current! as HTMLInputElement).files
    const formData = new FormData()
    for (let i = 0; i < files!.length || 0; i++) {
      formData.append('file', files![i])
    }

    formData.append('upload_preset', 'recipelib')

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/cahinostroza/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then((r) => r.json())

    setImageSrc(data.secure_url)
    setUploadData(data)
  }
  return (
    <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <input ref={fileInputRef} type="file" name="file" accept="image/*" />
      {imageSrc && !uploadData && <button>Subir</button>}
      {props.showImagePreview && <img src={imageSrc} />}
    </form>
  )
}
