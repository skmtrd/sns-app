命名規則です
propsを渡す時などに参照してください

[ポスト関連]
********************************************************************
model Post {
  id        String   @id @default(cuid())
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  likes Like[] 
  replies   PostReply[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

ポストのID => "postId"
ポストの中身 => "postContent"
ポストの著者の名前 => "postAuthorName"
ポストの著者 => "postAuthor"
ポストの著者のID => "postAuthorId"
ポストの著者のclerkId => "postAuthorClerkId"
ポストの著者のtag => "postAuthorTags"
以下、著者についての情報は"postAuthor〇〇"

ポストのリプライ配列　=> "replies"
ポストのいいね配列　=> "likes"

↑post reply をうまく変換してね


