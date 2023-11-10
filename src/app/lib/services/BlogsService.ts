import { Blog, BlogDetails } from '@/app/util/types/remote-types';
import { BLOGS_URLS } from '@/app/util/url';
import GetPaginationAsync from '@/app/util/ApiClient/GetPaginationAsync';
import { QueryParams } from '@/app/util/types/local-types';
import GetAsync from '@/app/util/ApiClient/GetAsync';

const sessiosnURL = BLOGS_URLS.ALL_BLOGS;

async function getPaginationBlogs(
	locale: string,
	queryParams: QueryParams = {},
) {
	const blogsPagination = await GetPaginationAsync<Blog>({
		url: sessiosnURL,
		locale,
		params: queryParams,
	});
	return blogsPagination;
}

async function getPreviewBlogs(locale: string, queryParams: QueryParams = {}) {
	const sessionsPagination = await GetPaginationAsync<Blog>({
		url: sessiosnURL,
		locale,
		params: queryParams,
	});
	return sessionsPagination.items;
}

async function getSingleBlog(locale:string, slug: string) {
	const session = await GetAsync<BlogDetails>({
		url: `${sessiosnURL}/${slug}`,
		locale,
	});
	return session;
}

const BlogsService = {
	getPaginationBlogs,
	getPreviewBlogs,
	getSingleBlog,
};

export default BlogsService;
