const mockPosts = [
  {
    id: "post_1",
    title: "Spam link",
    content: "Check out this amazing site...",
    author: { username: "spammer1", id: "user_1" },
    reportedReason: "Spam",
    reportedAt: "2025-07-08",
    status: "pending",
    reportCount: 4,
    imageUrl: "https://picsum.photos/seed/post1/300/200"
  },
  {
    id: "post_2",
    title: "Offensive comment",
    content: "Very offensive stuff here...",
    author: { username: "troll1", id: "user_2" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-08",
    status: "pending",
    reportCount: 3
  },
  {
    id: "post_3",
    title: "Hate speech",
    content: "We should exclude these people...",
    author: { username: "hateGuy", id: "user_3" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-07-07",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post3/300/200"
  },
  {
    id: "post_4",
    title: "Buy followers now!",
    content: "Get 10,000 followers instantly...",
    author: { username: "marketBot", id: "user_4" },
    reportedReason: "Spam",
    reportedAt: "2025-07-06",
    status: "pending",
    reportCount: 2
  },
  {
    id: "post_5",
    title: "Threatening message",
    content: "I'll come after you if you post again.",
    author: { username: "intimidator", id: "user_5" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-06",
    status: "pending",
    reportCount: 6,
    imageUrl: "https://picsum.photos/seed/post5/300/200"
  },
  {
    id: "post_6",
    title: "Cheap loans available",
    content: "No credit check required...",
    author: { username: "loanGuy", id: "user_6" },
    reportedReason: "Spam",
    reportedAt: "2025-07-05",
    status: "pending",
    reportCount: 2
  },
  {
    id: "post_7",
    title: "Personal insult",
    content: "You're such an idiot, can't believe you exist.",
    author: { username: "meanPerson", id: "user_7" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-05",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post7/300/200"
  },
  {
    id: "post_8",
    title: "Clickbait news",
    content: "Scientists say coffee will kill you tomorrow!",
    author: { username: "clickMaster", id: "user_8" },
    reportedReason: "Fake News",
    reportedAt: "2025-07-04",
    status: "pending",
    reportCount: 1
  },
  {
    id: "post_9",
    title: "Offensive meme",
    content: "Shared an image mocking religion...",
    author: { username: "memeTroll", id: "user_9" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-07-03",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post9/300/200"
  },
  {
    id: "post_10",
    title: "Lottery scam",
    content: "You won $1 million! Click to claim.",
    author: { username: "scamBot", id: "user_10" },
    reportedReason: "Spam",
    reportedAt: "2025-07-03",
    status: "pending",
    reportCount: 4
  },
  {
    id: "post_11",
    title: "Cyberbullying post",
    content: "Everyone knows you're worthless.",
    author: { username: "bully", id: "user_11" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-02",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post11/300/200"
  },
  {
    id: "post_12",
    title: "Join my MLM scheme",
    content: "Earn from home with no skills required!",
    author: { username: "mlmKing", id: "user_12" },
    reportedReason: "Spam",
    reportedAt: "2025-07-01",
    status: "pending",
    reportCount: 2
  },
  {
    id: "post_13",
    title: "Inciting violence",
    content: "We should rise up and take matters by force.",
    author: { username: "violentVoice", id: "user_13" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-06-30",
    status: "pending",
    reportCount: 6,
    imageUrl: "https://picsum.photos/seed/post13/300/200"
  },
  {
    id: "post_14",
    title: "Fake charity plea",
    content: "Donate now to save imaginary kittens.",
    author: { username: "fakeDonor", id: "user_14" },
    reportedReason: "Spam",
    reportedAt: "2025-06-29",
    status: "pending",
    reportCount: 3
  },
  {
    id: "post_15",
    title: "Personal threat",
    content: "I'll find where you live.",
    author: { username: "stalker", id: "user_15" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-28",
    status: "pending",
    reportCount: 7,
    imageUrl: "https://picsum.photos/seed/post15/300/200"
  },
  {
    id: "post_16",
    title: "Offensive joke",
    content: "Here's a terrible joke at someone's expense.",
    author: { username: "badJoker", id: "user_16" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-27",
    status: "pending",
    reportCount: 2
  },
  {
    id: "post_17",
    title: "Miracle cure ad",
    content: "This herb will cure cancer overnight!",
    author: { username: "miracleMan", id: "user_17" },
    reportedReason: "Fake News",
    reportedAt: "2025-06-26",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post17/300/200"
  },
  {
    id: "post_18",
    title: "Misleading financial tip",
    content: "Invest in this and double money in 2 days.",
    author: { username: "moneyGuru", id: "user_18" },
    reportedReason: "Spam",
    reportedAt: "2025-06-25",
    status: "pending",
    reportCount: 4
  },
  {
    id: "post_19",
    title: "Rude comment",
    content: "You're the dumbest person on the platform.",
    author: { username: "meanUser", id: "user_19" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-24",
    status: "pending",
    reportCount: 1
  },
  {
    id: "post_20",
    title: "Crypto scam link",
    content: "Send ETH to this wallet and double it back.",
    author: { username: "cryptoScammer", id: "user_20" },
    reportedReason: "Spam",
    reportedAt: "2025-06-23",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post20/300/200"
  }
]

export default mockPosts
