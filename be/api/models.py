from django.db import models
from django.contrib.auth.models import User

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('test', 'Test task'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
    ]

    EMPLOYMENT_TYPE = [
        ('remote', 'Remote'),
        ('office', 'Office'),
        ('hybrid', 'Hybrid'),
        ('part-time', 'Part-time'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='applied'
    )
    salary = models.IntegerField(null=True, blank=True)
    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_TYPE,
        default='remote'
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company} — {self.position}"
