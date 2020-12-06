import dayjs from "dayjs";

export function getLastUpdated(time) {
  return dayjs(time).fromNow();
}
