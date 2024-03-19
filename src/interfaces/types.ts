export type ModalContent = {
  hoge:boolean
}

export type User = {
  "GithubID": string, 
  "DisplayName": string, 
  "ImageURL": string 
}

export type Pet = {
  "Language": string,
  "HungerLevel": number, // 0-100
  "FriendshipLevel": number, // 0-100
  "EscapeNum": number, //逃げた回数
  "BaitsNum": number
}

export type PetList = Pet[]

export type Followers = User[]

export type ResponseData = {
  "user": User,
  "pets": PetList,
  "followers": Followers
}
