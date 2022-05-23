import { useEffect, useRef, useState } from 'react'

export default function UploadImageForm(props: {
  image?: string
  showImagePreview: boolean
  handleUpload: (url: string) => void
}) {
  const [imageSrc, setImageSrc] = useState<string>()
  const [uploadingData, setUploadingData] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setImageSrc(props.image)
  }, [props.image])

  const handleOnChange = async () => {
    setUploadingData(true)
    const files = (fileInputRef.current! as HTMLInputElement).files
    if (files!.length > 0) {
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
      props.handleUpload(data.secure_url)
    } else {
      setImageSrc(undefined)
      props.handleUpload('')
    }

    setUploadingData(false)
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/*"
        disabled={uploadingData}
        onChange={handleOnChange}
      />
      {props.showImagePreview && <img src={imageSrc} />}
    </>
  )
}
