import { Card } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../containers/Page/MainPage.css';

import '../containers/Page/MainPage.css';


const JobCard = ({ job }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`job-card ${isDragging ? 'dragging' : ''}`}
    >
      <Card size='small'>
        <div className='job-company'>{job.company}</div>
        <div className='job-position'>{job.position}</div>
        <div className='job-salary'>${job.salary}</div>
      </Card>
    </div>
  );
};

export default JobCard;