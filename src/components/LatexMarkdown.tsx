import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

type Props = {
  children: string,
  className?: string,
}

export default function LatexMarkdown({ children, className }: Props) {
  return (
    <Markdown 
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className={className}
    >{children}</Markdown>
  )
}