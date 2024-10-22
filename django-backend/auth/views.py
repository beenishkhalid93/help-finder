from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from users.models import User
from .serializers import SignupSerializer, LoginSerializer
from django_backend.utils import APIResponse  # Import the updated APIResponse utility
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
def signup_user(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        # Ensure unique email
        if User.objects.filter(email=serializer.validated_data['email']).exists():
            return APIResponse(
                status=False, 
                message='Email is already taken', 
                error='This email is already in use.', 
                code=status.HTTP_400_BAD_REQUEST
            )
        
        # Save the new user
        user = serializer.save()

        # Generate JWT tokens for the new user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return APIResponse(
            status=True, 
            message='Signup successful', 
            data={
                'email': user.email, 
                'firstname': user.firstname, 
                'access_token': access_token,
                'refresh_token': str(refresh),
            },
            code=status.HTTP_201_CREATED
        )
        
    error_response = serializer.errors
    return APIResponse(
        status=False, 
        message='Signup failed', 
        # error=error_response['email'][0], 
        error=error_response.get('email', ['Invalid data'])[0], 
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
            status=False, 
            message='Invalid Credentials', 
            error='Email not found', 
            code=status.HTTP_401_UNAUTHORIZED
        )

    if not check_password(password, user.password):
        return APIResponse(
            status=False, 
            message='Invalid Credentials', 
            error='Incorrect password', 
            code=status.HTTP_401_UNAUTHORIZED
        )

    return APIResponse(
        status=True, 
        message='Login successful', 
        data={'email': user.email, 'firstname': user.firstname}, 
        code=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'This is a protected view'}, status=status.HTTP_200_OK)