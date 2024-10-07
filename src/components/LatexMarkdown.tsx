import rehypeKatex from 'rehype-katex';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/default.min.css';
import './LatexMarkdown.css';

type Props = {
  children: string,
  className?: string,
}

export default function LatexMarkdown({ children, className }: Props) {
  return (
    <Markdown 
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      className={className}
    >{children}</Markdown>
  )
}