"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import SaveChanges from '../components/saveChanges';
import ToggleButton from '../../components/toggle';
import { getDigestSettings, updateDigestSettings } from '@/api/digestService';

const Notifications = () => {
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(true);

  const [digestEnabled, setDigestEnabled] = useState(true);
  const [loadingDigest, setLoadingDigest] = useState(true);
  const [savingDigest, setSavingDigest] = useState(false);

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await getDigestSettings();
      if (success) setDigestEnabled(!data?.digestOptOut);
      setLoadingDigest(false);
    })();
  }, []);

  const handleToggleDigest = async () => {
    if (savingDigest || loadingDigest) return;
    const next = !digestEnabled;
    setDigestEnabled(next);
    setSavingDigest(true);
    const { success } = await updateDigestSettings(!next);
    setSavingDigest(false);
    if (!success) {
      setDigestEnabled(!next);
      toast.error("Could not update digest setting");
    }
  };

  return (
    <div>
      <div className="border-t p-8">
      <div className="rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle2} isOpen={!isOpen2} />{" "}
            <p className="">Messages</p>
          </div>
        </div>
        <div className="mt-4 rounded-md text-[16px] font-[400] text-GrayHomz h-[56px] w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggle3} isOpen={!isOpen3} />{" "}
            <p className="">Alerts</p>
          </div>
        </div>
        <div className="mt-4 rounded-md text-[16px] font-[400] text-GrayHomz w-[600px] bg-inputBg flex flex-col p-8 justify-center">
          <div className="flex gap-2 items-center">
            <ToggleButton onToggle={handleToggleDigest} isOpen={digestEnabled} loading={loadingDigest || savingDigest} />{" "}
            <p className="">Biweekly Property Digest</p>
          </div>
          <p className="text-[13px] text-GrayHomz2 mt-2 ml-[52px]">
            A summary of activity across your properties, sent to your email every two weeks.
          </p>
        </div>
      </div>
      <div className='mt-[300px]'>
        <SaveChanges/>
      </div>
    </div>
  )
}

export default Notifications