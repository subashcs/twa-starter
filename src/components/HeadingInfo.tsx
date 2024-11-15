import Image from 'next/image';

import Info from '../icons/Info';
import Settings from '../icons/Settings';

import Hamster from '../icons/Hamster';
import { levelMinPoints, levelNames } from '../constants';
import { binanceLogo, dollarCoin } from '../images';

type Props = {
  levelIndex: number;
  points: number;
  profitPerHour: number;
};

const calculateProgress = (levelIndex: number, points: number) => {
  if (levelIndex >= levelNames.length - 1) {
    return 100;
  }
  const currentLevelMin = levelMinPoints[levelIndex];
  const nextLevelMin = levelMinPoints[levelIndex + 1];
  const progress =
    ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
  return Math.min(progress, 100);
};

const formatProfitPerHour = (profit: number) => {
  if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
  if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
  if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
  return `+${profit}`;
};

const HeadingInfo = ({ profitPerHour, points, levelIndex }: Props) => {
  return (
    <div className='px-4 z-10'>
      <div className='flex items-center space-x-2 pt-4'>
        <div className='p-1 rounded-lg bg-[#1d2025]'>
          <Hamster size={24} className='text-[#d4d4d4]' />
        </div>
        <div>
          <p className='text-sm'>Subash (CEO)</p>
        </div>
      </div>
      <div className='flex items-center justify-between space-x-4 mb-2'>
        <div className='flex items-center w-1/3'>
          <div className='w-full'>
            <div className='flex justify-between'>
              <p className='text-sm'>{levelNames[levelIndex]}</p>
              <p className='text-sm'>
                {levelIndex + 1}{' '}
                <span className='text-[#95908a]'>/ {levelNames.length}</span>
              </p>
            </div>
            <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
              <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
                <div
                  className='progress-gradient h-2 rounded-full'
                  style={{ width: `${calculateProgress(levelIndex, points)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64'>
          <Image src={binanceLogo} alt='Exchange' className='w-8 h-8' />
          <div className='h-[32px] w-[2px] bg-[#43433b] mx-2'></div>
          <div className='flex-1 text-start'>
            <p className='text-xs text-[#85827d] font-medium'>
              Profit per hour
            </p>
            <div className='flex items-center justify-start space-x-1'>
              <Image
                src={dollarCoin}
                alt='Dollar Coin'
                className='w-[18px] h-[18px] mr-1'
              />
              <p className='text-sm'>{formatProfitPerHour(profitPerHour)}</p>
              <Info size={20} className='text-[#43433b]' />
            </div>
          </div>
          <div className='h-[32px] w-[2px] bg-[#43433b] mx-2'></div>
          <Settings className='text-white' />
        </div>
      </div>
    </div>
  );
};

export default HeadingInfo;
