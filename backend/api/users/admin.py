# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    # Define the fields to be used in displaying the User model.
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": (
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
                )
            },
        ),
    )
    # Add these fields to the 'add user' page.
    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {
                "fields": (
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
                )
            },
        ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
