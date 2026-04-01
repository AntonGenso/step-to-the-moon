import { missionData } from '@/src/components/utils/missionData';
import { testData } from '@/src/components/utils/testData';

/** Points per correct answer in a test */
export const POINTS_PER_QUESTION = 10;

/** Max score for each test = number of questions * points per question */
export const TEST_MAX_SCORES: Record<string, number> = Object.fromEntries(
  testData.map((t) => [`test_${t.id}`, t.questions.length * POINTS_PER_QUESTION]),
);

/** Mission IDs from the data */
export const MISSION_IDS = missionData.map((m) => `mission_${m.id}`);

/** Test IDs from the data */
export const TEST_IDS = testData.map((t) => `test_${t.id}`);

/** Total max XP for the progress bar */
export const MAX_XP = 690;
