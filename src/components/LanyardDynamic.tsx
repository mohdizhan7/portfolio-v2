'use client';

import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

export default Lanyard;
