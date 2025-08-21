
from django.db import models

class PhotoManager(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    tags = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='photos/')
    directory = models.CharField(max_length=100, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

