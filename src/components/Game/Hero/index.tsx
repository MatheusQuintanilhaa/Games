import React from 'react';
import { IPosition } from '../../../contexts/canvas/types';
import useHeroMoviment from '../../../hooks/useHeroMoviment';
import { EDirections, HELMET_OFFSET, TILE_SIZE } from '../../../settings/constants';
import './Hero.css';

interface IProps {
  initialPosition: IPosition;
}

function Hero(props: IProps) {
  const { position, direction } = useHeroMoviment(props.initialPosition);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y * TILE_SIZE - HELMET_OFFSET}px`,
        left: `${position.x * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE + HELMET_OFFSET,
        backgroundImage: `url(./assets/hero.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `0px -${TILE_SIZE - HELMET_OFFSET}px`,
        animation: 'hero-animation 1s steps(4) infinite',
        transform: `scaleX(${direction === EDirections.LEFT ? -1 : 1})`,
        zIndex: 1,
      }}
    />
  );
}

export default Hero;
