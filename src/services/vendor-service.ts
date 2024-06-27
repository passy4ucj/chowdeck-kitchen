import { Vendor } from "@prisma/client";
import { prisma } from "../client";

export interface Vendordata
  extends Omit<
    Vendor,
    "id" | "createdAt" | "updatedAt"
  > {}

export const createVendorService = async (
  data: Vendordata,
): Promise<Vendor | null> => {

  return prisma.vendor.create({
    data: {
      ...data,
    },
  });
};


export const getVendorsService = async (): Promise<Vendor[]> => {
  return await prisma.vendor.findMany({
    include: {
      menus: {
        select: {
            id: true,
            meal: true,
            content: true,
        },
      },
    }
  })
};

export const getVendorService = async (id: string): Promise<Vendor | null> => {
  return await prisma.vendor.findFirst({
    where: { 
      id
    },
    include: {
        menus: {
          select: {
              id: true,
              meal: true,
              content: true,
          },
        },
    }
  });
};


export const updateVendorService = async (
  id: string,
  vendor: Vendordata
): Promise<Vendor> => {
  return await prisma.vendor.update({ where: { id }, data: { ...vendor } });
};
