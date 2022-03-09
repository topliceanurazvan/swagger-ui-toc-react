import React, { useCallback } from "react";

import * as S from "./styled";

interface IProps {
  level: "top" | "path" | "operation";
  path: string;
  deprecated?: boolean;
  operation?: string;
  tag?: string;
}

const TableOfContentsLabel: React.FC<IProps> = (props) => {
  const { level, path } = props;
  const { deprecated = false, operation = "", tag = "" } = props;

  const onTagClickHandler = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      const tagId = `operations-tag-${tag}`;

      document.getElementById(tagId)?.scrollIntoView({ behavior: "smooth" });
    },
    [tag]
  );

  return (
    <S.Container $level={level}>
      {level === "operation" && <S.LabelTag onClick={onTagClickHandler}>{tag}</S.LabelTag>}

      <S.LabelPath $deprecated={deprecated}>{path}</S.LabelPath>

      {level === "operation" && (
        <S.LabelMethodTag $deprecated={deprecated} $method={operation}>
          {operation.toUpperCase()}
        </S.LabelMethodTag>
      )}
    </S.Container>
  );
};

export default TableOfContentsLabel;
