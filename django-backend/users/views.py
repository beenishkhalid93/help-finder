from rest_framework import viewsets, status
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse  # Import HttpResponse here
from django_backend.utils import APIResponse  # Import the APIResponse utility
from django.contrib.auth.hashers import make_password

def index(request):
    return HttpResponse("Hello, this is the users app!")

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # List (Get all users)
    def list(self, request, *args, **kwargs):
        try:
            # Retrieve all users from the database
            users = User.objects.all()
            # Serialize the users data
            serializer = UserSerializer(users, many=True)

            # Return a successful API response with all users data
            return APIResponse(
                status=True,
                message='Users retrieved successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )

        except Exception as e:
            # Handle any unexpected errors
            return APIResponse(
                status=False,
                message='Failed to retrieve users',
                error=str(e),
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Retrieve (Get) a specific user by ID
    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            # Try to find the user by primary key (id)
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user)

            # Return a successful API response with user data
            return APIResponse(
                status=True,
                message='User retrieved successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            # Return an error response if the user does not exist
            return APIResponse(
                status=False,
                message='User not found',
                error='No user found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )

    # Create (Add) user
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Check if email is unique
        if User.objects.filter(email=request.data.get('email')).exists():
            return APIResponse(
                status=False,
                message='Email already exists',
                error='This email is already in use.', 
                code=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if serializer is valid
        if serializer.is_valid():
            # Hash the password before saving
            serializer.validated_data['password'] = make_password(serializer.validated_data.get('password'))
            serializer.save()
            return APIResponse(
                status=True,
                message='User created successfully',
                data=serializer.data,
                code=status.HTTP_201_CREATED
            )
        
        # If serializer is not valid, return error response
        return APIResponse(
            status=False,
            message='User creation failed',
            error=serializer.errors,
            code=status.HTTP_400_BAD_REQUEST
        )

    # Override the destroy method to handle deletion by id
    def destroy(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return APIResponse(
                status=True,
                message='User deleted successfully',
                data=None,
                code=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return APIResponse(
                status=False,
                message='User not found',
                error='No user found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )

    # The update method is inherited from ModelViewSet. It handles both PUT and PATCH requests.
    def update(self, request, pk=None):
        try:
            # Get the specific user by ID (pk)
            user = User.objects.get(pk=pk)

            # Pass the request data to the serializer to validate and update the user instance
            serializer = UserSerializer(user, data=request.data, partial=False)  # `partial=True` for PATCH, False for PUT

            if serializer.is_valid():
                serializer.save()
                return APIResponse(
                    status=True,
                    message='User updated successfully',
                    data=serializer.data,
                    code=status.HTTP_200_OK
                )

            error_response = serializer.errors
            return APIResponse(
                status=False,
                message='Update failed',
                error='This email is already in use.', 
                code=status.HTTP_400_BAD_REQUEST
            )

        except User.DoesNotExist:
            return APIResponse(
                status=False,
                message='User not found',
                error='No user found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )
