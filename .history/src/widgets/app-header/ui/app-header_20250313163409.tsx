import { useLocation,Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { ModeToggle } from "@/shared/ui/mode-toggle";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { IAppHeader } from "../model";
import { LanguageSelector } from "@/features";

export const AppHeader = ({
  isInDashboardPage = false,
  breadcrumbItemName,
  hasLangSelector,
  actionButton,
}: IAppHeader) => {
  const location = useLocation();
  const {categoryName,subcategoryName} = location.state || {};

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <ModeToggle />
      <Separator orientation="vertical" className="mr-1 h-4" />
      {hasLangSelector && (
        <>
          <LanguageSelector />
          <Separator orientation="vertical" className="mr-1 h-4" />
        </>
      )}
      <div className="flex justify-between items-center w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
                Dashboard
            </BreadcrumbItem>
            {!isInDashboardPage && !categoryName && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbItemName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
            {!isInDashboardPage && categoryName && !subcategoryName &&(
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {categoryName}
                </BreadcrumbItem>
              </>
            )}
            {!isInDashboardPage && categoryName && subcategoryName && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {categoryName}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {subcategoryName}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbItemName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {actionButton}
      </div>
    </header>
  );
};