import React, { useEffect, useMemo } from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import { useReducer } from 'react';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import JobCard from '../../components/JobCard';

import { appReducer, initialState } from '../../state/reducer';
import { loadDetails } from '../../state/actions';

const { Title } = Typography;
const { Content } = Layout;

type Job = {
  id: number;
  company: string;
  position: string;
  status: string;
  salary: number;
};

const STATUSES = ['applied', 'interview', 'test', 'offer', 'rejected'];

const MainPage: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadDetails(dispatch, state.pagination.currentPage, state.filters);
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
    const newStatus = over.id as string;

    const job = state.jobs.find((j: Job) => j.id === jobId);
    if (!job || job.status === newStatus) return;

    dispatch({
      type: 'UPDATE_JOB_STATUS',
      payload: { id: jobId, status: newStatus },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: 24 }}>
      <Content>
        <Title level={2}>Job Tracker</Title>

        <DndContext onDragEnd={handleDragEnd}>
          <Row gutter={16} align="top">
            {STATUSES.map((status) => (
              <Col span={4} key={status}>
                <Card title={status.toUpperCase()} bordered>
                  <SortableContext
                    items={groupedJobs[status].map((j) => j.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {groupedJobs[status].map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </SortableContext>
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
