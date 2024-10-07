import markdownItKatex from '@traptitech/markdown-it-katex';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

export default function LatexMarkdownEditor({ onChange, height='500px' }: { onChange: (value: {text: string, html: string}) => void, height?: string }) {
  const mdIt = new MarkdownIt();
  mdIt.use(markdownItKatex);

  return (<MarkdownEditor
    style={{ height, marginBottom: '16px' }}
    id="markdownContent"
    name=""
    renderHTML={(text) => mdIt.render(text)}
    onChange={onChange}
  />);
}