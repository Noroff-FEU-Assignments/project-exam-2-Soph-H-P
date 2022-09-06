import { AnimatedBird, LoaderContainer } from './index.styled';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = ({ size, light }: { size: number; light?: boolean }) => {
  return (
    <LoaderContainer $light={light} $size={size}>
      {/* <LoadingOutlined style={{ fontSize: size - size / 8 }} spin /> */}
      <AnimatedBird $size={size} $light={light} />
    </LoaderContainer>
  );
};

export default Loader;
