from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from .models import JobApplication
from .serializers import JobApplicationSerializer
from .filters import JobApplicationFilter

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class JobApplicationViewSet(ModelViewSet):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    pagination_class = StandardResultsSetPagination
    filterset_class = JobApplicationFilter

    def get_queryset(self):
        if self.request.method in ("GET", "HEAD", "OPTIONS"):
            return JobApplication.objects.all()

        return JobApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
