/**
 * Takes a string of credits in the form of 'name1, name2, name3' and converts it to ['name1', 'name2', 'name3']
 */
export const formatCredits = (credit: string): Array<string> =>
	credit.split(", ")
