import { useEffect, useState } from 'react';
import { bool, number, string } from 'prop-types';
import classnames from 'classnames';

import { updateContracts } from 'hooks/useContracts';

import './Countdown.scss';

const Countdown = ({
  className, enabled, target, title,
}) => {
  const [ updatingId, setUpdatingId ] = useState();
  const [ remaining, setRemaining ] = useState();

  useEffect(() => {
    if (!enabled) {
      return () => {};
    }

    const update = () => {
      if (target) {
        setRemaining(Math.max(new Date(target) - new Date(), 0));
      }
    };

    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [ enabled, target ]);

  useEffect(() => {
    if (enabled && remaining === 0 && !updatingId) {
      const newUpdatingId = setTimeout(() => setUpdatingId(), 10000);
      setUpdatingId(newUpdatingId);
      updateContracts();
    }
  }, [ enabled, remaining, updatingId ]);

  if (remaining === undefined) {
    return null;
  }

  const days = Math.floor(remaining / 1000 / 60 / 60 / 24);
  const hours = Math.floor((remaining / 1000 / 60 / 60) - (days * 24));
  const minutes = Math.floor((remaining / 1000 / 60) - (days * 24 * 60) - (hours * 60));
  const seconds = Math.floor((remaining / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));

  const daysStr = `${days < 10 ? '0' : ''}${days}`;
  const hoursStr = `${hours < 10 ? '0' : ''}${hours}`;
  const minutesStr = `${minutes < 10 ? '0' : ''}${minutes}`;
  const secondsStr = `${seconds < 10 ? '0' : ''}${seconds}`;

  if (days > 1) {
    return (
      <div className={ classnames('release-countdown', 'release-countdown--only-title', className) }>
        <h3 className="mid-title">
          { target.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            timeZone: 'utc',
            timeZoneName: 'short',
          }) }
        </h3>
      </div>
    );
  }

  return (
    <div className={ classnames('release-countdown', className) }>
      { !!title && (
        <h3 className="mid-title">Begins in</h3>
      ) }

      <ul>
        <li>
          <div className="release-countdown-nr release-countdown--days">{ daysStr }</div>
          <small>Days</small>
        </li>
        <li>
          <div className="release-countdown-nr release-countdown--hours">{ hoursStr }</div>
          <small>Hours</small>
        </li>
        <li>
          <div className="release-countdown-nr release-countdown--minutes">{ minutesStr }</div>
          <small>Minutes</small>
        </li>
        <li>
          <div className="release-countdown-nr release-countdown--seconds">{ secondsStr }</div>
          <small className="small-seconds">Seconds</small>
        </li>
      </ul>
    </div>
  );
};

Countdown.propTypes = {
  className: string,
  enabled: bool,
  target: number,
  title: string,
};

Countdown.defaultProps = {
  className: '',
  enabled: false,
  target: 0,
  title: '',
};

export default Countdown;
