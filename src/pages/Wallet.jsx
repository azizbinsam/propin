import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Wallet() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/dompet', { replace: true })
  }, [navigate])
  return null
}