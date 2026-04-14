from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from .models import JobApplication
from .serializers import JobApplicationSerializer
from .filters import JobApplicationFilter

class JobApplicationViewSet(ModelViewSet):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = JobApplicationFilter

    def get_queryset(self):
        if self.request.method in ("GET", "HEAD", "OPTIONS"):
            return JobApplication.objects.all()

        return JobApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
