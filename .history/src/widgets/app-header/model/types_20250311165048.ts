interface IAppHeader {
    isInDashboardPage: boolean;
    breadcrumbItemName?: string;
    breadcrumbFeedId?: string;
    hasLangSelector: boolean;
    actionButton?: ReacJSX.Element;
  }
  
export type { IAppHeader };