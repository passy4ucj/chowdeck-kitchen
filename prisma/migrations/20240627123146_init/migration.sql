-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_vendorId_fkey";

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
