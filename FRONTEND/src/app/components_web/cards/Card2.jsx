import React from 'react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react"

import styles from './styles/Card1.module.css'

const Card1 = () => {
    return (
        <div className={styles.Card1Wrapper}>
            <div className="max-w-sm bg-white rounded-lg shadow glowing-border pb-5">
                <a href="#">
                    <img className="rounded-t-lg" src="https://cdn.discordapp.com/attachments/997179771450568855/1169027689529753710/vector-cartoon-illustration-school-building-green-lawn-road-trees-educalion-l_134830-1588.png?ex=6553e8e0&is=654173e0&hm=17d2795492df9ae02ef56c753a5432776787751e5dd8c5c58c61be032dad2784&" alt="" />
                    
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">American highschool party</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700">Match the americen aesthetic and come dressed up!</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#1f40af] rounded-lg transition transition-full transition-length-300 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card1;