import React from 'react'
import DefaultSelect from 'part:@sanity/components/selects/default'

const SelectAPI = (props) => {
  const handleChange = () => {
    props.onSelect()
  }

  return (
    <form className='chooseAPI'>
      <DefaultSelect label='Choose API' items={props.items} onChange={handleChange} />
    </form>
  )
}

export default SelectAPI
