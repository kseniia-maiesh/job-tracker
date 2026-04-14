import django_filters
from .models import JobApplication
from .utils import parse_salary_range

class JobApplicationFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status')
    employment_type = django_filters.CharFilter(field_name='employment_type')
    salary_range = django_filters.CharFilter(method='filter_salary_range')

    class Meta:
        model = JobApplication
        fields = ['status', 'employment_type']

    def filter_salary_range(self, queryset, name, value):
        min_salary, max_salary = parse_salary_range(value)
        return queryset.filter(salary__gte=min_salary, salary__lte=max_salary)