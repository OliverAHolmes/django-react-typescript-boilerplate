from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        auth = request.headers.get("Authorization")

        if not auth:
            return None

        # Optionally, you can enforce the prefix if you want to accept both
        # if auth.startswith('Token '):
        #     auth = auth[len('Token '):]

        if not auth:
            return None

        return self.authenticate_credentials(auth)

    def authenticate_credentials(self, key):
        from rest_framework.authtoken.models import Token

        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid token.")

        if not token.user.is_active:
            raise AuthenticationFailed("User inactive or deleted.")

        return (token.user, token)
