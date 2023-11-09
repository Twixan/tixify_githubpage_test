import React from 'react'

import styles from './styles/styles.BreadCrumbsHeader.module.css'

const BreadCrumbsHeader = () => {
    return (
        <div 
        className={styles.BreadCrumbsHeaderWrapper}>
            <div 
            className="flex items-center whitespace-nowrap min-w-0 " 
            aria-label="Breadcrumb">
            <div 
            className="text-sm text-gray-600 dark:text-gray-400">
                <a 
                className="flex items-center hover:text-blue-600" 
                href="/dashboard">
                Dashboard
                <svg 
                className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true">
                    <path 
                    d="M6 13L10 3" 
                    stroke="currentColor" 
                    strokeLinecap="round"/>
                </svg>
                </a>
            </div>

            <div 
            className="text-sm text-gray-600 dark:text-gray-400">
                <a 
                className="flex items-center text-blue-600 hover:text-blue-400 transition transition-full transition-duration-300" 
                href="/scan/">
                Ticket scanner

                </a>
            </div>


            </div>
        </div>
    )
}

export default BreadCrumbsHeader