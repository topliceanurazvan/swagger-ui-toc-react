import React from "react";

import { TableOfContents } from "../components";

const TableOfContentsPlugin = (system: any) => ({
  wrapComponents: {
    info: (Original: any) => (props: any) => {
      const { layoutActions, specSelectors } = system.getSystem();

      const spec = specSelectors.specJson().toJS();

      return (
        <>
          <Original {...props} />

          <TableOfContents layoutActions={layoutActions} spec={spec} />
        </>
      );
    },
  },
});

export default TableOfContentsPlugin;
