import qrcode
import resend
import base64
import io

import tokens_tixify as token_tixify
from email_layout import body_html


def generate_qr_code(email, ticket_hash):
    try:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        base_endpoint_url = 'https://tixify-production.up.railway.app/ticket/validate?ticket_hash=' + ticket_hash

        qr.add_data(base_endpoint_url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        image_cache_qr = img
        status_code_email = send_qrcode(email, image_cache_qr)

        if status_code_email != 200:
            return False
        return True
    
    except Exception as e:
        print(e)
        return False


def send_qrcode(recipient_email: str, image_cache_qr) -> int:
    try:
        resend.api_key = token_tixify.RESEND_API_KEY

        byte_array = io.BytesIO()
        image_cache_qr.save(byte_array, format='PNG')
        byte_array.seek(0)

        base64_image = base64.b64encode(byte_array.getvalue()).decode('utf-8')

        subject = 'Thank you for purchasing your ticket!'

        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": recipient_email,
            "subject": subject,
            "html": body_html,
            "attachments": [
                {
                    "filename": "ticket.png",
                    "content": base64_image,
                    "type": "image/png"
                }
            ]
        })
        print(r)

        return 200

    except Exception as e:
        print(f"An error occurred while sending email: {e}")
        return 500