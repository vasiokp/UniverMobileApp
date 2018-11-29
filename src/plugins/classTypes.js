const classTypes = {
	DEFAULT: '#444',
	CLASS: '#0650F0',
	LAB: '#F745E7',
	LECTURE: '#0650F0',
	PRACTICAL: '#FC8D26',
	SEMINAR: '#398A3E',
	STUDY_GROUP: '#D9B800'
}

const getColor = classType => {
	switch (classType) {
	case 'CLASS':
		return classTypes.CLASS
	case 'LAB':
		return classTypes.LAB
	case 'LECTURE':
		return classTypes.LECTURE
	case 'PRACTICAL':
		return classTypes.PRACTICAL
	case 'SEMINAR':
		return classTypes.SEMINAR
	case 'STUDY_GROUP':
		return classTypes.STUDY_GROUP
	case 'DEFAULT':
	default:
		return classTypes.DEFAULT
	}
}

export default {
	getColor
}
