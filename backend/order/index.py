import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''Принимает заявку на покупку тренировки или марафона и отправляет её на почту тренера'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()
    contact = str(body.get('contact', '')).strip()
    product = str(body.get('product', '')).strip()
    price = str(body.get('price', '')).strip()
    comment = str(body.get('comment', '')).strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите имя и контакт'}),
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    email_to = os.environ.get('ORDER_EMAIL_TO') or smtp_user

    text = (
        'Новая заявка с сайта FORMA\n\n'
        f'Продукт: {product or "—"}\n'
        f'Цена: {price or "—"}\n'
        f'Имя: {name}\n'
        f'Контакт: {contact}\n'
        f'Комментарий: {comment or "—"}\n'
    )

    if not (smtp_host and smtp_user and smtp_password and email_to):
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'delivered': False}),
        }

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header(f'Заявка: {product or "покупка"}', 'utf-8')
    msg['From'] = smtp_user
    msg['To'] = email_to

    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [email_to], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'delivered': True}),
    }
