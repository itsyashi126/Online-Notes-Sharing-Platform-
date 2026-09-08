"use Client"
import React from 'react'
import {useUser } from '@clerk/nextjs'

const page = () => {
  
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return <div> Hello {user.firstName}!</div>;
}


export default page
