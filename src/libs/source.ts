import config from 'config.json';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { blog } from '.source';

export const { getPage, getPages, pageTree } = loader({
  baseUrl: '/posts',
  source: createMDXSource(blog, []),
});

export const getDraftPages = () => getPages().filter((post) => post.data.draft);

export const getProdPages = () => getPages().filter((post) => !post.data.draft);

const posts = getProdPages();

export type Posts = typeof posts;

const tags = new Set<string>();
for (const post of posts) {
  if (post.data.tags) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
}

export const tagsList = Array.from(tags).sort();

export const tagsWithPosts: {
  name: string;
  posts: Posts;
}[] = [];

for (const tag of tags) {
  const filteredPosts = posts.filter((post) => post.data.tags?.includes(tag));
  tagsWithPosts.push({ name: tag, posts: filteredPosts });
}
tagsWithPosts.sort((a, b) => a.name.localeCompare(b.name));

const categories = new Set<string>();

for (const post of posts) {
  if (post.data.categories) {
    for (const category of post.data.categories) {
      categories.add(category);
    }
  }
}

export const categoriesList = Array.from(categories).sort();

export const categoriesWithPosts: {
  name: string;
  posts: Posts;
}[] = [];

for (const category of categories) {
  const filteredPosts = posts.filter((post) =>
    post.data.categories?.includes(category),
  );
  categoriesWithPosts.push({ name: category, posts: filteredPosts });
}
categoriesWithPosts.sort((a, b) => a.name.localeCompare(b.name));

export const myCategoriesList = config.myCategoriesList as string[];

export const withoutMyCategoriesList = categoriesList.filter((category) => {
  for (const myCategory of myCategoriesList) {
    if (category === myCategory) {
      return false;
    }
  }
  return true;
});

export const myCategoriesWithPosts: typeof categoriesWithPosts = [];

export const withoutMyCategoriesWithPosts = categoriesWithPosts.filter(
  (category) => {
    for (const myCategory of myCategoriesList) {
      if (category.name === myCategory) {
        myCategoriesWithPosts.push(category);
        return false;
      }
    }
    return true;
  },
);
