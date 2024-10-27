# from rest_framework import viewsets, status
# from .models import User
from .serializers import UserSerializer
# from rest_framework.decorators import api_view
# from django.http import HttpResponse  # Import HttpResponse here
# from django_backend.utils import APIResponse  # Import the APIResponse utility
# from django.contrib.auth.hashers import make_password
# from rest_framework.decorators import api_view
# from rest_framework.decorators import action
from django_backend.services import decode_jwt_from_request 


# from rest_framework import viewsets
# from .models import User
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django_backend.utils import APIResponse

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def findAll(request):
    try:
        user_id, error_response = decode_jwt_from_request(request)
        print(f"Request headers: {user_id}")
        # Verify the authenticated user
        if request.user.is_authenticated:
            print(f"Authenticated user: {request.user.id}")
        else:
            print("User is not authenticated")
        
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return APIResponse(
            status=True,
            message='Users retrieved successfully',
            data=serializer.data,
            code=status.HTTP_200_OK
        )

    except Exception as e:
        return APIResponse(
            status=False,
            message='Failed to retrieve users',
            error=str(e),
            code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def findOne(request, id=None):
        try:
            # Try to find the user by primary key (id)
            user = User.objects.get(pk=id)
            print("User information: ", user)
            serializer = UserSerializer(user)

            return APIResponse(
                status=True,
                message='User retrieved successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            return APIResponse(
                status=False,
                message='User not found',
                error='No user found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create(request):
    print("access here")
    # serializer = self.get_serializer(data=request.data)
    serializer = UserSerializer(data=request.data)
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

# # Override the destroy method to handle deletion by id
# def destroy(self, request, pk=None):
#     try:
#         user = User.objects.get(pk=pk)
#         user.delete()
#         return APIResponse(
#             status=True,
#             message='User deleted successfully',
#             data=None,
#             code=status.HTTP_200_OK
#         )
#     except User.DoesNotExist:
#         return APIResponse(
#             status=False,
#             message='User not found',
#             error='No user found with this ID',
#             code=status.HTTP_404_NOT_FOUND
#         )

# # The update method is inherited from ModelViewSet. It handles both PUT and PATCH requests.
# def update(self, request, pk=None):
#     try:
#         # Get the specific user by ID (pk)
#         user = User.objects.get(pk=pk)

#         # Pass the request data to the serializer to validate and update the user instance
#         serializer = UserSerializer(user, data=request.data, partial=False)  # `partial=True` for PATCH, False for PUT

#         if serializer.is_valid():
#             serializer.save()
#             return APIResponse(
#                 status=True,
#                 message='User updated successfully',
#                 data=serializer.data,
#                 code=status.HTTP_200_OK
#             )

#         error_response = serializer.errors
#         return APIResponse(
#             status=False,
#             message='Update failed',
#             error='This email is already in use.', 
#             code=status.HTTP_400_BAD_REQUEST
#         )

#     except User.DoesNotExist:
#         return APIResponse(
#             status=False,
#             message='User not found',
#             error='No user found with this ID',
#             code=status.HTTP_404_NOT_FOUND
#         )

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     # Retrieve (Get) a specific user by ID
#     def retrieve(self, request, pk=None, *args, **kwargs):
#         try:
#             # Try to find the user by primary key (id)
#             user = User.objects.get(pk=pk)
#             serializer = UserSerializer(user)

#             # Return a successful API response with user data
#             return APIResponse(
#                 status=True,
#                 message='User retrieved successfully',
#                 data=serializer.data,
#                 code=status.HTTP_200_OK
#             )

#         except User.DoesNotExist:
#             # Return an error response if the user does not exist
#             return APIResponse(
#                 status=False,
#                 message='User not found',
#                 error='No user found with this ID',
#                 code=status.HTTP_404_NOT_FOUND
#             )

#     # Create (Add) user
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
    
#         # Check if email is unique
#         if User.objects.filter(email=request.data.get('email')).exists():
#             return APIResponse(
#                 status=False,
#                 message='Email already exists',
#                 error='This email is already in use.', 
#                 code=status.HTTP_400_BAD_REQUEST
#             )
    
#         # Check if serializer is valid
#         if serializer.is_valid():
#             # Hash the password before saving
#             serializer.validated_data['password'] = make_password(serializer.validated_data.get('password'))
#             serializer.save()
#             return APIResponse(
#                 status=True,
#                 message='User created successfully',
#                 data=serializer.data,
#                 code=status.HTTP_201_CREATED
#             )
    
#         # If serializer is not valid, return error response
#         return APIResponse(
#             status=False,
#             message='User creation failed',
#             error=serializer.errors,
#             code=status.HTTP_400_BAD_REQUEST
#         )

#     # Override the destroy method to handle deletion by id
#     def destroy(self, request, pk=None):
#         try:
#             user = User.objects.get(pk=pk)
#             user.delete()
#             return APIResponse(
#                 status=True,
#                 message='User deleted successfully',
#                 data=None,
#                 code=status.HTTP_200_OK
#             )
#         except User.DoesNotExist:
#             return APIResponse(
#                 status=False,
#                 message='User not found',
#                 error='No user found with this ID',
#                 code=status.HTTP_404_NOT_FOUND
#             )

#     # The update method is inherited from ModelViewSet. It handles both PUT and PATCH requests.
#     def update(self, request, pk=None):
#         try:
#             # Get the specific user by ID (pk)
#             user = User.objects.get(pk=pk)

#             # Pass the request data to the serializer to validate and update the user instance
#             serializer = UserSerializer(user, data=request.data, partial=False)  # `partial=True` for PATCH, False for PUT

#             if serializer.is_valid():
#                 serializer.save()
#                 return APIResponse(
#                     status=True,
#                     message='User updated successfully',
#                     data=serializer.data,
#                     code=status.HTTP_200_OK
#                 )

#             error_response = serializer.errors
#             return APIResponse(
#                 status=False,
#                 message='Update failed',
#                 error='This email is already in use.', 
#                 code=status.HTTP_400_BAD_REQUEST
#             )

#         except User.DoesNotExist:
#             return APIResponse(
#                 status=False,
#                 message='User not found',
#                 error='No user found with this ID',
#                 code=status.HTTP_404_NOT_FOUND
#             )

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def protected_view(request):
# #     return Response({'message': 'This is a protected view'}, status=status.HTTP_200_OK)
