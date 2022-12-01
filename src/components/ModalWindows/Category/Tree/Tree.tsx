import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/Tree.scss';

type Props = {
  treeData: any[],
  handleOnCategorySelect: (value: string, children: any[]) => void,
}

export const Tree: React.FC<Props> = ({ treeData, handleOnCategorySelect }) => {
  return (
    <ul className='tree'>
      {treeData.map((node) => (
        <TreeNode key={uuidv4()} handleOnCategorySelect={handleOnCategorySelect} node={node} />
      ))}
    </ul>
  );
}

type Props2 = {
  node: any,
  handleOnCategorySelect: (value: string, children: any[]) => void,
}

const TreeNode: React.FC<Props2> = ({ node, handleOnCategorySelect }) => {
  const { children, label } = node;

  const [showChildren, setShowChildren] = useState(true);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    <>
      <li className='a' style={{ marginBottom: "20px" }}>
        <span onClick={(e) => {
          handleOnCategorySelect(e.currentTarget.innerText, children)
        }} >{label}</span>
      </li>
      {children && (
        <li
          style={{
            paddingLeft: "25px",
            borderLeft: "1px solid rgba(0, 56, 174, 0.3)"
          }}
        >
          {showChildren && <Tree handleOnCategorySelect={handleOnCategorySelect} treeData={children} />}
        </li>
      )}
    </>
  );
}
