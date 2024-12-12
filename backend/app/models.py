from django.db import models

# Create your models here.
class Media(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    MEDIA_TYPE_CHOICES = [
        ('MO', "Movie"),
        ('SR', "Series"),
        ('SH', "Short"),
    ]
    media_type = models.CharField(max_length=2, choices=MEDIA_TYPE_CHOICES)

    def __str__(self):
        return self.title
    
    class Meta:
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['media_type']),
        ]