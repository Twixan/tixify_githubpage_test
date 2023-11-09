import time
import string
import random

import tokens_tixify as token_tixify
from supabase import create_client, Client

url: str = token_tixify.SUPABASE_TOKEN_URL
key: str = token_tixify.SUPABASE_TOKEN
supabase: Client = create_client(url, key)

# SUPABASE TABLES
TABLE_ACTIVE_TICKETS: str = 'active_tickets'
TABLE_TIXIFY_PAYMENTS: str = 'tixify_payments'
TABLE_TOTAL_STATISTICS: str = 'total_statistics'
TABLE_CURRENT_EVENTS: str = 'current_events'
TABLE_PAST_EVENTS: str = 'past_events'
TABLE_FUTURE_EVENTS: str = 'future_events'
TABLE_USERS: str ='users'

# SUPABASE COLUMNS # in table active_tickets
TICKET_ID: int='ticket_id'
TICKET_PURCHASER_NAME: str = 'ticket_purchaser_name'
TICKET_PRICE: int = 'ticket_price'
TICKET_EVENT: int = 'ticket_event'
TICKET_PURCHASE_DATE: int = 'ticket_purchase_date'
TICKET_EMAIL_SENT: bool = 'ticket_email_sent'
TICKET_VALID: bool = 'ticket_valid'
TICKET_HASH: str = 'ticket_hash'
TICKET_PHONE_NUMBER: int = 'ticket_phone_number'
TICKET_EMAIL: str = 'ticket_email'

# SUPABASE COLUMNS # in table tixify_payments
PAYMENT_PURCHASER_AMOUNT: int = 'payment_purchaser_amount'
PAYMENT_PRICE: int = 'payment_price'
PAYMENT_HASH: str = 'payment_hash'
PAYMENT_EVENT: int = 'payment_event'
PAYMENT_PURCHASE_DATE: int = 'payment_purchase_date'
PAYMENT_EMAIL_SENT: bool = 'payment_email_sent'
PAYMENT_SUCCESS: bool = 'payment_success'
PAYMENT_PURCHASER_EMAIL: str = 'payment_purchaser_email'

# SUPABASE COLUMNS # in table total_statistics
TOTAL_SALES: int = 'total_sales'
TOTAL_REVENUE: int = 'total_revenue'
EVENT_ID: int = 'event_id'

# SUPABASE COLUMNS # in table current_events
EVENT_TITLE: str = 'event_title'
EVENT_ID: int = 'event_id'
EVENT_TIME: int = 'event_time'
EVENT_IMAGE: str = 'event_image'
EVENT_USER_MAX: int = 'event_user_max'
EVENT_TICKETS_SOLD: int = 'event_tickets_sold'
EVENT_DESCRIPTION: str = 'event_description'

# SUPABASE COLUMNS # in table past_events
EVENT_TITLE: str = 'event_title'
EVENT_ID: int = 'event_id'
EVENT_TIME: int = 'event_time'
EVENT_IMAGE: str = 'event_image'
EVENT_USER_MAX: int = 'event_user_max'
EVENT_TICKETS_SOLD: int = 'event_tickets_sold'
EVENT_DESCRIPTION: str = 'event_description'

# SUPABASE COLUMNS # in table future_events
EVENT_TITLE: str = 'event_title'
EVENT_ID: int = 'event_id'
EVENT_TIME: int = 'event_time'
EVENT_IMAGE: str = 'event_image'
EVENT_USER_MAX: int = 'event_user_max'
EVENT_TICKETS_SOLD: int = 'event_tickets_sold'
EVENT_DESCRIPTION: str = 'event_description'

# SUPABASE COLUMNS # in table users
USER_ID: int='user_id'
USER_EMAIL: str='user_email'
USER_PASSWORD: str='user_password'


async def generate_hash():
    try:
        length = 40
        letters = string.ascii_lowercase
        letters_capital = string.ascii_uppercase
        numbers = string.digits
        generated_hash = ''.join(random.choice(letters + letters_capital + numbers) for i in range(length))

        hash_list = await fetch_ticket_hashes_supabase()
        print(f"Hash list: {hash_list}")
        if await is_hash_unique(generated_hash, hash_list):
            return generated_hash
        
    except Exception as e:
        print(e)
        return 500


