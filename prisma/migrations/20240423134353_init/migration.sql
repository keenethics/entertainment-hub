-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "FormatOfWork" AS ENUM ('OFFLINE', 'ONLINE', 'BOTH');

-- CreateEnum
CREATE TYPE "EventFormat" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "EventPriceFormat" AS ENUM ('FREE', 'FIXED_PRICE', 'MIN_PRICE');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('PRIVATE', 'GOVERNMENT');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "NavigationUrl" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'APPLICATION');

-- CreateTable
CREATE TABLE "specialist" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(64) NOT NULL,
    "lastName" VARCHAR(64) NOT NULL,
    "surname" VARCHAR(64),
    "gender" "Gender",
    "yearsOfExperience" SMALLINT,
    "formatOfWork" "FormatOfWork",
    "isFreeReception" BOOLEAN,
    "description" TEXT,
    "phone" VARCHAR(15),
    "email" VARCHAR(320),
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "instagram" TEXT,
    "facebook" TEXT,
    "youtube" TEXT,
    "linkedin" TEXT,
    "tiktok" TEXT,
    "viber" TEXT,
    "telegram" TEXT,

    CONSTRAINT "specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "yearsOnMarket" SMALLINT,
    "formatOfWork" "FormatOfWork",
    "ownershipType" "OwnershipType",
    "isInclusiveSpace" BOOLEAN,
    "isFreeReception" BOOLEAN,
    "description" TEXT,
    "phone" VARCHAR(15),
    "email" VARCHAR(320),
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "instagram" TEXT,
    "facebook" TEXT,
    "youtube" TEXT,
    "linkedin" TEXT,
    "tiktok" TEXT,
    "viber" TEXT,
    "telegram" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_focus" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "specialistId" UUID,
    "organizationId" UUID,
    "price" INTEGER,
    "activityTypeId" UUID NOT NULL,

    CONSTRAINT "support_focus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_entry" (
    "id" UUID NOT NULL,
    "sortString" TEXT NOT NULL,
    "specialistId" UUID,
    "organizationId" UUID,

    CONSTRAINT "search_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_type" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "organization_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_type" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(64) NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "imagePath" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "priority" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "activity_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request" (
    "id" UUID NOT NULL,
    "simpleId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nameOfClinic" VARCHAR(255),
    "fullAddress" VARCHAR(128) NOT NULL,
    "districtId" UUID NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(13) NOT NULL,
    "email" VARCHAR(320),
    "callMe" BOOLEAN NOT NULL,
    "message" VARCHAR(320) NOT NULL,
    "adminNotes" VARCHAR(350),
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "organizerName" VARCHAR(128) NOT NULL,
    "notes" VARCHAR(350),
    "address" VARCHAR(128),
    "locationLink" TEXT,
    "price" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "linkId" UUID,
    "eventDate" TIMESTAMP(3),
    "format" "EventFormat",
    "priceType" "EventPriceFormat",

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_link" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "label" VARCHAR(30) NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "event_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_tag" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "event_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL DEFAULT '',
    "priority" SMALLINT,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "method" (
    "id" UUID NOT NULL,
    "simpleId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(128) NOT NULL,
    "description" TEXT,
    "specializationId" UUID NOT NULL,

    CONSTRAINT "method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_category" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "client_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_time" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" VARCHAR(13) NOT NULL,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,
    "weekDay" "WeekDay" NOT NULL,

    CONSTRAINT "work_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" "NavigationUrl" NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donation_details" (
    "id" UUID NOT NULL,
    "isDonationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(50) NOT NULL,
    "subtitle" VARCHAR(50) NOT NULL,
    "isSubtitleEnabled" BOOLEAN NOT NULL DEFAULT true,
    "paypalLink" TEXT NOT NULL,
    "isPayPalLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "privatLink" TEXT NOT NULL,
    "isPrivatLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isBankDetailsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "enterpriceName" VARCHAR(128) NOT NULL,
    "enterpriseRegisterId" INTEGER NOT NULL,
    "paymentPurpose" VARCHAR(50) NOT NULL,
    "iban" VARCHAR(50) NOT NULL,
    "isQREnabled" BOOLEAN NOT NULL DEFAULT true,
    "qrLink" TEXT NOT NULL,

    CONSTRAINT "donation_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistToSpecialization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToWorkTime" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToOrganizationType" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToSpecialization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToWorkTime" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivityTypeToRequest" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_RequestToSupportFocus" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToOrganization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_MethodToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToClientCategoryWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToClientCategoryNotWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToClientCategoryWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToClientCategoryNotWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "search_entry_specialistId_key" ON "search_entry"("specialistId");

-- CreateIndex
CREATE UNIQUE INDEX "search_entry_organizationId_key" ON "search_entry"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "specialization_name_key" ON "specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "district_name_key" ON "district"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organization_type_name_key" ON "organization_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activity_type_type_key" ON "activity_type"("type");

-- CreateIndex
CREATE UNIQUE INDEX "request_name_key" ON "request"("name");

-- CreateIndex
CREATE UNIQUE INDEX "event_link_label_link_key" ON "event_link"("label", "link");

-- CreateIndex
CREATE UNIQUE INDEX "event_tag_name_key" ON "event_tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "method_title_key" ON "method"("title");

-- CreateIndex
CREATE UNIQUE INDEX "client_category_name_key" ON "client_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "work_time_weekDay_time_isDayOff_key" ON "work_time"("weekDay", "time", "isDayOff");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_title_key" ON "social_media"("title");

-- CreateIndex
CREATE UNIQUE INDEX "donation_details_title_key" ON "donation_details"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToSpecialization_AB_unique" ON "_SpecialistToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToSpecialization_B_index" ON "_SpecialistToSpecialization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToWorkTime_AB_unique" ON "_SpecialistToWorkTime"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToWorkTime_B_index" ON "_SpecialistToWorkTime"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToOrganizationType_AB_unique" ON "_OrganizationToOrganizationType"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToOrganizationType_B_index" ON "_OrganizationToOrganizationType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToSpecialization_AB_unique" ON "_OrganizationToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToSpecialization_B_index" ON "_OrganizationToSpecialization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToWorkTime_AB_unique" ON "_OrganizationToWorkTime"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToWorkTime_B_index" ON "_OrganizationToWorkTime"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityTypeToRequest_AB_unique" ON "_ActivityTypeToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityTypeToRequest_B_index" ON "_ActivityTypeToRequest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestToSupportFocus_AB_unique" ON "_RequestToSupportFocus"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestToSupportFocus_B_index" ON "_RequestToSupportFocus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToSpecialist_AB_unique" ON "_AddressToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToSpecialist_B_index" ON "_AddressToSpecialist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToOrganization_AB_unique" ON "_AddressToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToOrganization_B_index" ON "_AddressToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventTag_AB_unique" ON "_EventToEventTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventTag_B_index" ON "_EventToEventTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MethodToSpecialist_AB_unique" ON "_MethodToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_MethodToSpecialist_B_index" ON "_MethodToSpecialist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToClientCategoryWorkingWith_AB_unique" ON "_SpecialistToClientCategoryWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToClientCategoryWorkingWith_B_index" ON "_SpecialistToClientCategoryWorkingWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToClientCategoryNotWorkingWith_AB_unique" ON "_SpecialistToClientCategoryNotWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToClientCategoryNotWorkingWith_B_index" ON "_SpecialistToClientCategoryNotWorkingWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToClientCategoryWorkingWith_AB_unique" ON "_OrganizationToClientCategoryWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToClientCategoryWorkingWith_B_index" ON "_OrganizationToClientCategoryWorkingWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToClientCategoryNotWorkingWith_AB_unique" ON "_OrganizationToClientCategoryNotWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToClientCategoryNotWorkingWith_B_index" ON "_OrganizationToClientCategoryNotWorkingWith"("B");

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_focus" ADD CONSTRAINT "support_focus_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "activity_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_entry" ADD CONSTRAINT "search_entry_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_entry" ADD CONSTRAINT "search_entry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "event_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "method" ADD CONSTRAINT "method_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specialization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToWorkTime" ADD CONSTRAINT "_SpecialistToWorkTime_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToWorkTime" ADD CONSTRAINT "_SpecialistToWorkTime_B_fkey" FOREIGN KEY ("B") REFERENCES "work_time"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationType" ADD CONSTRAINT "_OrganizationToOrganizationType_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToOrganizationType" ADD CONSTRAINT "_OrganizationToOrganizationType_B_fkey" FOREIGN KEY ("B") REFERENCES "organization_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSpecialization" ADD CONSTRAINT "_OrganizationToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSpecialization" ADD CONSTRAINT "_OrganizationToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToWorkTime" ADD CONSTRAINT "_OrganizationToWorkTime_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToWorkTime" ADD CONSTRAINT "_OrganizationToWorkTime_B_fkey" FOREIGN KEY ("B") REFERENCES "work_time"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityTypeToRequest" ADD CONSTRAINT "_ActivityTypeToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "activity_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityTypeToRequest" ADD CONSTRAINT "_ActivityTypeToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToSupportFocus" ADD CONSTRAINT "_RequestToSupportFocus_A_fkey" FOREIGN KEY ("A") REFERENCES "request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToSupportFocus" ADD CONSTRAINT "_RequestToSupportFocus_B_fkey" FOREIGN KEY ("B") REFERENCES "support_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToSpecialist" ADD CONSTRAINT "_AddressToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToSpecialist" ADD CONSTRAINT "_AddressToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_A_fkey" FOREIGN KEY ("A") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_B_fkey" FOREIGN KEY ("B") REFERENCES "event_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodToSpecialist" ADD CONSTRAINT "_MethodToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodToSpecialist" ADD CONSTRAINT "_MethodToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryNotWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryNotWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryNotWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryNotWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryNotWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryNotWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryNotWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryNotWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
