from rest_framework.authentication import TokenAuthentication

from django.conf import settings
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

def expires_in(token: Token):
    elapsed_time = timezone.now() - token.created
    return timedelta(minutes=settings.TOKEN_EXPIRED_AFTER_MINUTES) - elapsed_time

def is_token_expired(token):
    return expires_in(token) < timedelta(seconds=0)

def handle_token_expired(token):
    Token.objects.filter(key=token).delete()

def authenticate_credentials(key):
    is_valid = True
    try:
        token = Token.objects.get(key=key)
    except Token.DoesNotExist:
        is_valid = False

    if not token.user.is_active:
        is_valid = False

    if is_token_expired(token):
        handle_token_expired(token)
        is_valid = False

    return is_valid