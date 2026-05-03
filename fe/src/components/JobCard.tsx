import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'antd';

type Job = {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: number;
};

const JobCard = ({ job }: { job: Job }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card size='small'>
        <div>{job.company}</div>
        <div>{job.position}</div>
      </Card>
    </div>
  );
};

export default JobCard;
