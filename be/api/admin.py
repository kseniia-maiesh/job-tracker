from django.contrib import admin
from .models import JobApplication

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'status', 'employment_type', 'created_at')
    list_filter = ('status',)
    search_fields = ('company', 'position')
