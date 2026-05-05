import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';

import {
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import JobCard from '../../components/JobCard';
import { appReducer, initialState } from '../../state/reducer';
import { loadJobs, updateJobStatus } from '../../state/actions';

import './MainPage.css';

const { Title } = Typography;
const { Content } = Layout;

type Job = {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: number;
};

const STATUSES = ['interview', 'test', 'offer', 'rejected', 'applied'];

const Column = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`column-drop ${isOver ? 'over' : ''}`}
    >
      {children}
    </div>
  );
};

const MainPage: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  useEffect(() => {
    loadJobs(dispatch, state.pagination.currentPage, state.filters);
  }, []);

  const groupedJobs = useMemo(() => {
    const map: Record<string, Job[]> = {};
    STATUSES.forEach((s) => (map[s] = []));

    state.jobs.forEach((job: Job) => {
      if (!map[job.status]) map[job.status] = [];
      map[job.status].push(job);
    });

    return map;
  }, [state.jobs]);

  const handleDragStart = (event: DragStartEvent) => {
    const job = state.jobs.find(j => j.id === Number(event.active.id));
    if (job) setActiveJob(job);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = Number(active.id);

    let newStatus: string;

    if (STATUSES.includes(over.id as string)) {
      newStatus = over.id as string;
    } else {
      const target = state.jobs.find(j => j.id === Number(over.id));
      if (!target) return;
      newStatus = target.status;
    }

    const job = state.jobs.find(j => j.id === jobId);
    if (!job || job.status === newStatus) return;

    updateJobStatus(dispatch, jobId, newStatus);

  };

  return (
    <Layout className='page'>
      <Content>
        <Title className='title'>Job Tracker</Title>

        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Row gutter={16}>
            {STATUSES.map((status) => (
              <Col span={4} key={status}>
                <Card
                  className={`column-card status-${status}`}
                  title={<span className='column-title'>{status.toUpperCase()}</span>}
                >
                  <Column id={status}>
                    <SortableContext
                      items={groupedJobs[status].map(j => j.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {groupedJobs[status].map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </SortableContext>
                  </Column>
                </Card>
              </Col>
            ))}
          </Row>

          <DragOverlay>
            {activeJob ? (
              <div className='drag-overlay'>
                <JobCard job={activeJob} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Content>
    </Layout>
  );
};

export default MainPage;
