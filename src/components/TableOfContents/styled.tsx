import { Button as RawButton, Tree as RawTree } from "antd";
import { NativeButtonProps } from "antd/lib/button/button";
import React from "react";

import styled from "styled-components";

export const ContentContainer = styled.div`
  margin-top: 10px;
  color: #dbdbdb;
  border: 1px solid #434343;
  background: #151515;
  padding: 5px 15px;
  max-height: 700px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #151515;
  }

  ::-webkit-scrollbar-thumb {
    background: #434343;
  }
`;

export const ContentLabel = styled.div<{ $level: "top" | "path" | "operation"; $ref: string }>`
  ${({ $level }) => `
    margin-bottom: ${$level === "path" ? "5px" : "0px"};
  `}

  width: max-content;
  transition: all 0.2s ease-in;

  &:hover {
    ${({ $ref }) => {
      if ($ref) {
        return `
          color: #FFFFFF;
          cursor: pointer;
        `;
      }
    }}
  }
`;

export const ExpandCollapseButton = styled((props: NativeButtonProps) => <RawButton {...props} />)`
  color: #ffffff;
  border-color: #ffffff;

  & span {
    font-size: 14px;
  }

  &:active,
  &:focus {
    color: #ffffff;
    border-color: #ffffff;
  }
`;

export const TableOfContentsContainer = styled.div`
  margin-bottom: 30px;
`;

export const TableOfContentsTitle = styled.div`
  font-size: 18px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
`;

export const Tree = styled(RawTree)`
  background-color: #151515;
  color: #dbdbdb;

  & .ant-tree-switcher {
    background: #151515;
  }

  & .ant-tree-node-content-wrapper {
    cursor: default;

    &:hover {
      background-color: #151515;
    }
  }

  & .ant-tree-node-selected {
    background-color: #151515 !important;
  }

  & .tree-root-object {
    & .ant-tree-switcher {
      pointer-events: none;
      color: #434343;
    }
  }
`;
