import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from '../../../context/UserContext';
import useGetUser from '../../../hooks/useGetUser';
import StatusIcon from '../StatusIcon';

/**
 * returns a name with status badge, and link to the profile accessible
 * only by admins
 *
 * @param {Object} props
 * @param {number} props.userId the id of the user that made the sighting
 * @param {string} props.backupUsername if the user is not logged in
 * @example <VarifiedUsername userId={userId} backupUsername={backupUsername} />
 * @returns {React.ReactElement}
 */

const VarifiedUsername = ({
  userId,
  backupUsername,
}: {
  userId: string;
  backupUsername: string;
}): React.ReactElement => {
  const { user, getUser } = useGetUser();
  const { userInfo } = useUserState();

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getUsername = () => {
    if (userInfo?.userRole === 'admin' && user && userId) {
      return (
        <>
          <span>Who: </span>
          <Link to={`/admin/edit-users/${userId}`} style={{ display: 'flex', alignItems: 'end' }}>
            {user.username} <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
          </Link>
        </>
      );
    } else if (userInfo?.userRole && user && userId) {
      return (
        <p style={{ display: 'flex', alignItems: 'end' }}>
          <span>Who: </span>
          {user.username} <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
        </p>
      );
    } else if (!user || !userInfo) {
      return (
        <p>
          <span>Who: </span>
          {backupUsername ? backupUsername : 'Anonymous'}
        </p>
      );
    }
  };

  return <>{getUsername()}</>;
};

export default VarifiedUsername;
