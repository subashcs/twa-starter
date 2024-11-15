import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  dailyCipher,
  dailyCombo,
  dailyReward,
  dollarCoin,
  mainCharacter,
} from '../images';

type Props = {
  points: number;
  addPoints: (additionalPoints?: number) => void;
  pointsToAdd: number;
  profitPerHour: number;
};

export const Home = ({
  pointsToAdd,
  profitPerHour,
  points,
  addPoints,
}: Props) => {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState('');
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState('');
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState('');

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    addPoints(pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      addPoints(pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour, addPoints]);

  return (
    <>
      <div className='flex-grow mt-4 bg-sky-400 rounded-t-[48px] relative z-0'>
        <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>
          <div className='px-4 mt-6 flex justify-between gap-2'>
            <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
              <div className='dot'></div>
              <Image
                src={dailyReward}
                alt='Daily Reward'
                className='mx-auto w-12 h-12'
                width={100}
                height={100}
              />
              <p className='text-[10px] text-center text-white mt-1'>
                Daily reward
              </p>
              <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>
                {dailyRewardTimeLeft}
              </p>
            </div>
            <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
              <div className='dot'></div>
              <Image
                src={dailyCipher}
                alt='Daily Cipher'
                className='mx-auto w-12 h-12'
                width={100}
                height={100}
              />
              <p className='text-[10px] text-center text-white mt-1'>
                Daily cipher
              </p>
              <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>
                {dailyCipherTimeLeft}
              </p>
            </div>
            <div className='bg-[#272a2f] rounded-lg px-4 py-2 w-full relative'>
              <div className='dot'></div>
              <Image
                src={dailyCombo}
                alt='Daily Combo'
                className='mx-auto w-12 h-12'
                width={100}
                height={100}
              />
              <p className='text-[10px] text-center text-white mt-1'>
                Daily combo
              </p>
              <p className='text-[10px] font-medium text-center text-gray-400 mt-2'>
                {dailyComboTimeLeft}
              </p>
            </div>
          </div>

          <div className='px-4 mt-4 flex justify-center'>
            <div className='px-4 py-4 flex items-center space-x-2'>
              <Image
                src={dollarCoin}
                alt='Dollar Coin'
                className='m-1'
                width={30}
              />
              <p className='text-4xl text-white'>{points.toLocaleString()}</p>
            </div>
          </div>

          <div className='px-4 mt-4 flex justify-center'>
            <div
              className='w-80 h-80 p-4 rounded-full circle-outer'
              onClick={handleCardClick}
            >
              <div className='w-full h-full rounded-full circle-inner'>
                <Image
                  src={mainCharacter}
                  alt='Main Character'
                  className='w-full h-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fixed div */}

      {clicks.map((click) => (
        <div
          key={click.id}
          className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  );
};

export default Home;
