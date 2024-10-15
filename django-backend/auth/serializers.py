from rest_framework import serializers
from users.models import User  # Import the User model from the users app
from django.contrib.auth.hashers import make_password

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'firstname', 'surname', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Hide the password in responses
        }

    def create(self, validated_data):
        
        if 'password' not in validated_data:
            validated_data['password'] = make_password('Password@123')  # Default password (avoid in real systems)
        else:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
