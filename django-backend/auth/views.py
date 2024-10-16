from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from users.models import User
from .serializers import SignupSerializer, LoginSerializer
from django_backend.utils import APIResponse  # Import the updated APIResponse utility


@api_view(['POST'])
def signup_user(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        # Ensure unique email
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return APIResponse(
                status='failure', 
                message='Email is already taken', 
                error={'This email is already in use.'}, 
                code=status.HTTP_400_BAD_REQUEST
            )
        
        # Save the new user
        serializer.save()
        email = request.data.get('email')
        user = User.objects.get(email=email)
        return APIResponse(
            status='success', 
            message='Signup successful', 
            data={'email': user.email, 'firstname': user.firstname}, 
            code=status.HTTP_201_CREATED
        )
        
    error_response = serializer.errors
    return APIResponse(
        status='failure', 
        message='Signup failed', 
        error=error_response['email'][0], 
        code=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return APIResponse(
            status='failure', 
            message='Invalid Credentials', 
            error={'email': 'Email not found'}, 
            code=status.HTTP_401_UNAUTHORIZED
        )

    if not check_password(password, user.password):
        return APIResponse(
            status='failure', 
            message='Invalid Credentials', 
            error={'password': 'Incorrect password'}, 
            code=status.HTTP_401_UNAUTHORIZED
        )

    return APIResponse(
        status='success', 
        message='Login successful', 
        data={'email': user.email, 'firstname': user.firstname}, 
        code=status.HTTP_200_OK
    )
