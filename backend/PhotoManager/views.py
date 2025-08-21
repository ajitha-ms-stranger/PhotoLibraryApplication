from django.shortcuts import render
from rest_framework import viewsets
from .models import PhotoManager
from .serializers import PhotoSerializer

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = PhotoManager.objects.all()
    serializer_class = PhotoSerializer
