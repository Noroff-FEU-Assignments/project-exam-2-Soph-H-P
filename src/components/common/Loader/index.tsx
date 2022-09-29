import { AnimatedBird, LoaderContainer } from './index.styled';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * Returns a circular loader with a bird inside eating a worm
 * the animation comes from a sprite that is animated 
 * to move from left to right 
 * @param {Object} props
 * @param {number} props.size
 * @param {boolean | undefined} props.light
 * @example
 * returns a dark coloured loader that is 100px wide and high
 * <Loader size={100}/>
 * @returns {React.ReactElement}
 */

const Loader = ({ size, light }: { size: number; light?: boolean }): React.ReactElement => {
  return (
    <LoaderContainer $light={light} $size={size}>
      <LoadingOutlined style={{ fontSize: size - size / 8 }} spin />
      <AnimatedBird $size={size} $light={light} />
    </LoaderContainer>
  );
};

export default Loader;
