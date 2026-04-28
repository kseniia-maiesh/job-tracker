import React from 'react';
import { Card, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { Text } = Typography;

type Props = {
  job: {
    id: number;
    company: string;
    position: string;
    salary: number;
  };
};

const JobCard: React.FC<Props> = ({ job }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 12,
    cursor: 'grab',
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text strong>{job.position}</Text>
      <br />
      <Text type="secondary">{job.company}</Text>
      <br />
      <Text>${job.salary}</Text>
    </Card>
  );
};

export default JobCard;
