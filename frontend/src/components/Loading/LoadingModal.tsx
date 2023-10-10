import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../services/controllers/common/CommonSelector';
import Loading from './Loading';
import Modal from '../Modal/Modal';

interface LoadingViewProps {
  open?: boolean;
}
const LoadingView: React.FC<LoadingViewProps> = ({ open = false }): React.ReactElement => {
  const loading = useSelector(selectLoading);
  return (
    <Modal isShowing={open || loading}>
      <Loading size="lg" />
    </Modal>
  );
};

export default LoadingView;
