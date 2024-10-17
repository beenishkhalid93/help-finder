from django.shortcuts import render
from rest_framework import viewsets
from .models import Case
from rest_framework import status
from .serializers import CaseSerializer
from django_backend.utils import APIResponse  # Assuming you have this utility

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer

    # List (Get all cases)
    def list(self, request, *args, **kwargs):
        try:
            # Retrieve all cases from the database
            cases = Case.objects.all()
            # Serialize the cases data
            serializer = CaseSerializer(cases, many=True)

            # Return a successful API response with all cases data
            return APIResponse(
                status=True,
                message='Cases retrieved successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )

        except Exception as e:
            # Handle any unexpected errors
            return APIResponse(
                status=False,
                message='Failed to retrieve cases',
                error=str(e),
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Retrieve (Get case by ID)
    def retrieve(self, request, pk=None):
        try:
            # Get the specific case by ID (pk)
            case = Case.objects.get(pk=pk)
            # Serialize the case data
            serializer = CaseSerializer(case)

            # Return a successful API response with the case data
            return APIResponse(
                status=True,
                message='Case retrieved successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )

        except Case.DoesNotExist:
            # Handle case where the case with the specified ID does not exist
            return APIResponse(
                status=False,
                message='Case not found',
                error='No case found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            # Handle any unexpected errors
            return APIResponse(
                status=False,
                message='Failed to retrieve case',
                error=str(e),
                code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Create (Add) case
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return APIResponse(
                status=True,
                message='Case created successfully',
                data=serializer.data,
                code=status.HTTP_201_CREATED
            )
        return APIResponse(
            status=False,
            message='Case creation failed',
            error=serializer.errors,
            code=status.HTTP_400_BAD_REQUEST
        )

    # Update case
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return APIResponse(
                status=True,
                message='Case updated successfully',
                data=serializer.data,
                code=status.HTTP_200_OK
            )
        return APIResponse(
            status=False,
            message='Case update failed',
            error=serializer.errors,
            code=status.HTTP_400_BAD_REQUEST
        )

    # Delete case
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return APIResponse(
                status=True,
                message='Case deleted successfully',
                data=None,
                code=status.HTTP_200_OK  # Return 200 instead of 204 to include a response
            )
        except Case.DoesNotExist:
            return APIResponse(
                status=False,
                message='Case not found',
                error='No case found with this ID',
                code=status.HTTP_404_NOT_FOUND
            )
