import { useState } from 'react'

interface useProductArgs {
  onChange?: () => void
}

export const useProduct = ({ onChange }: useProductArgs) => {
  const [counter, setCounter] = useState(0)

  const increaseBy = (value: number) => {
    setCounter(prev => Math.max(prev + value, 0))
    onChange && onChange()
  }

  return {
    counter,
    increaseBy
  }
}