import { Menu } from "@prisma/client";
import { prisma } from "../client";
import { BadRequestError } from "../errors";

export interface Menudata
  extends Omit<
    Menu,
    "id" | "createdAt" | "updatedAt"
  > {}

export const createMenuService = async (
  data: Menudata,
): Promise<Menu | null> => {

    const vendor = await prisma.vendor.findUnique({
        where: { id: data.vendorId },
    });
    if (!vendor) throw new BadRequestError("Invalid Vendor");

    return prisma.menu.create({
        data: {
        ...data,
        },
    });
};


export const getMenusService = async (): Promise<Menu[]> => {
  return await prisma.menu.findMany({
    include: {
        vendor: true
    }
  })
};

export const getMenuService = async (id: string): Promise<Menu | null> => {
  return await prisma.menu.findFirst({
    where: { 
      id
    },
    include: {
        vendor: true
    }
  });
};


export const updateMenuService = async (
  id: string,
  menu: Menudata
): Promise<Menu> => {

    if(menu.vendorId) {
        const vendor = await prisma.vendor.findUnique({
            where: { id: menu.vendorId },
        });
        if (!vendor) throw new BadRequestError("Invalid Vendor");
    }

    return await prisma.menu.update({ where: { id }, data: { ...menu } });
};

export const deleteMenu = async (id: string) => {
    const menu = await prisma.menu.delete({
      where: { id },
    });
    return menu;
};
