"use client"

import React, {useState, useEffect} from 'react'
import { CardModal } from "@/components/models/card-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
     <CardModal />
    </>
  )
}
