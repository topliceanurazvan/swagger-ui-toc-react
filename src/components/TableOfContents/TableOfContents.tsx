import React, { useEffect, useState } from "react";

import { DataNode } from "antd/lib/tree";

import { DownOutlined } from "@ant-design/icons";

import { SUPPORTED_METHODS } from "../../constants";

import { TableOfContentsItem } from "../../models/swaggerUI";

import TableOfContentsLabel from "../TableOfContentsLabel";

import * as S from "./styled";

interface IProps {
  layoutActions: any;
  spec: any;
}

const tableOfContentsScrollToElement = (content: TableOfContentsItem, layoutActions: any) => {
  const { operationElementId, operationId, tag } = content;

  if (operationElementId) {
    // if operation expanded, scroll to operation summary
    if (document.getElementById(operationElementId)?.classList.contains("is-open")) {
      document.getElementById(operationElementId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // expand the operation and the scroll to operation summary
      layoutActions.show(["operations", tag || "default", operationId], true);

      setTimeout(() => {
        document.getElementById(operationElementId)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }
  // } else if (kuskExtensionRef) {
  //   document.getElementById(kuskExtensionRef)?.scrollIntoView({ behavior: "smooth" });
  // }
};

const createTableOfContentsTreeData = (spec: any, layoutActions: any): DataNode[] => {
  let treeData: DataNode[] = [];

  const rootNodeContent: TableOfContentsItem = {
    label: <TableOfContentsLabel level="top" path="Root object" />,
  };

  treeData.push({
    key: "root",
    className: "tree-root-object",
    title: (
      <S.ContentLabel
        $level="top"
        $ref={""}
        onClick={() => tableOfContentsScrollToElement(rootNodeContent, layoutActions)}
      >
        {rootNodeContent.label}
      </S.ContentLabel>
    ),
    children: Object.entries(spec.paths).map((pathEntry: [string, any]) => {
      const [path, pathValue] = pathEntry;

      const pathNodeContent: TableOfContentsItem = {
        label: <TableOfContentsLabel level="path" path={path} />,
      };

      return {
        key: path,
        title: (
          <S.ContentLabel
            $level="path"
            $ref=""
            onClick={() => tableOfContentsScrollToElement(pathNodeContent, layoutActions)}
          >
            {pathNodeContent.label}
          </S.ContentLabel>
        ),
        children: Object.entries(pathValue)
          .filter((entry) => SUPPORTED_METHODS.includes(entry[0]))
          .flatMap((operationEntry: [string, any]) => {
            const [operation, operationValue] = operationEntry;

            const reconstructedPath = path.substring(1).replaceAll("{", "").replaceAll("}", "");

            const deprecated = operationValue["deprecated"];
            let reconstructedPathId = reconstructedPath.replaceAll("/", "__");
            const reconstructedPathRef = reconstructedPath.replaceAll("/", "-");

            if (operationValue.parameters) {
              reconstructedPathId += "_";
            }

            let kuskExtensionRef: string = "";
            const operationId: string = operationValue["operationId"] || `${operation}_${reconstructedPathId}`;

            if (operationValue["x-kusk"]) {
              kuskExtensionRef = `${reconstructedPathRef}-${operation}-extension`;
            }

            let tags: string[];

            if (operationValue.tags && operationValue.tags.length) {
              tags = operationValue.tags;
            } else {
              tags = ["default"];
            }

            return tags.map((tag: string) => {
              const operationTagNodeContent: TableOfContentsItem = {
                label: (
                  <TableOfContentsLabel
                    deprecated={deprecated}
                    level="operation"
                    operation={operation}
                    path={path}
                    tag={tag}
                  />
                ),
                operationId,
                operationElementId: `operations-${tag}-${operationId}`,
                tag,
              };

              return {
                key: operationId,
                title: (
                  <S.ContentLabel
                    $level="operation"
                    $ref={operationTagNodeContent.operationElementId || ""}
                    onClick={() => tableOfContentsScrollToElement(operationTagNodeContent, layoutActions)}
                  >
                    {operationTagNodeContent.label}
                  </S.ContentLabel>
                ),
              };
            });
          }),
      };
    }),
  });

  return treeData;
};

const TableOfContents: React.FC<IProps> = (props) => {
  const { layoutActions, spec } = props;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [tableContentStatus, setTableContentStatus] = useState<"collapsed" | "expanded">("expanded");

  const treeData = createTableOfContentsTreeData(spec, layoutActions);

  useEffect(() => {
    if (!treeData) {
      return;
    }

    if (treeData[0].children?.length && tableContentStatus === "expanded") {
      const treePathsKeys = treeData[0].children?.map((pathNode) => pathNode.key);

      setExpandedKeys(["root", ...treePathsKeys]);
      return;
    }

    setExpandedKeys(["root"]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableContentStatus]);

  if (!treeData) {
    return null;
  }

  return (
    <S.TableOfContentsContainer>
      <S.TableOfContentsTitle>
        Table of contents
        <S.ExpandCollapseButton
          type="ghost"
          onClick={() => {
            if (tableContentStatus === "collapsed") {
              setTableContentStatus("expanded");
            } else {
              setTableContentStatus("collapsed");
            }
          }}
        >
          {tableContentStatus === "collapsed" ? "Expand all" : "Colapse all"}
        </S.ExpandCollapseButton>
      </S.TableOfContentsTitle>
      <S.ContentContainer>
        <S.Tree
          expandedKeys={expandedKeys}
          showLine={{ showLeafIcon: false }}
          showIcon={false}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          onExpand={(expandedKeysValue) => {
            if (!expandedKeysValue.length || expandedKeysValue.length === 1) {
              setTimeout(() => setTableContentStatus("collapsed"), 200);
            }

            if (expandedKeysValue.length - 1 === treeData[0].children?.length) {
              setTimeout(() => setTableContentStatus("expanded"), 200);
            }

            setExpandedKeys(expandedKeysValue);
          }}
        />
      </S.ContentContainer>
    </S.TableOfContentsContainer>
  );
};

export default TableOfContents;
