from rest_framework import viewsets, status
from rest_framework.response import Response  # Import Response
from .models import User
from .serializers import UserSerializer
from django.http import Http404

def index(request):
    return HttpResponse("Hello, this is the users app!")

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


# Create your views here.