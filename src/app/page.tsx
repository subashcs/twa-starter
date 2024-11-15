'use client';
import { Home as HomePage } from '@/views/Home';
import HeadingInfo from '@/components/HeadingInfo';
import { useEffect, useState } from 'react';
import { levelMinPoints, levelNames } from '@/constants';

export default function Home() {
  const pointsToAdd = 11;
  const profitPerHour = 126420;
  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(22749365);

  const addPoints = (points = 11) => {
    setPoints((prevPoints) => prevPoints + points);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex]);

  return (
    <>
      <HeadingInfo
        levelIndex={levelIndex}
        points={points}
        profitPerHour={profitPerHour}
      />
      <HomePage
        addPoints={addPoints}
        pointsToAdd={pointsToAdd}
        profitPerHour={profitPerHour}
        points={points}
      />
    </>
  );
}