async def is_hash_unique(hash: str, hash_list: list) -> bool:
    try:
        if hash in hash_list:
            print("Hash is not unique")
            return False
        
        print("Hash is unique")
        return True
    except Exception as e:
        print(e)
        return False


async def add_ticket_supabase(ticket_name: str, ticket_price: float, ticket_phone_number: int, ticket_event: int, email: str) -> int:
    """
    Adds a ticket to the supabase database
    """
    ticket_hash: str = await generate_hash()
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).insert({
            TICKET_PURCHASER_NAME: ticket_name,
            TICKET_PRICE: ticket_price,
            TICKET_PHONE_NUMBER: ticket_phone_number,
            TICKET_EVENT: ticket_event,
            TICKET_PURCHASE_DATE: time.time(),
            TICKET_EMAIL_SENT: False,
            TICKET_VALID: True,
            TICKET_HASH: ticket_hash,
            TICKET_EMAIL: email
        }).execute()

        if response_supabase.data == []:
            return 500
        
        ticket_status_code: int = 200
        return ticket_hash, ticket_status_code
    
    except Exception as e:
        print(e)
        return 500
    

async def mark_email_as_sent_ticket_supabase(ticket_hash: str) -> int:
    """
    Marks the email as sent in the supabase database
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).update({
            TICKET_EMAIL_SENT: True
        }).eq(TICKET_HASH, ticket_hash).execute()

        if response_supabase.data == []:
            return 500
        return 200
    
    except Exception as e:
        print(e)
        return 500
    

async def fetch_ticket_hashes_supabase() -> list:
    """
    Fetches all ticket hashes from supabase
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).select(TICKET_HASH).execute()

        if response_supabase.data == []:
            return []
        hash_list = response_supabase.data
        hash_list = [item['ticket_hash'] for item in hash_list]
        return hash_list
    
    except Exception as e:
        print(e)
        return []
    

async def fetch_ticket_price_list_supabase() -> float:
    """
    Fetches all ticket prices from supabase
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).select(TICKET_PRICE).execute()

        if response_supabase.data == []:
            return []
        price_list = response_supabase.data
        price_list = [item['ticket_price'] for item in price_list]
        ticket_total_price = sum(price_list)
        amount_of_tickets = len(price_list)
        return ticket_total_price, amount_of_tickets
    
    except Exception as e:
        print(e)
        return []
    

async def add_total_revenue_statistics_supabase(total_revenue: float, amount_of_tickets: int) -> int:
    """
    Adds total revenue to the supabase database
    """
    try:
        response_supabase = supabase.table(TABLE_TOTAL_STATISTICS).insert({
            TOTAL_REVENUE: total_revenue,
            TOTAL_SALES: amount_of_tickets,

        }).execute()

        if response_supabase.data == []:
            return 500
        return 200 
    
    except Exception as e:
        print(e)
        return 500
    

async def is_ticket_valid(ticket_hash: str) -> bool:
    """
    Checks if the ticket is valid
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).select(TICKET_VALID).eq(TICKET_HASH, ticket_hash).execute()

        if response_supabase.data == []:
            return False
        return response_supabase.data[0]['ticket_valid']
    
    except Exception as e:
        print(e)
        return False
    

async def mark_ticket_invalid(ticket_hash: str) -> int:
    """
    Marks the ticket as invalid
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).update({
            TICKET_VALID: False
        }).eq(TICKET_HASH, ticket_hash).execute()

        if response_supabase.data == []:
            return 500
        return 200
    
    except Exception as e:
        print(e)
        return 500
    
async def fetch_name_based_of_hash(ticket_hash: str) -> str:
    """
    Fetches the name based of the ticket hash
    """
    try:
        response_supabase = supabase.table(TABLE_ACTIVE_TICKETS).select(TICKET_PURCHASER_NAME).eq(TICKET_HASH, ticket_hash).execute()

        if response_supabase.data == []:
            return ""
        return response_supabase.data[0]['ticket_purchaser_name']
    
    except Exception as e:
        print(e)
        return ""