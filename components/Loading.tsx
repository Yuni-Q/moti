import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Loading = () =>  {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  if(loading) {
    return <div style={{zIndex:100, position: 'fixed', top: 0, left:0, color: 'red'}}>Loading....</div>
  }
  return <div style={{zIndex:100, position: 'fixed', top: 0, left:0, color: 'red'}}>done</div>
}

export default Loading;