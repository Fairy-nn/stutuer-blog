import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Heading } from 'fumadocs-ui/components/heading';
import {
  ImageZoom,
  type ImageZoomProps,
} from 'fumadocs-ui/components/image-zoom';
import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  ...defaultComponents,
  img: (props: ImageZoomProps) => (
    <ImageZoom {...props} />
  ),
  a: (props) => (
    <a
      {...props}
      className='no-underline text-blue-500 hover:text-blue-400 [overflow-wrap:anywhere]'
    />
  ),
  strong: (props) => (
    <strong {...props} className='font-semibold text-gray-900 dark:text-gray-100' />
  ),
  code: (props) => <code {...props} className='text-gray-900 dark:text-gray-100 mx-2' />,
  em: (props) => <em {...props} className='italic text-pink-300' />,
  h1: (props) => (
    <Heading
      as='h1'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-2xl sm:text-3xl'
    />
  ),
  h2: (props) => (
    <Heading
      as='h2'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-xl sm:text-2xl'
    />
  ),
  h3: (props) => (
    <Heading
      as='h3'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-lg sm:text-xl'
    />
  ),
  h4: (props) => (
    <Heading
      as='h4'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-lg sm:text-xl'
    />
  ),
  h5: (props) => (
    <Heading
      as='h5'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-lg sm:text-xl'
    />
  ),
  h6: (props) => (
    <Heading
      as='h6'
      {...props}
      className='text-gray-900 dark:text-gray-100 font-thin text-lg sm:text-xl'
    />
  ),
  pre: ({ ref: _ref, ...props }) => (
    <CodeBlock
      {...props}
      viewportProps={{
        className: 'max-h-fit',
      }}
    >
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
};
