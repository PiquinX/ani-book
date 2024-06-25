import React from 'react'

interface Props {
    defaultValue: string
    name: string
}

const EditRateValueInput: React.FC<Props> = ({ defaultValue, name }) => {
  return (
    <input
      className="text-black outline-0 font-bold"
      defaultValue={defaultValue || 'Edit content'}
      name={name}
    />
  )
}

export default EditRateValueInput
