import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'

export const getScheduleMoment = (item, lessons, now) => {
	if (moment(`${item.Date}T${item.End}`).isBefore(now)) {
		return -1 // completed
	}
	if (now.isBetween(moment(`${item.Date}T${item.Start}`), moment(`${item.Date}T${item.End}`))) {
		return 0 // current
	}
	if (!moment(item.Date, dateFormat).isSame(now, 'd')) {
		return 2 // future
	}
	if (!lessons) {
		return 2 // future
	}
	if (lessons.findIndex(l => now.isBetween(moment(`${l.Date}T${l.Start}`), moment(`${l.Date}T${l.End}`))) >= 0) {
		return 2 // future
	}
	const futureLessons = lessons.filter(l => moment(`${l.Date}T${l.Start}`).isAfter(now))
	if (!futureLessons || futureLessons.length === 0) {
		return 2 // future
	}
	futureLessons.sort((a, b) => {
		if (moment(`${a.Date}T${a.Start}`).isBefore(moment(`${b.Date}T${b.Start}`))) {
			return -1
		} else if (moment(`${a.Date}T${a.Start}`).isAfter(moment(`${b.Date}T${b.Start}`))) {
			return 1
		} else {
			return 0
		}
	})
	const nextLesson = futureLessons[0]
	if (item.Id === nextLesson.Id) {
		return 1 // current
	} else {
		return 2 // future
	}
}
