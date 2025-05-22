-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "arrestLogId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArrestLog" (
    "id" SERIAL NOT NULL,
    "AGE" TEXT,
    "ARREST_STATUS" TEXT,
    "ArrestLocationAptFlr" TEXT,
    "ArrestLocationCity" TEXT,
    "ArrestLocationStreet" TEXT,
    "ArrestLocationStreetNBR" TEXT,
    "Arrest_Charge" TEXT,
    "Arrest_ID" TEXT,
    "Case_Number" TEXT,
    "Charge_Description" TEXT,
    "Charge_Sequence" TEXT,
    "DATE_ARRESTED" TEXT,
    "DOB" TEXT,
    "Degree" TEXT,
    "FIRSTNAME" TEXT,
    "LASTNAME" TEXT,
    "MIDDLENAME" TEXT,
    "OBJECTID" INTEGER,
    "OBJECTID_1" INTEGER,
    "RACE" TEXT,
    "SEX" TEXT,
    "SUFFIX" TEXT,
    "TIME_ARREST" TEXT,
    "UNIQUEKEY" TEXT,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "ArrestLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArrestLog_UNIQUEKEY_key" ON "ArrestLog"("UNIQUEKEY");

-- CreateIndex
CREATE UNIQUE INDEX "ArrestLog_post_id_key" ON "ArrestLog"("post_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArrestLog" ADD CONSTRAINT "ArrestLog_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
