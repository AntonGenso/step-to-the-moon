'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getMissionCard, type MissionView } from '@/src/services/missionService';
import { MobileMissionDetail } from '@/src/components/profile/mobile/MobileMissionDetail';

/**
 * `id` is the card id the list routes with: `27` for the mission itself,
 * `27-bonus` for its bonus card.
 */
export default function MissionPage() {
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const [mission, setMission] = useState<MissionView | null>(null);

  useEffect(() => {
    let active = true;
    getMissionCard(id, locale)
      .then((card) => {
        if (active) setMission(card);
      })
      .catch(() => {
        if (active) setMission(null);
      });
    return () => {
      active = false;
    };
  }, [id, locale]);

  if (!mission) return null;

  return <MobileMissionDetail mission={mission} />;
}
