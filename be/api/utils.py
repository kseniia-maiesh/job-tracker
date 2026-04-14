def parse_salary_range(salary_range):
    min_salary, max_salary = map(int, salary_range.split('-'))
    return min_salary, max_salary
