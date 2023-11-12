'use client'

import { useEffect, useState } from 'react';
import supabase from 'supabase_main';


const PurchaserTable = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    let { data, error } = await supabase
      .from('active_tickets')
      .select('create_at, ticket_purchaser_name, ticket_email_sent, ticket_phone_number, ticket_email');
    if (error) console.log('Error: ', error);
    else setTickets(data);
  }

  return (
    <table className="center">
      <thead>
        <tr>
          <th>Create At</th>
          <th>Purchaser Name</th>
          <th>Email Sent</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, index) => (
          <tr key={index}>
            <td>{ticket.create_at}</td>
            <td>{ticket.ticket_purchaser_name}</td>
            <td>{ticket.ticket_email_sent}</td>
            <td>{ticket.ticket_phone_number}</td>
            <td>{ticket.ticket_email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PurchaserTable;