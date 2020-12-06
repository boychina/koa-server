import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getLastUpdated(time) {
  return dayjs(time).fromNow();
}
