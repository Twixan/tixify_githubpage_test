import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react"

import styles from './styles/Card1.module.css'

const Card1 = () => {
    return (
        <div className={styles.Card1Wrapper}>
            <div class="max-w-sm bg-white rounded-lg shadow glowing-border">
                <a href="#">
                    <img class="rounded-t-lg" src="https://cdn.discordapp.com/attachments/997179771450568855/1169004329613656186/109_1.png?ex=6553d31f&is=65415e1f&hm=7efe8c669c6f86e0ace0fcddd00c87ca2a8bc168b9b9ed051306f1301c6f1898&" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Halloween High School Party</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700">Scary Halloween Party!
                    All high school students welcome!
                    Please come dressed up!</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1f40af] rounded-lg transition transition-full transition-length-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Read more
                        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card1;