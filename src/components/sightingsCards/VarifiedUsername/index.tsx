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
  profileId,
  backupUsername,
}: {
  profileId: string;
  backupUsername: string;
}): React.ReactElement => {
  const { user, getUser } = useGetUser();
  const { userInfo } = useUserState();

  useEffect(() => {
    getUser(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  const getUsername = () => {
    if (userInfo?.userRole === 'admin' && user && profileId) {
      return (
        <>
          <span>Who: </span>
          <Link
            to={`/admin/edit-users/${profileId}`}
            style={{ display: 'flex', alignItems: 'end' }}
          >
            {user.username}{' '}
            <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
          </Link>
        </>
      );
    } else if (userInfo?.userRole && user && profileId) {
      return (
        <p style={{ display: 'flex', alignItems: 'end' }}>
          <span>Who: </span>
          {user.username}{' '}
          <StatusIcon status={user.sightings || 0} userRole={user.userRole} />
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
