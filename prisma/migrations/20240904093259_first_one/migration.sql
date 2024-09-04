-- CreateTable
CREATE TABLE "presencas" (
    "id" TEXT NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL,
    "saida" TIMESTAMP(3),
    "convidadoId" TEXT NOT NULL,

    CONSTRAINT "presencas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "convidados" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,

    CONSTRAINT "convidados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "convidados_email_key" ON "convidados"("email");

-- CreateIndex
CREATE UNIQUE INDEX "convidados_qrCode_key" ON "convidados"("qrCode");

-- AddForeignKey
ALTER TABLE "presencas" ADD CONSTRAINT "presencas_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "convidados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
