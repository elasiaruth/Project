from django.shortcuts import render
from .models import Media
from .serializers import MediaSerializer
from rest_framework.viewsets import ModelViewSet


# Create your views here.
class MediaViewSet(ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer