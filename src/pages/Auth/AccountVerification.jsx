import { useState, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { verifyUserAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const [verified, setVerified] = useState(false)
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!verified) {
    return <PageLoadingSpinner caption='Verifying your account...' />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
