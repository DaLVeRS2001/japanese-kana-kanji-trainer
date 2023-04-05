import block from 'bem-cn';

import './Editor.scss';

const b = block('editor');

const Editor = () => {
  return <div className={b()}>Editor</div>;
};

export default Editor;
