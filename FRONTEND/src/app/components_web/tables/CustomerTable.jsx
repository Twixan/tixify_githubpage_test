'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import styles from './styles/styles.CustomerTable.module.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvrpwceetvgdwpzjidxm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cnB3Y2VldHZnZHdwemppZHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NTUyMTksImV4cCI6MjAxNDMzMTIxOX0.rQFoU3Nxz_MXQz9qr0RvHKqQj3eQvjYcRzC6D349iqs';
const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);

const CustomerTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchActiveTickets();
    }, []);

    const fetchActiveTickets = async () => {
        const { data, error } = await supabase
            .from('active_tickets')
            .select('*');

        if (error) {
            console.error('Error fetching active tickets:', error);
            return;
        }

        const formattedData = data.map((ticket, index) => ({
            key: (index + 1).toString(),
            created_at: ticket.created_at,
            purchaser_name: ticket.ticket_purchaser_name,
            email_sent: ticket.ticket_email_sent ? 'Yes' : 'No',
            phone_number: ticket.ticket_phone_number,
            email: ticket.ticket_email,
        }));

        setRows(formattedData);
        setIsLoading(false);
    };

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
    ];

    return (
        <>
            {isLoading && (
                <div role="status" className={styles.SpinnerLoaderTimeframe}>
                    <Spinner />
                    <span className="sr-only">Loading...</span>
                </div>
            )}

            <Table aria-label="test table gais" className={styles.TableWrapper}>
                <TableHeader columns={columns} className="text-black text-left">
                    {(column) => <TableColumn className="bg-white p-2 pl-4 rounded rounded-md" key={column.key}>{column.title}</TableColumn>}
                </TableHeader>

                <TableBody items={rows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>{getKeyValue(item, column.key)}</TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}

export default CustomerTable;