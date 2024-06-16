from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "birth_date",
            "gender",
            "phone_number",
            "street_address",
            "city",
            "state",
            "country",
            "zip_code",
            "profile_picture",
            "bio",
        ]
