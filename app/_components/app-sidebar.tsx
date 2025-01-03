import * as React from "react";
import {
  CarIcon,
  ChartBarStackedIcon,
  LayoutDashboardIcon,
  LucideIcon,
  PiggyBankIcon,
  ShoppingBasketIcon,
  ShowerHeadIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import Image from "next/image";

type NavMain = {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean;
    Icon?: LucideIcon;
  }[];
}[];
const navMain: NavMain = [
  {
    title: "Gestão",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        Icon: LayoutDashboardIcon,
      },
      {
        title: "Cliente",
        url: "/client",
        Icon: UserIcon,
      },
    ],
  },
  {
    title: "Cadastro",
    url: "#",
    items: [
      {
        title: "Produtos",
        url: "/product",
        Icon: ShoppingBasketIcon,
      },
      {
        title: "Categoria de produtos",
        url: "/category-product",
        Icon: ChartBarStackedIcon,
      },
      {
        title: "Serviços",
        url: "/service",
        Icon: ShowerHeadIcon,
      },
      {
        title: "Veículos",
        url: "/vehicle",
        Icon: CarIcon,
      },
      {
        title: "Funcionários",
        url: "/employee",
        Icon: Users2Icon,
      },
    ],
  },
  {
    title: "Financeiro",
    url: "#",
    items: [
      {
        title: "Contas a pagar",
        url: "/bills-to-pay",
        Icon: PiggyBankIcon,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="relative h-20 w-64">
          <Image
            src="/logo.png"
            alt="logo"
            fill
            className="object-contain"
            sizes="100%"
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="text-base">
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.isActive || false}
                          className="text-base"
                        >
                          <a href={item.url} className="truncate">
                            {item.Icon && <item.Icon />}
                            {item.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
