import React from 'react';
import {Tooltip, Button, useDisclosure} from "@nextui-org/react";

import styles from './styles/AnouncementBanner.module.css'

const AnouncementBanner = () => {
    return (
        <div className={styles.AnouncementBannerWrapper}>
            <div className="bg-gradient-to-r from-white via-purple-800 to-blue-800">
                <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8 mx-auto">
                    <div className="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-white uppercase tracking-wider font-bold">
                            Celebration Connect
                            </p>
                  
                            <Tooltip
                            content={
                                <div className="px-5 py-2 border border-gray-200 rounded-md shadow bg-[#adadad]">
                                <div className="text-xs font-bold">English translation</div>
                                <div className="text-xxs">No time like now, no party like ours!</div>
                                </div>
                            }
                            >
                                <p className="text-xs mt-1 text-white font-noraml">
                                Ingen tid som nu, ingen fest som vår!
                                </p>
                            </Tooltip>
                        </div>
                 
                
                        <div className="text-center md:text-left md:flex md:justify-end md:items-center">
                        <a className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md" href="/american_house_party">
                            <p className="mr-2 inline-block text-white text-sm">
                                The American House Party kommer snart!
                            </p>
                            <span className="group-hover:bg-white/[.1] py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                                <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </span>
                            </a>
                        </div>
                    </div>  
                </div>
            </div>
        </div>




    )
}

export default AnouncementBanner;