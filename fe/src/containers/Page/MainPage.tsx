import React, { useEffect, useMemo } from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import { useReducer } from 'react';
import type { DragEndEvent  } from '@dnd-kit/core';
import { useDroppable, DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import JobCard from '../../components/JobCard';

import { appReducer, initialState } from '../../state/reducer';
import { loadJobs, updateJobStatus } from '../../state/actions';

const { Title } = Typography;
const { Content } = Layout;

type Job = {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: number;
};

const Column = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={{ minHeight: 200 }}>
      {children}
    </div>
  );
};

const STATUSES = ['applied', 'interview', 'test', 'offer', 'rejected'];

const MainPage: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadJobs(dispatch, state.pagination.currentPage, state.filters);
  }, []);

  const groupedJobs = useMemo(() => {
    const map: Record<string, Job[]> = {};
    STATUSES.forEach((status) => (map[status] = []));

    state.jobs.forEach((job: Job) => {
      if (!map[job.status]) map[job.status] = [];
      map[job.status].push(job);
    });

    return map;
  }, [state.jobs]);

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) return;

  const jobId = Number(active.id);

  let newStatus: string;

  if (STATUSES.includes(over.id as string)) {
    newStatus = over.id as string;
  } else {
    const targetJob = state.jobs.find((j: Job) => j.id === Number(over.id));
    if (!targetJob) return;
    newStatus = targetJob.status;
  }

  const job = state.jobs.find((j: Job) => j.id === jobId);
  if (!job || job.status === newStatus) return;

  updateJobStatus(dispatch, jobId, newStatus);
};

  return (
    <Layout style={{ minHeight: '100vh', padding: 24 }}>
      <Content>
        <Title level={2}>Job Tracker</Title>

        <DndContext onDragEnd={handleDragEnd}>
          <Row gutter={16} align='top'>
            {STATUSES.map((status) => (
              <Col span={4} key={status}>
                <Card title={status.toUpperCase()} bordered>
                  <Column id={status}>
                    <SortableContext
                      items={groupedJobs[status].map((j) => j.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {groupedJobs[status].map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </SortableContext>
                  </Column>
                </Card>
              </Col>
            ))}
          </Row>
        </DndContext>
      </Content>
    </Layout>
  );
};

export default MainPage;
