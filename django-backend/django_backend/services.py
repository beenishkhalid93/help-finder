from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
from rest_framework import status
from .utils import APIResponse

def decode_jwt_from_request(request):
    # Get the Authorization header
    auth_header = request.headers.get('Authorization', None)

    if not auth_header:
        return None, APIResponse(
            status=False,
            message='Authorization header missing',
            error='No Authorization header provided',
            code=status.HTTP_401_UNAUTHORIZED
        )

    # Check if the header is in the format 'Bearer <token>'
    parts = auth_header.split()
    if len(parts) != 2 or parts[0].lower() != 'bearer':
        return None, APIResponse(
            status=False,
            message='Invalid Authorization header format',
            error='Authorization header must be in the format: Bearer <token>',
            code=status.HTTP_401_UNAUTHORIZED
        )

    # Extract the token
    token = parts[1]

    # Try to decode the token
    try:
        access_token = AccessToken(token)
        user_id = access_token['user_id']
        return user_id, None
    except Exception as e:
        return None, APIResponse(
            status=False,
            message='Token validation failed',
            error=str(e),
            code=status.HTTP_401_UNAUTHORIZED
        )
