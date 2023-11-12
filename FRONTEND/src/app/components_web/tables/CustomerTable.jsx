'use client'
import React, {useState, useEffect} from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";

import styles from './styles/styles.CustomerTable.module.css'

import {GetCustomerDataById} from '../data_fetch/GetCustomerDataById.js'
import {GetCustomerEmailById} from '../data_fetch/GetCustomerEmailById.js'
import {GetCustomerPhoneNumberById} from '../data_fetch/GetCustomerPhoneNumberById.js'
import {GetCustomerCreatedAtById} from '../data_fetch/GetCustomerCreatedAtById.js'
import {GetCustomerEmailSentById} from '../data_fetch/GetCustomerEmailSentById.js'



const CustomerTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const userId = 432;

    const [ticketPurchaserName, setTicketPurchaserName] = useState(null);
    const [ticketPurchaserEmail, setTicketPurchaserEmail] = useState(null);
    const [ticketPurchaserPhoneNumber, setTicketPurchaserPhoneNumber] = useState(null);
    const [ticketCreatedAt, setTicketCreatedAt] = useState(null);
    const [ticketEmailSent, setTicketEmailSent] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            if (userId) {
                const PurchaserName = await GetCustomerDataById(userId);
                setTicketPurchaserName(PurchaserName);
                const PurchaserEmail = await GetCustomerEmailById(userId);
                setTicketPurchaserEmail(PurchaserEmail);
                const PurchaserPhoneNumber = await GetCustomerPhoneNumberById(userId);
                setTicketPurchaserPhoneNumber(PurchaserPhoneNumber);
                const PurchaserCreatedAt = await GetCustomerCreatedAtById(userId);
                setTicketCreatedAt(PurchaserCreatedAt);
                const PurchaserEmailSent = await GetCustomerEmailSentById(userId);
                setTicketEmailSent(PurchaserEmailSent);

                setIsLoading(false);
            }
        }
        fetchUserData();
    }, [userId]);

    const rows = [
        {
            key: "1",
            created_at: ticketCreatedAt,
            purchaser_name: ticketPurchaserName,
            email_sent: ticketEmailSent,
            phone_number: ticketPurchaserPhoneNumber,
            email: ticketPurchaserEmail,
        },
        {
            key: "2",
            created_at: "TEST_6",
            purchaser_name: "TEST_7",
            email_sent: "TEST_8",
            phone_number: "TEST_9",
            email: "TEST_10",
        },
        {
            key: "3",
            created_at: "TEST_11",
            purchaser_name: "TEST_12",
            email_sent: "TEST_13",
            phone_number: "TEST_14",
            email: "TEST_15",
        },
        {
            key: "4",
            created_at: "TEST_16",
            purchaser_name: "TEST_17",
            email_sent: "TEST_18",
            phone_number: "TEST_19",
            email: "TEST_20",
        },
        {
            key: "5",
            created_at: "TEST_21",
            purchaser_name: "TEST_22",
            email_sent: "TEST_23",
            phone_number: "TEST_24",
            email: "TEST_25",
        },
    ]
    
    const columns = [
        {
            key: "purchaser_name",
            title: "Purchaser Name",
        },
        {
            key: "created_at",
            title: "Created at",
        },
        {
            key: "email_sent",
            title: "Email Sent",
        },
        {
            key: "phone_number",
            title: "Phone Number",
        },
        {
            key: "email",
            title: "Email",
        },
    ]

    return (
        <>
        {isLoading && (
           <div role="status" className={styles.SpinnerLoaderTimeframe}>
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
       </div>
        )}


        <Table aria-label="test table gais" className={styles.TableWrapper}>
            <TableHeader columns={columns} className="text-black text-left">
                {((column) => <TableColumn  className="bg-white p-2 pl-4 rounded rounded-md" key={column.key}>{column.title}</TableColumn>)}
            </TableHeader>

            <TableBody items={rows}>
                {((item) => (
                    <TableRow key={item.key}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>{getKeyValue(item, column.key)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}

export default CustomerTable
