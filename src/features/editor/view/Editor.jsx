import block from 'bem-cn';
import { useEffect } from 'react';
import useCharacterList from 'hooks/useCharacterList';

import './Editor.scss';

const b = block('editor');

const Editor = () => {
  const characterList = useCharacterList();

  return <div className={b()}></div>;
};

export default Editor;
