export type PageLinkKey = 'home' | 'courses' | 'sessions' | 'blogs' | 'about_us';

export interface PageLinkBase {
	title: string,
	link: string,
	pageLinkKey: PageLinkKey

}
export interface PageLink {
	key: PageLinkKey,
	title: string,
	link: string,
	withOptions?: boolean,
	optionsUrl?: string,
	staticOptions?: any[]
}

export const pagesLinks : PageLink[] = [
	{
		key: 'home', title: 'Home', link: '/home',
	},
	{
		key: 'courses', title: 'Courses', link: '/courses', withOptions: true,
	},
	{
		key: 'sessions', title: 'Sessions', link: '/sessions', withOptions: true,
	},
	{
		key: 'blogs', title: 'Blogs', link: '/blogs', withOptions: true,
	},
	{
		key: 'about_us',
		title: 'About Us',
		link: '/about-us/ilhem-taher',
		withOptions: true,
		staticOptions: [
			{ title: 'الهام طاهر', link: '/about-us/ilhem-taher' },
			{ title: 'جمعية الطفولة الجديدة', link: '/about-us/children-support' },
			{ title: 'الاسئلة الشائعة', link: '/about-us/faq' },
		],
	},
];


export default {
	pagesLinks,
};
