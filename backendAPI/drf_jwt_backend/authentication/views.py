from django.contrib.auth import get_user_model
from django.http.response import Http404
from rest_framework.views import APIView
from .serializers import RegistrationSerializer, UserSerializer
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

class UserRUD(APIView):
    def get_user(self, request):
        id = request.query_params.get('user')
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            raise Http404
        
    def get(self, request):
        user = self.get_user(request)
        seriializer = UserSerializer(user)
        return Response(seriializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = self.get_user(request)
        serializer = UserSerializer(user, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
