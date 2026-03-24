'use client';

import { useParams } from 'next/navigation';
import { missionData } from '@/src/components/utils/missionData';
import { MobileMissionDetail } from '@/src/components/profile/mobile/MobileMissionDetail';

export default function MissionPage() {
  const { id } = useParams<{ id: string }>();
  const mission = missionData.find((m) => m.id === Number(id));

  if (!mission) return null;

  return <MobileMissionDetail mission={mission} />;
}
