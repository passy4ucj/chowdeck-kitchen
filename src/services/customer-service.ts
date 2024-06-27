
import { prisma } from "../client";
import crypto from "crypto";
import { Role, Customer } from "@prisma/client";

export type CustomerAccount = Pick<
    Customer,
    "firstName" | "LastName" | "role" | "email" | "password"
    >;

export type CustomerSettings = Pick<
    Customer,
    "firstName" | "LastName"
    >;

// excluded password types
export type ReturnedCustomer = Partial<Pick<Customer, "password">> &
Omit<Customer, "password">;


export const createCustomer = async (data: CustomerAccount): Promise<ReturnedCustomer> => {
const user: ReturnedCustomer = await prisma.customer.create({
    data: { ...data },
});
delete user.password;

return user;
};

export const getCustomer = async (
    email: string
): Promise<ReturnedCustomer | null> => {
    return await prisma.customer.findUnique({ where: { email } });
};

export const findCustomerByIdService = async (
    id: string
): Promise<ReturnedCustomer | null> => {
return await prisma.customer.findUnique({ 
    where: { id },
});
};


export const updatePasswordService = async (email: string, password: string) => {
    const user = await prisma.customer.update({
        where: { email },
        data: { password },
    });
    return user;

};

export const customerUpdateService = async (email: string, payload: CustomerSettings) => {

    const user = await prisma.customer.update({
        where: { email },
        data: { ...payload },
    });
    return user;
};


export const getAllCustomerService = async (query: any) => {

    let filterObject: any;
    filterObject = {
        firstName: query.firstName,
        role: query.role,
    }

    return await prisma.customer.findMany({
        where: {
        ...filterObject
        },
        select: {
        id: true,
        firstName: true,
        LastName: true,
        role: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        },
    });
};

