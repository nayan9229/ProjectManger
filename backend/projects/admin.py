from django.contrib import admin
from .models import Projects
# Register your models here.

class ProjectsAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'duration', 'avatar')

admin.site.register(Projects, ProjectsAdmin)