from django.db import models

# Create your models here. name, description, duration, and avatar
class Projects(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    duration = models.CharField(max_length=120)
    avatar = models.TextField()

    def _str_(self):
        return self.name