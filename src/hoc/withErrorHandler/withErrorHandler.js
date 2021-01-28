import React, { useEffect, useState } from 'react'
import Modal from '../../components/UI/Modal/Modal'
 
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

    const [error, setError] = useState(null)
 
    const reqInterceptor = axios.interceptors.request.use(
      req => {
        setError(null)
        return req
      }
    )
 
    const resInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error)
        return Promise.reject(error)
      }
    )
 
    useEffect(
      () => {
        return () => {
          axios.interceptors.request.eject(reqInterceptor)
          axios.interceptors.response.eject(resInterceptor)
        }
      },
      [reqInterceptor, resInterceptor]
    )
 
    const errorConfirmedHandler = () => {
      setError(null)
    }
 
    return (
      <>
        <Modal show={error}
          modalClosed={errorConfirmedHandler}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}
 
export default withErrorHandler;