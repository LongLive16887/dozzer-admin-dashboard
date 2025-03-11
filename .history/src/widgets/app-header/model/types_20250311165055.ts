import React from "react";

interface IAppHeader {
    isInDashboardPage: boolean;
    breadcrumbItemName?: string;
    breadcrumbFeedId?: string;
    hasLangSelector: boolean;
    actionButton?: React.JSX.Element;
  }
  
export type { IAppHeader };