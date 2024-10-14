from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.http import Http404, HttpResponse  # Import HttpResponse here
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password  # Import check_password

def index(request):
    return HttpResponse("Hello, this is the users app!")

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user exists by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # Verify the password using check_password
    if not check_password(password, user.password):
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # If the credentials are valid, return success response
    return Response({
        'message': 'Login successful',
        'user': {
            'email': user.email,
            'firstname': user.firstname
        }
    }, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Override the destroy method to handle deletion by id
    def destroy(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # The update method is inherited from ModelViewSet. It handles both PUT and PATCH requests.
    def update(self, request, pk=None):
        try:
            # Get the specific user by ID (pk)
            user = User.objects.get(pk=pk)

            # Pass the request data to the serializer to validate and update the user instance
            serializer = UserSerializer(user, data=request.data, partial=False)  # `partial=True` for PATCH, False for PUT

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

