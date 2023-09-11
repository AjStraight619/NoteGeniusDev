-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" TEXT NOT NULL,
    CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefinedNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalNote" TEXT NOT NULL,
    "refinedNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "noteId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "RefinedNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefinedNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RefinedNote" ("createdAt", "id", "noteId", "originalNote", "refinedNote", "updatedAt") SELECT "createdAt", "id", "noteId", "originalNote", "refinedNote", "updatedAt" FROM "RefinedNote";
DROP TABLE "RefinedNote";
ALTER TABLE "new_RefinedNote" RENAME TO "RefinedNote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
