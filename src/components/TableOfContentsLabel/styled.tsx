import { Tag as RawTag } from "antd";

import { ApiOutlined as RawApiOutlined } from "@ant-design/icons";

import styled from "styled-components";

const swaggerUIMethodsColors: { [method: string]: string } = {
  delete: "#F93E3E",
  get: "#61AFFE",
  head: "#9012FE",
  options: "#0D5AA7",
  patch: "#50E3C2",
  post: "#49CC90",
  put: "#FCA130",
};

export const ApiOutlined = styled(RawApiOutlined)`
  font-size: 18px;
`;

export const Container = styled.div<{ $level: "top" | "path" | "operation" }>`
  ${({ $level }) => `
    margin-bottom: ${$level === "operation" ? "14px" : "0px"};
  `}

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LabelMethodTag = styled(RawTag)<{ $deprecated: boolean; $method: string }>`
  ${({ $deprecated, $method }) => `
    background-color: ${$deprecated ? "#EBEBEB" : swaggerUIMethodsColors[$method]};
    opacity: ${$deprecated ? "0.6" : "1"};
  `}

  font-weight: bold;
  color: #151515;
  border: none;
  padding: 1px 8px;
  margin: 0;
`;

export const LabelPath = styled.span<{ $deprecated: boolean }>`
  ${({ $deprecated }) => `
    text-decoration: ${$deprecated ? "line-through" : ""};
    opacity: ${$deprecated ? "0.65" : "1"};
  `}
`;

export const LabelTag = styled(RawTag)`
  background-color: #262626;
  color: #ffffff;
  margin: 0;
  font-size: 11px;
`;
