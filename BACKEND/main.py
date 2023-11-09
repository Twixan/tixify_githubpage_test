import os
import uvicorn
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import supabase_main as supabase
import tokens_tixify as token_tixify
import tixify_helper as helper

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ticket/add")
async def add_ticket(ticket_name: str, ticket_price: float, ticket_phone_number: int, ticket_event: int, api_key: str, email: str):
    if not api_key == token_tixify.API_KEY_TICKET_ADDING:
        return {"error": "Invalid API Key"}
    
    ticket_hash, ticket_status_code = await supabase.add_ticket_supabase(ticket_name, ticket_price, ticket_phone_number, ticket_event, email)
    qr_code_status_code: bool = helper.generate_qr_code(email, ticket_hash)

    if not qr_code_status_code:
        return {"error": "Failed to generate QR Code"}
    
    ticket_status_code: int = await supabase.mark_email_as_sent_ticket_supabase(ticket_hash)

    if ticket_status_code != 200:
        return {"error": "Internal Server Error"}
    return {f"success: {ticket_status_code}"}
    
 
@app.get("/total/revenue") 
async def total_revenue():
    ticket_total_price, amount_of_tickets = await supabase.fetch_ticket_price_list_supabase()
    
    return {"total_revenue": ticket_total_price}


@app.get("/ticket/validate")
async def ticket_validate(ticket_hash: str, api_key: str):
    try:
        if api_key != token_tixify.API_KEY_VALIDATOR_TICKET:
            return 500

        ticket_valid: bool = await supabase.is_ticket_valid(ticket_hash)

        if not ticket_valid:
            return 500
    
        status_code: int = await supabase.mark_ticket_invalid(ticket_hash)
        return status_code

    except Exception as e:
        print(e)
        return 500
    

@app.get("/ticket/name")
async def ticket_name(ticket_hash: str, api_key: str):
    try:
        if api_key != token_tixify.API_KEY_VALIDATOR_TICKET:
            return 500

        ticket_name: str = await supabase.fetch_name_based_of_hash(ticket_hash)
        return ticket_name
    
    except Exception as e:
        print(e)
        return 500


async def main():
    port = int(os.environ.get("PORT", 8000))
    config = uvicorn.Config(app, host="0.0.0.0", port=port, loop="asyncio")
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())