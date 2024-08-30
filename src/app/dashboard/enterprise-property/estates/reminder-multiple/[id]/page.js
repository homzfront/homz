"use client"
import React, { useEffect, useState } from 'react'
import MultipleReminder from './multipleReminder'
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const extractedId = parts[parts.length - 1];
      setUrl(extractedId);
    }
  }, [router.asPath]);

  const id = url;

  return (
    <div className='overflow-y-auto h-screen scrollbar-container'>
      <MultipleReminder ids={id} />
    </div>
  )
}

export default App
