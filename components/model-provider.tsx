"use client";

import React, { useEffect, useState } from 'react'
import ProModel from './pro-model';

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div><ProModel /></div>
    )
}

export default ModelProvider