const QUESTIONS_TO_SESSION_KEYS: Record<string, string> = {
	q3: 'جسدك الطاقي',
	q4: 'جلسة النية',
	q5: 'كارما العائلة',
	q6: 'جسدك الطاقي',
	q7: 'كارما العائلة',
	q8: 'الطفل الداخلي',
	q9: 'المسح الشامل',
};

const KEYS_TO_CALENDLY_KEYS: Record<string, string | null> = {
	'جسدك الطاقي': null,
	'جلسة النية': '5dc6a32c-5503-4424-80bc-ef7fc4052594',
	'كارما العائلة': 'a864366c-ff2b-4fd5-bb71-9078ee79bd61',
	'الطفل الداخلي': '084998ac-241f-4a7d-a410-6368ff8c8f12',
	'المسح الشامل': '0c2d17db-c167-472a-9bd0-49d34a47c01a',
};


const MORE_THAN_5_KEY = 'المسح الشامل';

const countYes = (obj:any): number => Object.values(obj).filter((value) => value === 'yes').length;

const getCoursesNamesSetsFromFromData = (obj: any): string[] => {
	const extracted = Object.entries(obj)
		.filter(([, value]) => value === 'yes')
		.filter(([key]) => !!QUESTIONS_TO_SESSION_KEYS[key])
		.map(([key]) => QUESTIONS_TO_SESSION_KEYS[key]);

	const names = Array.from(new Set(extracted));
	return names;
};

const getCaldenlyKeysByCoursesNames = (courseNames:string[]) => {
	const suggestionsKeys: string[] = [];
	courseNames.map((name) => {
		if (KEYS_TO_CALENDLY_KEYS[name]) {
			suggestionsKeys.push(KEYS_TO_CALENDLY_KEYS[name]!);
		}
		return null;
	});
	return suggestionsKeys;
};


const handleDataOfForm = (data: any): string[] => {
	const yesCount = countYes(data);
	if (yesCount >= 5) {
		return getCaldenlyKeysByCoursesNames([MORE_THAN_5_KEY]);
	}
	const sessionKeys = getCaldenlyKeysByCoursesNames(getCoursesNamesSetsFromFromData(data));

	return sessionKeys;
};

export default handleDataOfForm;
