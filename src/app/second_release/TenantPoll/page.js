'use client';
import React, { useState } from 'react'
import TenantPoll from './components/tenantPoll';
import PollTable from './components/PollTable';
import {Poll} from './components/pollData';

const Polls = () => {
    const [data, setData]= useState(Poll || [])
    
  return (
    <div className="flex flex-col space-y-7 pt-8 pl-4">
        {data.length === 0
        ? 
        <TenantPoll data={data} />
        : 
        <PollTable Data={data}/>
        }
    
    
    </div>
  )
}

export default Polls