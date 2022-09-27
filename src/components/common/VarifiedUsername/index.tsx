import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from '../../../context/UserContext';
import useGetUser from '../../../hooks/useGetUser';
import StatusIcon from '../StatusIcon';

const VarifiedUsername = ({
  userId,
  backupUsername,
}: {
  userId: string;
  backupUsername: string;
}) => {
  const { user, getUser } = useGetUser();
  const { userInfo } = useUserState();

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getUsername = () => {
    if (userInfo?.userRole === 'admin' && user) {
      return (
        <>
          <span>Who: </span>
          <Link to={`/admin/edit-users/${userId}`} style={{display: 'flex', alignItems: 'end'}}>
            {user.username} <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
          </Link>
        </>
      );
    } else if (userInfo?.userRole && user) {
      return (
        <p style={{display: 'flex', alignItems: 'end'}}>
          <span>Who: </span>
          {user.username} <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
        </p>
      );
    } else if (!userInfo) {
      return (
        <p>
          <span>Who: </span>
          {backupUsername ? backupUsername : 'Anonymous'}
        </p>
      );
    } else if (!user) {
      return (
        <p>
          <span>Who: </span>Anonymous
        </p>
      );
    }
  };

  return <>{getUsername()}</>;
};

export default VarifiedUsername;
